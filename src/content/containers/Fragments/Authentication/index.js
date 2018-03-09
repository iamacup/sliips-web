import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as authenticationAction from './action';

import LoadingArea from '../../../../content/components/Loading';
import SmallSectionError from '../../../../content/components/Errors/smallSection';
import ResetPassword from '../../../../content/containers/Fragments/ResetPassword';

import { getAuthenticationCookie } from '../../../../content/scripts/custom/utilities';

class Authentication extends React.Component {
  componentDidMount() {
    require('formvalidation');
    require('../../../../../node_modules/formvalidation/dist/js/framework/bootstrap.js');

    $(() => {
      this.stage1Form();
      this.stage2Form();

      // todo this does not work for some reason?
      $('#' + this.props.formID + '-first-username').focus();
    });
  }

  componentDidUpdate() {
    const { statusCode, payload } = this.props.reduxState_authentication;

    if (statusCode === '/api/authentication/loginStep1-2') {
      // $('#' + this.props.formID + '-second-password').focus();
    } else if (statusCode === '/api/authentication/loginStep2-2') {
      this.props.reduxAction_doSetLoginWithCookieData(payload);
      $('.modal').modal('hide');
    }
  }

  stage1Form() {
    const fields = {};

    fields[this.props.formID + '-first-username'] = {
      validators: {
        notEmpty: {
          message: 'Please enter a valid username',
        },
      },
    };

    $('#' + this.props.formID + '-first')
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

        // copy the username over to the password form in case we need to use it
        const username = $('#' + this.props.formID + '-first-username').val();
        this.props.reduxAction_doSetStage1Username(username);

        this.performStage1();

        $('#' + this.props.formID + '-first')
          .data('formValidation')
          .resetForm();
      });
  }

  stage2Form() {
    const fields = {};

    fields[this.props.formID + '-second-username'] = {
      validators: {
        notEmpty: {
          message: 'Please enter a valid username',
        },
      },
    };

    fields[this.props.formID + '-second-password'] = {
      validators: {
        notEmpty: {
          message: 'Please enter a password',
        },
      },
    };

    $('#' + this.props.formID + '-second')
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

        this.performStage2();

        $('#' + this.props.formID + '-second')
          .data('formValidation')
          .resetForm();
      });
  }

  performStage1() {
    const username = $('#' + this.props.formID + '-first-username').val();

    this.props.reduxAction_doLogin(
      getAuthenticationCookie(),
      { username },
      'api/authentication/loginStep1',
    );
  }

  performStage2() {
    const username = $('#' + this.props.formID + '-second-username').val();
    const password = $('#' + this.props.formID + '-second-password').val();

    this.props.reduxAction_doLogin(
      getAuthenticationCookie(),
      { username, password },
      'api/authentication/loginStep2',
    );
  }

  retryButtonHandler() {
    console.log('TODO');
  }

  secondNameChange() {
    const username = $('#' + this.props.formID + '-second-username').val();
    this.props.reduxAction_doSetStage1Username(username);
  }

  render() {
    const {
      generalStatus,
      statusCode,
      payload,
      started,
      finished,
    } = this.props.reduxState_authentication;

    let component = null;

    let firstFormClassName = 'hidden';
    let secondFormClassName = 'hidden';
    let resetFormClassName = 'hidden';

    if (this.props.reduxState_authentication.showResetPassword === true) {
      resetFormClassName = '';
    } else if (started === true && finished === false) {
      component = <LoadingArea />;
    } else if (generalStatus === 'fatal') {
      component = (
        <SmallSectionError
          retryCallback={() => {
            this.retryButtonHandler();
          }}
        />
      );
    } else if (generalStatus === 'error') {
      if (
        statusCode === '/api/authentication/loginStep1-3' ||
        statusCode === '/api/authentication/loginStep1-4'
      ) {
        firstFormClassName = '';
        component = (
          <div className="alert alert-danger">
            <h5 style={{ margin: 0 }}>{payload}</h5>
          </div>
        );
      } else if (
        statusCode === '/api/authentication/loginStep2-3' ||
        statusCode === '/api/authentication/loginStep2-1'
      ) {
        secondFormClassName = '';
        component = (
          <div className="alert alert-danger">
            <h5 style={{ margin: 0 }}>{payload}</h5>
          </div>
        );
      } else if (typeof payload === 'string' || payload instanceof String) {
        component = (
          <div className="alert alert-danger">
            <h5 style={{ margin: 0 }}>{payload}</h5>
          </div>
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
      if (statusCode === '/api/authentication/loginStep1-1') {
        // does not have password
        component = (
          <div className="alert alert-success">
            <h5 style={{ margin: 0 }}>
              We have sent you an email with your login link. Click this link to
              login.
            </h5>
          </div>
        );
      } else if (statusCode === '/api/authentication/loginStep2-2') {
        // successful login needs to happen (in componentDidUpdate)
      } else if (statusCode === '/api/authentication/loginStep1-2') {
        // has password
        secondFormClassName = '';
      }
    } else {
      // we just run the form because here we know they have not started doing anything
      firstFormClassName = '';
    }

    return (
      <div>
        <div className={firstFormClassName}>
          <h4>Login to Sliips</h4>
          <br />
        </div>

        <div className={secondFormClassName}>
          <h4>Login to Sliips</h4>
          <br />
        </div>

        {component}

        <div className={firstFormClassName}>
          <form id={this.props.formID + '-first'}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id={this.props.formID + '-first-username'}
                name={this.props.formID + '-first-username'}
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
                Login
              </button>
            </div>
          </form>
          <br />
          <button
            onClick={() => {
              this.props.reduxAction_doSetResetPassword();
            }}
          >
            Forgotten your password?
          </button>
        </div>

        <div className={secondFormClassName}>
          <form id={this.props.formID + '-second'}>
            <div className="form-group">
              <input
                type="text"
                value={this.props.reduxState_authentication.stage1Username}
                className="form-control"
                id={this.props.formID + '-second-username'}
                name={this.props.formID + '-second-username'}
                placeholder="your@email.address"
                style={{ height: '52px' }}
                onChange={() => {
                  this.secondNameChange();
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id={this.props.formID + '-second-password'}
                name={this.props.formID + '-second-password'}
                placeholder="Your Password"
                style={{ marginTop: '12px', height: '52px' }}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-purple-2 btn-block btn-xl"
                style={{ marginTop: '12px' }}
              >
                Login
              </button>
            </div>
          </form>
          <br />
          <button
            onClick={() => {
              this.props.reduxAction_doSetResetPassword();
            }}
          >
            Forgotten your password?
          </button>
        </div>

        <div className={resetFormClassName}>
          <ResetPassword
            formID={this.props.formID + '-reset-authentication-form'}
          />
          <br />
          <button
            onClick={() => {
              this.props.reduxAction_doSetLogin();
            }}
          >
            Return to login
          </button>
        </div>
      </div>
    );
  }
}

Authentication.propTypes = {
  reduxAction_doLogin: PropTypes.func,
  formID: PropTypes.string.isRequired,
  reduxState_authentication: PropTypes.any.isRequired,
  reduxAction_doSetLoginWithCookieData: PropTypes.func,
  reduxAction_doSetResetPassword: PropTypes.func,
  reduxAction_doSetLogin: PropTypes.func,
  reduxAction_doSetStage1Username: PropTypes.func,
};

Authentication.defaultProps = {
  reduxAction_doLogin: () => {},
  reduxAction_doSetLoginWithCookieData: () => {},
  reduxAction_doSetResetPassword: () => {},
  reduxAction_doSetLogin: () => {},
  reduxAction_doSetStage1Username: () => {},
};

const mapStateToProps = state => ({
  reduxState_authentication: state.authentication,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doLogin: (cookieData, loginData, url) =>
    dispatch(authenticationAction.doFetchData(cookieData, loginData, url)),
  reduxAction_doSetLoginWithCookieData: cookieData =>
    dispatch(authenticationAction.setLoginWithCookieData(cookieData)),
  reduxAction_doSetResetPassword: () =>
    dispatch(authenticationAction.setResetPassword()),
  reduxAction_doSetLogin: () => dispatch(authenticationAction.setLogin()),
  reduxAction_doSetStage1Username: username =>
    dispatch(authenticationAction.setStage1Username(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
