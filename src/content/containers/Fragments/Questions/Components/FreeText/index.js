import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import Multiline from '../../../../../../content/containers/Fragments/Questions/Components/FreeText/Parts/multiline';
import Singleline from '../../../../../../content/containers/Fragments/Questions/Components/FreeText/Parts/singleline';

import {
  getUsefulQuestionBits,
  getQuestionIdentifiers,
} from '../../../../../../content/scripts/custom/utilities';

const FreeTextQuestionComponent = ({
  data,
  answer,
  nextStepCallback,
  title,
  showingAnswer,
}) => {
  const { questionID, options, drawData } = data;
  const { answerBits, errorBits } = getUsefulQuestionBits(
    options,
    answer.answer,
  );

  const obj = {
    questionID,
    forceValidate: answer.forceValidate,
    nextStepCallback,
    drawData,
  };

  let question = null;
  const questionIdentifier = getQuestionIdentifiers(options);

  if (drawData.type === 'multiline') {
    question = (
      <Multiline
        {...obj}
        answer={answerBits[questionIdentifier]}
        options={options[questionIdentifier]}
        questionIdentifier={questionIdentifier}
      />
    );
  } else {
    question = (
      <Singleline
        {...obj}
        answer={answerBits[questionIdentifier]}
        options={options[questionIdentifier]}
        questionIdentifier={questionIdentifier}
      />
    );
  }

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

FreeTextQuestionComponent.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
  showingAnswer: PropTypes.bool.isRequired,
};

FreeTextQuestionComponent.defaultProps = {
  nextStepCallback: () => {},
};

export default FreeTextQuestionComponent;
