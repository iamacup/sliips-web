
import React from 'react';
import PropTypes from 'prop-types';

import NewWizzardPane from '../../../../../content/containers/Fragments/NewWizzardPane';

import { dNc, nextElementInArray } from '../../../../../content/scripts/custom/utilities';
import { getLatestItemWithFriendlyNameFromState } from '../../../../../content/containers/Pages/University/allSteps/commonFunctions';

class Viewer extends React.PureComponent {
  getStepContent() {
    const { currentStep, answerData } = this.props;
    let content = null;

    const wizzard = (
      <NewWizzardPane
        step={this.props.currentStep}
        // eslint-disable-next-line no-shadow
        submitCallback={(answerData) => { this.handleSubmit(answerData); }}
        saveAPI="api/universityWizzard/saveStep/"
        fetchAPI="api/universityWizzard/getStep/"
      />
    );

    if (currentStep === '3-1') {
      content = (
        <div>
          <h3>Your life before university</h3>
          <h4>TODO</h4>
          <hr />

          <div className="drop-shadow box-border box-padding round-corners responsive-margins-2">
            <h3>todo todo todo todo</h3>
            <h4 className="text-muted">
              todo todo
            </h4>
            {wizzard}
          </div>
        </div>
      );
    }

    return content;
  }

  handleSubmit(answerData) {
    const { steps, currentStep, type } = this.props;

    const next = nextElementInArray(steps, currentStep);

    this.props.submitDataCallback(answerData, next, type);
  }

  render() {
    console.log('render pre uni step: ' + this.props.currentStep);
    return this.getStepContent();
  }
}

Viewer.propTypes = {
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.string.isRequired,
  submitDataCallback: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  answerData: PropTypes.object.isRequired,
};

export default Viewer;
