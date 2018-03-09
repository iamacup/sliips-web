
import axios from 'axios';

import { dNc, handleAuthStatus, logError, getAPIUrl } from '../utilities';

export default () => {
  let axiosInstance = axios;

  if (__DEV__ === true) {
    const https = require('https');
    axiosInstance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
  }

  const result = {
    core: axiosInstance,
    // we wrap axios.post in a promise that always resolves, but handles the promise of axios.post
    easySendFunction: (
      location,
      data,
      headers,
      dispatch,
      apiSuccess,
      apiFail,
      apiTotalFail,
    ) =>
      new Promise((resolve) => {
        const finalLocation = getAPIUrl() + location;

        axiosInstance
          .post(finalLocation, data, headers)
          .then((res) => {
            if (dNc(res.data.authStatus)) {
              handleAuthStatus(res.data.authStatus, dispatch);
            }

            if (res.data.generalStatus === 'success') {
              apiSuccess(res.data);
              resolve('success');
            } else if (res.data.generalStatus === 'error') {
              apiFail(res.data);
              resolve('success');
            } else {
              logError(res.data);
              apiTotalFail(res.data);
              resolve('success');
            }
          })
          .catch((err) => {
            logError(err);
            apiTotalFail(err);
            resolve('success');
          });
      }),
  };

  return result;
};
