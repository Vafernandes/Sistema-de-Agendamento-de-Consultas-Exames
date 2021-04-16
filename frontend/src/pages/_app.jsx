import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../styles/globals.css'
import TopMenu from '../components/TopMenu';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <TopMenu />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp