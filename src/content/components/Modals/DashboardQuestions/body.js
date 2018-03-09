import React from 'react';
import PropTypes from 'prop-types';

import ModalQuestions from '../../../../content/containers/Fragments/DashboardModalQuestions';

const body = ({ data, pathLocation }) => (
  <div key="payslipBody" className="modal-body text-center">
    <ModalQuestions data={data} pathLocation={pathLocation} />
  </div>
);

body.propTypes = {
  data: PropTypes.array.isRequired,
  pathLocation: PropTypes.string.isRequired,
};

export default body;
