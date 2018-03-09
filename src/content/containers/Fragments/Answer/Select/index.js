
import React from 'react';
import PropTypes from 'prop-types';

// import { drawOptionsResultChart } from '../../../../../content/scripts/custom/echarts/generators';
// import { renderChartToTarget } from '../../../../../content/scripts/custom/echarts/utilities';
import { getUsefulAnswerBits } from '../../../../../content/scripts/custom/utilities';

class Viewer extends React.PureComponent {
  componentDidMount() {
    $(() => {
      /* renderChartToTarget(
        this.div,
        drawOptionsResultChart(this.getAnswerData()),
      ); */

      // console.log(this.getAnswerData());
    });
  }

  getAnswerData() {
    const { answerData } = this.props;

    return getUsefulAnswerBits(answerData);
  }

  render() {
    const answerData = this.getAnswerData();
    let graphClass = 'echarts-graph';
    let noDataClass = 'hidden';

    if (answerData.length === 0) {
      graphClass += ' hidden';
      noDataClass = '';
    }

    const height = (answerData.length * 100) + 'px';

    return (
      <div>
        <h5 className="text-muted">How people answered this question:</h5>
        <div className={graphClass} style={{ width: '100%', height }} ref={(div) => { this.div = div; }} />
        <div className={noDataClass}>
          <div className="text-center">
            <h3>A Trailblazer - Hurray!</h3>
            <h4 className="text-muted">You are the first person to pick that option!</h4>
          </div>
        </div>
      </div>
    );
  }
}

Viewer.propTypes = {
  answerData: PropTypes.object.isRequired,
  // questionData: PropTypes.object.isRequired,
};

export default Viewer;
