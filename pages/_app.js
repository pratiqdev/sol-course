import '../styles/globals.css'
import { UserContextWrapper } from '@utils/context'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <UserContextWrapper>
      <nav>
        <Link href='/'>Home</Link>
        <Link href='/courses'>Courses</Link>
      </nav>
      <Component {...pageProps} />
    </UserContextWrapper>
  )
}

export default MyApp
