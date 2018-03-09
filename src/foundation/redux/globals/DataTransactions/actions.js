import { getAuthenticationHeaders } from '../../../../content/scripts/custom/utilities';

export const doDataTransaction = (
  url,
  mainID,
  subID,
  cookieData,
  transactionData,
) => (dispatch, getState, axios) => {
  dispatch({
    type: 'GLOBAL_TRANSACTION_START',
    mainID,
    subID,
    transactionData,
  });

  return axios.easySendFunction(
    url,
    transactionData,
    getAuthenticationHeaders(cookieData),
    dispatch,

    // success function
    data => dispatch({
      type: 'GLOBAL_TRANSACTION_SUCCESS',
      data,
      mainID,
      subID,
    }),

    // error function
    data => dispatch({
      type: 'GLOBAL_TRANSACTION_ERROR',
      data,
      mainID,
      subID,
    }),

    // really bad error function (mangled or no resposne)
    () => dispatch({
      type: 'GLOBAL_TRANSACTION_FAILURE',
      mainID,
      subID,
    }),
  );
};

export const doReset = (mainID, subID) => (dispatch) => {
  dispatch({
    type: 'GLOBAL_TRANSACTION_RESET',
    mainID,
    subID,
  });
};
