import { useState, useEffect } from 'react'
import Web3 from 'web3';
import Web3Modal from 'web3modal'
import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Torus from "@toruslabs/torus-embed";
import { getChainData } from '../utilities';
import axios from 'axios'

import verifyAddress from '@utils/verifyAddress';
import { useUserContext } from '../context';




const useConnectionManager = () => {

  const {ctx, setCtx} = useUserContext()

  const [progress, setProgress] = useState<any>({})
  const [latestCategoryState, setLatestCategoryState] = useState<any>()
  const [latestCourseState, setLatestCourseState] = useState<any>()
  const [refreshTrigger, setRefreshTrigger] = useState(false)



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
      console.log('index | changedAccount | connected:', accounts)

      let holderData = await verifyAddress(accounts[0])

      setCtx({
        ...ctx,
        address: accounts[0],
        connected: true,
        isHolder: holderData.isHolder,
        isVerified: holderData.isVerified,
      });
    }
  }

  const networkChanged = async (networkId) => {
    console.log('index | networkChanged')
    const web3Modal = new Web3Modal({
      network: getNetwork(),
      cacheProvider: true,
      providerOptions: getProviderOptions(),
      // chainId: 1,
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
    console.log('index | getProviderOptions | using infuraId:', process.env.NEXT_PUBLIC_INFURA_ID)

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
          rpc: "",
        }
      },
      walletlink: {
        package: CoinbaseWalletSDK, // Required
        options: {
          appName: "Chiptos", // Required
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID, // Required
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
    setProgress({})
    setRefreshTrigger(b => !b)  
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
      address: null,
      isHolder: false,
      isVerified: false,
      connected: false,
      w3m: null
    });

  };

  const connectWeb3 = async () => {
    setCtx({...ctx, navOpen: false})
    console.log('index | connectWeb3')

    try{
      const web3Modal = new Web3Modal({
        network: getNetwork(),
        cacheProvider: true,
        providerOptions: getProviderOptions(),
        // chainId: 1,
      });
      const provider = await web3Modal.connect();
      
      const library = new Web3Provider(provider);

      const network = await library.getNetwork();
      
      const address = provider.selectedAddress ? provider.selectedAddress : provider.accounts[0];
      
      let holderData = await verifyAddress(address)


      // console.log('index | connectWeb3 | holderData:', holderData)
      if(holderData.isVerified){
        setCtx({
          ...ctx,
          chainId: network.chainId,
          address,
          connected: true,
          isVerified: holderData.isVerified,
          isHolder: holderData.isHolder,
          w3m: {
            provider,
            library,
            network,
            web3Modal,
          }
        });
      }else{
        setCtx({
          ...ctx,
          chainId: network.chainId,
          address: null,
          connected: false,
          isVerified: false,
          isHolder: false,
          w3m: {
            provider,
            library,
            network,
            web3Modal,
          }
        });
      }

      refresh()
      
      await subscribeToProviderEvents(provider);
      
    }catch(err){
      console.log('WEB3 MODAL ERROR:', err)
    }
  }
  //+ PROGRESS MANAGER /////////////////////////////////////////////////////////

  const refresh = () => ctx.address && setRefreshTrigger(b => !b)

  const updateProgress = async (cb: any) => {
      if(!ctx.address) return
      try{
          if(typeof cb === 'function'){
              console.log('cb function?')
              const progressObject = cb(progress)
              await axios.post('/api/set-progress', {userAddress: ctx.address, data:{progressObject}})
          }else{
              console.log('reset?')
              await axios.post('/api/set-progress', {userAddress: ctx.address, data:{progressObject: cb}})
          }
          refresh()
      }catch(err){
          console.log(err)
      }
  }

  const setLatestCategory = async (category: string) => {
      if(!ctx.address) return
      try{
          console.log('setLatestCategory:', category)
          await axios.post('/api/set-progress', {userAddress: ctx.address, data:{latestCategory: category}})
          refresh()
      }catch(err){
          console.log(err)
      }
  }

  const setLatestCourse = async (course: string) => {
      if(!ctx.address) return
      try{
          console.log('setLatestCourse:', course)
          await axios.post('/api/set-progress', {userAddress: ctx.address, data:{latestCourse: course}})
          refresh()
      }catch(err){
          console.log(err)
      }
  }
  
  useEffect(()=>{
      (async () => {
          if(ctx.address){
              const { data } = await axios.post('/api/get-progress', {userAddress: ctx.address})
              setProgress(data.progressObject)
              setLatestCategoryState(data.latestCategory)
              setLatestCourseState(data.latestCourse)
          }
      })()
  }, [ctx.address, refreshTrigger])

  return {
      ctx,
      setCtx,
      progress,
      refresh,
      updateProgress,
      setLatestCategory,
      setLatestCourse,
      latestCategory: latestCategoryState,
      latestCourse: latestCourseState,

      connect: connectWeb3,
      reset: resetApp,
  }
    
}

export default useConnectionManager