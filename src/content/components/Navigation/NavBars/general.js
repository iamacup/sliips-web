import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { dNc } from '../../../../content/scripts/custom/utilities';

class NavBar extends React.Component {
  componentDidMount() {
    // Wait for page to load (so the bootstrap plugins etc. are loaded)
    $(() => {
      // Highlight the top nav as scrolling occurs
      if (this.props.fixedTop === true) {
        $('body').scrollspy({
          target: '.navbar-fixed-top',
          offset: 51,
        });

        // Offset for Main Navigation
        $('#' + this.props.navID).affix({
          offset: {
            top: 100,
          },
        });

        // we need the padding here
        if (this.props.applyPadding === true) {
          $('body').css('margin-top', '50px');
        }
      }

      // Closes the Responsive Menu on Menu Item Click
      $('.navbar-collapse ul li a').click(() => {
        $('.navbar-toggle:visible').click();
      });
    });
  }

  render() {
    let LeftNav = this.props.leftNav;
    let RightNav = this.props.rightNav;
    let CenterNav = this.props.centerNav;

    if (typeof LeftNav === 'function') {
      LeftNav = <LeftNav />;
    }

    if (typeof RightNav === 'function') {
      RightNav = <RightNav />;
    }

    if (typeof CenterNav === 'function') {
      CenterNav = <CenterNav />;
    }

    let navbarClass = 'navbar navbar-default';

    if (this.props.fixedTop === true) {
      navbarClass += ' navbar-fixed-top';
    }

    if (this.props.color === 'white') {
      navbarClass += ' navbar-second';
    } else if (this.props.color === 'grey') {
      navbarClass += ' navbar-always-affix';
    } else if (this.props.color === 'transparent') {
      navbarClass += ' navbar-invis';
    }

    if (dNc(this.props.baseClass)) {
      navbarClass += ' ' + this.props.baseClass;
    }

    return (
      <nav id={this.props.navID} className={navbarClass}>
        <div className="container-fluid">
          {/* <!-- Brand and toggle get grouped for better mobile display --> */}
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            {this.props.brand}
          </div>

          {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            {LeftNav}
            {CenterNav}
            {RightNav}
          </div>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  leftNav: PropTypes.any.isRequired,
  rightNav: PropTypes.any.isRequired,
  color: PropTypes.string.isRequired,
  centerNav: PropTypes.any,
  fixedTop: PropTypes.bool,
  navID: PropTypes.string,
  brand: PropTypes.any,
  baseClass: PropTypes.string,
  applyPadding: PropTypes.bool,
};

NavBar.defaultProps = {
  fixedTop: true,
  navID: 'mainNav',
  brand: (
    <Link className="navbar-brand" to="/" href="/">
      Sliips
    </Link>
  ),
  baseClass: '',
  centerNav: null,
  applyPadding: true,
};

export default NavBar;
