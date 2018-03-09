
import React from 'react';
import PropTypes from 'prop-types';

// import AnimationContainer from '../../../../content/components/AnimationContainer';

import Options from '../../../../content/containers/Fragments/Answer/Options';
import Select from '../../../../content/containers/Fragments/Answer/Select';
import CurrencySalaryBonus from '../../../../content/containers/Fragments/Answer/CurrencySalaryBonus';
import MonthYear from '../../../../content/containers/Fragments/Answer/MonthYear';

const Viewer = ({
  type, title, hideCallback, data, questionData,
}) => {
  let answerDetails = null;

  if (type === 'select') {
    // nothing
    answerDetails = <Select answerData={data} questionData={questionData} />;
  } else if (type === 'currencySalaryBonus') {
    // nothing
    answerDetails = <CurrencySalaryBonus answerData={data} questionData={questionData} />;
  } else if (type === 'options') {
    // nothing
    answerDetails = <Options answerData={data} questionData={questionData} />;
  } else if (type === 'monthYear') {
    // nothing
    answerDetails = <MonthYear answerData={data} questionData={questionData} />;
  } else {
    // error not recognised type todo better handling
    console.log('did not recognise answer type');
  }

  return (
  // <AnimationContainer animationClass="zoomIn">
    <div className="general-answer-container box-border c2">
      <div className="pull-right">
        <div style={{ marginRight: '10px' }}>
          <button onClick={() => { hideCallback(); }}>
            <h5 className="text-muted"> <i className="fa fa-chevron-circle-left" /> Back to question</h5>
          </button>
        </div>
      </div>
      <div className="box-padding">
        <h4>{title}</h4>
        <div style={{ margin: '0px 10px' }}>
          {answerDetails}
        </div>
      </div>
    </div>
  // </AnimationContainer>
  );
};

Viewer.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  hideCallback: PropTypes.func.isRequired,
  questionData: PropTypes.object.isRequired,
};

export default Viewer;
