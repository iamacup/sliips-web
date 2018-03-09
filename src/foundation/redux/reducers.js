import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import _ from 'lodash';

import contentReducers from '../../content/bootstrap/reducers';

import dataTransactions from '../../foundation/redux/globals/DataTransactions/reducer';
import dataStoreMulti from '../../foundation/redux/globals/DataStoreMulti/reducer';
import dataStoreSingle from '../../foundation/redux/globals/DataStoreSingle/reducer';

const foundationReducers = {
  router,
  dataTransactions,
  dataStoreMulti,
  dataStoreSingle,
};

// these become the names on the global state object
export default combineReducers(_.assign(contentReducers, foundationReducers));
