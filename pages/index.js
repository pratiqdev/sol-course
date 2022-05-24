
import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useUserContext } from '../utils/context'

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
      // Metamask Lock fire an empty accounts array 
      await resetApp();
    } else {
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

  const getNetwork = () => getChainData(ctx.chainId || 1).network;

  const getProviderOptions = () => {
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
    console.log('resetApp |')
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    localStorage.removeItem("walletconnect");
    sessionStorage.setItem('CHIPTOS_CONNECTED', 'false')
    if(ctx.w3m){
      await ctx.w3m.web3Modal.clearCachedProvider();
      await unSubscribe(ctx.w3m.provider);
    }

    setCtx({ 
      ...ctx, 
      w3m: null
    });

  };



  const connectWeb3 = useCallback(async () => {
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
  
      setCtx({
        ...ctx,
        w3m: {
          provider,
          library,
          network,
          web3Modal,
          library,
          chainId: network.chainId,
          address,
          connected: true
        }
      });
      
      await subscribeToProviderEvents(provider);
      
    }catch(err){
      console.log('WEB3 MODAL ERROR:', err)
    }
  }, [])











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

      {/* <pre>{inspect(ctx)}</pre> */}

      <p>Chain ID: {ctx?.w3m?.chainId}</p>
      <p>Address: {ctx?.w3m?.address}</p>

      <button onClick={() => setCtx({...ctx, newData: 'New Context!'})}>Set CTX</button>
      <button onClick={() => resetApp()}>RESET</button>
      <button onClick={() => connectWeb3()}>Connect</button>


   
    </div>
  )
}