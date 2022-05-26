
import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'

import styles from '../styles/Home.module.css'
import { useUserContext } from '@utils/context'
import connectionManager from '@utils/connection'



import { inspect } from 'util'

export default function Home(props) {
  const {ctx, setCtx} = useUserContext()
  const { connect, reset } = connectionManager(ctx, setCtx)
  




  const testApi = async () => {
    console.log('index | testApi...')
    
    let data = await axios.get('/api/hello')
    console.log('index | testApi | data:', data)

  }




  return (
    <div className={styles.container}>
      <Head>
        <title>ChiptosX Solidity Courses</title>
        <meta name="description" content="ChiptosX interactive solidity course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>index.js - Home</p>




      {ctx.connected 
      ?
      <>
        <p>Chain ID: {ctx?.chainId}</p>
        <p>Address: {ctx?.address}</p>
        {/* <p>Secret: {JSON.stringify(secret)}</p> */}
        <button onClick={() => reset()}>RESET</button>
        <button onClick={() => testApi()}>API TEST</button>
      </>
      :
      <button onClick={() => connect()}>Connect</button>
      

      
    }
    <ul>
      <li>Downgrade web3modal package due to walletconnect modal bug</li>
    </ul>
    <pre>{inspect({...ctx, w3m: 'x'})}</pre>
   
    </div>
  )
}