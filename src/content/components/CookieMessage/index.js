// we turn this off as bootstrap styling etc needs these things to be a not button
/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  showCookieMessage,
  setCookieMessageShownCookie,
} from '../../../content/scripts/custom/utilities';

const cookieNavID = 'cookie-message-navbar';

class CookieMessage extends React.Component {
  static closeMessage() {
    $('#' + cookieNavID).addClass('hidden');
    setCookieMessageShownCookie();
  }

  constructor(props) {
    super(props);

    this.state = {
      timeout: this.props.timeout,
    };
  }

  componentDidMount() {
    if (showCookieMessage()) {
      $('#' + cookieNavID).removeClass('hidden');
      this.tick();
    }
  }

  tick() {
    if (this.state.timeout > 0) {
      setTimeout(() => {
        this.setState({ timeout: this.state.timeout - 1 });
        this.tick();
      }, 1000);
    } else {
      CookieMessage.closeMessage();
    }
  }

  render() {
    return (
      <nav
        className="navbar navbar-inverse navbar-fixed-bottom navbar-cookie hidden"
        id={cookieNavID}
      >
        <div className="container-fluid">
          <ul className="nav navbar-nav navbar-left">
            <span className="visible-xs">
              <a>
                We bet you have seen these cookie messages on other sites. We
                use cookies on this site too.
              </a>
            </span>
            <span className="hidden-xs">
              <a>
                We bet you have seen these cookie messages on other sites.<br />
                We use cookies on this site too.
              </a>
            </span>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <div>
              <form className="text-center navbar-form">
                <Link
                  className="btn-purple-1 btn"
                  to="/cookie-policy"
                  href="/cookie-policy"
                >
                  Learn More
                </Link>
                <button
                  className="btn-purple-2 btn"
                  onClick={CookieMessage.closeMessage}
                >
                  <span>
                    Okay (<span>{this.state.timeout}</span>)
                  </span>
                </button>
              </form>
            </div>
          </ul>
        </div>
      </nav>
    );
  }
}

CookieMessage.propTypes = {
  timeout: PropTypes.number.isRequired,
};

export default CookieMessage;
