import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  dNc,
  getAPIUrl,
  logError,
  select2GetCorrectParent,
  select2EnableOpenOnFocus,
  optionIDRegex,
  setSelect2Value,
  encodeEntities,
} from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class SelectQuestionCompanySelectWithRemoteLookupComponent extends React.Component {
  componentDidMount() {
    // wait for document to be ready
    $(() => {
      const placeholder = 'please select a company name';
      const minimumInputLength = 1;
      const dropdownParent = select2GetCorrectParent(this.input);
      const tags = true; // set to true to allow adding new companies

      const ajaxObj = {
        url:
          getAPIUrl() +
          'api/questions/additionalData/companyListByPartialCompanyName',
        dataType: 'json',
        delay: 250,
        async: true,
        data(params) {
          const dataObj = {
            q: params.term,
            p: params.page,
          };
          return dataObj;
        },
        error(xhr, status, err) {
          if (status !== 'abort') {
            const errData = { xhr, status, err };
            logError(errData);
          }
        },
        processResults(data /* , params */) {
          const returnData = data;

          if (data.generalStatus === 'success') {
            if (data.payload.results === null) {
              return { results: [], pagination: { more: false } };
            }

            // here we have to loop over the response and if any of the ID's are null, give them a unique ID
            // the null values are because the API may respond with companies that are not in teh database with a unique ID
            for (let a = 0; a < returnData.payload.results.length; a++) {
              if (returnData.payload.results[a].id === null) {
                returnData.payload.results[a].id = _.uniqueId();
              }
            }

            return returnData.payload;
          }
          return { results: [], pagination: { more: false } };
        },

        cache: true,
      };

      $(this.input)
        .select2({
          placeholder,
          allowClear: false,
          width: '100%',
          tags,
          dropdownParent,
          createTag(params) {
            return {
              id: params.term,
              text: params.term,
              newOption: true,
            };
          },
          sorter(data) {
            const dataNormal = [];
            const dataFreeText = [];

            for (let a = 0; a < data.length; a++) {
              if (data[a].newOption === true) {
                dataFreeText.push(data[a]);
              } else {
                dataNormal.push(data[a]);
              }
            }

            for (let a = 0; a < dataFreeText.length; a++) {
              dataNormal.push(dataFreeText[a]);
            }

            return dataNormal;
          },
          ajax: ajaxObj,
          escapeMarkup(markup) {
            return markup;
          },
          minimumInputLength,
          templateResult(data) {
            if (data.loading) return 'loading';

            let markup = '';

            if (data.newOption) {
              markup =
                '<div class="select-new-item"><em>Let me add "' +
                encodeEntities(data.text) +
                '" to the list.</em></div>';
            } else {
              let imageURL = data.logoImageUrl;

              if (data.logoImageUrl === 'missing-company.png') {
                imageURL = require('../../../../../../../content/theme/custom/images/missing-company.png');
              }

              markup =
                '<div style="margin-left:15px; margin-right:15px;"><div class="row flex-v-center-xs">' +
                '<div class="col-xs-2 text-center"><div style="max-width:64px;"><img src="' +
                imageURL +
                '" class="img-responsive"></div></div>' +
                '<div class="col-xs-10">' +
                data.text +
                '</div>' +
                '</div></div>';
            }

            return markup;
          },
          templateSelection(data) {
            return data.text;
          },
        })
        .on('change', () => {
          if ($(this.input).val().length > 0) {
            const $data = $(this.input).select2('data');

            let optionID = $data[0].id;
            const optionValue = $data[0].text;

            if (!optionIDRegex.test(optionID)) {
              optionID = null;
            }

            const { questionID, questionIdentifier } = this.props;
            const validity = this.validate({ optionValue, optionID });

            if (
              dNc(this.props.answer.optionValue) ||
              dNc(this.props.answer.optionID)
            ) {
              if (
                this.props.answer.optionValue !== optionValue ||
                this.props.answer.optionID !== optionID
              ) {
                this.props.reduxAction_doUpdateQuestionAnswer(
                  questionID,
                  questionIdentifier,
                  optionID,
                  optionValue,
                  validity.valid,
                );
              }
            } else {
              this.props.reduxAction_doUpdateQuestionAnswer(
                questionID,
                questionIdentifier,
                optionID,
                optionValue,
                validity.valid,
              );
            }
          }
        });

      // try to open when tabbed to
      select2EnableOpenOnFocus(this.input);

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
    if (dNc(this.props.answer.optionValue)) {
      const $data = $(this.input).select2('data');
      const { optionValue, optionID } = this.props.answer;

      // check to see if something is already selected
      if ($data.length === 1) {
        // something is selected - is it the same as the answer value?
        if ($data[0].text !== optionValue) {
          // need to update the option because the selected one right now is not the same as the state
          setSelect2Value(this.input, optionValue, optionID);
        }
      } else {
        // there is currently no selected option so we need to set one
        setSelect2Value(this.input, optionValue, optionID);
      }
    }
  }

  validate(answer) {
    let error = '';
    const show = false;
    let valid = false;

    if (dNc(answer) && dNc(answer.optionValue)) {
      // test to see if the optionID is in fact an option ID
      if (
        optionIDRegex.test(answer.optionID) === true ||
        answer.optionID === null
      ) {
        valid = true;
      } else if (answer.optionValue.length <= 1) {
        error = 'The company name is not long enough.';
      } else {
        valid = true;
      }
    } else {
      error = 'Please enter a company name';
    }

    return { valid, error, show };
  }

  render() {
    return (
      <select
        ref={(input) => {
          this.input = input;
        }}
      />
    );
  }
}

SelectQuestionCompanySelectWithRemoteLookupComponent.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  // nextStepCallback: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
};

SelectQuestionCompanySelectWithRemoteLookupComponent.defaultProps = {
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
  SelectQuestionCompanySelectWithRemoteLookupComponent,
);
