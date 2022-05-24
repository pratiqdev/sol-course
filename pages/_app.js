import '../styles/globals.css'
import { UserContextWrapper } from '../utils/context'

function MyApp({ Component, pageProps }) {
  return (
    <UserContextWrapper>
      <Component {...pageProps} />
    </UserContextWrapper>
  )
}

export default MyApp
