import _ from 'lodash';

import {
  LINK_LOGIN_START,
  LINK_LOGIN_SUCCESS,
  LINK_LOGIN_ERROR,
  LINK_LOGIN_FAILURE,
  LINK_LOGIN_RESET,
} from './action';

import {
  // LOGIN_FINISHED,
  LOGOUT_FINISHED,
} from '../../Fragments/Authentication/action';

export const initialState = {
  // the response payload
  payload: null,

  // the response statusCode
  statusCode: null,

  // the response type - 'error' or 'success'
  generalStatus: null,

  // whenever a transaction is in progress - started should be true
  started: false,

  // whenever we have completed a request regardless of the outcome
  finished: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LINK_LOGIN_START:
      return _.assign({}, initialState, {
        started: true,
        finished: false,
      });
    case LINK_LOGIN_SUCCESS:
      return _.assign({}, initialState, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'success',
        started: false,
        finished: true,
      });
    case LINK_LOGIN_ERROR:
      return _.assign({}, initialState, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'error',
        started: false,
        finished: true,
      });
    case LINK_LOGIN_FAILURE:
      return _.assign({}, initialState, {
        generalStatus: 'fatal',
        started: false,
        finished: true,
      });
    case LINK_LOGIN_RESET:
      return _.assign({}, initialState);
    // we don't want this on here because our item will reset and pull the data twice. we still want to reset on logout.
    // case LOGIN_FINISHED:
    case LOGOUT_FINISHED:
      return _.assign({}, initialState);
    default:
      return state;
  }
};
