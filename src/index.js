import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore';

import ConnectedApp from './containers/App';

const rootEl = document.getElementById('root');

const store = configureStore();

render(
  <AppContainer>
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  </AppContainer>,
  rootEl,
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default; // eslint-disable-line global-require

    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
