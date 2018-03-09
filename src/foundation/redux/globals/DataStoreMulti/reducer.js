import _ from 'lodash';

import { dNc } from '../../../../content/scripts/custom/utilities';

export const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GLOBAL_STORE_MULTI_UPDATE': {
      const modifiedStatePart = {};

      console.log('todo implement initial state in multi');

      modifiedStatePart[action.mainID] = _.assign({}, state[action.mainID]);
      modifiedStatePart[action.mainID][action.subID] = _.assign(
        {},
        action.data,
      );

      return _.assign({}, state, modifiedStatePart);
    }
    case 'LOGIN_FINISHED':
    case 'LOGOUT_FINISHED':
      return _.assign({}, initialState);
    default:
      return state;
  }
};
