import _ from 'lodash';

import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_FAILURE,
  LOGIN_RESET,
  LOGIN_FINISHED,
  LOGOUT_FINISHED,
  LOGIN_SHOW_RESET_PASSWORD,
  LOGIN_SHOW_LOGIN,
  LOGIN_SET_STAGE_1_USERNAME,
} from './action';

import { MODAL_CLOSE } from '../../../../content/containers/Fragments/Modal/action';

export const initialState = {
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

  // only true when successfully logged in
  loggedIn: false,

  // if this is true, somewhere we need logic to clear up the cookie on the client side
  badCookie: false,

  // if this is true then we want to show the reset password thing
  showResetPassword: false,

  // contains stage 1 username if it has been set
  stage1Username: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SET_STAGE_1_USERNAME:
      return _.assign({}, state, {
        stage1Username: action.username,
      });
    case LOGIN_SHOW_RESET_PASSWORD:
      return _.assign({}, state, {
        showResetPassword: true,
      });
    case LOGIN_SHOW_LOGIN:
      return _.assign({}, state, {
        showResetPassword: false,
      });
    case LOGIN_START:
      return _.assign({}, initialState, {
        started: true,
        finished: false,
        loggedIn: state.loggedIn,
        stage1Username: state.stage1Username,
      });
    case LOGIN_SUCCESS:
      return _.assign({}, initialState, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'success',
        started: false,
        finished: true,
        loggedIn: state.loggedIn,
        stage1Username: state.stage1Username,
      });
    case LOGIN_ERROR:
      return _.assign({}, initialState, {
        payload: action.data.payload,
        statusCode: action.data.statusCode,
        generalStatus: 'error',
        started: false,
        finished: true,
        loggedIn: state.loggedIn,
        stage1Username: state.stage1Username,
      });
    case LOGIN_FAILURE:
      return _.assign({}, initialState, {
        generalStatus: 'fatal',
        started: false,
        finished: true,
        loggedIn: state.loggedIn,
        stage1Username: state.stage1Username,
      });
    case LOGOUT_FINISHED:
      return _.assign({}, initialState, {
        badCookie: action.badCookie,
        loggedIn: false,
      });
    case LOGIN_FINISHED:
      return _.assign({}, initialState, { loggedIn: true, badCookie: false });
    case MODAL_CLOSE:
      return _.assign({}, initialState, {
        loggedIn: state.loggedIn,
        badCookie: state.badCookie,
      });
    case LOGIN_RESET:
      return _.assign({}, initialState);
    default:
      return state;
  }
};
