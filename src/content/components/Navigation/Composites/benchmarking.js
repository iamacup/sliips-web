import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import RightComponents from '../../../../content/components/Navigation/RightComponents/benchmarking';
import LeftComponents from '../../../../content/components/Navigation/LeftComponents/benchmarking';
import NavBar from '../../../../content/components/Navigation/NavBars/general';

// eslint-disable-next-line camelcase
const CompositeNavBar = ({ color, reduxState_authenticationLoggedIn }) => {
  let brand = null;

  // eslint-disable-next-line camelcase
  if (reduxState_authenticationLoggedIn === true) {
    brand = (
      <Link
        style={{ marginTop: '10px' }}
        className="navbar-brand"
        to="/"
        href="/"
      >
        SLIIPS - Salary Analytics
      </Link>
    );
  } else {
    brand = (
      <Link className="navbar-brand" to="/" href="/">
        SLIIPS - Salary Analytics
      </Link>
    );
  }

  return (
    <NavBar
      color={color}
      leftNav={LeftComponents}
      rightNav={RightComponents}
      fixedTop={false}
      brand={brand}
    />
  );
};

CompositeNavBar.propTypes = {
  color: PropTypes.string,
  reduxState_authenticationLoggedIn: PropTypes.bool,
};

CompositeNavBar.defaultProps = {
  color: 'grey',
  reduxState_authenticationLoggedIn: false,
};

const mapStateToProps = state => ({
  reduxState_authenticationLoggedIn: state.authentication.loggedIn,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(CompositeNavBar);
