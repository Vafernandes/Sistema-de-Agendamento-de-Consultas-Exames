import 'primereact/resources/themes/md-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../styles/globals.scss'
import TopMenu from '../components/Header/index';

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