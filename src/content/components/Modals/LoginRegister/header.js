import React from 'react';

const ModalHeader = () => (
  <div key="loginRegisterHeader" className="modal-header no-border">
    <button
      type="button"
      className="close"
      data-dismiss="modal"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

export default ModalHeader;
