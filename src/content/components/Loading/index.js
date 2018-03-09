import React from 'react';
import PropTypes from 'prop-types';

const LoadingArea = ({ hidden }) => {
  let mainClass = 'text-center';

  if (hidden === true) {
    mainClass += ' hidden';
  }

  return (
    <div className={mainClass} style={{ padding: '80px 0' }}>
      <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

LoadingArea.propTypes = {
  hidden: PropTypes.bool,
};

LoadingArea.defaultProps = {
  hidden: false,
};

export default LoadingArea;
