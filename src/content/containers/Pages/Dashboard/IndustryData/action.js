import { getAuthenticationHeaders } from '../../../../../content/scripts/custom/utilities';

export const DASHBOARD_INDUSTRY_DATA_START = 'DASHBOARD_INDUSTRY_DATA_START';
export const DASHBOARD_INDUSTRY_DATA_SUCCESS =
  'DASHBOARD_INDUSTRY_DATA_SUCCESS';
export const DASHBOARD_INDUSTRY_DATA_ERROR = 'DASHBOARD_INDUSTRY_DATA_ERROR';
export const DASHBOARD_INDUSTRY_DATA_FAILURE =
  'DASHBOARD_INDUSTRY_DATA_FAILURE';

export const DASHBOARD_INDUSTRY_DATA_RESET = 'DASHBOARD_INDUSTRY_DATA_RESET';

export const doFetchData = (cookieData, metaData) => (
  dispatch,
  getState,
  axios,
) => {
  dispatch({ type: DASHBOARD_INDUSTRY_DATA_START });

  return axios.easySendFunction(
    'api/dashboard/industry',
    { metaData },
    getAuthenticationHeaders(cookieData),
    dispatch,

    // success function
    (data) => {
      dispatch({
        type: DASHBOARD_INDUSTRY_DATA_SUCCESS,
        data,
      });
    },

    // error function
    (data) => {
      dispatch({
        type: DASHBOARD_INDUSTRY_DATA_ERROR,
        data,
      });
    },

    // really bad error function (mangled or no resposne)
    () => {
      dispatch({
        type: DASHBOARD_INDUSTRY_DATA_FAILURE,
      });
    },
  );
};

export const doReset = metaData => (dispatch) => {
  dispatch({
    type: DASHBOARD_INDUSTRY_DATA_RESET,
    metaData,
  });
};
