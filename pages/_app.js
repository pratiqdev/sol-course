import '../styles/globals.css'
import { UserContextWrapper } from '@utils/context'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <UserContextWrapper>
      <nav style={{display: 'flex', flexDirection: 'column'}}>
        <Link href='/'>Home</Link>
        <Link href='/courses'>Courses (empty)</Link>
        <Link href='/courses/intro/straight-mdx'>Public page</Link>
        <Link href='/courses/course-1/protected-page'>Protected page</Link>
      </nav>
      <Component {...pageProps} />
    </UserContextWrapper>
  )
}

export default MyApp
