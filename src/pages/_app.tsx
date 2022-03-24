import '../../styles/globals.scss'
import { ChallengeContextProvider } from '../context/ChallengeContext'

function MyApp({ Component, pageProps }) {

  return (  
      <Component {...pageProps} />
  )
}

export default MyApp
