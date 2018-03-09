import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import WizzardPane from '../../../../content/containers/Fragments/WizzardPane';
import NavBar from '../../../../content/components/Navigation/Composites/general';

import { dNc } from '../../../../content/scripts/custom/utilities';

class Page extends React.PureComponent {
  render() {
    const currentStep = this.props.reduxState_wizzardPaneCurrentStep;
    const numberOfSteps = this.props.reduxState_wizzardPaneNumberOfSteps;

    let stepTracker = null;

    if (dNc(currentStep) && dNc(numberOfSteps)) {
      stepTracker = <h2>{'Step ' + currentStep + ' of ' + numberOfSteps}</h2>;
    }

    return (
      <div>
        <Helmet title={'Get Started - Step ' + currentStep} />
        <NavBar />

        <div className="c1 page-section container text-center">
          <div className="row">
            <div className="col-sm-10 col-sm-push-1 col-md-6 col-md-push-3 style-inputs">
              {stepTracker}

              <WizzardPane
                location={this.props.location}
                startStep={Number.parseInt(this.props.match.params.id, 10)}
                questionsURL="api/wizzard/getStep"
                additionalQuestionUrlData={{}}
                wizzardDoneContent={
                  <div>
                    <br />
                    <br />
                    <div className="box-border c2">
                      <br /> <br />
                      <h2>It looks like you already have an account</h2>
                      <br />
                      <Link
                        to="/dashboard"
                        href="/dashboard"
                        className="btn btn-purple-2 btn-lg"
                      >
                        See the data!
                      </Link>
                      <br /> <br />
                    </div>
                  </div>
                }
                nextButtonClassName="btn btn-no-style"
                nextButtonContent={
                  <i className="fa fa-4x fa-arrow-circle-right" />
                }
                /* backButtonClassName="btn btn-no-style"
                backButtonContent={
                  <i className="fa fa-4x fa-arrow-circle-left" />
                } */
              />

              <br />
              <br />
              <p className="text-light">
                We are an
                <Link to="/privacy" href="/privacy">
                  {' '}
                  Ethical and Open{' '}
                </Link>
                company and won't give any personally identifiable data,
                including your email address, to anyone else.
              </p>

              <p className="text-light">
                By proceeding to create your account and use Sliips, you are
                agreeing to our
                <Link to="/terms-and-conditions" href="/terms-and-conditions">
                  {' '}
                  Terms and Conditions{' '}
                </Link>
                and
                <Link to="/privacy-statement" href="/privacy-statement">
                  {' '}
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  match: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
  reduxState_wizzardPaneCurrentStep: PropTypes.number,
  reduxState_wizzardPaneNumberOfSteps: PropTypes.number,
};

Page.defaultProps = {
  reduxState_wizzardPaneCurrentStep: 1,
  reduxState_wizzardPaneNumberOfSteps: 1,
};

const mapStateToProps = state => ({
  reduxState_wizzardPaneCurrentStep: state.wizzardPane.currentStep,
  reduxState_wizzardPaneNumberOfSteps: state.wizzardPane.numberOfSteps,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
