
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Viewer from './viewer';
import { initialState as pageInitialState } from './reducer';
import * as pageAction from './action';

import FullPageError from '../../../components/Errors/fullPage';
import LoadingArea from '../../../components/Loading';
import Authentication from '../../../containers/Fragments/Authentication';

import { getAuthenticationCookie } from '../../../scripts/sliips/core/utilities';
import { initialState as authenticationInitialState } from '../../../containers/Fragments/Authentication/reducer';

class Page extends React.Component {

  componentDidMount() {
    this.fetchDataIfNeeded();
  }

  componentDidUpdate() {
    this.fetchDataIfNeeded();
  }

  fetchDataIfNeeded() {
    // if the request is not finished and its not started and the user is logged in - try to fetch the data
    if (this.props.reduxState_page.finished !== true &&
        this.props.reduxState_page.started !== true &&
        this.props.reduxState_authentication.loggedIn === true) {
      this.props.reduxAction_doFetchData(getAuthenticationCookie());
    }
  }

  retryButtonHandler() {
    this.props.reduxAction_doReset();
  }

  render() {
    const { generalStatus, /* statusCode,*/ payload } = this.props.reduxState_page;
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
    } else if (generalStatus === 'fatal') {
      component = <FullPageError retryCallback={() => { this.retryButtonHandler(); }} />;
    } else if (generalStatus === 'error') {
      if (typeof payload === 'string' || payload instanceof String) {
        component = <FullPageError retryCallback={() => { this.retryButtonHandler(); }} title="Backend Error" message={payload} />;
      } else {
        component = <FullPageError retryCallback={() => { this.retryButtonHandler(); }} />;
      }
    } else if (generalStatus === 'success') {
      component = <Viewer data={payload} />;
    } else {
      component = <LoadingArea />;
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
  reduxAction_doFetchData: PropTypes.func,
  reduxAction_doReset: PropTypes.func,
  reduxState_page: PropTypes.any,
  reduxState_authentication: PropTypes.any,
};

Page.defaultProps = {
  reduxAction_doFetchData: () => { },
  reduxAction_doReset: () => { },
  reduxState_page: pageInitialState,
  reduxState_authentication: authenticationInitialState,
};

const mapStateToProps = state => ({
  reduxState_page: state./*change this*/,
  reduxState_authentication: state.authentication,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doFetchData: cookieData => dispatch(pageAction.doFetchData(cookieData)),
  reduxAction_doReset: () => dispatch(pageAction.doReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
