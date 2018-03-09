import {
  getAuthenticationHeaders,
  setQuestionToErrorFromAPIData,
} from '../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../content/containers/Fragments/Questions/Components/action';

export const QUESTIONS_RENDER_WRAPPER_START = 'QUESTIONS_RENDER_WRAPPER_START';
export const QUESTIONS_RENDER_WRAPPER_SUCCESS =
  'QUESTIONS_RENDER_WRAPPER_SUCCESS';
export const QUESTIONS_RENDER_WRAPPER_ERROR = 'QUESTIONS_RENDER_WRAPPER_ERROR';
export const QUESTIONS_RENDER_WRAPPER_FAILURE =
  'QUESTIONS_RENDER_WRAPPER_FAILURE';

export const QUESTIONS_RENDER_WRAPPER_RESET = 'QUESTIONS_RENDER_WRAPPER_RESET';

export const doSaveData = (
  cookieData,
  saveData,
  url,
  questionErrorStatusCode,
) => (dispatch, getState, axios) => {
  dispatch({ type: QUESTIONS_RENDER_WRAPPER_START });

  return axios.easySendFunction(
    url,
    saveData,
    getAuthenticationHeaders(cookieData),
    dispatch,

    // success function
    (data) => {
      dispatch({
        type: QUESTIONS_RENDER_WRAPPER_SUCCESS,
        data,
      });
    },

    // error function
    (data) => {
      // we set the questions to errors if we have errors returned
      if (
        data.generalStatus === 'error' &&
        data.statusCode === questionErrorStatusCode
      ) {
        setQuestionToErrorFromAPIData(data.payload, dispatch, questionAction);
      }

      dispatch({
        type: QUESTIONS_RENDER_WRAPPER_ERROR,
        data,
      });
    },

    // really bad error function (mangled or no resposne)
    () => {
      dispatch({
        type: QUESTIONS_RENDER_WRAPPER_FAILURE,
      });
    },
  );
};

export const doReset = () => (dispatch) => {
  dispatch({ type: QUESTIONS_RENDER_WRAPPER_RESET });
};
