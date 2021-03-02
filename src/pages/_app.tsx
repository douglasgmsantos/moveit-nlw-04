import "../styles/global.css";

import { AuthProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider pageProps={pageProps} >
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
