import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initialState as pageInitialState } from './reducer';
import * as pageAction from './action';

import SmallSectionError from '../../../../../../content/components/Errors/smallSection';
import LoadingArea from '../../../../../../content/components/Loading';
import Authentication from '../../../../../../content/containers/Fragments/Authentication';
import QuestionRenderer from '../../../../../../content/containers/Fragments/Questions/Utility/QuestionRenderer';
import QuestionButton from '../../../../../../content/containers/Fragments/Questions/Utility/QuestionButton';

import {
  getAuthenticationCookie,
  formatQuestionObjectForSending,
} from '../../../../../../content/scripts/custom/utilities';
import { initialState as authenticationInitialState } from '../../../../../../content/containers/Fragments/Authentication/reducer';
import { initialState as questionsInitialState } from '../../../../../../content/containers/Fragments/Questions/Components/reducer';

import * as questionAction from '../../../../../../content/containers/Fragments/Questions/Components/action';

class Page extends React.Component {
  componentDidMount() {
    // we reset the state so that every time this component is mounted, the global state is reset for sending the response
    this.props.reduxAction_doReset();
  }

  componentDidUpdate() {
    this.doSomethingAboutSaveIfNeeded();
  }

  doSomethingAboutSaveIfNeeded() {
    if (
      this.props.reduxState_page.finished === true &&
      this.props.reduxState_page.generalStatus === 'success' &&
      this.props.reduxState_authentication.loggedIn === true
    ) {
      this.props.saveSuccessCallback();
    }
  }

  questionsWithErrors() {
    const arr = Object.entries(this.props.reduxState_questions);
    let count = 0;

    for (let a = 0; a < arr.length; a++) {
      if (arr[a][1].answered === false || arr[a][1].error === true) {
        // do nothing (this is replaced with a call to doForceValidate)
      } else {
        count++;
      }
    }

    if (count === arr.length) {
      return false;
    }

    return true;
  }

  saveButtonHandler() {
    // we instruct the questions to all revalidate - this means that they will put their own error messages onto them
    // the questions will already have the correct validation - we just do this for the error message
    this.props.reduxAction_doForceValidate();

    if (!this.questionsWithErrors()) {
      // extract the answer data into a format we like
      const formattedAnswers = formatQuestionObjectForSending(
        this.props.reduxState_questions,
      );

      this.props.reduxAction_doSaveData(
        getAuthenticationCookie(),
        { answers: formattedAnswers, metaData: this.props.metaData },
        this.props.apiURL,
        this.props.questionErrorStatusCode,
      );
    }
  }

  retryButtonHandler() {
    this.saveButtonHandler();
  }

  drawQuestions(/* error */) {
    const errorMessage = null;

    // i am not sure if we want to have this here, because it won't update properly when questions are answered correctly
    // todo we should pick up this sort of error elsewhere?
    /* if (error === true) {
      errorMessage = (
        <div className="alert alert-danger">
          <h5 style={{ margin: 0 }}>There has been an error with your answers:</h5>
        </div>
      );
    } */

    return (
      <div key="questionBody" className="modal-body text-center">
        {errorMessage}
        <QuestionRenderer
          nextStepCallback={() => {
            this.saveButtonHandler();
          }}
          data={this.props.data}
          nextButton={
            <QuestionButton
              key="nextButton"
              buttonAction={() => {
                this.saveButtonHandler();
              }}
              buttonClassName="btn btn-no-style"
              buttonContent={<i className="fa fa-4x fa-arrow-circle-right" />}
              showButtonIfLoggedIn
            />
          }
          questionMetaData={this.props.questionMetaData}
        />
      </div>
    );
  }

  render() {
    const {
      generalStatus,
      statusCode,
      payload,
      started,
      finished,
    } = this.props.reduxState_page;
    let component = null;

    if (this.props.reduxState_authentication.loggedIn !== true) {
      component = (
        <div className="row">
          <div className="col-sm-6 col-sm-push-3 text-center">
            <h3>You need to login...</h3>
            <br />
            <Authentication formID="login-page-form" />
          </div>
        </div>
      );
    } else if (started === true && finished === false) {
      component = <LoadingArea />;
    } else if (generalStatus === 'fatal') {
      component = (
        <SmallSectionError
          retryCallback={() => {
            this.retryButtonHandler();
          }}
        />
      );
    } else if (generalStatus === 'error') {
      if (statusCode === this.props.questionErrorStatusCode) {
        component = this.drawQuestions(true);
      } else if (typeof payload === 'string' || payload instanceof String) {
        component = (
          <SmallSectionError
            retryCallback={() => {
              this.retryButtonHandler();
            }}
            title="Backend Error"
            message={payload}
          />
        );
      } else {
        component = (
          <SmallSectionError
            retryCallback={() => {
              this.retryButtonHandler();
            }}
          />
        );
      }
    } else {
      component = this.drawQuestions(false);
    }

    return <div>{component}</div>;
  }
}

Page.propTypes = {
  reduxAction_doSaveData: PropTypes.func,
  reduxAction_doReset: PropTypes.func,
  reduxAction_doForceValidate: PropTypes.func,
  reduxState_page: PropTypes.object,
  reduxState_authentication: PropTypes.object,
  reduxState_questions: PropTypes.object,
  data: PropTypes.array.isRequired,
  apiURL: PropTypes.string.isRequired,
  saveSuccessCallback: PropTypes.func,
  metaData: PropTypes.object,
  questionMetaData: PropTypes.string.isRequired,
  questionErrorStatusCode: PropTypes.string.isRequired,
};

Page.defaultProps = {
  reduxAction_doSaveData: () => {},
  reduxAction_doReset: () => {},
  reduxAction_doForceValidate: () => {},
  reduxState_page: pageInitialState,
  reduxState_authentication: authenticationInitialState,
  reduxState_questions: questionsInitialState,
  saveSuccessCallback: () => {},
  metaData: {},
};

const mapStateToProps = state => ({
  reduxState_page: state.questionRenderWrapper,
  reduxState_authentication: state.authentication,
  reduxState_questions: state.questions,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doSaveData: (
    cookieData,
    saveData,
    url,
    questionErrorStatusCode,
  ) =>
    dispatch(
      pageAction.doSaveData(cookieData, saveData, url, questionErrorStatusCode),
    ),
  reduxAction_doReset: () => dispatch(pageAction.doReset()),
  reduxAction_doForceValidate: () => dispatch(questionAction.doForceValidate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
