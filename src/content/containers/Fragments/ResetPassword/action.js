import { getAuthenticationHeaders } from '../../../../content/scripts/custom/utilities';

export const RESET_PASSWORD_START = 'RESET_PASSWORD_START';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const RESET_PASSWORD_RESET = 'RESET_PASSWORD_RESET';

export const doSaveData = (cookieData, saveData) => (
  dispatch,
  getState,
  axios,
) => {
  dispatch({ type: RESET_PASSWORD_START });

  return axios.easySendFunction(
    'api/authentication/resetPasswordStep1',
    saveData,
    getAuthenticationHeaders(cookieData),
    dispatch,

    // success function
    (data) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        data,
      });
    },

    // error function
    (data) => {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        data,
      });
    },

    // really bad error function (mangled or no resposne)
    () => {
      dispatch({
        type: RESET_PASSWORD_FAILURE,
      });
    },
  );
};

export const doReset = () => (dispatch) => {
  dispatch({ type: RESET_PASSWORD_RESET });
};
