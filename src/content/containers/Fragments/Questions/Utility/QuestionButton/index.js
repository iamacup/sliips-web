import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initialState as questionsInitialState } from '../../../../../../content/containers/Fragments/Questions/Components/reducer';
import { initialState as authenticationInitialState } from '../../../../../../content/containers/Fragments/Authentication/reducer';

class QuestionButton extends React.PureComponent {
  render() {
    const arr = Object.entries(this.props.reduxState_questions);
    let buttonClass = this.props.buttonClassName;

    // check to see how many questions there are on the page - if it is 0 we hide the button
    if (arr.length === 0) {
      buttonClass += ' hidden';
    }

    // we might have to hide the button if the user is logged in
    if (
      this.props.showButtonIfLoggedIn === false &&
      this.props.reduxState_authentication.loggedIn === true
    ) {
      buttonClass += ' hidden';
    }

    // we check that all the questions are answered
    if (this.props.disabled === true) {
      return (
        <button
          onClick={this.props.buttonAction}
          type="submit"
          className={buttonClass}
          disabled
        >
          {this.props.buttonContent}
        </button>
      );
    }
    return (
      <button
        onClick={this.props.buttonAction}
        type="submit"
        className={buttonClass}
      >
        {this.props.buttonContent}
      </button>
    );
  }
}

QuestionButton.propTypes = {
  reduxState_questions: PropTypes.object,
  reduxState_authentication: PropTypes.object,
  buttonAction: PropTypes.func,
  showButtonIfLoggedIn: PropTypes.bool,
  buttonClassName: PropTypes.string.isRequired,
  buttonContent: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
};

QuestionButton.defaultProps = {
  reduxState_questions: questionsInitialState,
  reduxState_authentication: authenticationInitialState,
  buttonAction: () => {},
  showButtonIfLoggedIn: false,
  disabled: false,
};

const mapStateToProps = state => ({
  reduxState_questions: state.questions,
  reduxState_authentication: state.authentication,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionButton);
