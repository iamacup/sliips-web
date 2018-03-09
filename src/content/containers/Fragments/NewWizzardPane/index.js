
/*

  Use of multiple versions of this on the same screen is not recommended but maybe possible. needs testing

  a thing to note is this component keepts track of the data for
  each of the 'steps' and performs data transactions
  so the this.props.step needs to be unique to keep consitency

*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import LoadingArea from '../../../../content/components/Loading';
import QuestionButton from '../../../../content/containers/Fragments/Questions/Utility/QuestionButton';
import QuestionRenderer from '../../../../content/containers/Fragments/Questions/Utility/QuestionRenderer';
import fetchDataBuilder from '../../../../foundation/redux/Factories/FetchData';

import { initialState as questionsInitialState } from '../../../../content/containers/Fragments/Questions/Components/reducer';
import { dNc, formatQuestionObjectForSending } from '../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../content/containers/Fragments/Questions/Components/action';
import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';

// the id to store stuff for this wizzard panel
const dataStoreID = 'newWizzardPaneState';

// fetch actions constants
const fetchDataTransactionStateMainID = 'newWizzardFetchStep';
const FetchStep = fetchDataBuilder(fetchDataTransactionStateMainID);

// save action constants
const saveDataTransactionStateMainID = 'newWizzardSaveStep';
const SaveStep = fetchDataBuilder(saveDataTransactionStateMainID);

// this is the API response number for an error in the questions
const apiQuestionError = '1';

const initialLocalState = {
  save: false,
  answers: null,
};

class NewWizzardPane extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialLocalState;
  }

  componentWillReceiveProps(nextProps) {
    // check to see if we just did a successful save and thus might need to update the state and do callbacks and stuff
    const saveState = nextProps.reduxState_saveDataTransaction;

    const { step, subStep } = nextProps;
    const stateID = step + '_' + subStep;

    if (dNc(saveState[stateID]) && saveState[stateID].finished === true) {
      if (saveState[stateID].generalStatus === 'success' && this.state.save === true) {
        // eslint-disable-next-line react/prop-types
        const { payload } = saveState[stateID];

        // do the callback
        nextProps.submitCallback(payload);

        // update this wizzard state
        nextProps.reduxAction_doUpdate({ data: payload.data, sessionID: payload.sessionID });

        // set the state as nothing
        this.setState(initialLocalState);
      }

      // check to see if we need to set any questions as an error state
      if (saveState[stateID].generalStatus === 'error' &&
      saveState[stateID].statusCode.endsWith(step + '-' + apiQuestionError)) {
      // there has been an error and the status code ends with something like step-number-1 (the -1 is the question error which means we should display some error message on the question)
        const arr = Object.entries(saveState[stateID].payload);

        arr.forEach((value) => {
          const instance = Object.entries(value[1]);
          const questionID = value[0];

          instance.forEach((error) => {
            // check the question is not already set as an error
            if (dNc(nextProps.reduxState_questions[questionID]) && nextProps.reduxState_questions[questionID].error === false) {
              const questionPart = error[0];
              const errorMessage = error[1][0]; // it is technically possible for the API to send more than 1 error back for a part, but UI does not handle this and just ignores by showing only the 0th one

              nextProps.reduxAction_doSetQuestionError(questionID, errorMessage, questionPart);
            }
          });
        });
      }
    }
  }

  // this looks for the {questionID.friendlyName|alternative} thing in titles and
  // [questionID.friendlyName|seperator]
  // do not think this would work for more than 1 of the things existing in the title!
  // todo this could be streamlined, horribly large ammount of code for two rexex replaces
  getNewTitles(data) {
    const { data: currentAnswers } = this.props.reduxState_this;

    const results = [];

    // here we see if we need to replace any of the titles in the data object that are for {} replacements (non array)
    data.forEach((value) => {
      const regex1 = /\{([a-zA-Z]+\/[0-9]+_[0-9a-zA-Z]+)\.([a-zA-Z]+)\|(.*?)\}/g;
      const regex2 = /\[([a-zA-Z]+\/[0-9]+)\.([a-zA-Z]+)\|(.*?)\]/g;
      let m;
      let newTitle = null;

      const sortedRelevantBits = (questionID, friendlyName) => {
        const keys = Object.keys(currentAnswers);
        const foundItems = [];

        keys.forEach((key) => {
          if (key.startsWith(questionID) && dNc(currentAnswers[key][friendlyName])) {
            foundItems.push({
              data: currentAnswers[key][friendlyName],
              arrayValue: Number.parseInt(key.split('_')[1], 10),
              questionID,
            });
          }
        });

        // we sort the values so that they are in order of arrayValue
        const compare = (a, b) => {
          if (a.arrayValue < b.arrayValue) { return -1; }
          if (a.arrayValue > b.arrayValue) { return 1; }
          return 0;
        };

        foundItems.sort(compare);

        return foundItems;
      };

      // THIS CHUNK LOOKS FOR SIMPLE REPLACEMENTS

      // eslint-disable-next-line no-cond-assign
      while ((m = regex1.exec(value.title)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex1.lastIndex) {
          regex1.lastIndex++;
        }

        // we now can see that we have a match and need to do something
        if (m.length === 4) {
          let questionID = m[1];
          const friendlyName = m[2];
          const alternative = m[3];

          const arrayValue = questionID.split('_')[1];
          questionID = questionID.split('_')[0];

          // we pull out all the values that apply and then sort them so we can handle 'last', 'first' etc.
          // we do this by sorting it and then updating the questionID to be what we pull out as the final result
          // we loop the keys looking for something that starts with the questionID and has the friendlyName
          const foundItems = sortedRelevantBits(questionID, friendlyName);

          if (arrayValue === 'last') {
            questionID = foundItems[foundItems.length - 1].questionID;
          } else if (arrayValue === 'first') {
            questionID = foundItems[0].questionID;
          }

          // we have something to replace it with
          if (dNc(currentAnswers[questionID]) && dNc(currentAnswers[questionID][friendlyName])) {
            newTitle = value.title.replace(/\{(.*?)\}/g, currentAnswers[questionID][friendlyName].optionValue);
          } else {
            newTitle = value.title.replace(/\{(.*?)\}/g, alternative);
          }
        }
      }

      // THIS CHUNK LOOKS FOR ARRAY REPLACEMENTS

      // eslint-disable-next-line no-cond-assign
      while ((m = regex2.exec(value.title)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex2.lastIndex) {
          regex2.lastIndex++;
        }

        // we now can see that we have a match and need to do something
        if (m.length === 4) {
          const questionID = m[1];
          const friendlyName = m[2];
          const seperator = m[3];

          // we loop the keys looking for something that starts with the questionID and has the friendlyName
          const foundItems = sortedRelevantBits(questionID, friendlyName);

          // we compile the final string
          let compiledTitle = '';

          foundItems.forEach((item) => {
            compiledTitle += item.data.optionValue + seperator;
          });

          // remove the trailing seperator
          compiledTitle = compiledTitle.substring(0, compiledTitle.length - seperator.length);

          // do the replace
          newTitle = value.title.replace(/\[(.*?)\]/g, compiledTitle);
        }
      }

      if (newTitle === null) {
        results.push(value);
      } else {
        results.push(_.assign({}, value, { title: newTitle }));
      }
    });

    return results;
  }

  questionsWithErrors() {
    const arr = Object.entries(this.props.reduxState_questions);
    let count = 0;

    for (let a = 0; a < arr.length; a++) {
      if (arr[a][1].answered === false || arr[a][1].error === true) {
        // do nothing (this is replaced with a call to doForceValidate)
      } else {
        count++;
      }
    }

    if (count === arr.length) {
      return false;
    }

    return true;
  }

  // if force is true then it will always go
  handleSubmitButton(force) {
    // we instruct the questions to all revalidate - this means that they will put their own error messages onto them
    // the questions will already have the correct validation - we just do this for the error message
    this.props.reduxAction_doForceValidate();

    if (!this.questionsWithErrors() || force === true) {
      // extract the answer data into a format we like
      const formattedAnswers = formatQuestionObjectForSending(
        this.props.reduxState_questions,
      );

      this.setState({ save: true, answers: formattedAnswers });
    }
  }

  drawQuestions(data) {
    const nextButton = (
      <QuestionButton
        key="nextButton"
        buttonAction={() => {
          this.handleSubmitButton();
        }}
        buttonClassName="btn btn-no-style"
        buttonContent={<i className="fa fa-4x fa-arrow-circle-down" />}
        showButtonIfLoggedIn
      />
    );

    const useData = this.getNewTitles(data);

    return (
      <div>
        <QuestionRenderer
          nextStepCallback={() => {
            this.handleSubmitButton();
          }}
          data={useData}
          nextButton={nextButton}
          showTitles
          questionMetaData={'uni-step-' + this.props.step}
        />
      </div>
    );
  }

  render() {
    const fetchState = this.props.reduxState_fetchDataTransaction;
    const saveState = this.props.reduxState_saveDataTransaction;

    let fetchActive = true;
    let saveActive = this.state.save;

    let content = null;

    const { step, subStep, stepDoneContent } = this.props;
    const stateID = step + '_' + subStep;

    // check the fetch transaction has happened
    if (dNc(fetchState[stateID]) && fetchState[stateID].finished === true) {
      if (fetchState[stateID].generalStatus === 'success') {
        content = this.drawQuestions(fetchState[stateID].payload.data);
        fetchActive = false;
      }
    }

    // check the status of the save transaction
    if (dNc(saveState[stateID]) && saveState[stateID].finished === true) {
      if (saveState[stateID].generalStatus === 'success') {
        content = stepDoneContent;
        saveActive = false;
      } else if (saveState[stateID].generalStatus === 'error' && saveState[stateID].statusCode.endsWith(step + '-' + apiQuestionError)) {
        // there has been an error and the status code ends with something like step-number-1 (the -1 is the question error which means we should display some error message on the question)
        // we make the assumption here that because a save has happened, a fetch must have happened and so we can draw some questions
        content = this.drawQuestions(fetchState[stateID].payload.data);
        saveActive = false;
      }
    }

    // we don't display any content if our things are active
    if (fetchActive === true || saveActive === true) {
      content = null;
    }

    const { sessionID } = this.props.reduxState_this;

    const fetchStepTransaction = (
      <FetchStep
        active={fetchActive}
        fetchURL={this.props.fetchAPI + step}
        sendData={{ sessionID }}
        noRender={!fetchActive}
        stateSubID={stateID}
      />
    );

    const saveStepTransaction = (
      <SaveStep
        active={saveActive}
        fetchURL={this.props.saveAPI + step}
        sendData={{
         answers: this.state.answers, sessionID, arrayValue: subStep, ...this.props.additionalSaveSendData,
        }}
        noRender={!saveActive}
        stateSubID={stateID}
      />
    );

    return (
      <div>
        {content}
        {fetchStepTransaction}
        {saveStepTransaction}
      </div>
    );
  }
}

NewWizzardPane.propTypes = {
  reduxAction_doForceValidate: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  reduxAction_doUpdate: PropTypes.func,
  reduxState_fetchDataTransaction: PropTypes.object,
  reduxState_saveDataTransaction: PropTypes.object,
  reduxState_questions: PropTypes.object,
  reduxState_this: PropTypes.object,
  step: PropTypes.string.isRequired,
  subStep: PropTypes.string,
  submitCallback: PropTypes.func,
  stepDoneContent: PropTypes.any,
  saveAPI: PropTypes.string.isRequired,
  fetchAPI: PropTypes.string.isRequired,
  additionalSaveSendData: PropTypes.object,
};

NewWizzardPane.defaultProps = {
  subStep: '0',
  additionalSaveSendData: {},
  reduxAction_doForceValidate: () => {},
  reduxAction_doSetQuestionError: () => {},
  reduxAction_doUpdate: () => {},
  reduxState_fetchDataTransaction: {},
  reduxState_saveDataTransaction: {},
  reduxState_questions: questionsInitialState,
  reduxState_this: {
    data: {},
    sessionID: null,
  },
  submitCallback: () => {},
  stepDoneContent: null,
};

const mapStateToProps = state => ({
  reduxState_saveDataTransaction: state.dataTransactions[saveDataTransactionStateMainID],
  reduxState_fetchDataTransaction: state.dataTransactions[fetchDataTransactionStateMainID],
  reduxState_questions: state.questions,
  reduxState_this: state.dataStoreSingle[dataStoreID],
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doForceValidate: () => dispatch(questionAction.doForceValidate()),
  reduxAction_doUpdate: data => dispatch(storeAction.doUpdate(dataStoreID, data)),
  reduxAction_doSetQuestionError: (questionID, message, name) => dispatch(questionAction.doSetQuestionError(questionID, message, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewWizzardPane);
