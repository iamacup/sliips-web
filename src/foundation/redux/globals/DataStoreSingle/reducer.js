import _ from 'lodash';

import { dNc } from '../../../../content/scripts/custom/utilities';

export const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GLOBAL_STORE_SINGLE_UPDATE': {
      const modifiedStatePart = {};

      if (dNc(action.initialState)) {
        modifiedStatePart[action.mainID] = _.assign(
          {},
          { ...action.initialState },
          state[action.mainID],
          action.data,
        );
      } else {
        modifiedStatePart[action.mainID] = _.assign(
          {},
          state[action.mainID],
          action.data,
        );
      }

      return _.assign({}, state, modifiedStatePart);
    }
    case 'LOGIN_FINISHED':
    case 'LOGOUT_FINISHED':
      return _.assign({}, initialState);
    default:
      return state;
  }
};
