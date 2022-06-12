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
import { useGlobalContext } from '../context';
import courseList from '@data/courseList';




const useConnectionManager = () => {

  const {ctx, setCtx} = useGlobalContext()

  // const [progress, setProgress] = useState<any>({})
  const [latestCategoryState, setLatestCategoryState] = useState<any>()
  const [latestCourseState, setLatestCourseState] = useState<any>()



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
    // setProgress({})
    setCtx({...ctx, progress: {}})
    // setRefreshTrigger(b => !b)  
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
      progress: {},
      w3m: null
    });

  };

  const connectWeb3 = async () => {
    setCtx({...ctx, navOpen: false, connecting: true})
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

      const { data } = await axios.post('/api/get-progress', {userAddress: address})

      if(holderData.isVerified){
        setCtx({
          ...ctx,
          chainId: network.chainId,
          address,
          connected: true,
          connecting: false,
          isVerified: holderData.isVerified,
          isHolder: holderData.isHolder,
          progress: data?.progressObject || null,
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
          address: address,
          connected: true,
          connecting: false,
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


  const assembleProgressObject = () => {
    if(!ctx.address) return; 

    
    if(ctx.progress){
      console.log('assembleProgressObject | store data already exists:', ctx.progress)
    }else{
      console.log('assembleProgressObject | assemble progress object:', ctx.progress, courseList)

      // const progressObject = {}
      // Object.entries(courseList).forEach(([uri, obj]) => {
      //   progressObject[uri] = {
      //     progress: 0,
      //     code: '',
      //     answers: {}
      //   }
      // })
      updateProgress(courseList)
    }


  }

  const resetProgress = () => {
    if(!ctx.address) return;
    axios.post('/api/reset-progress', {userAddress: ctx.address})
  }

  // const refresh = () => ctx.address && setRefreshTrigger(b => !b)
  const refresh = async () => {
    return new Promise(async (res)=>{

      if(!ctx.address) {
        res(false);
        return 
      }
      
      const { data } = await axios.post('/api/get-progress', {userAddress: ctx.address})
      // setProgress(data.progressObject)
      console.log('STORE | refresh progress ctx:', data.progressObject)
      if(data && data.progressObject){
        setCtx({...ctx, progress: data.progressObject})
      }
      
      setLatestCategoryState(data.latestCategory)
      setLatestCourseState(data.latestCourse)
      if(data.progressObject){
        res(true)
      }
    })

  }

  const checkStorage = async () => {
    if(!ctx.address){
      console.log('STORE | cant check storage without address')
      return;
    }

    const { data } = await axios.post('/api/get-progress', {userAddress: ctx.address})
    // setProgress(data.progressObject)
    console.log('STORE | CHECK STORAGE:', data.progressObject)
  }




  const checkCompletion = (URI) => {
    if(!ctx.address || !ctx.progress){
      // console.log('STORE | completion | cant check without address or progress')
      return 0;
    }

    if(URI in ctx.progress){
      if(ctx.progress[URI].complete){
        // console.log('COMPLETION | complete')
        return 3
      }else{
        // console.log('COMPLETION | uri found in progress object')
        return 2
      }
    }else{
      // console.log('COMPLETION | no uri in progress object')
      return 1
    }

  }




  const updateProgress = async (cb: any) => {
      if(!ctx.address) return
      try{
          if(typeof cb === 'function'){
              const progressObject = cb(ctx.progress)
              setCtx({...ctx, progress: progressObject})
              // setProgress(progressObject)
              // console.log('STORE | progress update:', ctx.progress)
              
              await axios.post('/api/set-progress', {userAddress: ctx.address, data:{progressObject}})
            }else{
              setCtx({...ctx, progress: cb})
              console.log('reset?')
              await axios.post('/api/set-progress', {userAddress: ctx.address, data:{progressObject: cb}})
          }
          console.log('STORE | PROGRESS SAVED TO STORE:', ctx.progress)
          // refresh()
      }catch(err){
          console.log(err)
      }
  }





  const setLatestCategory = async (category: string) => {
      if(!ctx.address) return
      try{
          console.log('setLatestCategory:', category)
          await axios.post('/api/set-progress', {userAddress: ctx.address, data:{latestCategory: category}})
          // refresh()
      }catch(err){
          console.log(err)
      }
  }





  const setLatestCourse = async (course: string) => {
      if(!ctx.address) return
      try{
          console.log('setLatestCourse:', course)
          await axios.post('/api/set-progress', {userAddress: ctx.address, data:{latestCourse: course}})
          // refresh()
      }catch(err){
          console.log(err)
      }
  }
  



  useEffect(()=>{
    if(ctx.address){
      console.log('STORE | address changed')
      refresh()
    }
  }, [ctx.address])

  return {
      ctx,
      setCtx,
      progress: ctx.progress,
      assembleProgressObject,
      refresh,
      checkStorage,
      checkCompletion,
      updateProgress,
      resetProgress,
      setLatestCategory,
      setLatestCourse,
      latestCategory: latestCategoryState,
      latestCourse: latestCourseState,

      connect: connectWeb3,
      reset: resetApp,
  }
    
}

export default useConnectionManager