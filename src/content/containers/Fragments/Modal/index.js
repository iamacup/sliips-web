import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initialState as modalInitialState } from './reducer';
import * as modalAction from './action';

class Modal extends React.Component {
  componentDidMount() {
    // include the bootstrap javascript
    require('../../../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js');

    $(() => {
      // test to see if we should be showing the modal
      this.shouldShowModal();

      // need to listen for the modal closing so we update the state of the modal
      $('#' + this.props.id).on('hidden.bs.modal', () => {
        // do some manual cleanup
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        // and update the state
        this.props.reduxAction_hideModal();
      });
    });
  }

  componentDidUpdate() {
    this.shouldShowModal();
  }

  shouldShowModal() {
    if (this.props.reduxState_modal.open === true) {
      this.show();
    } else {
      this.hide();
    }
  }

  show = () => {
    $('#' + this.props.id).modal('show');
  };

  hide = () => {
    $('#' + this.props.id).modal('hide');
  };

  render() {
    const { id } = this.props;

    let Header = this.props.reduxState_modal.components.header;
    let Body = this.props.reduxState_modal.components.body;
    let Footer = this.props.reduxState_modal.components.footer;

    if (typeof Header === 'function') {
      Header = <Header />;
    }

    if (typeof Body === 'function') {
      Body = <Body />;
    }

    if (typeof Footer === 'function') {
      Footer = <Footer />;
    }

    let ModalContent = null;

    if (Header !== null && Body !== null && Footer !== null) {
      ModalContent = (
        <div className="modal-content">
          {Header}
          {Body}
          {Footer}
        </div>
      );
    } else {
      ModalContent = <div className="modal-content" />;
    }

    let modalClassName = 'modal-dialog';

    if (this.props.reduxState_modal.size === modalAction.modalSizeSmall) {
      modalClassName += ' modal-sm';
    } else if (
      this.props.reduxState_modal.size === modalAction.modalSizeLarge
    ) {
      modalClassName += ' modal-lg';
    } else if (this.props.reduxState_modal.size === modalAction.modalSizeHuge) {
      modalClassName += ' modal-huge';
    }

    return (
      <div className="modal fade" tabIndex="-1" role="dialog" id={id}>
        <div className={modalClassName} role="document">
          {ModalContent}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  reduxAction_hideModal: PropTypes.func.isRequired,
  reduxState_modal: PropTypes.shape({
    size: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    components: PropTypes.shape({
      header: PropTypes.any,
      body: PropTypes.any,
      footer: PropTypes.any,
    }),
  }),
};

Modal.defaultProps = {
  reduxState_modal: modalInitialState,
};

const mapStateToProps = state => ({
  reduxState_modal: state.modal,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_hideModal: () => dispatch(modalAction.doModalClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
