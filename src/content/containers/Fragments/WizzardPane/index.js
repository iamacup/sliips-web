import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { initialState as wizzardInitialState } from './reducer';
import * as wizzardAction from './action';

import LoadingArea from '../../../../content/components/Loading';
import QuestionButton from '../../../../content/containers/Fragments/Questions/Utility/QuestionButton';
import SmallSectionError from '../../../../content/components/Errors/smallSection';
import QuestionRenderer from '../../../../content/containers/Fragments/Questions/Utility/QuestionRenderer';
import Registration from '../../../../content/containers/Fragments/Registration';
import fetchDataBuilder from '../../../../foundation/redux/Factories/FetchData';

import { initialState as questionsInitialState } from '../../../../content/containers/Fragments/Questions/Components/reducer';
import {
  getAuthenticationCookie,
  dNc,
  formatQuestionObjectForSending,
} from '../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../content/containers/Fragments/Questions/Components/action';
import * as authenticationAction from '../../../../content/containers/Fragments/Authentication/action';

const FinishWizardContainer = fetchDataBuilder('finishWizzard');

class WizzardPane extends React.Component {
  componentDidMount() {
    this.fetchDataIfNeeded();

    // we look to see if we need to change the url because the rendered state is wrong
    const { changedStepNumber } = this.props.reduxState_wizzardPane;
    const { location } = this.props;

    // we check to see if the steps are different
    if (
      dNc(changedStepNumber) &&
      location.pathname !== '/get-started/' + changedStepNumber &&
      location.pathname !== '/get-started/' + changedStepNumber + '/'
    ) {
      // we should update the location here - however this causes a total re-render that results in the questions being redrawn
      // which is not OK as it crashes the JS (something to do with input mask)
      // TODO
      // this.props.history.replace('/get-started/' + changedStepNumber);
      // nothing comment
    }
  }

  componentDidUpdate() {
    this.fetchDataIfNeeded();
    this.saveDataActionsIfNeeded();
  }

  drawQuestions(data /* , error */) {
    const nextButton = (
      <QuestionButton
        key="nextButton"
        buttonAction={() => {
          this.handleSubmitButton();
        }}
        buttonClassName={this.props.nextButtonClassName}
        buttonContent={this.props.nextButtonContent}
        showButtonIfLoggedIn
      />
    );

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

    let backButton = null;

    if (
      dNc(this.props.backButtonContent) &&
      dNc(this.props.backButtonClassName)
    ) {
      let disableBack = false;

      if (this.props.reduxState_wizzardPane.currentStep === 1) {
        disableBack = true;
      }

      backButton = (
        <QuestionButton
          disabled={disableBack}
          key="backButton"
          buttonAction={() => {
            this.handleBackButton();
          }}
          buttonClassName={this.props.backButtonClassName}
          buttonContent={this.props.backButtonContent}
          showButtonIfLoggedIn
        />
      );
    }

    return (
      <div>
        {errorMessage}
        <QuestionRenderer
          nextStepCallback={() => {
            this.handleSubmitButton();
          }}
          data={data}
          nextButton={nextButton}
          backButton={backButton}
          showTitles={this.props.showTitles}
          questionMetaData={
            'get-started-step-' + this.props.reduxState_wizzardPane.currentStep
          }
        />
      </div>
    );
  }

  drawLogin() {
    return (
      <Registration
        formID="login-modal-form"
        registerCallback={() => {
          this.registerFinished();
        }}
      />
    );
  }

  registerFinished() {
    this.setState({ finishWizzardStep: 1 });
  }

  apiWizzardSaveComplete() {
    this.setState({ finishWizzardStep: 2 });
    this.props.reduxAction_doSetLoginWithCookieData(getAuthenticationCookie());
    this.context.router.history.push('/dashboard');
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

  // if force is true then it will always go
  handleSubmitButton(force) {
    // we instruct the questions to all revalidate - this means that they will put their own error messages onto them
    // the questions will already have the correct validation - we just do this for the error message
    this.props.reduxAction_doForceValidate();

    if (!this.questionsWithErrors() || force === true) {
      // we work out the step we are submitting here
      const { currentStep } = this.props.reduxState_wizzardPane;
      let step = this.props.startStep;

      if (dNc(currentStep)) {
        step = currentStep;
      }

      // extract the answer data into a format we like
      const formattedAnswers = formatQuestionObjectForSending(
        this.props.reduxState_questions,
      );

      if (dNc(this.props.saveOverrideCallback)) {
        this.props.saveOverrideCallback(formattedAnswers);
      } else {
        this.props.reduxAction_doSaveData(
          getAuthenticationCookie(),
          step,
          this.props.reduxState_wizzardPane.sessionID,
          formattedAnswers,
        );
      }
    }
  }

  handleBackButton() {
    if (
      !this.questionsWithErrors() &&
      this.props.reduxState_wizzardPane.currentStep > 1
    ) {
      this.props.reduxAction_doNewStep(
        this.props.reduxState_wizzardPane.currentStep - 1,
      );
    }
  }

  fetchDataIfNeeded() {
    let fetchStep = this.props.startStep;

    if (dNc(this.props.reduxState_wizzardPane.currentStep)) {
      fetchStep = this.props.reduxState_wizzardPane.currentStep;
    }

    let refetch = false;

    // this is a bit hacky to reset the thing from the changes we made to the front page view (i.e. 1 question)
    // but we need to display all first step questions if we are on get-started
    if (dNc(this.props.location)) {
      const { pathname } = this.props.location;

      if (dNc(pathname) && pathname.startsWith('/get-started')) {
        if (fetchStep === 1) {
          // check to see if we are on step 1 with only 1 question and on /get-started, need to force a fetch
          const arr = Object.keys(this.props.reduxState_questions);

          if (arr.length === 1) {
            refetch = true;
          }
        }
      }
    }

    if (
      this.props.reduxState_wizzardPane.fetch.finished !== true &&
      this.props.reduxState_wizzardPane.fetch.started !== true && refetch === false
    ) {
      this.props.reduxAction_doFetchData(
        getAuthenticationCookie(),
        fetchStep,
        this.props.reduxState_wizzardPane.sessionID,
        this.props.questionsURL,
        this.props.additionalQuestionUrlData,
      );
    } else if (refetch === true && this.props.reduxState_wizzardPane.fetch.started === false &&
      this.props.reduxState_wizzardPane.fetch.finished === true) {
      this.props.reduxAction_doFetchData(
        getAuthenticationCookie(),
        1,
        null,
        'api/wizzard/getStep',
        {},
      );
    }
  }

  saveDataActionsIfNeeded() {
    const { save } = this.props.reduxState_wizzardPane;

    if (save.finished === true) {
      // do we have a new step to go to?
      if (save.generalStatus === 'success') {
        // next step
        if (save.statusCode === '/api/wizzard/saveStep-1') {
          this.props.reduxAction_doNewStep(save.payload.nextStep);
          this.context.router.history.push(
            '/get-started/' + save.payload.nextStep,
          );
        }
      }
    }
  }

  retryButtonHandler() {
    if (this.props.reduxState_wizzardPane.lastAction === 'save') {
      this.handleSubmitButton(true);
    } else {
      this.props.reduxAction_doNewStep(
        this.props.reduxState_wizzardPane.currentStep,
      );
    }
  }

  render() {
    const { sessionID } = this.props.reduxState_wizzardPane;

    if (dNc(this.state) && dNc(this.state.finishWizzardStep)) {
      const doneMessage = (
        <div>
          <h2>Congratulations!</h2>
          <h3>
            <Link to="/dashboard/" href="/dashboard/">
              Click Here
            </Link>{' '}
            to see if you are paid fairly!
          </h3>
          <h5 className="text-muted">
            You should be redirected automatically in a couple of seconds...
          </h5>
        </div>
      );

      if (this.state.finishWizzardStep === 1 && dNc(sessionID)) {
        const sendData = {
          sessionID,
        };

        const obj = (
          <FinishWizardContainer
            active
            fetchURL="api/wizzard/finish"
            sendData={sendData}
            refreshComparator={sendData}
            // fatalCallback={() => { }}
            // errorCallback={(data, statusCode) => { }}
            successCallback={
              (/* data, statusCode */) => {
                this.apiWizzardSaveComplete();
              }
            }
            viewer={doneMessage}
          />
        );

        return obj;
      } else if (this.state.finishWizzardStep === 2) {
        return doneMessage;
      }
      // TODO eror state?
      return null;
    }

    const {
      generalStatus: generalStatusFetch,
      statusCode: statusCodeFetch,
      payload: payloadFetch,
    } = this.props.reduxState_wizzardPane.fetch;

    const {
      generalStatus: generalStatusSave,
      statusCode: statusCodeSave,
      payload: payloadSave,
    } = this.props.reduxState_wizzardPane.save;

    const { lastAction } = this.props.reduxState_wizzardPane;

    let component = null;

    if (generalStatusFetch === 'fatal' || generalStatusSave === 'fatal') {
      component = (
        <SmallSectionError
          retryCallback={() => {
            this.retryButtonHandler();
          }}
        />
      );
    } else if (
      (generalStatusFetch === 'error' || generalStatusSave === 'error') &&
      statusCodeSave !== '/api/wizzard/saveStep-4'
    ) {
      if (statusCodeFetch === '/api/wizzard/getStep-validator-2') {
        component = this.props.wizzardDoneContent;
      } else if (
        lastAction === 'save' &&
        (typeof payloadSave === 'string' || payloadSave instanceof String)
      ) {
        component = (
          <SmallSectionError
            retryCallback={() => {
              this.retryButtonHandler();
            }}
            title="Backend Error"
            message={payloadSave}
          />
        );
      } else if (
        lastAction === 'fetch' &&
        (typeof payloadFetch === 'string' || payloadFetch instanceof String)
      ) {
        component = (
          <SmallSectionError
            retryCallback={() => {
              this.retryButtonHandler();
            }}
            title="Backend Error"
            message={payloadFetch}
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
    } else if (statusCodeSave === '/api/wizzard/saveStep-4') {
      component = this.drawQuestions(payloadFetch.data, true);
    } else if (statusCodeSave === '/api/wizzard/saveStep-2') {
      component = this.drawLogin();
    } else if (generalStatusFetch === 'success') {
      component = this.drawQuestions(payloadFetch.data, false);
    } else {
      component = <LoadingArea />;
    }

    return component;
  }
}

WizzardPane.propTypes = {
  reduxAction_doFetchData: PropTypes.func,
  reduxAction_doSaveData: PropTypes.func,
  reduxAction_doNewStep: PropTypes.func,
  reduxAction_doSetLoginWithCookieData: PropTypes.func,
  reduxAction_doForceValidate: PropTypes.func,
  reduxState_wizzardPane: PropTypes.object,
  reduxState_questions: PropTypes.object,
  wizzardDoneContent: PropTypes.any.isRequired,
  startStep: PropTypes.number.isRequired,
  nextButtonClassName: PropTypes.string.isRequired,
  nextButtonContent: PropTypes.any.isRequired,
  backButtonClassName: PropTypes.string,
  backButtonContent: PropTypes.any,
  /* history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired, */
  location: PropTypes.object.isRequired,
  showTitles: PropTypes.bool,
  questionsURL: PropTypes.string,
  additionalQuestionUrlData: PropTypes.object,
  saveOverrideCallback: PropTypes.any,
};

WizzardPane.defaultProps = {
  reduxAction_doFetchData: () => {},
  reduxAction_doSaveData: () => {},
  reduxAction_doNewStep: () => {},
  reduxAction_doSetLoginWithCookieData: () => {},
  reduxAction_doForceValidate: () => {},
  reduxState_wizzardPane: wizzardInitialState,
  reduxState_questions: questionsInitialState,
  backButtonClassName: '',
  backButtonContent: null,
  showTitles: true,
  questionsURL: 'api/wizzard/getStep',
  additionalQuestionUrlData: {},
  saveOverrideCallback: null,
};

WizzardPane.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  reduxState_wizzardPane: state.wizzardPane,
  reduxState_questions: state.questions,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doFetchData: (cookieData, step, sessionID, url, additionalData) =>
    dispatch(
      wizzardAction.doFetchData(
        cookieData,
        step,
        sessionID,
        url,
        additionalData,
      ),
    ),
  reduxAction_doSaveData: (cookieData, step, sessionID, answers) =>
    dispatch(wizzardAction.doSaveData(cookieData, step, sessionID, answers)),
  reduxAction_doNewStep: step => dispatch(wizzardAction.doNewStep(step)),
  reduxAction_doSetLoginWithCookieData: cookieData =>
    dispatch(authenticationAction.setLoginWithCookieData(cookieData)),
  reduxAction_doForceValidate: () => dispatch(questionAction.doForceValidate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WizzardPane);
