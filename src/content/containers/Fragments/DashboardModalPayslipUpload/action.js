import { getAuthenticationHeaders } from '../../../../content/scripts/custom/utilities';

export const PAYSLIP_UPLOAD_START = 'PAYSLIP_UPLOAD_START';
export const PAYSLIP_UPLOAD_SUCCESS = 'PAYSLIP_UPLOAD_SUCCESS';
export const PAYSLIP_UPLOAD_ERROR = 'PAYSLIP_UPLOAD_ERROR';
export const PAYSLIP_UPLOAD_FAILURE = 'PAYSLIP_UPLOAD_FAILURE';

export const PAYSLIP_UPLOAD_SAVE_ACTION_DONE =
  'PAYSLIP_UPLOAD_SAVE_ACTION_DONE';

export const PAYSLIP_UPLOAD_RESET = 'PAYSLIP_UPLOAD_RESET';

export const doSaveData = (cookieData, saveData) => (
  dispatch,
  getState,
  axios,
) => {
  dispatch({ type: PAYSLIP_UPLOAD_START });

  return axios.easySendFunction(
    'api/questions/answer/sendPayslip',
    saveData,
    getAuthenticationHeaders(cookieData),
    dispatch,

    // success function
    (data) => {
      dispatch({
        type: PAYSLIP_UPLOAD_SUCCESS,
        data,
      });
    },

    // error function
    (data) => {
      dispatch({
        type: PAYSLIP_UPLOAD_ERROR,
        data,
      });
    },

    // really bad error function (mangled or no resposne)
    () => {
      dispatch({
        type: PAYSLIP_UPLOAD_FAILURE,
      });
    },
  );
};

export const doReset = () => (dispatch) => {
  dispatch({ type: PAYSLIP_UPLOAD_RESET });
};

export const doSaveActionDone = () => (dispatch) => {
  dispatch({ type: PAYSLIP_UPLOAD_SAVE_ACTION_DONE });
};
