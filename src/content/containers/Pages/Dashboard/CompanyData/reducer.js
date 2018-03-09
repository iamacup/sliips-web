import _ from 'lodash';

import { dNc } from '../../../../../content/scripts/custom/utilities';

import {
  DASHBOARD_COMPANY_DATA_START,
  DASHBOARD_COMPANY_DATA_SUCCESS,
  DASHBOARD_COMPANY_DATA_ERROR,
  DASHBOARD_COMPANY_DATA_FAILURE,
  DASHBOARD_COMPANY_DATA_RESET,
} from './action';

import {
  LOGIN_FINISHED,
  LOGOUT_FINISHED,
} from '../../../../../content/containers/Fragments/Authentication/action';

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

  // some meta data
  metaData: {
    startAge: 16,
    endAge: 75,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_COMPANY_DATA_START:
      return _.assign({}, initialState, {
        started: true,
        finished: false,
        metaData: state.metaData,
      });
    case DASHBOARD_COMPANY_DATA_SUCCESS:
      return _.assign({}, initialState, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'success',
        started: false,
        finished: true,
        metaData: state.metaData,
      });
    case DASHBOARD_COMPANY_DATA_ERROR:
      return _.assign({}, initialState, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'error',
        started: false,
        finished: true,
        metaData: state.metaData,
      });
    case DASHBOARD_COMPANY_DATA_FAILURE:
      return _.assign({}, initialState, {
        generalStatus: 'fatal',
        started: false,
        finished: true,
        metaData: state.metaData,
      });
    case DASHBOARD_COMPANY_DATA_RESET: {
      if (dNc(action.metaData)) {
        const metaData = _.assign({}, initialState.metaData, action.metaData);

        return _.assign({}, initialState, { metaData });
      }

      return _.assign({}, initialState);
    }
    case LOGIN_FINISHED:
    case LOGOUT_FINISHED:
      return _.assign({}, initialState);
    default:
      return state;
  }
};
