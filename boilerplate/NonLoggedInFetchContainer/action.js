
import { getAuthenticationHeaders } from '../../../scripts/sliips/core/utilities';

export const CHANGE_THIS_START = 'CHANGE_THIS_START';
export const CHANGE_THIS_SUCCESS = 'CHANGE_THIS_SUCCESS';
export const CHANGE_THIS_ERROR = 'CHANGE_THIS_ERROR';
export const CHANGE_THIS_FAILURE = 'CHANGE_THIS_FAILURE';

export const CHANGE_THIS_RESET = 'CHANGE_THIS_RESET';

export const doFetchData = cookieData => (dispatch, getState, axios) => {
  dispatch({ type: CHANGE_THIS_START });

  return axios.easySendFunction(
        'api/change_this', { }, getAuthenticationHeaders(cookieData), dispatch,

        // success function
        (data) => {
          dispatch({
            type: CHANGE_THIS_SUCCESS,
            data,
          });
        },

        // error function
        (data) => {
          dispatch({
            type: CHANGE_THIS_ERROR,
            data,
          });
        },

        // really bad error function (mangled or no resposne)
        () => {
          dispatch({
            type: CHANGE_THIS_FAILURE,
          });
        },
      );
};

export const doReset = () => (dispatch) => {
  dispatch({ type: CHANGE_THIS_RESET });
};
