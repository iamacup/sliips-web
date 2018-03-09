import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { hydrate, unmountComponentAtNode } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import RedBox from 'redbox-react';
import configureStore from '../foundation/redux/store';

// Get initial state from server-side rendering
const initialState = window.__INITIAL_STATE__;
const history = createHistory();
const store = configureStore(history, initialState);
const mountNode = document.getElementById('react-view');

const renderApp = () => {
  const App = require('../foundation/app').default;

  hydrate(
    <AppContainer errorReporter={({ error }) => <RedBox error={error} />}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    mountNode,
  );
};

// Enable hot reload by react-hot-loader
if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp();
    } catch (error) {
      // not sure if this should be a render of a hydrate?
      hydrate(<RedBox error={error} />, mountNode);
    }
  };

  module.hot.accept('../foundation/app', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(mountNode);
      reRenderApp();
    });
  });
}

renderApp();
