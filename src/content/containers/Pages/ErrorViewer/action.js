import { getAuthenticationHeaders } from '../../../../content/scripts/custom/utilities';

export const ERROR_VIEWER_START = 'ERROR_VIEWER_START';
export const ERROR_VIEWER_SUCCESS = 'ERROR_VIEWER_SUCCESS';
export const ERROR_VIEWER_ERROR = 'ERROR_VIEWER_ERROR';
export const ERROR_VIEWER_FAILURE = 'ERROR_VIEWER_FAILURE';

export const ERROR_VIEWER_RESET = 'ERROR_VIEWER_RESET';

export const doFetchData = (cookieData, errorID) => (
  dispatch,
  getState,
  axios,
) => {
  dispatch({ type: ERROR_VIEWER_START });

  return axios.easySendFunction(
    'api/admin/fetchErrorLog',
    { errorID },
    getAuthenticationHeaders(cookieData),
    dispatch,

    // success function
    (data) => {
      dispatch({
        type: ERROR_VIEWER_SUCCESS,
        data,
      });
    },

    // error function
    (data) => {
      dispatch({
        type: ERROR_VIEWER_ERROR,
        data,
      });
    },

    // really bad error function (mangled or no resposne)
    () => {
      dispatch({
        type: ERROR_VIEWER_FAILURE,
      });
    },
  );
};

export const doReset = () => (dispatch) => {
  dispatch({ type: ERROR_VIEWER_RESET });
};
