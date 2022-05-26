import '../styles/globals.css'
import { UserContextWrapper } from '@utils/context'
import Link from 'next/link'
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
      {/* <nav style={{display: 'flex', flexDirection: 'column'}}>
        <Link href='/'>Home</Link>
        <Link href='/courses'>Courses (empty)</Link>
        <Link href='/courses/intro/straight-mdx'>Public page</Link>
        <Link href='/courses/course-1/protected-page'>Protected page</Link>
      </nav> */}
      <Component {...pageProps} />
      </MantineProvider>
    </UserContextWrapper>
  )
}

export default App
