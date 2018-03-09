import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { initialState as pageInitialState } from './reducer';
import * as pageAction from './action';

import Authentication from '../../../../content/containers/Fragments/Authentication';
import FullPageError from '../../../../content/components/Errors/fullPage';
import LoadingArea from '../../../../content/components/Loading';
import NavBar from '../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../content/components/Footers/general';

import * as authenticationAction from '../../../../content/containers/Fragments/Authentication/action';

import { getAuthenticationCookie } from '../../../../content/scripts/custom/utilities';

class Page extends React.Component {
  componentDidMount() {
    this.fetchDataIfNeeded();
  }

  componentDidUpdate() {
    this.fetchDataIfNeeded();

    if (this.props.reduxState_authenticationLoggedIn === true) {
      if (this.props.location.pathname.startsWith('/reset-password')) {
        this.context.router.history.push('/profile');
      } else {
        this.context.router.history.push('/');
      }
    }
  }

  fetchDataIfNeeded() {
    if (
      this.props.reduxState_page.finished !== true &&
      this.props.reduxState_page.started !== true
    ) {
      this.props.reduxAction_doFetchData(
        getAuthenticationCookie(),
        this.props.match.params.id,
      );
    }
  }

  retryButtonHandler() {
    this.props.reduxAction_doReset();
  }

  render() {
    const {
      generalStatus,
      /* statusCode, */ payload,
    } = this.props.reduxState_page;
    let component = null;

    if (generalStatus === 'fatal') {
      component = (
        <FullPageError
          retryCallback={() => {
            this.retryButtonHandler();
          }}
        />
      );
    } else if (generalStatus === 'error') {
      if (typeof payload === 'string' || payload instanceof String) {
        component = (
          <div className="text-center">
            <div className="row">
              <div className="col-sm-6 col-sm-push-3 col-xs-10 col-xs-push-1">
                <h3>There was a problem...</h3>
                <div className="alert alert-danger">
                  <h4 style={{ margin: 0 }}>{payload}</h4>
                </div>
                <br />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4 col-sm-push-4 col-xs-10 col-xs-push-1">
                <div className="drop-shadow box-padding emphasis-section-top">
                  <Authentication formID="login-page-form" />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        component = (
          <FullPageError
            retryCallback={() => {
              this.retryButtonHandler();
            }}
          />
        );
      }
    } else if (
      generalStatus === 'success' &&
      this.props.reduxState_authenticationLoggedIn !== true
    ) {
      this.props.reduxAction_doSetLoginWithCookieData(payload);
      // we just set to loading area pending componentDidMount logic execution
      component = <LoadingArea />;
    } else {
      // we just set to loading area pending componentDidMount logic execution
      component = <LoadingArea />;
    }

    return (
      <div>
        <Helmet title="Login With Link" />
        <NavBar />
        <div className="container">
          <div className="c1 page-section">{component}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

Page.propTypes = {
  reduxAction_doFetchData: PropTypes.func,
  reduxAction_doReset: PropTypes.func,
  reduxAction_doSetLoginWithCookieData: PropTypes.func,
  reduxState_page: PropTypes.any,
  reduxState_authenticationLoggedIn: PropTypes.bool,
  match: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
};

Page.defaultProps = {
  reduxAction_doFetchData: () => {},
  reduxAction_doReset: () => {},
  reduxAction_doSetLoginWithCookieData: () => {},
  reduxState_page: pageInitialState,
  reduxState_authenticationLoggedIn: false,
};

Page.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  reduxState_page: state.loginPage,
  reduxState_authenticationLoggedIn: state.authentication.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doFetchData: (cookieData, loginString) =>
    dispatch(pageAction.doFetchData(cookieData, loginString)),
  reduxAction_doReset: () => dispatch(pageAction.doReset()),
  reduxAction_doSetLoginWithCookieData: cookieData =>
    dispatch(authenticationAction.setLoginWithCookieData(cookieData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
