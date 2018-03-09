
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { initialState as pageInitialState } from './reducer';
import * as pageAction from './action';
import Viewer from './viewer';

import LoadingArea from '../../../components/Loading';
import FullPageError from '../../../components/Errors/fullPage';

import { getAuthenticationCookie } from '../../../scripts/sliips/core/utilities';

class Page extends React.Component {

  componentDidMount() {
    this.fetchDataIfNeeded();
    this.doSomethingAboutSaveIfNeeded();
  }

  componentDidUpdate() {
    this.fetchDataIfNeeded();
    this.doSomethingAboutSaveIfNeeded();
  }

  fetchDataIfNeeded() {
    if (this.props.reduxState_page.fetch.finished !== true &&
        this.props.reduxState_page.fetch.started !== true) {
      this.props.reduxAction_doFetchData(getAuthenticationCookie());
    }
  }

  doSomethingAboutSaveIfNeeded() {
    if (this.props.reduxState_page.lastAction === 'save' && 
      this.props.reduxState_page.save.finished === true && 
      this.props.reduxState_page.save.generalStatus === 'success') {
      // you might want to do something here
    }
  }

  saveButtonHandler() {
    // TODO
    this.props.reduxAction_doSaveData(getAuthenticationCookie(), { changeThis: true });
  }

  retryButtonHandler() {
    if (this.props.reduxState_page.lastAction === 'save') {
      this.saveButtonHandler();
    } else {
      this.props.reduxAction_doResetFetch();
    }
  }

  render() {
    const { generalStatus: generalStatusFetch,
      statusCode: statusCodeFetch,
      payload: payloadFetch } = this.props.reduxState_page.fetch;
    const { generalStatus: generalStatusSave,
      statusCode: statusCodeSave,
      payload: payloadSave } = this.props.reduxState_page.save;
    const lastAction = this.props.reduxState_page.lastAction;

    let component = null;

    if (generalStatusFetch === 'fatal' || generalStatusSave === 'fatal') {
      component = <FullPageError retryCallback={() => { this.retryButtonHandler(); }} />;
    } else if (generalStatusFetch === 'error' || generalStatusSave === 'error') {
      if (lastAction === 'save' && (typeof payloadSave === 'string' || payloadSave instanceof String)) {
        component = <FullPageError retryCallback={() => { this.retryButtonHandler(); }} title="Backend Error" message={payloadSave} />;
      } else if (lastAction === 'fetch' && (typeof payloadFetch === 'string' || payloadFetch instanceof String)) {
        component = <FullPageError retryCallback={() => { this.retryButtonHandler(); }} title="Backend Error" message={payloadFetch} />;
      } else {
        component = <FullPageError retryCallback={() => { this.retryButtonHandler(); }} />;
      }
    } else if (generalStatusFetch === 'success') {
      component = <Viewer saveButtonHandler={() => { this.saveButtonHandler(); }} data={payloadFetch} />;
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
  reduxAction_doSaveData: PropTypes.func,
  reduxAction_doResetFetch: PropTypes.func,
  reduxState_page: PropTypes.object,
};

Page.defaultProps = {
  reduxAction_doFetchData: () => { },
  reduxAction_doSaveData: () => { },
  reduxAction_doResetFetch: () => { },
  reduxState_page: pageInitialState,
};

const mapStateToProps = state => ({
  reduxState_page: state./*change this*/,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doFetchData: cookieData => dispatch(pageAction.doFetchData(cookieData)),
  reduxAction_doSaveData: (cookieData, saveData) => dispatch(pageAction.doSaveData(cookieData, saveData)),
  reduxAction_doResetFetch: () => dispatch(pageAction.doResetFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
