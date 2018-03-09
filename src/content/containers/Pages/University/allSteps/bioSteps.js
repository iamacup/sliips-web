
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

    const uniName = getLatestItemWithFriendlyNameFromState('universityName', 'your university', answerData);

    if (currentStep === '0-1') {
      content = (
        <div>
          <h4>This page is used to simulate the 'click this link in email'. i.e. a user would not see this step when entering the system.</h4>
          <div className="seperator" />
          {wizzard}
        </div>
      );
    } else if (currentStep === '1-1') {
      content = (
        <div>
          <h3>{uniName}</h3>
          <h4>About You!</h4>
          <hr />
          <div className="jumbo text-left">
            <p>
              Hey there, welcome to YourAlumniToolNameNeeded.com - a tool to see what happened
              after university!
            </p>
            <p>
              First thing's first, <strong>{uniName}</strong> have sent
              you this link in order to learn a bit more about their alumni.
            </p>

            <p>
              Any information you enter into this tool will{' '}
              <strong>
                not be individually identifiable to {uniName}
              </strong>, we only provide them with agregate data.
            </p>
            <p>
              Unlike other surveys,{' '}
              <strong>
                when you answer questions, we show you what other people are up to!
              </strong>
            </p>

            <p>
              For instance, did you know that{' '}
              <strong>some cool fact about {uniName} Grads</strong>
              that could be provided by the university or our data set.
            </p>
          </div>


          <div className="seperator" />
          <hr />

          <div className="seperator" />

          <div className="drop-shadow box-border box-padding round-corners responsive-margins-2">
            <h3>Your Nationality</h3>
            <h4 className="text-muted">
            We need to know a couple of things about where you were born, and if
            you hold passports from any other countries. We use this information
            to check the university is fantastic for students from all
            countries.
            </h4>
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '1-2') {
      content = (
        <div>
          <h3>{uniName}</h3>
          <h4>About You!</h4>
          <hr />

          <div className="drop-shadow box-border box-padding round-corners responsive-margins-2">
            <h3>Where do you live?</h3>
            <h4 className="text-muted">
            We want to know where you live right now so we can see where people
            who graduated from {uniName} ended up.
            </h4>
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '1-3') {
      content = (
        <div>
          <h3>{uniName}</h3>
          <h4>About You!</h4>
          <hr />

          <div className="drop-shadow box-border box-padding round-corners responsive-margins-2">
            <h3>You...</h3>
            <h4 className="text-muted">
              We need a couple of bits of biographical information from you to
              make the data relevant.
            </h4>
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '1-4') {
      content = (
        <div>
          <h3>{uniName}</h3>
          <h4>About You!</h4>
          <hr />

          <div className="drop-shadow box-border box-padding round-corners responsive-margins-2">
            <h3>More detail about you</h3>
            <h4 className="text-muted">
              All of the following questions have opt-out options if you don't
              want to answer them, we know you might find them personal, but by
              answering them you will help {uniName} improve.
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
    console.log('render bio step: ' + this.props.currentStep);
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
