import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dNc } from '../../../../../../../content/scripts/custom/utilities';
import checkPostCode from '../../../../../../../content/scripts/vendor/postcodes';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class PostcodeQuestionPostcodeComponent extends React.Component {
  componentDidUpdate() {
    this.setValueFromState();

    const { questionIdentifier, questionID, answer } = this.props;
    const validity = this.validate(this.props.answer);

    // set stuff as an error if they need to be
    if (
      validity.valid === false &&
      (validity.show === true || this.props.forceValidate === true) &&
      answer.errorMessage !== validity.error
    ) {
      this.props.reduxAction_doSetQuestionError(
        questionID,
        validity.error,
        questionIdentifier,
      );
    }
  }

  setValueFromState() {
    if (dNc(this.props.answer.optionValue)) {
      this.input.value = this.props.answer.optionValue;
    }
  }

  validate(answer) {
    let error = '';
    const show = false;
    let valid = false;

    if (dNc(answer) && dNc(answer.optionValue)) {
      if (answer.optionValue.length < 1) {
        error = 'Please enter a postcode.';
      } else if (checkPostCode(answer.optionValue) === false) {
        error = 'This does not appear to be a valid postcode.';
      } else {
        valid = true;
      }
    } else {
      error = 'You need to enter a postcode.';
    }

    return { valid, error, show };
  }

  doNextStepCallback(e) {
    if (e.keyCode === 13) {
      this.props.nextStepCallback();
    }
  }

  handleChange() {
    const optionValue = this.input.value;
    const optionID = null;

    const { questionID, questionIdentifier } = this.props;
    const validity = this.validate({ optionValue, optionID });

    /* console.log('HERE');
    console.log(questionID);
    console.log(questionIdentifier);
    console.log(optionID);
    console.log(optionValue);
    console.log(validity); */

    this.props.reduxAction_doUpdateQuestionAnswer(
      questionID,
      questionIdentifier,
      optionID,
      optionValue,
      validity.valid,
    );
  }

  render() {
    return (
      <span className="form-group">
        <input
          onKeyUp={(e) => {
            this.doNextStepCallback(e);
          }}
          placeholder="Your Postcode"
          className="form-control"
          ref={(input) => {
            this.input = input;
          }}
          onChange={() => {
            this.handleChange();
          }}
          // style={{ borderRadius: '0', display: 'inline', width: '40%' }}
        />
      </span>
    );
  }
}

PostcodeQuestionPostcodeComponent.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  nextStepCallback: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  // options: PropTypes.array.isRequired,
};

PostcodeQuestionPostcodeComponent.defaultProps = {
  reduxAction_doUpdateQuestionAnswer: () => {},
  reduxAction_doSetQuestionError: () => {},
  nextStepCallback: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdateQuestionAnswer: (
    questionID,
    name,
    optionID,
    optionValue,
    valid,
  ) =>
    dispatch(
      questionAction.doUpdateQuestionAnswer(
        questionID,
        name,
        optionID,
        optionValue,
        valid,
      ),
    ),
  reduxAction_doSetQuestionError: (questionID, message, name) =>
    dispatch(questionAction.doSetQuestionError(questionID, message, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PostcodeQuestionPostcodeComponent,
);
