
import React from 'react';
import PropTypes from 'prop-types';

const Viewer = ({ data }) => (
  <div>
    <h1>We got some data to display!</h1>
  </div>
    );

Viewer.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Viewer;
