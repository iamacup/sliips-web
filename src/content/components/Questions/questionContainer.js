import React from 'react';
import PropTypes from 'prop-types';

const QuestionContainer = ({
  title,
  question,
  error,
  errorMessages,
  answered,
  hidden,
}) => {
  let errorClassName = 'question-error-message';
  let statusClassName = 'general-question-container';
  const errors = [];

  if (error !== true) {
    errorClassName = 'hidden';
  } else {
    statusClassName += ' question-error';

    let count = 0;

    errorMessages.forEach((value) => {
      errors.push(<h5 key={count}>{value}</h5>);

      count++;
    });
  }

  if (answered === true) {
    statusClassName += ' question-success';
  }

  if (hidden === true) {
    statusClassName += ' hidden';
  }

  return (
    <div className={statusClassName}>
      <h4>{title}</h4>

      <div style={{ margin: '0px 10px' }}>{question}</div>

      <div className={errorClassName}>{errors}</div>
    </div>
  );
};

QuestionContainer.propTypes = {
  title: PropTypes.string,
  question: PropTypes.any.isRequired,
  error: PropTypes.bool.isRequired,
  answered: PropTypes.bool.isRequired,
  errorMessages: PropTypes.array.isRequired,
  hidden: PropTypes.bool,
};

QuestionContainer.defaultProps = {
  title: '',
  hidden: false,
};

export default QuestionContainer;
