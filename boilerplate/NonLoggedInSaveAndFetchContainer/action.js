
import { getAuthenticationHeaders } from '../../../scripts/sliips/core/utilities';

import * as questionAction from '../Questions/action';

export const CHANGE_THIS_FETCH_START = 'CHANGE_THIS_FETCH_START';
export const CHANGE_THIS_FETCH_SUCCESS = 'CHANGE_THIS_FETCH_SUCCESS';
export const CHANGE_THIS_FETCH_ERROR = 'CHANGE_THIS_FETCH_ERROR';
export const CHANGE_THIS_FETCH_FAILURE = 'CHANGE_THIS_FETCH_FAILURE';

export const CHANGE_THIS_SAVE_START = 'CHANGE_THIS_SAVE_START';
export const CHANGE_THIS_SAVE_SUCCESS = 'CHANGE_THIS_SAVE_SUCCESS';
export const CHANGE_THIS_SAVE_ERROR = 'CHANGE_THIS_SAVE_ERROR';
export const CHANGE_THIS_SAVE_FAILURE = 'CHANGE_THIS_SAVE_FAILURE';

export const CHANGE_THIS_RESET_FETCH = 'CHANGE_THIS_RESET_FETCH';
export const CHANGE_THIS_RESET_SAVE = 'CHANGE_THIS_RESET_SAVE';
export const CHANGE_THIS_RESET = 'CHANGE_THIS_RESET';

export const doFetchData = cookieData => (dispatch, getState, axios) => {
  console.log('fetching data');
  dispatch({ type: CHANGE_THIS_FETCH_START });

  return axios.easySendFunction(
        'api/change_this', { }, getAuthenticationHeaders(cookieData), dispatch,

        // success function
        (data) => {
          dispatch({
            type: CHANGE_THIS_FETCH_SUCCESS,
            data,
          });
        },

        // error function
        (data) => {
          dispatch({
            type: CHANGE_THIS_FETCH_ERROR,
            data,
          });
        },

        // really bad error function (mangled or no resposne)
        () => {
          dispatch({
            type: CHANGE_THIS_FETCH_FAILURE,
          });
        },
      );
};

export const doSaveData = (cookieData, saveData) => (dispatch, getState, axios) => {
  dispatch({ type: CHANGE_THIS_SAVE_START });

  return axios.easySendFunction(
        'api/change_this', saveData, getAuthenticationHeaders(cookieData), dispatch,

        // success function
        (data) => {
          dispatch({
            type: CHANGE_THIS_SAVE_SUCCESS,
            data,
          });
        },

        // error function
        (data) => {
          dispatch({
            type: CHANGE_THIS_SAVE_ERROR,
            data,
          });
        },

        // really bad error function (mangled or no resposne)
        () => {
          dispatch({
            type: CHANGE_THIS_SAVE_FAILURE,
          });
        },
      );
};

export const doResetFetch = () => (dispatch) => {
  console.log('RUNNING ACTION');
  dispatch({ type: CHANGE_THIS_RESET_FETCH });
};

export const doResetSave = () => (dispatch) => {
  dispatch({ type: CHANGE_THIS_RESET_SAVE });
};

export const doReset = () => (dispatch) => {
  dispatch({ type: CHANGE_THIS_RESET });
};
