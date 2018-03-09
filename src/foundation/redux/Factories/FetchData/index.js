import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as fetchActions from '../../../../foundation/redux/globals/DataTransactions/actions';

import SmallSectionError from '../../../../content/components/Errors/smallSection';
import LoadingArea from '../../../../content/components/Loading';

import { getAuthenticationCookie, dNc } from '../../../../content/scripts/custom/utilities';

class FetchData extends React.Component {
  componentDidMount() {
    this.resetForNewRequestIfNeeded();
    this.fetchDataIfNeeded();
  }

  componentDidUpdate(prevProps /* , prevState  */) {
    this.resetForNewRequestIfNeeded();
    this.fetchDataIfNeeded();

    const { stateSubID } = this.props;

    if (!dNc(prevProps.reduxState_this[stateSubID]) && dNc(this.props.reduxState_this[stateSubID])) {
      // if the state has been populated
      this.handleCallbacks();
    } else if (dNc(prevProps.reduxState_this[stateSubID]) &&
      dNc(this.props.reduxState_this[stateSubID]) &&
      !_.isEqual(prevProps.reduxState_this[stateSubID], this.props.reduxState_this[stateSubID])
    ) {
      // if the two states are different
      this.handleCallbacks();
    }
  }

  resetForNewRequestIfNeeded() {
    const { stateSubID, sendData, active } = this.props;

    // we only reset if the thing is active!
    // check that there is some sent data present on the state
    if (active && dNc(this.props.reduxState_this[stateSubID]) && dNc(this.props.reduxState_this[stateSubID].sentData)) {
      const { sentData } = this.props.reduxState_this[stateSubID];

      // if it's not started and the send data is different to the sent data then we reset
      if (this.props.reduxState_this[stateSubID].started === false &&
        !_.isEqual(sentData, sendData)) {
        // we refresh the data by dfoing a reset and forcing a new fetch
        this.props.reduxAction_doReset(stateSubID);

        // we throw a callback incase the caller needs to know about this (this was added as a hacky thing - should not really be needed as caller provides the props in the first place!)
        this.props.resetCallback();
      }
    }
  }

  fetchDataIfNeeded() {
    const { fetchURL, stateSubID, sendData } = this.props;

    if (
      // check if we have no state defined, or we have not actually done the transaction
      (!dNc(this.props.reduxState_this[stateSubID]) ||
        (this.props.reduxState_this[stateSubID].finished !== true &&
          this.props.reduxState_this[stateSubID].started !== true)) &&
      // and that this request should be done at all (is this request active?)
      this.props.active === true
    ) {
      this.props.reduxAction_doDataTransaction(
        fetchURL,
        stateSubID,
        getAuthenticationCookie(),
        sendData,
      );
    }
  }

  handleCallbacks() {
    let generalStatus = null;
    let payload = null;
    let statusCode = null;

    const { stateSubID } = this.props;

    if (dNc(this.props.reduxState_this[stateSubID])) {
      ({ generalStatus, payload, statusCode } = this.props.reduxState_this[
        stateSubID
      ]);
    }

    if (generalStatus === 'fatal') {
      this.props.fatalCallback();
    } else if (generalStatus === 'error') {
      this.props.errorCallback(payload, statusCode);
    } else if (generalStatus === 'success') {
      this.props.successCallback(payload, statusCode);
    }
  }

  retryButtonHandler() {
    this.props.reduxAction_doReset(this.props.stateSubID);
  }

  render() {
    if (this.props.noRender === true) {
      return null;
    }

    let generalStatus = null;
    let payload = null;
    let component = null;
    let statusCode = null;

    const { stateSubID } = this.props;

    if (dNc(this.props.reduxState_this[stateSubID])) {
      ({ generalStatus, payload, statusCode } = this.props.reduxState_this[stateSubID]);
    }

    if (generalStatus === 'fatal') {
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
    } else if (generalStatus === 'success') {
      const Viewer = this.props.viewer;

      if (typeof Viewer === 'object') {
        component = Viewer;
      } else {
        component = <Viewer data={payload} statusCode={statusCode} {...this.props.viewerProps} />;
      }
    } else {
      component = <LoadingArea />;
    }

    return <div>{component}</div>;
  }
}

FetchData.propTypes = {
  reduxAction_doDataTransaction: PropTypes.func,
  reduxAction_doReset: PropTypes.func,
  reduxState_this: PropTypes.object,
  sendData: PropTypes.object,
  viewerProps: PropTypes.object,
  viewer: PropTypes.any,
  fetchURL: PropTypes.string.isRequired,
  stateSubID: PropTypes.any,
  active: PropTypes.bool.isRequired,
  noRender: PropTypes.bool,
  fatalCallback: PropTypes.func,
  errorCallback: PropTypes.func,
  successCallback: PropTypes.func,
  resetCallback: PropTypes.func,
};

FetchData.defaultProps = {
  reduxAction_doDataTransaction: () => {},
  reduxAction_doReset: () => {},
  fatalCallback: () => {},
  errorCallback: () => {},
  successCallback: () => {},
  resetCallback: () => {},
  reduxState_this: {},
  viewerProps: {},
  stateSubID: 'default',
  noRender: false,
  viewer: null,
  sendData: {},
};

export default function fetchDataBuilder(stateMainID) {
  const mapStateToProps = state => ({
    reduxState_this: state.dataTransactions[stateMainID],
  });

  const mapDispatchToProps = dispatch => ({
    reduxAction_doDataTransaction: (fetchURL, stateSubID, cookieData, data) =>
      dispatch(
        fetchActions.doDataTransaction(
          fetchURL,
          stateMainID,
          stateSubID,
          cookieData,
          data,
        ),
      ),
    reduxAction_doReset: stateSubID =>
      dispatch(fetchActions.doReset(stateMainID, stateSubID)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(FetchData);
}
