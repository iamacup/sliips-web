import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  dNc,
  select2GetCorrectParent,
  select2EnableOpenOnFocus,
  debounce,
  setSelect2Value,
} from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class SelectQuestionCompanySelectWithRemoteLookupComponent extends React.Component {
  componentDidMount() {
    // wait for document to be ready
    $(() => {
      // month value
      const dropdownParent = select2GetCorrectParent(this.select);
      const placeholder = 'Please select a month';

      $(this.select)
        .select2({
          placeholder,
          allowClear: false,
          width: '100%',
          dropdownParent,
          minimumResultsForSearch: Infinity,
        })
        .on('change', () => {
          if ($(this.select).val().length > 0) {
            this.getCombinedValue();
          }
        });

      // try to open when tabbed to
      select2EnableOpenOnFocus(this.select);

      this.setValueFromState();

      // year value
      // const Inputmask = require('inputmask'); TODO need to make this work with minification

      // eslint-disable-next-line no-undef
      Inputmask.extendDefinitions({
        j: {
          // basic year
          validator: '(19|20)\\d{2}',
          cardinality: 4,
          prevalidator: [
            { validator: '[12]', cardinality: 1 },
            { validator: '(19|20)', cardinality: 2 },
            { validator: '(19|20)\\d', cardinality: 3 },
          ],
        },
      });

      // eslint-disable-next-line no-undef
      const im = new Inputmask('j');

      im.mask(this.input);

      const executeFunction = debounce(() => {
        this.getCombinedValue();
      }, 254);

      $(this.input).on('input', executeFunction);
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
      const $data = $(this.select).select2('data');
      const { optionValue, optionID } = this.props.answer;

      const year = this.props.answer.optionValue.slice(3, 7);
      const month = optionValue.slice(0, 2);
      let stringMonth = '';

      if (month === '01') {
        stringMonth = 'January';
      } else if (month === '02') {
        stringMonth = 'February';
      } else if (month === '03') {
        stringMonth = 'March';
      } else if (month === '04') {
        stringMonth = 'April';
      } else if (month === '05') {
        stringMonth = 'May';
      } else if (month === '06') {
        stringMonth = 'June';
      } else if (month === '07') {
        stringMonth = 'July';
      } else if (month === '08') {
        stringMonth = 'August';
      } else if (month === '09') {
        stringMonth = 'September';
      } else if (month === '10') {
        stringMonth = 'October';
      } else if (month === '11') {
        stringMonth = 'November';
      } else if (month === '12') {
        stringMonth = 'December';
      }

      // SET THE MONTH
      // check to see if something is already selected
      if ($data.length === 1) {
        // something is selected - is it the same as the answer value?
        if ($data[0].text !== optionValue) {
          // need to update the option because the selected one right now is not the same as the state
          setSelect2Value(this.select, stringMonth, optionID);
        }
      } else {
        // there is currently no selected option so we need to set one
        setSelect2Value(this.select, stringMonth, optionID);
      }

      // SET THE YEAR
      this.input.value = year;
    }
  }

  getCombinedValue() {
    if (dNc(this.input.inputmask)) {
      const yearValue = this.input.inputmask.unmaskedvalue();
      const monthValue = $(this.select).val();

      if (
        dNc(yearValue) &&
        dNc(monthValue) &&
        monthValue.length === 2 &&
        yearValue.length === 4
      ) {
        const optionValue = monthValue + '/' + yearValue;
        const optionID = null;

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
    }
  }

  validate(answer) {
    let error = '';
    let show = false;
    let valid = false;

    // todo we should validate the date here with regex and things.

    if (dNc(answer) && dNc(answer.optionValue)) {
      valid = true;
    } else {
      error = 'You need to select a month and year.';
      show = false;
    }

    return { valid, error, show };
  }

  buttonPress(dataArr) {
    // press
    const optionID = dataArr[0];
    const optionValue = null;

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

  keyUp(e) {
    if (e.keyCode === 13) {
      this.props.nextStepCallback();
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-6">
          <select
            ref={(select) => {
              this.select = select;
            }}
          >
            <option />
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div className="col-xs-6">
          <div className="form-group">
            <input
              ref={(input) => {
                this.input = input;
              }}
              className="form-control"
              placeholder="YYYY"
              type="text"
              onKeyUp={(e) => {
                this.keyUp(e);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

SelectQuestionCompanySelectWithRemoteLookupComponent.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  nextStepCallback: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  // options: PropTypes.array.isRequired,
};

SelectQuestionCompanySelectWithRemoteLookupComponent.defaultProps = {
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
  SelectQuestionCompanySelectWithRemoteLookupComponent,
);
