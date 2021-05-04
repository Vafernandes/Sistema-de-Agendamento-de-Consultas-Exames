import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../styles/globals.css'
import TopMenu from '../components/TopMenu';

import { Provider } from 'react-redux'
import { store } from '../store/store';
import Toastr from '../components/Toastr';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <TopMenu />
      <Component {...pageProps} />
      <Toastr />
    </Provider>
  )
}

export default MyApp