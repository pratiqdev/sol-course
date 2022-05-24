
import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import Moralis from 'moralis/dist/moralis.min.js';

import styles from '../styles/Home.module.css'
import { useUserContext } from '../utils/context'
import abi from '../utils/abi.json'

import Web3 from 'web3';
import Web3Modal from 'web3modal'
import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Torus from "@toruslabs/torus-embed";
import { getChainData } from '../helpers/utilities';

import { inspect } from 'util'

export default function Home(props) {
  const {ctx, setCtx} = useUserContext()

  const subscribeToProviderEvents = async (provider) => {
    console.log('index | subscribeToProviderEvents')

    if (!provider.on) {
      return;
    }

    provider.on("accountsChanged", changedAccount);
    provider.on("chainChanged", networkChanged);
    provider.on("disconnect", () => {
      sessionStorage.setItem("CHIPTOS_CONNECTED", 'false');
      close();
    });

    // await web3Modal.off('accountsChanged');
  };

  const unSubscribe = async (provider) => {
    // Workaround for metamask widget > 9.0.3 (provider.off is undefined);
    // window.location.reload();
    if (!provider.off) {
      return;
    }

    provider.off("accountsChanged", changedAccount);
    provider.off("networkChanged", networkChanged);
    provider.off("close", close);
  }

  const changedAccount = async (accounts) => {
    if(!accounts.length) {
      console.log('index | changedAccount | disconnected',)
      // Metamask Lock fire an empty accounts array 
      await resetApp();
    } else {
      console.log('index | changedAccount | connected',)
      setCtx({ 
        ...ctx, 
        w3m: {
          ...ctx.w3m,
          address: accounts[0]
        }
      });
    }
  }

  const networkChanged = async (networkId) => {
    console.log('index | networkChanged')
    const web3Modal = new Web3Modal({
      network: getNetwork(),
      cacheProvider: true,
      providerOptions: getProviderOptions(),
      chainId: 1,
    });
    const provider = await web3Modal.connect();
    
    const library = new Web3Provider(provider);

    const network = await library.getNetwork();
    
    const address = provider.selectedAddress ? provider.selectedAddress : provider.accounts[0];
    // const library = new Web3Provider(ctx?.w3m?.provider);
    // const network = await library.getNetwork();
    const chainId = network.chainId;
    console.log(`index | networkChanged: ${chainId}`)
    setCtx({ 
      ...ctx, 
      w3m: {
        ...ctx.w3m,
        chainId, 
        library,
        address
      }
    });
  }
  
  const close = async () => {
    resetApp();
  }

  const getNetwork = () => {
    console.log('index | getNetwork')
    return getChainData(ctx.chainId || 1).network;
  }

  const getProviderOptions = () => {
    console.log('index | getProviderOptions')

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID,
          rpc: "",
        }
      },
      walletlink: {
        package: CoinbaseWalletSDK, // Required
        options: {
          appName: "Chiptos", // Required
          infuraId: process.env.REACT_APP_INFURA_ID, // Required
          rpc: "", // Optional if `infuraId` is provided; otherwise it's required
          chainId: 1, // Optional. It defaults to 1 if not provided
          darkMode: false // Optional. Use dark theme, defaults to false
        }
      },
      torus: {
        package: Torus, // required
        options: {
          networkParams: {
            // host: "https://localhost:8545", // optional
            // chainId: 1337, // optional
            // networkId: 1337 // optional
          },
          config: {
            // buildEnv: "development" // optional
          }
        }
      }
    };
    return providerOptions;
  };

  const resetApp = async () => {
    console.log('index | resetApp')
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    localStorage.removeItem("walletconnect");
    sessionStorage.setItem('CHIPTOS_CONNECTED', 'false')

    if(ctx.w3m && ctx.w3m.Web3Modal){
      await ctx.web3Modal.provider.close()
      await ctx.w3m.web3Modal.clearCachedProvider();
      await unSubscribe(ctx.w3m.provider);
    }

    setCtx({ 
      ...ctx, 
      w3m: null
    });

  };

  const connectWeb3 = useCallback(async () => {
    console.log('index | connectWeb3')

    try{
      const web3Modal = new Web3Modal({
        network: getNetwork(),
        cacheProvider: true,
        providerOptions: getProviderOptions(),
        chainId: 1,
      });
      const provider = await web3Modal.connect();
      
      const library = new Web3Provider(provider);

      const network = await library.getNetwork();
      
      const address = provider.selectedAddress ? provider.selectedAddress : provider.accounts[0];

      // create a connection to the contract
      const web3 =  new Web3(Web3.givenProvider)
      const Contract = await new web3.eth.Contract(abi, '0x5955373cc1196fd91a4165c4c5c227b30a3948f9')
    
      setCtx({
        ...ctx,
        chainId: network.chainId,
        address,
        connected: true,
        w3m: {
          provider,
          library,
          network,
          web3Modal,
          library,
          Contract,
        }
      });
      
      await subscribeToProviderEvents(provider);
      
    }catch(err){
      console.log('WEB3 MODAL ERROR:', err)
    }
  }, [])







  const testApi = async () => {
    console.log('index | testApi...')
    
    let data = await axios.get('/api/hello')
    console.log('index | testApi | data:', data)
    // setCtx({
    //   ...ctx,
    //   courses: '???'
    // })
  }


  const checkIsHolder = async () => {
    console.log(`index | checkIsHolder...`)
    let isHolder = await ctx.w3m.Contract.methods
      .usedAddresses(ctx.address)
      .call()
      .then(data => data ? true : false)
      .catch(err => console.log('index | isHolder | error:', err))

      console.log(`index | checkIsHolder: ${isHolder}`)
      setCtx({
        ...ctx,
        isHolder
      })
      return isHolder
  }



  // useEffect(() => {
  //   connectWeb3()
  // }, [connectWeb3])
  



  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>index.js - Home</p>




      {ctx.connected 
      ?
      <>
        <p>Chain ID: {ctx?.w3m?.chainId}</p>
        <p>Address: {ctx?.w3m?.address}</p>
        <button onClick={() => resetApp()}>RESET</button>
        <button onClick={() => testApi()}>API TEST</button>
        <button onClick={() => checkIsHolder()}>IS HOLDER</button>
      </>
      :
      <button onClick={() => connectWeb3()}>Connect</button>

      
    }
    <pre>{inspect({...ctx, w3m:{}})}</pre>
   
    </div>
  )
}