import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import CompanySelectWithRemoteLookup from '../../../../../../content/containers/Fragments/Questions/Components/Select/Parts/CompanySelectWithRemoteLookup';
import SelectWithOptions from '../../../../../../content/containers/Fragments/Questions/Components/Select/Parts/SelectWithOptions';

import {
  getUsefulQuestionBits,
  getQuestionIdentifiers,
} from '../../../../../../content/scripts/custom/utilities';

const SelectQuestionComponent = ({
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

  if (drawData.type === 'companySelectWithRemoteLookup') {
    // get the questionIdentifier
    const questionIdentifier = getQuestionIdentifiers(options);

    question = (
      <CompanySelectWithRemoteLookup
        {...obj}
        answer={answerBits[questionIdentifier]}
        options={options[questionIdentifier]}
        questionIdentifier={questionIdentifier}
      />
    );
  } else if (drawData.type === 'selectWithOptionsAllowAdd') {
    // get the questionIdentifier
    const questionIdentifier = getQuestionIdentifiers(options);

    question = (
      <SelectWithOptions
        {...obj}
        answer={answerBits[questionIdentifier]}
        options={options[questionIdentifier]}
        questionIdentifier={questionIdentifier}
        allowAdd
      />
    );
  } else if (drawData.type === 'selectWithOptions') {
    // get the questionIdentifier
    const questionIdentifier = getQuestionIdentifiers(options);

    question = (
      <SelectWithOptions
        {...obj}
        answer={answerBits[questionIdentifier]}
        options={options[questionIdentifier]}
        questionIdentifier={questionIdentifier}
        allowAdd={false}
      />
    );
  } else {
    // todo handle error state here
    console.log('error state here TODO');
    console.log(drawData.type);
  }

  return (
    <QuestionContainer
      title={title}
      question={question}
      error={answer.error}
      errorMessages={errorBits}
      answered={answer.answered}
      hidden={showingAnswer}
    />
  );
};

SelectQuestionComponent.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
  showingAnswer: PropTypes.bool.isRequired,
};

SelectQuestionComponent.defaultProps = {
  nextStepCallback: () => {},
};

export default SelectQuestionComponent;
