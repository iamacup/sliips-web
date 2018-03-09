
import _ from 'lodash';

import {
  CHANGE_THIS_START,
  CHANGE_THIS_SUCCESS,
  CHANGE_THIS_ERROR,
  CHANGE_THIS_FAILURE,

  CHANGE_THIS_RESET,
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
    case CHANGE_THIS_START:
      return _.assign({}, initialState, {
        started: true,
        finished: false,
      });
    case CHANGE_THIS_SUCCESS:
      return _.assign({}, initialState, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'success',
        started: false,
        finished: true,
      });
    case CHANGE_THIS_ERROR:
      return _.assign({}, initialState, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'error',
        started: false,
        finished: true,
      });
    case CHANGE_THIS_FAILURE:
      return _.assign({}, initialState, {
        generalStatus: 'fatal',
        started: false,
        finished: true,
      });
    case CHANGE_THIS_RESET:
      return _.assign({}, initialState);
    case LOGIN_FINISHED:
    case LOGOUT_FINISHED:
      return _.assign({}, initialState);
    default:
      return state;
  }
};
