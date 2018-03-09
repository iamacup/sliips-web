import thunk from 'redux-thunk';
import chalk from 'chalk';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../../foundation/redux/reducers';
import axiosWrapper from '../../content/scripts/custom/axiosWrapper';

// we provide a slightly custom axios instance that has some utility stuff for us built in
const axiosInstance = axiosWrapper();

export default (history: Object, initialState: Object = {}) => {
  const middlewares = [
    thunk.withExtraArgument(axiosInstance),
    routerMiddleware(history),
  ];
  const composeEnhancers =
    (typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const enhancers = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, initialState, enhancers);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      try {
        const nextReducer = require('./reducers').default;

        store.replaceReducer(nextReducer);
      } catch (error) {
        console.error(
          chalk.red(`==> 😭  Reducer hot reloading error ${error}`),
        );
      }
    });
  }

  return store;
};
