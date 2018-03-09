import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as modalAction from '../../../../content/containers/Fragments/Modal/action';

class ModalFooter extends React.PureComponent {
  render() {
    const hideModal = this.props.reduxAction_hideModal;

    return (
      <div key="loginRegisterFooter" className="modal-footer">
        <div className="text-center">
          <h4>
            Don't have an account?{' '}
            <Link onClick={hideModal} to="/get-started/1" href="/get-started/1">
              Get started here!
            </Link>
          </h4>
        </div>
      </div>
    );
  }
}

ModalFooter.propTypes = {
  reduxAction_hideModal: PropTypes.func.isRequired,
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_hideModal: () => dispatch(modalAction.doModalClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalFooter);
