import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';

import './src/config/ReactotronConfig';

import { store, persistor } from './src/store';
import App from './src/App';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
        <App />
      </PersistGate>
    </Provider>
  );
}
