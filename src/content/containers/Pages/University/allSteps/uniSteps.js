
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NewWizzardPane from '../../../../../content/containers/Fragments/NewWizzardPane';
import fetchDataBuilder from '../../../../../foundation/redux/Factories/FetchData';
import UniEducationViewer from '../../../../../content/containers/Pages/University/allSteps/uniEducationViewer';
import UniViewer from '../../../../../content/containers/Pages/University/allSteps/uniViewer';


import { dNc, nextElementInArray, nextIndexInArray } from '../../../../../content/scripts/custom/utilities';
import { getLatestItemWithFriendlyNameFromState, getFirstItemWithFriendlyNameFromState } from '../../../../../content/containers/Pages/University/allSteps/commonFunctions';

import * as storeAction from '../../../../../foundation/redux/globals/DataStoreSingle/actions';

const dataStoreID = 'testHTML3UniSub';

const fetchEducationDataTransactionStateMainID = 'wizzardUniEducationCompletion';
const FetchEducation = fetchDataBuilder(fetchEducationDataTransactionStateMainID);

const fetchUniDataTransactionStateMainID = 'wizzardUniCompletion';
const FetchUni = fetchDataBuilder(fetchUniDataTransactionStateMainID);

const initialThisState = {
  uniLoop: 0,
  qualificationLoop: 0,
};

class Viewer extends React.PureComponent {
  componentWillReceiveProps(nextProps) {
    if ((nextProps.currentStep === 'ask-next-qualification' &&
      this.props.currentStep !== 'ask-next-qualification') || (
        nextProps.currentStep === 'ask-next-qualification-again' &&
      this.props.currentStep !== 'ask-next-qualification-again')) {
      // we check to see if the previous question's answer was no - i.e. did you attend other university - if it was we finish this section here
      const { answerData } = nextProps;

      const anotherUniversity = getLatestItemWithFriendlyNameFromState('anotherUniversity', null, answerData);

      if (anotherUniversity !== 'No') {
        const optionValue = getLatestItemWithFriendlyNameFromState('anotherUniversityLocation1', null, nextProps.answerData);

        const { uniLoop } = nextProps.reduxState_this;
        const newValue = uniLoop + 1;

        if (optionValue === 'United Kingdom') {
          // we need to interrogate the answers to see if they selected UK - in which case we go to the next step
          // then bounce into questions
          const { type } = nextProps;

          nextProps.reduxAction_doUpdate({ uniLoop: newValue });

          // goto uni-question regardless of which got us here
          nextProps.submitDataCallback(null, 'uni-question', type);
        } else {
          // we need to interrogate the answers to see if they selected something else - in which case we go to the next step + 1
          // then bounce into questions
          const { type } = nextProps;

          nextProps.reduxAction_doUpdate({ uniLoop: newValue });

          // go to 2-3 regardless of what got us here
          nextProps.submitDataCallback(null, '2-3', type);
        }
      } else {
        const { type } = nextProps;

        // go to 2-4 regardless of what got us here
        nextProps.submitDataCallback(null, '2-4', type);
      }
    }
  }

  getQualificationsHistory(seed) {
    const { qualificationLoop, uniLoop } = this.props.reduxState_this;
    const { answerData } = this.props;

    // we pass the updateSeed value into the sendData to make the fetch refresh for every array iteration but the backend does not care
    const content = (
      <FetchEducation
        active
        fetchURL="api/universityWizzard/uniEducationData"
        sendData={{
 sessionID: answerData.sessionID, uniLoop, qualificationLoop, seed,
}}
        noRender={false}
        stateSubID="default"
        viewer={UniEducationViewer}
      />
    );

    return (
      <div>
        {content}
      </div>
    );
  }

  getUniHistory(seed) {
    const { qualificationLoop, uniLoop } = this.props.reduxState_this;
    const { answerData } = this.props;

    // we pass the updateSeed value into the sendData to make the fetch refresh for every array iteration but the backend does not care
    const content = (
      <FetchUni
        active
        fetchURL="api/universityWizzard/educationData"
        sendData={{
 sessionID: answerData.sessionID, uniLoop, qualificationLoop, seed,
}}
        noRender={false}
        stateSubID="default"
        viewer={UniViewer}
      />
    );

    return (
      <div>
        {content}
      </div>
    );
  }

  getStepContent() {
    const { currentStep, answerData } = this.props;
    const { qualificationLoop, uniLoop } = this.props.reduxState_this;
    let content = null;

    let useStep = this.props.currentStep;

    if (currentStep === 'uni-question') {
      useStep = '0-1';
    }

    if (currentStep === '2-2-again') {
      useStep = '2-2';
    }

    let wizzard = (
      <NewWizzardPane
        step={useStep}
        // eslint-disable-next-line no-shadow
        submitCallback={(answerData) => { this.handleSubmit(answerData); }}
        saveAPI="api/universityWizzard/saveStep/"
        fetchAPI="api/universityWizzard/getStep/"
        subStep={uniLoop + '_' + qualificationLoop}
        additionalSaveSendData={{ uniLoop, qualificationLoop }}
      />
    );

    const uniName = getLatestItemWithFriendlyNameFromState('universityName', 'your university', answerData);

    if (currentStep === '2-1') {
      content = (
        <div>
          <h3>{uniName}</h3>
          <h4>About You!</h4>
          <hr />
          <div className="jumbo text-left">
            <p>
                Thanks for filling in the first section - onto the next section where we check what qualifications you got from {uniName}
            </p>

            {this.getQualificationsHistory()}
          </div>

          <div className="seperator" />
          <hr />

          <div className="seperator" />

          <div className="drop-shadow box-border box-padding round-corners responsive-margins-2">
            <h3>University History</h3>
            <h4 className="text-muted">
              Questions about your studies at {uniName}
            </h4>
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === 'ask-another-qualification') {
      wizzard = (
        <div className="text-left">
          <h4>Did you do any other qualifications at {uniName}?</h4>
          <div style={{ margin: '0px 10px' }}>
            <button className="btn btn-default" onClick={() => { this.moreQualifications(); }}> Yes </button>
            <button className="btn btn-default" onClick={() => { this.finishQualifications(); }}> No </button>
          </div>
        </div>
      );

      content = (
        <div>
          <h3>{uniName}</h3>
          <h4>About You!</h4>
          <hr />
          <div className="jumbo text-left">
            {this.getQualificationsHistory('1')}
          </div>

          <div className="seperator" />
          <hr />

          <div className="seperator" />

          <div className="drop-shadow box-border box-padding round-corners responsive-margins-2">
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '2-2' || currentStep === '2-2-again') {
      content = (
        <div>
          <div className="jumbo text-left">
            {this.getUniHistory()}
          </div>

          <div className="seperator" />
          <hr />

          <div className="seperator" />

          <div className="drop-shadow box-border box-padding round-corners responsive-margins-2">
            <h3>Other Universities</h3>
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === 'ask-next-qualification' || currentStep === 'ask-next-qualification-again') {
      content = null;
      // should not get here
    // remove else conditional TODO
    } else if (currentStep === 'uni-question') {
      content = (
        <div>
          <div className="drop-shadow box-border box-padding round-corners responsive-margins-2">
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '2-3') {
      content = (
        <div>
          <div className="drop-shadow box-border box-padding round-corners responsive-margins-2">
            <h3>Non UK University</h3>
            <h4 className="text-muted">
              Answer only for the latest / most recent qualification you got from this institution
            </h4>
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '2-4') {
      content = (
        <div>
          <div className="drop-shadow box-border box-padding round-corners responsive-margins-2">
            <h3>Your Family</h3>
            <h4 className="text-muted">
              We just need to work out if you were the first to attend university from your family.
            </h4>
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '2-5') {
      const firstUniName = getFirstItemWithFriendlyNameFromState('universityName', 'your university', answerData);

      content = (
        <div>
          <div className="drop-shadow box-border box-padding round-corners responsive-margins-2">
            <h3>University Impact</h3>
            <h4 className="text-muted">
              This survey is for {firstUniName} and so please answer these questions specifically for that university:
            </h4>
            {wizzard}
          </div>
        </div>
      );
    }

    return content;
  }

  // move us back to the 0th step
  moreQualifications() {
    const { steps, type } = this.props;
    const { qualificationLoop } = this.props.reduxState_this;
    const newValue = qualificationLoop + 1;

    this.props.reduxAction_doUpdate({ qualificationLoop: newValue });

    this.props.submitDataCallback(null, steps[0], type);
  }

  // just push us onto the next step
  finishQualifications() {
    const { steps, currentStep, type } = this.props;

    const next = nextElementInArray(steps, currentStep);

    this.props.submitDataCallback(null, next, type);
  }

  handleSubmit(answerData) {
    const { steps, currentStep, type } = this.props;

    if (currentStep === 'uni-question') {
      this.props.submitDataCallback(answerData, steps[0], type);
    } else {
      const next = nextElementInArray(steps, currentStep);

      this.props.submitDataCallback(answerData, next, type);
    }
  }

  render() {
    console.log('render uni step: ' + this.props.currentStep);
    return this.getStepContent();
  }
}

Viewer.propTypes = {
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.string.isRequired,
  submitDataCallback: PropTypes.func.isRequired,
  reduxState_this: PropTypes.object,
  reduxAction_doUpdate: PropTypes.func,
  answerData: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

Viewer.defaultProps = {
  reduxState_this: initialThisState,
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = state => ({
  reduxState_this: state.dataStoreSingle[dataStoreID],
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: data => dispatch(storeAction.doUpdate(dataStoreID, data, initialThisState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
