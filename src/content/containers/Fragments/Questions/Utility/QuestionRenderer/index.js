import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionComponentWrapper from '../../../../../../content/containers/Fragments/Questions/Utility/QuestionComponentWrapper';

import { dNc } from '../../../../../../content/scripts/custom/utilities';
import {
  initialState as questionsInitialState,
  questionInitialState as answerInitialState,
} from '../../../../../../content/containers/Fragments/Questions/Components/reducer';

class QuestionRenderer extends React.Component {
  createQuestionHierarchy(data) {
    const resultsArr = [];

    data.forEach((value) => {
      let answerObj = this.props.reduxState_questions[value.questionID];

      if (!dNc(answerObj)) {
        answerObj = answerInitialState;
      }

      const input = {
        data: value,
        answer: answerObj,
        nextStepCallback: this.props.nextStepCallback,
        title: this.props.showTitles === true ? value.title : '',
      };

      resultsArr.push(
        <QuestionComponentWrapper
          questionMetaData={this.props.questionMetaData}
          key={value.questionID}
          type={value.type}
          input={input}
        />,
      );

      // we render any children here
      if (dNc(answerObj.fetch) && answerObj.fetch.generalStatus === 'success') {
        const childResultsArr = this.createQuestionHierarchy(
          answerObj.fetch.payload,
        );

        childResultsArr.forEach((childValue) => {
          resultsArr.push(childValue);
        });
      }
    });

    return resultsArr;
  }

  render() {
    const resultsArr = this.createQuestionHierarchy(this.props.data);
    const { nextButton } = this.props;

    let backButton = null;

    if (dNc(this.props.backButton)) {
      backButton = this.props.backButton; // eslint-disable-line prefer-destructuring
    }

    let buttons = null;

    if (dNc(backButton)) {
      buttons = (
        <div>
          <div className="pull-left">{backButton}</div>
          <div className="pull-right">{nextButton}</div>
          <div className="clearfix" />
        </div>
      );
    } else {
      buttons = nextButton;
    }

    return (
      <div>
        <div className="text-left">{resultsArr}</div>
        {buttons}
      </div>
    );
  }
}

QuestionRenderer.propTypes = {
  reduxState_questions: PropTypes.object,
  data: PropTypes.array.isRequired,
  backButton: PropTypes.any,
  nextButton: PropTypes.any.isRequired,
  nextStepCallback: PropTypes.func,
  showTitles: PropTypes.bool,
  questionMetaData: PropTypes.string.isRequired,
};

QuestionRenderer.defaultProps = {
  reduxState_questions: questionsInitialState,
  backButton: null,
  nextStepCallback: () => {},
  showTitles: true,
};

const mapStateToProps = state => ({
  reduxState_questions: state.questions,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionRenderer);
