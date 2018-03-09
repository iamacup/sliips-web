import _ from 'lodash';

import {
  WIZZARD_PANE_FETCH_START,
  WIZZARD_PANE_FETCH_SUCCESS,
  WIZZARD_PANE_FETCH_ERROR,
  WIZZARD_PANE_FETCH_FAILURE,
  WIZZARD_PANE_SAVE_START,
  WIZZARD_PANE_SAVE_SUCCESS,
  WIZZARD_PANE_SAVE_ERROR,
  WIZZARD_PANE_SAVE_FAILURE,
  WIZZARD_PANE_NEW_STEP,
} from './action';

import {
  LOGIN_FINISHED,
  LOGOUT_FINISHED,
} from '../../../../content/containers/Fragments/Authentication/action';

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

  // if this is not null, the url needs to be updated to whatever the step is inside changedStepNumber
  changedStepNumber: null,

  // current step
  currentStep: null,

  // tracks the server side session ID for the wizzard
  sessionID: null,

  // contains the number of wizard steps
  numberOfSteps: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WIZZARD_PANE_FETCH_START: {
      const fetch = _.assign({}, initialState.fetch, {
        started: true,
        finished: false,

      });
      return _.assign(
        {},
        state,
        { fetch },
        { lastAction: 'fetch', currentStep: action.step },
        { sessionID: state.sessionID },
      );
    }
    case WIZZARD_PANE_FETCH_SUCCESS: {
      const fetch = _.assign({}, initialState.fetch, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'success',
        started: false,
        finished: true,
      });

      let { changedStepNumber } = initialState;

      if (action.data.payload.renderedStep !== action.step) {
        changedStepNumber = action.data.payload.renderedStep;
      }

      return _.assign(
        {},
        state,
        { fetch },
        { changedStepNumber },
        {
          currentStep: action.data.payload.renderedStep,
          sessionID: action.data.payload.sessionID,
          numberOfSteps: action.data.payload.numberOfSteps,
        },
      );
    }
    case WIZZARD_PANE_FETCH_ERROR: {
      const fetch = _.assign({}, initialState.fetch, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'error',
        started: false,
        finished: true,
      });
      return _.assign({}, state, { fetch }, { sessionID: state.sessionID });
    }
    case WIZZARD_PANE_FETCH_FAILURE: {
      const fetch = _.assign({}, initialState.fetch, {
        generalStatus: 'fatal',
        started: false,
        finished: true,
      });
      return _.assign({}, state, { fetch }, { sessionID: state.sessionID });
    }

    case WIZZARD_PANE_SAVE_START: {
      const save = _.assign({}, initialState.save, {
        started: true,
        finished: false,
      });
      return _.assign({}, state, { save }, { lastAction: 'save' }, { sessionID: state.sessionID });
    }
    case WIZZARD_PANE_SAVE_SUCCESS: {
      const save = _.assign({}, initialState.save, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'success',
        started: false,
        finished: true,
      });
      return _.assign({}, state, { save }, { sessionID: state.sessionID });
    }
    case WIZZARD_PANE_SAVE_ERROR: {
      const save = _.assign({}, initialState.save, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'error',
        started: false,
        finished: true,
      });
      return _.assign({}, state, { save });
    }
    case WIZZARD_PANE_SAVE_FAILURE: {
      const save = _.assign({}, initialState.save, {
        generalStatus: 'fatal',
        started: false,
        finished: true,
      });
      return _.assign({}, state, { save }, { sessionID: state.sessionID });
    }

    case WIZZARD_PANE_NEW_STEP: {
      return _.assign({}, initialState, {
        currentStep: action.step,
        sessionID: state.sessionID,
        numberOfSteps: state.numberOfSteps,
      });
    }

    case LOGIN_FINISHED:
    case LOGOUT_FINISHED:
      return _.assign({}, initialState);
    default:
      return state;
  }
};
