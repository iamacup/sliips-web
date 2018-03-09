import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Modal from '../../../content/containers/Fragments/Modal';
import CookieMessage from '../../../content/components/CookieMessage';

import {
  enableSmoothScroll,
  enableWOW,
  authenticationCookieExists,
  getAuthenticationCookie,
  deleteAuthenticationCookie,
  dNc,
} from '../../../content/scripts/custom/utilities';
import { initialState as authenticationInitialState } from '../../../content/containers/Fragments/Authentication/reducer';
import * as authenticationAction from '../../../content/containers/Fragments/Authentication/action';

import '../../../content/theme/custom/scss/application.scss';
import '../../../content/theme/vendor/bootstrap-social.css';
import '../../../content/theme/vendor/formValidation-0.7.1.min.css';

class App extends React.Component {
  componentDidMount() {
    // include the bootstrap javascript
    require('../../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js');

    // Wait for page to load (so the bootstrap plugins etc. are loaded)
    $(() => {
      // make WOW run
      enableWOW();

      // make the smooth scrolling happen
      enableSmoothScroll('a.page-scroll');

      // cleanup bad cookies
      if (this.props.reduxState_authentication.badCookie === true) {
        // drop the cookie entirely, the server render found it was not valid
        deleteAuthenticationCookie();
      }

      // do the cookie login
      if (authenticationCookieExists() === true) {
        this.props.reduxAction_doLoginWithCookieData(getAuthenticationCookie());
      }
    });
  }

  render() {
    let path = 'https://www.sliips.com/';

    // todo this won't work because this component does not have access to the path at server render time, only things instantiated within the route <i.e. components that are made by the router> have access at render time
    if (dNc(this.props.location) && dNc(this.props.location.pathname)) {
      path = 'https://www.sliips.com' + this.props.location.pathname;
    }

    return (
      <div>
        <Helmet
          meta={[
              {
                property: 'og:url',
                content: path,
              },
            ]}
        />
        <Modal id="primary-app-modal" />
        <CookieMessage timeout={10} />
      </div>
    );
  }
}

App.propTypes = {
  reduxAction_doLoginWithCookieData: PropTypes.func.isRequired,
  reduxState_authentication: PropTypes.shape({
    badCookie: PropTypes.bool,
  }),
  location: PropTypes.object,
};

App.defaultProps = {
  reduxState_authentication: authenticationInitialState,
  location: {},
};

// we have to bind the location to the state of this component so navigation updates work properly (i.e. so it detects a change in the location props and thus re renderds the app)
const mapStateToProps = state => ({
  reduxState_authentication: state.authentication,
  location: state.router.location,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doLoginWithCookieData: cookieData =>
    dispatch(authenticationAction.doLoginWithCookieData(cookieData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
