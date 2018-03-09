
import _ from 'lodash';

import {
  CHANGE_THIS_FETCH_START,
  CHANGE_THIS_FETCH_SUCCESS,
  CHANGE_THIS_FETCH_ERROR,
  CHANGE_THIS_FETCH_FAILURE,

  CHANGE_THIS_SAVE_START,
  CHANGE_THIS_SAVE_SUCCESS,
  CHANGE_THIS_SAVE_ERROR,
  CHANGE_THIS_SAVE_FAILURE,

  CHANGE_THIS_RESET_FETCH,
  CHANGE_THIS_RESET_SAVE,
  CHANGE_THIS_RESET,
} from './action';

import {
  LOGIN_FINISHED,
  LOGOUT_FINISHED,
} from '../../Fragments/Authentication/action';

export const initialState = {
  fetch: {
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
  },
  save: {
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
  },

  // this contains the last 'started' action
  lastAction: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THIS_FETCH_START: {
      const fetch = _.assign({}, initialState.fetch, {
        started: true,
        finished: false,
      });
      return _.assign({}, state, { fetch }, { lastAction: 'fetch' });
    }
    case CHANGE_THIS_FETCH_SUCCESS: {
      const fetch = _.assign({}, initialState.fetch, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'success',
        started: false,
        finished: true,
      });

      return _.assign({}, state, { fetch });
    }
    case CHANGE_THIS_FETCH_ERROR: {
      const fetch = _.assign({}, initialState.fetch, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'error',
        started: false,
        finished: true,
      });
      return _.assign({}, state, { fetch });
    }
    case CHANGE_THIS_FETCH_FAILURE: {
      const fetch = _.assign({}, initialState.fetch, {
        generalStatus: 'fatal',
        started: false,
        finished: true,
      });
      return _.assign({}, state, { fetch });
    }

    case CHANGE_THIS_SAVE_START: {
      const save = _.assign({}, initialState.save, {
        started: true,
        finished: false,
      });
      return _.assign({}, state, { save }, { lastAction: 'save' });
    }
    case CHANGE_THIS_SAVE_SUCCESS: {
      const save = _.assign({}, initialState.save, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'success',
        started: false,
        finished: true,
      });
      return _.assign({}, state, { save });
    }
    case CHANGE_THIS_SAVE_ERROR: {
      const save = _.assign({}, initialState.save, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'error',
        started: false,
        finished: true,
      });
      return _.assign({}, state, { save });
    }
    case CHANGE_THIS_SAVE_FAILURE: {
      const save = _.assign({}, initialState.save, {
        generalStatus: 'fatal',
        started: false,
        finished: true,
      });
      return _.assign({}, state, { save });
    }
    case CHANGE_THIS_RESET_FETCH: {
      console.log('RUNNING REDUCER');
      const fetch = _.assign({}, initialState.fetch);
      return _.assign({}, state, { fetch });
    }
    case CHANGE_THIS_RESET_SAVE: {
      const save = _.assign({}, initialState.save);
      return _.assign({}, state, { save });
    }
    case CHANGE_THIS_RESET:
      return _.assign({}, initialState);
    case LOGIN_FINISHED:
    case LOGOUT_FINISHED:
      return _.assign({}, initialState);
    default:
      return state;
  }
};
