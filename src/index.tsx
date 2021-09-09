/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';

import store from './redux/store';
import App from './components/App';
import './config/i18n';
import { init } from './config';
import './scss/application.scss';
import { register } from './serviceWorker';

init();
const client = new ApolloClient({
  // uri: 'http://localhost:8080/',
  uri: 'https://lisapp-back.herokuapp.com/',
  cache: new InMemoryCache()
});

render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>,
  document.getElementById('root')
);

register();
