import React from 'react';
import PropTypes from 'prop-types';

import { nl2br } from '../../../../content/scripts/custom/utilities';

const Viewer = ({ data }) => (
  <div className="container">
    <div className="row">
      <div className="col-sm-2">Time:</div>
      <div className="col-sm-10">{data.time}</div>
    </div>

    <div className="row">
      <div className="col-sm-2">Message:</div>
      <div
        className="col-sm-10"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: nl2br(data.message) }}
      />
    </div>

    <div className="row">
      <div className="col-sm-2">Trace:</div>
      <div
        className="col-sm-10"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: nl2br(data.trace) }}
      />
    </div>

    <div className="row">
      <div className="col-sm-2">Exception:</div>
      <div
        className="col-sm-10"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: nl2br(data.exception) }}
      />
    </div>

    <div className="row">
      <div className="col-sm-2">Session:</div>
      <div
        className="col-sm-10"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: nl2br(data.session) }}
      />
    </div>

    <div className="row">
      <div className="col-sm-2">Post:</div>
      <div
        className="col-sm-10"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: nl2br(data.post) }}
      />
    </div>

    <div className="row">
      <div className="col-sm-2">Get:</div>
      <div
        className="col-sm-10"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: nl2br(data.get) }}
      />
    </div>

    <div className="row">
      <div className="col-sm-2">Cookie:</div>
      <div className="col-sm-10">{data.cookie}</div>
    </div>

    <div className="row">
      <div className="col-sm-2">URL:</div>
      <div className="col-sm-10">{data.url}</div>
    </div>

    <div className="row">
      <div className="col-sm-2">Code:</div>
      <div className="col-sm-10">{data.code}</div>
    </div>

    <div className="row">
      <div className="col-sm-2">Serious:</div>
      <div className="col-sm-10">{data.serious}</div>
    </div>
  </div>
);

Viewer.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Viewer;
