// import { getAuthenticationHeaders } from '../../../../content/scripts/custom/utilities';

// eslint-disable-next-line import/prefer-default-export
export const doUpdate = (mainID, data, initialState) => (dispatch) => {
  dispatch({
    type: 'GLOBAL_STORE_SINGLE_UPDATE',
    mainID,
    data,
    initialState,
  });
};
