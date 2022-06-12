import { useState, useEffect } from 'react'
import Web3 from 'web3';
import Web3Modal, { local } from 'web3modal'
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


      // refresh()
      
      await subscribeToProviderEvents(provider);
      
    }catch(err){
      console.log('WEB3 MODAL ERROR:', err)
    }
  }








  //+ PROGRESS MANAGER /////////////////////////////////////////////////////////


  const checkCompletion = (_category:string, _course:string) => {
    if(!ctx.address || !ctx.progress){
      // console.log('STORE | completion | cant check without address or progress')
      return 0;
    }

    if(_category in ctx.progress){
      if(_course in ctx.progress[_category]){
        if(ctx.progress[_category][_course].complete){
          return 3
        }else{
          return 2
        }
      }
    }else{
      // console.log('COMPLETION | no uri in progress object')
      return 1
    }

  }




  const updateProgress = async (newProg: any, tag:string) => {
      if(!ctx.address) return
      try{
          console.log('STORE | SAVING PROGRESS TO STORE:', {hasFeedback: newProg.intro.feedback ? 'true' : 'false', tag, newProg})
          await axios.post('/api/set-progress', {userAddress: ctx.address, data:{progressObject: newProg}})
          // refresh()
      }catch(err){
          console.log(err)
      }
  }







  const useUriStore = (_category: string, _course?:string) => {
    const [state, setState] = useState({})

    const handleStateChange = async (_cb:Function) => {
      if(!ctx.address) return;
      
      let newState = _cb(state)
      console.log('URISTORE | handleStateChange:', {_category, _course, newState})
      let prog = {...ctx.progress}

      if(_course){
        prog[_category][_course] = newState
      }else{
        prog[_category] = newState
      }
      await setCtx({...ctx, progress: prog})
      // console.log('URISTORE | updating and setting ctx 0')

      updateProgress(prog, `1 ${_course}`)

    }

    const handler:any = handleStateChange


    useEffect(()=>{
      if(!ctx.address) return;

      let prog = {...ctx.progress}

      if(_category in prog){
        if(_course){
            if(_course in prog[_category]){
              setState(prog[_category][_course])
            }else{
              prog[_category][_course] = {}
              setCtx({...ctx, progress: prog})
              updateProgress(prog, '1')
              setState({})
            }
        }else{
          setState(prog[_category])
          // updateProgress(prog, `2 ${_category}/${_course}`)
        }
      }
      else{
        prog[_category] = {}
        if(_course){
          prog[_category][_course] = {}
        }
        setState({})
        setCtx({...ctx, progress: prog})
      }
      
      // updateProgress(prog, '3')


    }, [ctx.progress])

    // useEffect(()=>{
    //   console.log('useUriStore | local state change:', state)
    // },[state])

    return [state, handler]
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
  



  // useEffect(()=>{
  //   if(ctx.address){
  //     console.log('STORE | address changed')
  //     // refresh()
  //   }
  // }, [ctx.address])

  return {
      ctx,
      setCtx,
      progress: ctx.progress,
      // assembleProgressObject,
      // refresh,
      // checkStorage,
      checkCompletion,
      // updateProgress,
      useUriStore,
      // useProgressStore,
      // getCategoryStoreByUri,
      // getCourseStoreByUri,
      // getRootStore,
      // resetProgress,
      setLatestCategory,
      setLatestCourse,
      latestCategory: latestCategoryState,
      latestCourse: latestCourseState,

      connect: connectWeb3,
      reset: resetApp,
  }
    
}

export default useConnectionManager