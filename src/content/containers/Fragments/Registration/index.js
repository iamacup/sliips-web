import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fetchDataBuilder from '../../../../foundation/redux/Factories/FetchData';
import {
  dNc,
  defaultError,
  setAuthenticationCookie,
} from '../../../../content/scripts/custom/utilities';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';
// import * as authenticationAction from '../../../../content/containers/Fragments/Authentication/action';

const dataStoreID = 'registration';
const RegistrationContainer = fetchDataBuilder('registeration');

class QuestionComponentWrapper extends React.Component {
  componentDidMount() {
    require('formvalidation');
    require('../../../../../node_modules/formvalidation/dist/js/framework/bootstrap.js');

    $(() => {
      const fields = {};

      fields[this.props.formID + '-email'] = {
        validators: {
          notEmpty: {
            message: 'Please enter a valid username',
          },
        },
      };

      $('#' + this.props.formID)
        .formValidation({
          framework: 'bootstrap',
          excluded: ':disabled',
          icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh',
          },
          fields,
        })
        .on('success.form.fv', (e) => {
          e.preventDefault();

          this.registerButtonPress();

          $('#' + this.props.formID)
            .data('formValidation')
            .resetForm();
        });

      this.setFromState();
    });
  }

  setFromState() {
    const thisState = this.props.reduxState_this;

    if (
      dNc(thisState.formData) &&
      dNc(thisState.formData.username) &&
      !dNc($('#' + this.props.formID + '-email').val())
    ) {
      $('#' + this.props.formID + '-email').val(thisState.formData.username);
    }
  }

  registerButtonPress() {
    const email = $('#' + this.props.formID + '-email').val();

    this.props.reduxAction_doUpdate({
      formData: { username: email },
    });
  }

  successHandler(data /* statusCode */) {
    // login with data which will contain the valid JWT
    // this.props.reduxAction_doSetLoginWithCookieDataDiscrete(data);
    setAuthenticationCookie(data);

    this.props.reduxAction_doUpdate({
      action: 'success',
      actionData: data,
    });

    this.props.registerCallback();
  }

  errorHandler(data /* statusCode */) {
    if (typeof data === 'string' || data instanceof String) {
      this.props.reduxAction_doUpdate({
        action: 'error',
        actionData: data,
      });
    } else {
      this.props.reduxAction_doUpdate({
        action: 'error',
        actionData: defaultError,
      });
    }
  }

  render() {
    let active = false;
    let fetchClass = 'hidden';
    let formClass = '';

    const thisState = this.props.reduxState_this;

    if (dNc(thisState.formData) && dNc(thisState.formData.username)) {
      active = true;
      fetchClass = '';
      formClass = 'hidden';
    }

    formClass = '';
    fetchClass = '';

    const registrationForm = (
      <div className={formClass}>
        <form id={this.props.formID}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id={this.props.formID + '-email'}
              name={this.props.formID + '-email'}
              placeholder="your@email.address"
              style={{ height: '52px' }}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-purple-2 btn-block btn-xl"
              style={{ marginTop: '12px' }}
            >
              Register
            </button>
          </div>
        </form>
        <br />
      </div>
    );

    const dataTransaction = (
      <div className={fetchClass}>
        <RegistrationContainer
          active={active}
          fetchURL="api/authentication/registerUsername"
          sendData={thisState.formData}
          refreshComparator={thisState.formData}
          noRender
          fatalCallback={() => {
            this.errorHandler(defaultError);
          }}
          errorCallback={(data, statusCode) => {
            this.errorHandler(data, statusCode);
          }}
          successCallback={(data, statusCode) => {
            this.successHandler(data, statusCode);
          }}
        />
      </div>
    );

    let error = null;

    if (dNc(thisState.action) && thisState.action === 'error') {
      error = (
        <div className="alert alert-danger">
          <h5 style={{ margin: 0 }}>{thisState.actionData}</h5>
        </div>
      );
    }

    return (
      <div>
        {' '}
        {error} {registrationForm} {dataTransaction}{' '}
      </div>
    );
  }
}

QuestionComponentWrapper.propTypes = {
  reduxAction_doUpdate: PropTypes.func,
  // reduxAction_doSetLoginWithCookieDataDiscrete: PropTypes.func,
  reduxState_this: PropTypes.object,
  formID: PropTypes.string.isRequired,
  registerCallback: PropTypes.func,
};

QuestionComponentWrapper.defaultProps = {
  reduxAction_doUpdate: () => {},
  // reduxAction_doSetLoginWithCookieDataDiscrete: () => {},
  reduxState_this: {},
  registerCallback: () => {},
};

const mapStateToProps = state => ({
  reduxState_this: state.dataStoreSingle[dataStoreID],
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: data => dispatch(storeAction.doUpdate(dataStoreID, data)),
  // reduxAction_doSetLoginWithCookieDataDiscrete: cookieData => dispatch(authenticationAction.setLoginWithCookieDataDiscrete(cookieData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  QuestionComponentWrapper,
);
