import {
  getAuthenticationHeaders,
  setQuestionToErrorFromAPIData,
} from '../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../content/containers/Fragments/Questions/Components/action';

export const WIZZARD_PANE_FETCH_START = 'WIZZARD_PANE_FETCH_START';
export const WIZZARD_PANE_FETCH_SUCCESS = 'WIZZARD_PANE_FETCH_SUCCESS';
export const WIZZARD_PANE_FETCH_ERROR = 'WIZZARD_PANE_FETCH_ERROR';
export const WIZZARD_PANE_FETCH_FAILURE = 'WIZZARD_PANE_FETCH_FAILURE';

export const WIZZARD_PANE_SAVE_START = 'WIZZARD_PANE_SAVE_START';
export const WIZZARD_PANE_SAVE_SUCCESS = 'WIZZARD_PANE_SAVE_SUCCESS';
export const WIZZARD_PANE_SAVE_ERROR = 'WIZZARD_PANE_SAVE_ERROR';
export const WIZZARD_PANE_SAVE_FAILURE = 'WIZZARD_PANE_SAVE_FAILURE';

export const WIZZARD_PANE_NEW_STEP = 'WIZZARD_PANE_NEW_STEP';

export const doFetchData = (
  cookieData,
  step,
  sessionID,
  url,
  additionalData,
) => (dispatch, getState, axios) => {
  dispatch({ type: WIZZARD_PANE_FETCH_START, step });

  return axios.easySendFunction(
    url,
    { step, sessionID, ...additionalData },
    getAuthenticationHeaders(cookieData),
    dispatch,

    // success function
    (data) => {
      dispatch({
        type: WIZZARD_PANE_FETCH_SUCCESS,
        data,
      });
    },

    // error function
    (data) => {
      dispatch({
        type: WIZZARD_PANE_FETCH_ERROR,
        data,
      });
    },

    // really bad error function (mangled or no resposne)
    () => {
      dispatch({
        type: WIZZARD_PANE_FETCH_FAILURE,
      });
    },
  );
};

export const doNewStep = step => (dispatch) => {
  dispatch({ type: WIZZARD_PANE_NEW_STEP, step });
};

export const doSaveData = (cookieData, step, sessionID, answers) => (
  dispatch,
  getState,
  axios,
) => {
  dispatch({ type: WIZZARD_PANE_SAVE_START, step });

  return axios.easySendFunction(
    'api/wizzard/saveStep',
    { step, sessionID, answers },
    getAuthenticationHeaders(cookieData),
    dispatch,

    // success function
    (data) => {
      dispatch({
        type: WIZZARD_PANE_SAVE_SUCCESS,
        data,
      });
    },

    // error function
    (data) => {
      // we set the questions to errors if we have errors returned
      if (
        data.generalStatus === 'error' &&
        data.statusCode === '/api/wizzard/saveStep-4'
      ) {
        setQuestionToErrorFromAPIData(data.payload, dispatch, questionAction);
      }

      dispatch({
        type: WIZZARD_PANE_SAVE_ERROR,
        data,
      });
    },

    // really bad error function (mangled or no resposne)
    () => {
      dispatch({
        type: WIZZARD_PANE_SAVE_FAILURE,
      });
    },
  );
};

