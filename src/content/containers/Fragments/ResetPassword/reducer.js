import _ from 'lodash';

import {
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_RESET,
} from './action';

import {
  LOGIN_FINISHED,
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
    case RESET_PASSWORD_START:
      return _.assign({}, initialState, {
        started: true,
        finished: false,
      });
    case RESET_PASSWORD_SUCCESS:
      return _.assign({}, initialState, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'success',
        started: false,
        finished: true,
      });
    case RESET_PASSWORD_ERROR:
      return _.assign({}, initialState, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'error',
        started: false,
        finished: true,
      });
    case RESET_PASSWORD_FAILURE:
      return _.assign({}, initialState, {
        generalStatus: 'fatal',
        started: false,
        finished: true,
      });
    case RESET_PASSWORD_RESET:
      return _.assign({}, initialState);
    case LOGIN_FINISHED:
    case LOGOUT_FINISHED:
      return _.assign({}, initialState);
    default:
      return state;
  }
};
