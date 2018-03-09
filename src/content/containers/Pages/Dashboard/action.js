import { getAuthenticationHeaders } from '../../../../content/scripts/custom/utilities';

import { DASHBOARD_COMPANY_DATA_RESET } from './CompanyData/action';
import { DASHBOARD_INDUSTRY_DATA_RESET } from './IndustryData/action';

export const DASHBOARD_START = 'DASHBOARD_START';
export const DASHBOARD_SUCCESS = 'DASHBOARD_SUCCESS';
export const DASHBOARD_ERROR = 'DASHBOARD_ERROR';
export const DASHBOARD_FAILURE = 'DASHBOARD_FAILURE';

export const DASHBOARD_RESET = 'DASHBOARD_RESET';

export const doFetchData = cookieData => (dispatch, getState, axios) => {
  dispatch({ type: DASHBOARD_START });

  return axios.easySendFunction(
    'api/dashboard',
    {},
    getAuthenticationHeaders(cookieData),
    dispatch,

    // success function
    (data) => {
      dispatch({
        type: DASHBOARD_SUCCESS,
        data,
      });
    },

    // error function
    (data) => {
      dispatch({
        type: DASHBOARD_ERROR,
        data,
      });
    },

    // really bad error function (mangled or no resposne)
    () => {
      dispatch({
        type: DASHBOARD_FAILURE,
      });
    },
  );
};

export const doReset = () => (dispatch) => {
  dispatch({ type: DASHBOARD_RESET });
  dispatch({ type: DASHBOARD_COMPANY_DATA_RESET });
  dispatch({ type: DASHBOARD_INDUSTRY_DATA_RESET });
};
