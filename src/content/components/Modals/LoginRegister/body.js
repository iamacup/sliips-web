import React from 'react';

import Authentication from '../../../../content/containers/Fragments/Authentication';

const ModalBody = () => (
  <div key="loginRegisterBody" className="modal-body text-center">
    <div className="row">
      <div className="col-sm-8 col-sm-push-2">
        <Authentication formID="login-modal-form" />
      </div>
    </div>
  </div>
);

export default ModalBody;
