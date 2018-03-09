import _ from 'lodash';

import {
  PAYSLIP_UPLOAD_START,
  PAYSLIP_UPLOAD_SUCCESS,
  PAYSLIP_UPLOAD_ERROR,
  PAYSLIP_UPLOAD_FAILURE,
  PAYSLIP_UPLOAD_SAVE_ACTION_DONE,
  PAYSLIP_UPLOAD_RESET,
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

  // contains other meta data
  metaData: {
    saveActionDone: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PAYSLIP_UPLOAD_START:
      return _.assign({}, initialState, {
        started: true,
        finished: false,
      });
    case PAYSLIP_UPLOAD_SUCCESS:
      return _.assign({}, initialState, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'success',
        started: false,
        finished: true,
        metaData: state.metaData,
      });
    case PAYSLIP_UPLOAD_ERROR:
      return _.assign({}, initialState, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'error',
        started: false,
        finished: true,
        metaData: state.metaData,
      });
    case PAYSLIP_UPLOAD_FAILURE:
      return _.assign({}, initialState, {
        generalStatus: 'fatal',
        started: false,
        finished: true,
        metaData: state.metaData,
      });
    case PAYSLIP_UPLOAD_RESET:
      return _.assign({}, initialState);
    case PAYSLIP_UPLOAD_SAVE_ACTION_DONE:
      return _.assign({}, state, { metaData: { saveActionDone: true } });
    case LOGIN_FINISHED:
    case LOGOUT_FINISHED:
      return _.assign({}, initialState);
    default:
      return state;
  }
};
