
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { initialState as pageInitialState } from './reducer';
import * as pageAction from './action';
import Viewer from './viewer';

import FullPageError from '../../../components/Errors/fullPage';
import LoadingArea from '../../../components/Loading';

import { getAuthenticationCookie } from '../../../scripts/sliips/core/utilities';

class Page extends React.Component {

  componentDidMount() {
    this.fetchDataIfNeeded();
  }

  componentDidUpdate() {
    this.fetchDataIfNeeded();
  }

  fetchDataIfNeeded() {
    if (this.props.reduxState_page.finished !== true &&
        this.props.reduxState_page.started !== true) {
      this.props.reduxAction_doFetchData(getAuthenticationCookie());
    }
  }

  retryButtonHandler() {
    this.props.reduxAction_doReset();
  }

  render() {
    const { generalStatus, /* statusCode,*/ payload } = this.props.reduxState_page;
    let component = null;

    if (generalStatus === 'fatal') {
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
        {component}
      </div>
    );
  }
}

Page.propTypes = {
  reduxAction_doFetchData: PropTypes.func,
  reduxAction_doReset: PropTypes.func,
  reduxState_page: PropTypes.any,
};

Page.defaultProps = {
  reduxAction_doFetchData: () => { },
  reduxAction_doReset: () => { },
  reduxState_page: pageInitialState,
};

const mapStateToProps = state => ({
  reduxState_page: state./*change this*/,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doFetchData: cookieData => dispatch(pageAction.doFetchData(cookieData)),
  reduxAction_doReset: () => dispatch(pageAction.doReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
