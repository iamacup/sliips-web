import React from 'react';
import PropTypes from 'prop-types';

import ContactButtons from '../../../content/components/ContactButtons';

import { dNc } from '../../../content/scripts/custom/utilities';

const FullPageError = ({ title, message, retryCallback }) => {
  let retryButton = null;

  if (dNc(retryCallback)) {
    retryButton = (
      <div className="box-border text-purple responsive-margins-1 c2">
        <br />
        <h3 style={{ marginTop: '0' }}>Try pressing this button to fix it: </h3>
        <button className="btn btn-no-style" onClick={retryCallback}>
          <i className="fa fa-4x fa-refresh" />
        </button>
      </div>
    );
  } else {
    retryButton = (
      <h4>
        You might be able to fix this problem with the refresh button in your
        browser.
      </h4>
    );
  }

  return (
    <div className="container text-center">
      {/* animated infinite pulse */}
      <i className="fa fa-heartbeat fa-5x text-purple" />
      <h2>{title}</h2>
      <h3 className="text-muted">{message}</h3>
      <br />
      {retryButton}
      <br />
      <hr />
      <br />
      <h3>Let us know what happened</h3>
      <h4 className="text-purple">
        It's probably our fault and we want to fix it!
      </h4>
      <br />
      <ContactButtons />
    </div>
  );
};

FullPageError.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  retryCallback: PropTypes.any,
};

FullPageError.defaultProps = {
  title: 'There has been a problem with our backend!',
  message: 'We got a strange response, maybe it is having a bad day :(',
  retryCallback: null,
};

export default FullPageError;
