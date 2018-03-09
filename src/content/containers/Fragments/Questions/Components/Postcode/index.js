import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import Postcode from '../../../../../../content/containers/Fragments/Questions/Components/Postcode/Parts/postcode';

import { getUsefulQuestionBits } from '../../../../../../content/scripts/custom/utilities';

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
  };

  const question = (
    <Postcode
      {...obj}
      answer={answerBits.postcode}
      options={options.postcode}
      questionIdentifier="postcode"
    />
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
