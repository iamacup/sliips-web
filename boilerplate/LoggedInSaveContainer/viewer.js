
import React from 'react';
import PropTypes from 'prop-types';

const Viewer = ({ saveButtonHandler }) => (
  <div>
    <h1>Some component to display with a save handler</h1>
  </div>
    );

Viewer.propTypes = {
  saveButtonHandler: PropTypes.func.isRequired,
};

export default Viewer;
