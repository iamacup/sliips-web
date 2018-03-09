
import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import AnimationContainer from '../../../../../content/components/AnimationContainer';
import NewWizzardPane from '../../../../../content/containers/Fragments/NewWizzardPane';
import fetchDataBuilder from '../../../../../foundation/redux/Factories/FetchData';
import UniEducationViewer from '../../../../../content/containers/Pages/University/allSteps/uniEducationViewer';

import UniSteps from '../../../../../content/containers/Pages/University/allSteps/uniSteps';
import BioSteps from '../../../../../content/containers/Pages/University/allSteps/bioSteps';
import PreUniSteps from '../../../../../content/containers/Pages/University/allSteps/preUniSteps';

import { redrawCharts } from '../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents, dNc } from '../../../../../content/scripts/custom/utilities';

import * as storeAction from '../../../../../foundation/redux/globals/DataStoreSingle/actions';

// the id to store stuff for this wizzard panel
const dataStoreID = 'testHTML3';

// fetch actions constants
const fetchDataTransactionStateMainID = 'wizzardUniEducationCompletion';
const FetchEducation = fetchDataBuilder(fetchDataTransactionStateMainID);

const firstStep = '0-1';

const bioSteps = ['0-1', '1-1', '1-2', '1-3', '1-4'];
// 2-1: What degree did you study at uni X and all the data about its results
// ask-another-qualification: did you study another degree at university X
// if yes - back to step 2-1
// if no - onto step 2-2
// 2-2: Did you go to another university
// if yes - ask what country
// ask-next-qualification: used as a way to do additional processing on the output of 2-2
// if the output of 2-2 was anything other than no
// look to see if it was UK and move to uni-question
// look to see if it was non uk - move to uni-question + 1 (i.e. 2-3)
// if the output was no then move to uni-question + 3 (i.e. 2-4)
// uni-question: the university that we are adding (uk)
// 2-3: all the questions about the foreign university
// 2-2: Did you go to another university
// 2-4: all the questions about parents and siblings
// 2-5: all the quesitons about experience at uni 1 (target of this survey)
const uniSteps = ['2-1', 'ask-another-qualification', '2-2', 'ask-next-qualification', 'uni-question', '2-3', '2-2-again', 'ask-next-qualification-again', '2-4', '2-5'];

const preUniSteps = ['3-1'];

class Viewer extends React.Component {
  getStepContent() {
    let content = null;

    const { step, answerData } = this.props.reduxState_this;

    if (bioSteps.includes(step)) {
      content = (
        <BioSteps
          // eslint-disable-next-line no-shadow
          submitDataCallback={(answerData, nextStep, type) => { this.submitDataCallback(answerData, nextStep, type); }}
          steps={bioSteps}
          currentStep={step}
          answerData={answerData}
          type="bio"
        />
      );
    } else if (uniSteps.includes(step)) {
      content = (
        <UniSteps
          // eslint-disable-next-line no-shadow
          submitDataCallback={(answerData, nextStep, type) => { this.submitDataCallback(answerData, nextStep, type); }}
          steps={uniSteps}
          currentStep={step}
          answerData={answerData}
          type="uni"
        />
      );
    } else if (preUniSteps.includes(step)) {
      content = (
        <PreUniSteps
          // eslint-disable-next-line no-shadow
          submitDataCallback={(answerData, nextStep, type) => { this.submitDataCallback(answerData, nextStep, type); }}
          steps={uniSteps}
          currentStep={step}
          answerData={answerData}
          type="uni"
        />
      );
    } else {
      content = <h1>Undone</h1>;
    }

    return content;
  }

  submitDataCallback(answerData, nextStep, type) {
    // we let null answer data get passed through here if we need to just change steps without any actual answer data
    let updateAnswerData = answerData;

    if (!dNc(updateAnswerData)) {
      updateAnswerData = this.props.reduxState_this.answerData;
    }

    // we always update the step assuming there was a next step passed
    if (nextStep !== null) {
      this.props.reduxAction_doUpdate({
        step: nextStep,
        answerData: updateAnswerData,
      });
    // otherwise we look to see what type has been finished and then use that to define what to do next
    } else if (type === 'bio') {
      // bio finish
      this.props.reduxAction_doUpdate({
        step: uniSteps[0],
        answerData: updateAnswerData,
      });
    } else if (type === 'uni') {
      this.props.reduxAction_doUpdate({
        step: preUniSteps[0],
        answerData: updateAnswerData,
      });
    } else {
      console.log('TODO HANDLE NON KNOWN');
    }
  }

  render() {
    console.log('render parent');
    return (
      <div>
        <Helmet title="Survey" />
        <div className="container c1 page-section">
          <div className="row">
            <div className="col-sm-8 col-sm-push-2 text-center">

              {this.getStepContent()}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Viewer.propTypes = {
  reduxState_this: PropTypes.object,
  reduxAction_doUpdate: PropTypes.func,
};

Viewer.defaultProps = {
  reduxState_this: {
    step: firstStep,
  },
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = state => ({
  reduxState_this: state.dataStoreSingle[dataStoreID],
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: data => dispatch(storeAction.doUpdate(dataStoreID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
