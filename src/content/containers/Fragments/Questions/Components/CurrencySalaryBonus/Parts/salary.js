import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  dNc,
  debounce,
  isNumeric,
} from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class CurrencySalaryBonusQuestionSalaryComponent extends React.Component {
  componentDidMount() {
    // wait for document to be ready
    $(() => {
      // const Inputmask = require('inputmask'); TODO need to make this work with minification

      // eslint-disable-next-line no-undef
      const im = new Inputmask('numeric', {
        radixPoint: '.',
        groupSeparator: ',',
        digits: 2,
        autoGroup: true,
        showMaskOnHover: false,
        showMaskOnFocus: false,
        prefix: this.props.currencySymbol + ' ',
        rightAlign: false,
        autoUnmask: true,
      });

      im.mask(this.salaryTextInput);

      const executeFunction = debounce(() => {
        let optionValue = this.salaryTextInput.inputmask.unmaskedvalue();
        const optionID = null;

        optionValue = optionValue.split('.');
        optionValue =
          optionValue.shift() +
          (optionValue.length ? '.' + optionValue.join('') : '');

        const { questionID, questionIdentifier } = this.props;
        const validity = this.validate({ optionValue, optionID });

        this.props.reduxAction_doUpdateQuestionAnswer(
          questionID,
          questionIdentifier,
          optionID,
          optionValue,
          validity.valid,
        );
      }, 253);

      $(this.salaryTextInput).on('input', executeFunction);

      this.setValueFromState();
    });
  }

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

    // update the currency prefix for this mask
    if (dNc(this.salaryTextInput.inputmask)) {
      this.salaryTextInput.inputmask.option({
        prefix: this.props.currencySymbol + ' ',
      });
    }
  }

  setValueFromState() {
    if (dNc(this.props.answer.optionValue)) {
      this.salaryTextInput.value = this.props.answer.optionValue;
    }
  }

  validate(answer) {
    let error = '';
    let show = false;
    let valid = false;

    if (dNc(answer) && dNc(answer.optionValue)) {
      if (answer.optionValue.length < 1) {
        error = 'Please enter a salary value.';
      } else if (!isNumeric(answer.optionValue)) {
        error = 'The salary does not appear to be a number.';
        show = true;
      } else if (answer.optionValue < 0) {
        error = 'Your salary must be positive!';
        show = true;
      } else {
        valid = true;
      }
    } else {
      error = 'You need to enter an annual salary value.';
    }

    return { valid, error, show };
  }

  doNextStepCallback(e) {
    if (e.keyCode === 13) {
      this.props.nextStepCallback();
    }
  }

  render() {
    return (
      <span className="form-group">
        <input
          onKeyUp={(e) => {
            this.doNextStepCallback(e);
          }}
          placeholder="Your annual salary"
          className="form-control"
          ref={(input) => {
            this.salaryTextInput = input;
          }}
          // style={{ borderRadius: '0', display: 'inline', width: '40%' }}
        />
      </span>
    );
  }
}

CurrencySalaryBonusQuestionSalaryComponent.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  nextStepCallback: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  // options: PropTypes.array.isRequired,
  currencySymbol: PropTypes.string.isRequired,
};

CurrencySalaryBonusQuestionSalaryComponent.defaultProps = {
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
  CurrencySalaryBonusQuestionSalaryComponent,
);
