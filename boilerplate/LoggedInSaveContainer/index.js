
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { initialState as pageInitialState } from './reducer';
import * as pageAction from './action';
import Viewer from './viewer';

import FullPageError from '../../../components/Errors/fullPage';
import LoadingArea from '../../../components/Loading';
import Authentication from '../../../containers/Fragments/Authentication';

import { getAuthenticationCookie } from '../../../scripts/sliips/core/utilities';
import { initialState as authenticationInitialState } from '../../../containers/Fragments/Authentication/reducer';

class Page extends React.Component {

  componentDidMount() {
    this.doSomethingAboutSaveIfNeeded();
  }

  componentDidUpdate() {
    this.doSomethingAboutSaveIfNeeded();
  }

  doSomethingAboutSaveIfNeeded() {
    if (this.props.reduxState_page.finished === true &&
      this.props.reduxState_page.generalStatus === 'success' &&
      this.props.reduxState_authentication.loggedIn === true) {
      // you might want to do something here
    }
  }

  saveButtonHandler() {
    // TODO
    this.props.reduxAction_doSaveData(getAuthenticationCookie(), { changeThis: true });
  }

  retryButtonHandler() {
    this.saveButtonHandler();
  }

  render() {
    const { generalStatus, /* statusCode,*/ payload, started, finished } = this.props.reduxState_page;
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
    }
    else if (generalStatus === 'fatal') {
      component = <FullPageError retryCallback={() => { this.retryButtonHandler(); }} />;
    } else if (generalStatus === 'error') {
      if (typeof payload === 'string' || payload instanceof String) {
        component = <FullPageError retryCallback={() => { this.retryButtonHandler(); }} title="Backend Error" message={payload} />;
      } else {
        component = <FullPageError retryCallback={() => { this.retryButtonHandler(); }} />;
      }
    } else {
      component = <Viewer saveButtonHandler={() => { this.saveButtonHandler(); }} />;
    }

    return (
      <div>
        <Helmet title="TODO" />
        <div className="container">
          {component}
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  reduxAction_doSaveData: PropTypes.func,
  reduxState_page: PropTypes.object,
  reduxState_authentication: PropTypes.object,
};

Page.defaultProps = {
  reduxAction_doSaveData: () => { },
  reduxState_page: pageInitialState,
  reduxState_authentication: authenticationInitialState,
};

const mapStateToProps = state => ({
  reduxState_page: state./*change me*/,
  reduxState_authentication: state.authentication,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doSaveData: (cookieData, saveData) => dispatch(pageAction.doSaveData(cookieData, saveData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
