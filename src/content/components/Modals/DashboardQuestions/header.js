import React from 'react';

const ModalHeader = () => (
  <div key="questionHeader" className="modal-header no-border">
    <button
      type="button"
      className="close"
      data-dismiss="modal"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
    <h4 className="modal-title">Just a couple more questions about you... </h4>
  </div>
);

export default ModalHeader;
