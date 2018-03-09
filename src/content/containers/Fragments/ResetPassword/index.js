import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initialState as pageInitialState } from './reducer';
import * as pageAction from './action';

import SmallSectionError from '../../../../content/components/Errors/smallSection';
import LoadingArea from '../../../../content/components/Loading';

import { getAuthenticationCookie } from '../../../../content/scripts/custom/utilities';

class Page extends React.Component {
  componentDidMount() {
    require('formvalidation');
    require('../../../../../node_modules/formvalidation/dist/js/framework/bootstrap.js');

    this.doSomethingAboutSaveIfNeeded();

    $(() => {
      const fields = {};

      fields[this.props.formID + '-username'] = {
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

          const username = $('#' + this.props.formID + '-username').val();

          this.saveButtonHandler(username);

          $('#' + this.props.formID)
            .data('formValidation')
            .resetForm();
        });

      // todo this does not work for some reason?
      $('#' + this.props.formID + '-username').focus();
    });
  }

  componentDidUpdate() {
    this.doSomethingAboutSaveIfNeeded();
  }

  doSomethingAboutSaveIfNeeded() {
    if (
      this.props.reduxState_page.finished === true &&
      this.props.reduxState_page.generalStatus === 'success'
    ) {
      // you might want to do something here
      console.log(this.props.reduxState_page);
    }
  }

  saveButtonHandler(username) {
    this.props.reduxAction_doSaveData(getAuthenticationCookie(), { username });
  }

  retryButtonHandler() {
    const username = $('#' + this.props.formID + '-username').val();
    this.saveButtonHandler(username);
  }

  render() {
    const {
      generalStatus,
      /* statusCode, */ payload,
      started,
      finished,
    } = this.props.reduxState_page;
    let component = null;
    let formClassName = 'hidden';

    if (started === true && finished === false) {
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
      if (typeof payload === 'string' || payload instanceof String) {
        formClassName = '';
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
      if (typeof payload === 'string' || payload instanceof String) {
        formClassName = '';
        component = (
          <div className="alert alert-success">
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
    } else {
      formClassName = '';
    }

    return (
      <div>
        <div className={formClassName}>
          <h4>Reset your password</h4>
          <br />
        </div>

        {component}
        <div className={formClassName}>
          <form id={this.props.formID}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id={this.props.formID + '-username'}
                name={this.props.formID + '-username'}
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
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  reduxAction_doSaveData: PropTypes.func,
  reduxState_page: PropTypes.object,
  formID: PropTypes.string.isRequired,
};

Page.defaultProps = {
  reduxAction_doSaveData: () => {},
  reduxState_page: pageInitialState,
};

const mapStateToProps = state => ({
  reduxState_page: state.resetPassword,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doSaveData: (cookieData, saveData) =>
    dispatch(pageAction.doSaveData(cookieData, saveData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
