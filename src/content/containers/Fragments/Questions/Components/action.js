import { getAuthenticationHeaders } from '../../../../../content/scripts/custom/utilities';

export const QUESTION_ADD = 'QUESTION_ADD';
export const QUESTION_REMOVE = 'QUESTION_REMOVE';
export const QUESTION_UPDATE_ANSWER = 'QUESTION_UPDATE_ANSWER';
export const QUESTION_ERROR = 'QUESTION_ERROR';
export const QUESTION_SUCCESS = 'QUESTION_SUCCESS';

export const QUESTION_FORCE_VALIDATE = 'QUESTION_FORCE_VALIDATE';
export const QUESTION_FORCE_VALIDATE_DONE = 'QUESTION_FORCE_VALIDATE_DONE';

export const QUESTION_FOLLOWON_START = 'QUESTION_FOLLOWON_START';
export const QUESTION_FOLLOWON_SUCCESS = 'QUESTION_FOLLOWON_SUCCESS';
export const QUESTION_FOLLOWON_ERROR = 'QUESTION_FOLLOWON_ERROR';
export const QUESTION_FOLLOWON_FAILURE = 'QUESTION_FOLLOWON_FAILURE';

export const doAddQuestion = questionID =>
  // eslint-disable-next-line no-unused-vars
  (dispatch, getState, axios) => {
    dispatch({
      type: QUESTION_ADD,
      questionID,
    });
  };

export const doRemoveQuestion = questionID =>
  // eslint-disable-next-line no-unused-vars
  (dispatch, getState, axios) => {
    dispatch({
      type: QUESTION_REMOVE,
      questionID,
    });
  };

export const doUpdateQuestionAnswer = (
  questionID,
  name,
  optionID,
  optionValue,
  valid,
) =>
  // eslint-disable-next-line no-unused-vars
  (dispatch, getState, axios) => {
    dispatch({
      type: QUESTION_UPDATE_ANSWER,
      questionID,
      name,
      optionID,
      optionValue,
      valid,
    });
  };

export const doSetQuestionSuccess = (questionID, name) =>
  // eslint-disable-next-line no-unused-vars
  (dispatch, getState, axios) => {
    dispatch({
      type: QUESTION_SUCCESS,
      questionID,
      name,
    });
  };

export const doSetQuestionError = (questionID, message, name) =>
  // eslint-disable-next-line no-unused-vars
  (dispatch, getState, axios) => {
    dispatch({
      type: QUESTION_ERROR,
      questionID,
      message,
      name,
    });
  };

export const doForceValidate = () =>
  // eslint-disable-next-line no-unused-vars
  (dispatch, getState, axios) => {
    dispatch({
      type: QUESTION_FORCE_VALIDATE,
    });
  };

export const doSetForceValidateDone = questionID =>
  // eslint-disable-next-line no-unused-vars
  (dispatch, getState, axios) => {
    dispatch({
      type: QUESTION_FORCE_VALIDATE_DONE,
      questionID,
    });
  };

export const doGetFollowonQuestions = (
  cookieData,
  answeredQuestionID,
  questionMetaData,
  questionState,
) => (dispatch, getState, axios) => {
  dispatch({
    type: QUESTION_FOLLOWON_START,
    questionID: answeredQuestionID,
  });

  return axios.easySendFunction(
    'api/questions/additionalData/followonQuestions',
    { answeredQuestionID, questionMetaData, questionState },
    getAuthenticationHeaders(cookieData),
    dispatch,

    // success function
    (data) => {
      dispatch({
        type: QUESTION_FOLLOWON_SUCCESS,
        data,
        questionID: answeredQuestionID,
      });
    },

    // error function
    (data) => {
      dispatch({
        type: QUESTION_FOLLOWON_ERROR,
        data,
        questionID: answeredQuestionID,
      });
    },

    // really bad error function (mangled or no resposne)
    () => {
      dispatch({
        type: QUESTION_FOLLOWON_FAILURE,
        questionID: answeredQuestionID,
      });
    },
  );
};
