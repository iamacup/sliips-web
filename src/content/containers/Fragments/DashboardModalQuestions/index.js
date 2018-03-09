import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionRenderWrapper from '../../../../content/containers/Fragments/Questions/Utility/QuestionRenderWrapper';

import { doReset as doDashboardReset } from '../../../../content/containers/Pages/Dashboard/action';
// import { doModalClose } from '../../../../content/containers/Fragments/Modal/action';

class Page extends React.Component {
  saveButtonHandler() {
    // todo for some reason if we use the redux way of closing the modal we get a crash / infinate loop
    // this is not the end of the world because by calling the hide method we will actually fire some stuff that
    // sync the state anyway
    // this.props.reduxAction_doModalClose();
    $('.modal').modal('hide');
    this.props.reduxAction_doDashboardReset();
  }

  render() {
    return (
      <QuestionRenderWrapper
        metaData={{ pathLocation: this.props.pathLocation }}
        data={this.props.data}
        apiURL="api/dashboard/saveData"
        saveSuccessCallback={() => {
          this.saveButtonHandler();
        }}
        questionMetaData="dashboard-question"
        questionErrorStatusCode="/api/dashboard/saveData-2"
      />
    );
  }
}

Page.propTypes = {
  reduxAction_doDashboardReset: PropTypes.func,
  // reduxAction_doModalClose: PropTypes.func,
  data: PropTypes.array.isRequired,
  pathLocation: PropTypes.string.isRequired,
};

Page.defaultProps = {
  reduxAction_doDashboardReset: () => {},
  // reduxAction_doModalClose: () => { },
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doDashboardReset: () => dispatch(doDashboardReset()),
  // reduxAction_doModalClose: () => dispatch(doModalClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
