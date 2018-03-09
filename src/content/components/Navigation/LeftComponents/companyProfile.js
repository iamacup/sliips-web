import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LeftComponents = ({ companyName }) => (
  <ul className="nav navbar-nav navbar-left">
    <li>
      <Link
        className="navbar-company-title"
        to="/company-list"
        href="/company-list"
      >
        {companyName}
      </Link>
    </li>
  </ul>
);

LeftComponents.propTypes = {
  companyName: PropTypes.string.isRequired,
};

export default LeftComponents;
