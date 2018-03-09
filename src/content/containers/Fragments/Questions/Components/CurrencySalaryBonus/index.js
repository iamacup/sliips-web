import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import Currency from '../../../../../../content/containers/Fragments/Questions/Components/CurrencySalaryBonus/Parts/currency';
import Salary from '../../../../../../content/containers/Fragments/Questions/Components/CurrencySalaryBonus/Parts/salary';
import Bonus from '../../../../../../content/containers/Fragments/Questions/Components/CurrencySalaryBonus/Parts/bonus';

import {
  dNc,
  currencySymbolLookup,
  getUsefulQuestionBits,
} from '../../../../../../content/scripts/custom/utilities';

const CurrencySalaryBonusQuestionComponent = ({
  data,
  answer,
  nextStepCallback,
  title,
  showingAnswer,
}) => {
  const { questionID, options } = data;
  const { answerBits, errorBits } = getUsefulQuestionBits(
    options,
    answer.answer,
  );

  const obj = {
    questionID,
    forceValidate: answer.forceValidate,
    nextStepCallback,
    currencySymbol: '£',
  };

  if (dNc(answerBits.currency.optionValue)) {
    obj.currencySymbol = currencySymbolLookup(answerBits.currency.optionValue);
  }

  let bonus = null;

  if (
    dNc(answerBits.grossSalary.optionValue) &&
    // check the thing is not set to no bonus
    !(
      dNc(answerBits.bonus.optionValue) &&
      answerBits.bonus.optionValue === '_NO_BONUS_'
    )
  ) {
    bonus = (
      <Bonus
        {...obj}
        answer={answerBits.bonus}
        options={options.bonus}
        questionIdentifier="bonus"
      />
    );
  }

  const question = (
    <div className="row flex-v-center-sm">
      <div className="col-sm-3 text-center">
        <Currency
          {...obj}
          answer={answerBits.currency}
          options={options.currency}
          questionIdentifier="currency"
        />
      </div>
      <div className="col-sm-9">
        <Salary
          {...obj}
          answer={answerBits.grossSalary}
          options={options.grossSalary}
          questionIdentifier="grossSalary"
        />
        {bonus}
      </div>
    </div>
  );

  return (
    <QuestionContainer
      hidden={showingAnswer}
      title={title}
      question={question}
      error={answer.error}
      errorMessages={errorBits}
      answered={answer.answered}
    />
  );
};

CurrencySalaryBonusQuestionComponent.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
  showingAnswer: PropTypes.bool.isRequired,
};

CurrencySalaryBonusQuestionComponent.defaultProps = {
  nextStepCallback: () => {},
};

export default CurrencySalaryBonusQuestionComponent;
