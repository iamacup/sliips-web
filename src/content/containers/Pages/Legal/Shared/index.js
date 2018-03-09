import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends React.PureComponent {
  render() {
    const cookieClassName = this.props.active === 'cookie' ? 'active' : '';
    const privacyClassName = this.props.active === 'privacy' ? 'active' : '';
    const termsClassName = this.props.active === 'terms' ? 'active' : '';

    return (
      <header className="header-section c3 text-center">
        <i className="fa fa-balance-scale fa-5x" />
        <br />
        <h1>Legal</h1>
        <br />
        <div className="centered-pills">
          <ul role="tablist" className="nav nav-pills">
            <li role="presentation" className={cookieClassName}>
              <Link to="/cookie-policy" href="/cookie-policy">
                <span>Cookie Policy</span>
              </Link>
            </li>
            <li role="presentation" className={privacyClassName}>
              <Link to="/privacy-statement" href="/privacy-statement">
                <span>Privacy Statement</span>
              </Link>
            </li>
            <li role="presentation" className={termsClassName}>
              <Link to="/terms-and-conditions" href="/terms-and-conditions">
                <span>Terms and Conditions</span>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  active: PropTypes.string.isRequired,
};

export default Header;
