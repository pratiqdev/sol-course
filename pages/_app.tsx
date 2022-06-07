import '../styles/globals.css'
import { UserContextWrapper } from '@utils/context'
import { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import { Global } from '@mantine/core';

const App = (props: AppProps) => {
  const { Component, pageProps } = props
  return (
    <UserContextWrapper>
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
    </UserContextWrapper>
  )
}

export default App
