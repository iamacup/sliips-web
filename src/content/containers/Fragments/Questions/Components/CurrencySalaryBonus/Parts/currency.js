import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  dNc,
  currencySymbolLookup,
} from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class CurrencySalaryBonusQuestionCurrencyComponent extends React.Component {
  componentDidMount() {
    // wait for document to be ready
    $(() => {
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
  }

  setValueFromState() {
    // because this question's render method automatically uses the state - we only care about the instance where there is no state
    if (!dNc(this.props.answer.optionValue)) {
      this.props.options.forEach((value) => {
        // we default set the currency value here! TODO fetch country from API
        if (value.optionValue === 'GBP') {
          this.buttonClick(value.optionID, value.optionValue);
        }
      });
    }
  }

  validate(answer) {
    let error = '';
    let show = false;
    let valid = false;

    if (dNc(answer) && dNc(answer.optionID)) {
      valid = true;
    } else {
      error = 'You need to select a currency.';
      show = false;
    }

    return { valid, error, show };
  }

  buttonClick(optionID, optionValue) {
    const { questionID, questionIdentifier } = this.props;
    const validity = this.validate({ optionValue, optionID });

    this.props.reduxAction_doUpdateQuestionAnswer(
      questionID,
      questionIdentifier,
      optionID,
      optionValue,
      validity.valid,
    );
  }

  render() {
    const buttons = [];

    this.props.options.forEach((value) => {
      const obj = (
        <li key={value.optionID}>
          <button
            onClick={() => {
              this.buttonClick(value.optionID, value.optionValue);
            }}
            className="btn btn-purple-1 btn-block"
          >
            {currencySymbolLookup(value.optionValue) + ' ' + value.optionValue}
          </button>
        </li>
      );

      buttons.push(obj);
    });

    // todo this need to be a better default value
    let currency = '';

    if (dNc(this.props.answer.optionValue)) {
      currency =
        this.props.currencySymbol + ' ' + this.props.answer.optionValue;
    }

    return (
      <span className="dropdown question-currency-dropdown">
        <button
          className="btn btn-purple-1 dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          // style={{
          //     marginRight: '0', marginTop: '4px', height: '46px', width: '15%',
          //    }}
        >
          {currency} <span className="caret" />
        </button>
        <ul className="dropdown-menu text-left">{buttons}</ul>
      </span>
    );
  }
}

CurrencySalaryBonusQuestionCurrencyComponent.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  // nextStepCallback: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  currencySymbol: PropTypes.string.isRequired,
};

CurrencySalaryBonusQuestionCurrencyComponent.defaultProps = {
  reduxAction_doUpdateQuestionAnswer: () => {},
  reduxAction_doSetQuestionError: () => {},
  // nextStepCallback: () => { },
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
  CurrencySalaryBonusQuestionCurrencyComponent,
);
