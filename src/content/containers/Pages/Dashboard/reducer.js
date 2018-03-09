import _ from 'lodash';

import {
  DASHBOARD_START,
  DASHBOARD_SUCCESS,
  DASHBOARD_ERROR,
  DASHBOARD_FAILURE,
  DASHBOARD_RESET,
} from './action';

import {
  LOGIN_FINISHED,
  LOGOUT_FINISHED,
} from '../../../../content/containers/Fragments/Authentication/action';

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

  // contains meta data about the user
  metaData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_START:
      return _.assign({}, initialState, {
        started: true,
        finished: false,
      });
    case DASHBOARD_SUCCESS:
      return _.assign({}, initialState, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        metaData: action.data.payload.metaData,
        generalStatus: 'success',
        started: false,
        finished: true,
      });
    case DASHBOARD_ERROR:
      return _.assign({}, initialState, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'error',
        started: false,
        finished: true,
      });
    case DASHBOARD_FAILURE:
      return _.assign({}, initialState, {
        generalStatus: 'fatal',
        started: false,
        finished: true,
      });
    case DASHBOARD_RESET:
      return _.assign({}, initialState);
    case LOGIN_FINISHED:
    case LOGOUT_FINISHED:
      return _.assign({}, initialState);
    default:
      return state;
  }
};
