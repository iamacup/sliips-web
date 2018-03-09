import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Viewer from './viewer';
import { initialState as pageInitialState } from './reducer';
import * as pageAction from './action';

import SmallSectionError from '../../../../content/components/Errors/smallSection';
import Authentication from '../../../../content/containers/Fragments/Authentication';

import { getAuthenticationCookie } from '../../../../content/scripts/custom/utilities';
import { initialState as authenticationInitialState } from '../../../../content/containers/Fragments/Authentication/reducer';
import { initialState as dashboardPageInitialState } from '../../../../content/containers/Pages/Dashboard/reducer';
import { doReset as doDashboardReset } from '../../../../content/containers/Pages/Dashboard/action';
// import { doModalClose } from '../../../../content/containers/Fragments/Modal/action';

class Page extends React.Component {
  componentDidMount() {
    this.doSomethingAboutSaveIfNeeded();
  }

  componentDidUpdate() {
    this.doSomethingAboutSaveIfNeeded();
  }

  doSomethingAboutSaveIfNeeded() {
    if (
      this.props.reduxState_page.finished === true &&
      this.props.reduxState_page.generalStatus === 'success' &&
      this.props.reduxState_authentication.loggedIn === true &&
      this.props.reduxState_page.metaData.saveActionDone === false
    ) {
      // here we close the modal and then reset the dashboard

      // todo for some reason if we use the redux way of closing the modal we get a crash / infinate loop
      // this is not the end of the world because by calling the hide method we will actually fire some stuff that
      // sync the state anyway
      // this.props.reduxAction_doModalClose();
      $('.modal').modal('hide');
      this.props.reduxAction_doSaveActionDone();
      this.props.reduxAction_doDashboardReset();
    }
  }

  saveButtonHandler(data) {
    // we inject the company key into the response
    const finalData = data;
    finalData.companyKey = this.props.reduxState_pageDashboardMetaData.companyKey;

    this.props.reduxAction_doSaveData(getAuthenticationCookie(), finalData);
  }

  retryButtonHandler() {
    this.viewer.sendPayslip();
  }

  render() {
    const {
      generalStatus,
      /* statusCode, */ payload,
    } = this.props.reduxState_page;
    let component = null;
    let viewerClassName = 'hidden';

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
    } else if (generalStatus === 'fatal') {
      component = (
        <SmallSectionError
          retryCallback={() => {
            this.retryButtonHandler();
          }}
        />
      );
    } else if (generalStatus === 'error') {
      if (typeof payload === 'string' || payload instanceof String) {
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
      // we only show the viewer if there is not a problem
      viewerClassName = '';
    }

    // we have to keep this component alive through the errors so it keeps its data, and can be used for retries
    const viewer = (
      <Viewer
        ref={(viewerRef) => {
          this.viewer = viewerRef;
        }}
        saveButtonHandler={(data) => {
          this.saveButtonHandler(data);
        }}
      />
    );

    return (
      <div>
        {component}
        <div className={viewerClassName}>{viewer}</div>
      </div>
    );
  }
}

Page.propTypes = {
  reduxAction_doSaveData: PropTypes.func,
  reduxAction_doDashboardReset: PropTypes.func,
  reduxAction_doSaveActionDone: PropTypes.func,
  // reduxAction_doModalClose: PropTypes.func,
  reduxState_page: PropTypes.object,
  reduxState_authentication: PropTypes.object,
  reduxState_pageDashboardMetaData: PropTypes.object,
};

Page.defaultProps = {
  reduxAction_doSaveData: () => {},
  reduxAction_doDashboardReset: () => {},
  reduxAction_doSaveActionDone: () => {},
  // reduxAction_doModalClose: () => { },
  reduxState_page: pageInitialState,
  reduxState_authentication: authenticationInitialState,
  reduxState_pageDashboardMetaData: dashboardPageInitialState.metaData,
};

const mapStateToProps = state => ({
  reduxState_page: state.payslipUpload,
  reduxState_authentication: state.authentication,
  reduxState_pageDashboardMetaData: state.dashboardPage.metaData,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doSaveData: (cookieData, saveData) =>
    dispatch(pageAction.doSaveData(cookieData, saveData)),
  reduxAction_doSaveActionDone: () => dispatch(pageAction.doSaveActionDone()),
  reduxAction_doDashboardReset: () => dispatch(doDashboardReset()),
  // reduxAction_doModalClose: () => dispatch(doModalClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
