// we turn this off as bootstrap styling etc needs these things to be a not button
/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LoginRegisterComponents from '../../../../content/components/Modals/LoginRegister';

import { initialState as authenticationInitialState } from '../../../../content/containers/Fragments/Authentication/reducer';

import * as authenticationAction from '../../../../content/containers/Fragments/Authentication/action';
import * as modalAction from '../../../../content/containers/Fragments/Modal/action';

class RightComponents extends React.PureComponent {
  render() {
    const openModal = this.props.reduxAction_showModal;
    const logout = this.props.reduxAction_doLogout;

    if (this.props.reduxState_authentication.loggedIn === true) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="visible-xs-block">
            <Link to="/profile" href="/profile">
              <i className="fa fa-user" />
              Profile
            </Link>
          </li>
          <li className="visible-xs-block">
            <a
              role="button"
              tabIndex="0"
              onClick={() => {
                logout();
              }}
              onKeyPress={() => {
                logout();
              }}
            >
              <i className="fa fa-sign-out" />
              Logout
            </a>
          </li>

          <li className="dropdown hidden-xs">
            <a
              href="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                alt="Patrick McConnell's Mug Shot"
                width="40"
                height="40"
                src={require('../../../../content/theme/custom/images/people/PM-Circle-small.png')}
                style={{ borderRadius: '50%', marginRight: '10px' }}
              />
              <span style={{ marginRight: '10px' }}>Patrick McConnell</span>
              <span className="caret" />
            </a>
            <ul className="dropdown-menu">
              <li>
                <Link to="/profile" href="/profile">
                  <i className="fa fa-user" />
                  Profile
                </Link>
              </li>
              <li>
                <a
                  role="button"
                  tabIndex="0"
                  onClick={() => {
                    logout();
                  }}
                  onKeyPress={() => {
                    logout();
                  }}
                >
                  <i className="fa fa-sign-out" />
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      );
    }

    return (
      <ul className="nav navbar-nav navbar-right">
        {/* Login stuff */}
        <li className="visible-xs-block">
          <a
            role="button"
            tabIndex="0"
            onClick={() => openModal(LoginRegisterComponents)}
            onKeyPress={() => openModal(LoginRegisterComponents)}
          >
            <span className="fa fa-sign-in" />Login
          </a>
        </li>
        <li className="hidden-xs">
          <a
            role="button"
            tabIndex="0"
            onClick={() => openModal(LoginRegisterComponents)}
            onKeyPress={() => openModal(LoginRegisterComponents)}
          >
            <span className="fa fa-sign-in" />Login
          </a>
        </li>
      </ul>
    );
  }
}

RightComponents.propTypes = {
  reduxAction_doLogout: PropTypes.func,
  reduxState_authentication: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }),
  reduxAction_showModal: PropTypes.func,
};

RightComponents.defaultProps = {
  reduxState_authentication: authenticationInitialState,
  reduxAction_doLogout: () => {},
  reduxAction_showModal: () => {},
};

const mapStateToProps = state => ({
  reduxState_authentication: state.authentication,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doLogout: () => dispatch(authenticationAction.doLogout()),
  reduxAction_showModal: components =>
    dispatch(modalAction.doModalOpen(components)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RightComponents);
