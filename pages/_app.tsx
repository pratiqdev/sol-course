import '../styles/globals.css'
import { GlobalContextWrapper, useGlobalContext } from '@utils/context'
import useConnectionManager from '@utils/hooks/useConnectionManager';
import { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import { Global } from '@mantine/core';
import { useEffect, useState } from 'react';


const ProgressAssembler = (props) => {
  const { 
    ctx, 
    assembleProgressObject
  } = useConnectionManager()

  useEffect(()=>{
    assembleProgressObject()
  }, [ctx.address])
  
  return null
}




const App = (props: AppProps) => {
  const { Component, pageProps } = props

  return (
    <GlobalContextWrapper>
      <ProgressAssembler />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
          
        }}
      >
        <Global
        styles={(theme) => ({
          '*, *::before, *::after': {
            boxSizing: 'border-box',
          },

          body: {
            ...theme.fn.fontStyles(),
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            lineHeight: theme.lineHeight,
          },
        })}
      />
      <Component {...pageProps} />
    </MantineProvider>
    </GlobalContextWrapper>
  )
}

export default App
