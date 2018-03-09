import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends React.PureComponent {
  render() {
    const contactClassName = this.props.active === 'contact' ? 'active' : '';
    const pressClassName = this.props.active === 'press' ? 'active' : '';

    return (
      <header className="header-section c3 text-center">
        <i className="fa fa-comments fa-5x" />
        <br />
        <h1>Let's talk</h1>
        <br />
        <div className="centered-pills">
          <ul role="tablist" className="nav nav-pills">
            <li role="presentation" className={contactClassName}>
              <Link to="/contact-us" href="/contact-us">
                <span>Contact Us</span>
              </Link>
            </li>
            <li role="presentation" className={pressClassName}>
              <Link to="/press" href="/press">
                <span>Press Kit</span>
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
