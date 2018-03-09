// TODO we use json.parse a lot in this to ensure a new state is returned - but it is probably not needed and we need to check as it is inefficient

import _ from 'lodash';

import { dNc } from '../../../../../content/scripts/custom/utilities';

import {
  QUESTION_ADD,
  QUESTION_REMOVE,
  QUESTION_UPDATE_ANSWER,
  QUESTION_ERROR,
  QUESTION_SUCCESS,
  QUESTION_FORCE_VALIDATE,
  QUESTION_FORCE_VALIDATE_DONE,
  QUESTION_FOLLOWON_START,
  QUESTION_FOLLOWON_SUCCESS,
  QUESTION_FOLLOWON_ERROR,
  QUESTION_FOLLOWON_FAILURE,
} from './action';

import {
  LOGIN_FINISHED,
  LOGOUT_FINISHED,
} from '../../../../../content/containers/Fragments/Authentication/action';

export const initialState = {};

export const initialFetchState = {
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

export const initialAnswerState = {
  optionID: null,
  optionValue: '',
  errorMessage: '',
  valid: false,
};

export const questionInitialState = {
  questionID: null, // the ID for the question
  answered: false, // true if the question is all validated
  error: false, // true if there is an error
  answer: {}, // contains the various parts of the answer
  forceValidate: false, // true if all of the questions need to revalidate and display error mesages - used when external stuff like submit buttons need to show 'incomplete' messages etc.
  fetch: initialFetchState, // used to fetch any followon questions etc.
};

export default (state = initialState, action) => {
  switch (action.type) {
    case QUESTION_ADD: {
      // we check to see if the question has already been added - if it has we don't return anything new.
      if (dNc(state[action.questionID])) {
        return state;
      }

      const newState = JSON.parse(JSON.stringify(state));

      newState[action.questionID] = _.assign({}, questionInitialState, {
        questionID: action.questionID,
      });

      return newState;
    }
    case QUESTION_REMOVE: {
      // we check the questionID exists, if not just return the state.
      if (!dNc(state[action.questionID])) {
        return state;
      }

      const newState = JSON.parse(JSON.stringify(state));
      const newNewState = {};

      Object.keys(newState).forEach((value) => {
        if (value !== action.questionID) {
          newNewState[value] = newState[value];
        }
      });

      return newNewState;
    }
    case QUESTION_UPDATE_ANSWER: {
      const newState = JSON.parse(JSON.stringify(state));
      const obj = newState[action.questionID];

      const newAnswerPart = {};
      newAnswerPart[action.name] = _.assign({}, initialAnswerState, {
        optionID: action.optionID,
        optionValue: action.optionValue,
        valid: action.valid,
      });
      const answer = _.assign({}, obj.answer, newAnswerPart);

      // we have to adjust the overall answer validity if the update is invalid
      let answerValidity = obj.answered;

      if (action.valid === false) {
        answerValidity = false;
      }

      newState[action.questionID] = _.assign({}, questionInitialState, {
        questionID: action.questionID,
        answered: answerValidity,
        answer,
        error: obj.error,
        fetch: obj.fetch,
      });

      return newState;
    }
    case QUESTION_ERROR: {
      const newState = JSON.parse(JSON.stringify(state));
      const obj = newState[action.questionID];

      // we check that the thing
      if (dNc(obj)) {
        const newAnswerPart = {};
        newAnswerPart[action.name] = _.assign(
          {},
          initialAnswerState,
          obj.answer[action.name],
          { errorMessage: action.message, valid: false },
        );
        const answer = _.assign({}, obj.answer, newAnswerPart);

        newState[action.questionID] = _.assign({}, questionInitialState, {
          questionID: action.questionID,
          answer,
          error: true,
          fetch: obj.fetch,
        });
      } else {
        // todo we should throw a new error into some action so that somewhere can pick up 'global' question errors - however this situation only occures if the UI state is no in sync with the backend expected state
      }

      return newState;
    }
    case QUESTION_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      const obj = newState[action.questionID];

      newState[action.questionID] = _.assign({}, questionInitialState, {
        questionID: action.questionID,
        answered: true,
        answer: obj.answer,
        fetch: obj.fetch,
      });

      return newState;
    }

    case QUESTION_FORCE_VALIDATE: {
      const newState = JSON.parse(JSON.stringify(state));

      Object.keys(newState).forEach((value) => {
        newState[value].forceValidate = true;
      });

      return newState;
    }
    case QUESTION_FORCE_VALIDATE_DONE: {
      const newState = JSON.parse(JSON.stringify(state));
      const obj = newState[action.questionID];

      newState[action.questionID] = _.assign({}, questionInitialState, {
        questionID: action.questionID,
        answered: obj.answered,
        answer: obj.answer,
        error: obj.error,
        fetch: obj.fetch,
      });

      return newState;
    }

    case QUESTION_FOLLOWON_START: {
      const newState = JSON.parse(JSON.stringify(state));

      const fetch = _.assign({}, initialFetchState, {
        started: true,
        finished: false,
      });

      newState[action.questionID] = _.assign({}, newState[action.questionID], {
        fetch,
      });

      return newState;
    }
    case QUESTION_FOLLOWON_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));

      const fetch = _.assign({}, initialFetchState, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'success',
        started: false,
        finished: true,
      });

      newState[action.questionID] = _.assign({}, newState[action.questionID], {
        fetch,
      });

      return newState;
    }
    case QUESTION_FOLLOWON_ERROR: {
      const newState = JSON.parse(JSON.stringify(state));

      const fetch = _.assign({}, initialFetchState, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'error',
        started: false,
        finished: true,
      });

      newState[action.questionID] = _.assign({}, newState[action.questionID], {
        fetch,
      });

      return newState;
    }
    case QUESTION_FOLLOWON_FAILURE: {
      const newState = JSON.parse(JSON.stringify(state));

      const fetch = _.assign({}, initialFetchState, {
        generalStatus: 'fatal',
        started: false,
        finished: true,
      });

      newState[action.questionID] = _.assign({}, newState[action.questionID], {
        fetch,
      });

      return newState;
    }

    case LOGIN_FINISHED:
    case LOGOUT_FINISHED:
      return _.assign({}, initialState);

    default:
      return state;
  }
};
