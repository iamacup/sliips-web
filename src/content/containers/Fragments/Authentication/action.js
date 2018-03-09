import {
  deleteAuthenticationCookie,
  setAuthenticationCookie,
  getAuthenticationHeaders,
  dNc,
} from '../../../../content/scripts/custom/utilities';

// track the fetching of data
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// these are the events that signify a successful login or logout
export const LOGIN_FINISHED = 'LOGIN_FINISHED';
export const LOGOUT_FINISHED = 'LOGOUT_FINISHED';

export const LOGIN_RESET = 'LOGIN_RESET';

export const LOGIN_SHOW_RESET_PASSWORD = 'LOGIN_SHOW_RESET_PASSWORD';
export const LOGIN_SHOW_LOGIN = 'LOGIN_SHOW_LOGIN';

export const LOGIN_SET_STAGE_1_USERNAME = 'LOGIN_SET_STAGE_1_USERNAME';

export const setStage1Username = username => (dispatch) => {
  dispatch({
    type: LOGIN_SET_STAGE_1_USERNAME,
    username,
  });
};

export const setLogin = () => (dispatch) => {
  dispatch({ type: LOGIN_SHOW_LOGIN });
};

export const setResetPassword = () => (dispatch) => {
  dispatch({ type: LOGIN_SHOW_RESET_PASSWORD });
};

export const doFetchData = (cookieData, loginData, url) => (
  dispatch,
  getState,
  axios,
) => {
  dispatch({ type: LOGIN_START });

  return axios.easySendFunction(
    url,
    loginData,
    getAuthenticationHeaders(cookieData),
    dispatch,

    // success function
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        data,
      });
    },

    // error function
    (data) => {
      dispatch({
        type: LOGIN_ERROR,
        data,
      });
    },

    // really bad error function (mangled or no resposne)
    () => {
      dispatch({
        type: LOGIN_FAILURE,
      });
    },
  );
};

export const doReset = () => (dispatch) => {
  dispatch({ type: LOGIN_RESET });
};

// this just assumes the cookie data provided is correct and logs the user in
export const setLoginWithCookieData = cookieData => (dispatch) => {
  setAuthenticationCookie(cookieData);
  dispatch({ type: LOGIN_FINISHED });
};

export const doLogout = () =>
  // eslint-disable-next-line no-unused-vars
  (dispatch, getState, axios) => {
    deleteAuthenticationCookie();
    dispatch({ type: LOGOUT_FINISHED, badCookie: false });
  };

// this checks that the login cookie data is valid
export const doLoginWithCookieData = cookieData =>
  // eslint-disable-next-line no-unused-vars
  (dispatch, getState, axios) => {
    // todo we could inspect the cookie data more here than just dNc on it and throw eerors (i.e. 3 string seperated by periods)
    if (getState().authentication.loggedIn === false && dNc(cookieData)) {
      // we share the same action function between 'success' and 'error' because both might have authStatus set
      const actionFunction = (data) => {
        if (data.authStatus !== 'yes') {
          dispatch({ type: LOGOUT_FINISHED, badCookie: true });
        } else {
          dispatch({ type: LOGIN_FINISHED });
        }
      };

      return axios.easySendFunction(
        'api/authentication/validateToken',
        {},
        getAuthenticationHeaders(cookieData),
        dispatch,

        // success function
        actionFunction,

        // error function
        actionFunction,

        // really bad error function (mangled or no resposne)
        () => {
          dispatch({ type: LOGOUT_FINISHED, badCookie: false });
        },
      );
    }

    return Promise.resolve(true);
  };
