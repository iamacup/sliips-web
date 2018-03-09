import _ from 'lodash';

export const initialState = {};

export const emptyTransactionState = {
  // the response payload
  payload: null,

  // the response statusCode
  statusCode: null,

  // the response type - 'error' or 'success'
  generalStatus: null,

  // whenever a transaction is in progress - started should be true
  started: false,

  // whenever we have completed a request regardless of the outcome
  finished: false,

  // the data we sent for this request
  sentData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GLOBAL_TRANSACTION_START': {
      const modifiedStatePart = {};

      modifiedStatePart[action.mainID] = _.assign({}, state[action.mainID]);
      modifiedStatePart[action.mainID][action.subID] = _.assign(
        {},
        emptyTransactionState,
        {
          started: true,
          finished: false,
          sentData: action.transactionData,
        },
      );

      return _.assign({}, state, modifiedStatePart);
    }
    case 'GLOBAL_TRANSACTION_SUCCESS': {
      const modifiedStatePart = {};

      modifiedStatePart[action.mainID] = _.assign({}, state[action.mainID]);
      modifiedStatePart[action.mainID][action.subID] = _.assign(
        {},
        emptyTransactionState,
        {
          payload: action.data.payload,
          statusCode: action.data.statusCode,
          generalStatus: 'success',
          started: false,
          finished: true,
          sentData: modifiedStatePart[action.mainID][action.subID].sentData,
        },
      );

      return _.assign({}, state, modifiedStatePart);
    }
    case 'GLOBAL_TRANSACTION_ERROR': {
      const modifiedStatePart = {};

      modifiedStatePart[action.mainID] = _.assign({}, state[action.mainID]);
      modifiedStatePart[action.mainID][action.subID] = _.assign(
        {},
        emptyTransactionState,
        {
          payload: action.data.payload,
          statusCode: action.data.statusCode,
          generalStatus: 'error',
          started: false,
          finished: true,
          sentData: modifiedStatePart[action.mainID][action.subID].sentData,
        },
      );

      return _.assign({}, state, modifiedStatePart);
    }
    case 'GLOBAL_TRANSACTION_FAILURE': {
      const modifiedStatePart = {};

      modifiedStatePart[action.mainID] = _.assign({}, state[action.mainID]);
      modifiedStatePart[action.mainID][action.subID] = _.assign(
        {},
        emptyTransactionState,
        {
          generalStatus: 'fatal',
          started: false,
          finished: true,
          sentData: modifiedStatePart[action.mainID][action.subID].sentData,
        },
      );

      return _.assign({}, state, modifiedStatePart);
    }
    case 'GLOBAL_TRANSACTION_RESET': {
      const modifiedStatePart = {};

      modifiedStatePart[action.mainID] = _.assign({}, state[action.mainID]);
      modifiedStatePart[action.mainID][action.subID] = _.assign(
        {},
        emptyTransactionState,
      );

      return _.assign({}, state, modifiedStatePart);
    }
    case 'LOGIN_FINISHED':
    case 'LOGOUT_FINISHED':
      return _.assign({}, initialState);
    default:
      return state;
  }
};
