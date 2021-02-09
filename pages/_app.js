import Head from 'next/head';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import '../styles/globals.css';

import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from '../redux/rootStore';

function MyApp({ Component, pageProps }) {
  const { store } = useStore( pageProps.initialReduxState );
  const persistor = persistStore( store, {}, function() {
    persistor.persist();
  });

  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <Head>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp
