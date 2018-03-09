import { getAuthenticationHeaders } from '../../../../content/scripts/custom/utilities';

export const LINK_LOGIN_START = 'LINK_LOGIN_START';
export const LINK_LOGIN_SUCCESS = 'LINK_LOGIN_SUCCESS';
export const LINK_LOGIN_ERROR = 'LINK_LOGIN_ERROR';
export const LINK_LOGIN_FAILURE = 'LINK_LOGIN_FAILURE';

export const LINK_LOGIN_RESET = 'LINK_LOGIN_RESET';

export const doFetchData = (cookieData, loginString) => (
  dispatch,
  getState,
  axios,
) => {
  dispatch({ type: LINK_LOGIN_START });

  return axios.easySendFunction(
    'api/authentication/loginLink',
    { loginString },
    getAuthenticationHeaders(cookieData),
    dispatch,

    // success function
    (data) => {
      dispatch({
        type: LINK_LOGIN_SUCCESS,
        data,
      });
    },

    // error function
    (data) => {
      dispatch({
        type: LINK_LOGIN_ERROR,
        data,
      });
    },

    // really bad error function (mangled or no resposne)
    () => {
      dispatch({
        type: LINK_LOGIN_FAILURE,
      });
    },
  );
};

export const doReset = () => (dispatch) => {
  dispatch({ type: LINK_LOGIN_RESET });
};
