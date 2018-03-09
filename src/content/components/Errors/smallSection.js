import React from 'react';
import PropTypes from 'prop-types';

import { dNc } from '../../../content/scripts/custom/utilities';

const SmallSectionError = ({ title, message, retryCallback }) => {
  let retryButton = null;

  if (dNc(retryCallback)) {
    retryButton = (
      <button
        className="btn btn-no-style"
        onClick={retryCallback}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          marginTop: 0,
        }}
      >
        <i className="fa fa-refresh" />
      </button>
    );
  }

  return (
    <div className="box-border" style={{ paddingBottom: '6px' }}>
      <div className="text-center" style={{ position: 'relative' }}>
        {retryButton}
        <h3 style={{ paddingTop: '6px' }}>{title}</h3>
        <i className="fa fa-frown-o fa-4x text-purple" />
        <h4>{message}</h4>
      </div>
    </div>
  );
};

SmallSectionError.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  retryCallback: PropTypes.any,
};

SmallSectionError.defaultProps = {
  title: 'Something has gone wrong!',
  message: "We couldn't load this section of the page.",
  retryCallback: null,
};

export default SmallSectionError;
