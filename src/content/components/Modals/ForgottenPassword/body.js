
import React from 'react';

import ResetPassword from '../../../../content/containers/Fragments/ResetPassword';

const ModalBody = () => (
  <div key="forgottenPasswordBody" className="modal-body text-center">
    <div className="row">
      <div className="col-sm-8 col-sm-push-2">

        <ResetPassword formID="reset-modal-form" />

      </div>
    </div>
  </div>
);

export default ModalBody;
