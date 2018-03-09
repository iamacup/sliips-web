
import React from 'react';
import PropTypes from 'prop-types';

import { drawOptionsResultChart } from '../../../../../content/scripts/custom/echarts/generators';
import { renderChartToTarget } from '../../../../../content/scripts/custom/echarts/utilities';
import { getUsefulAnswerBits } from '../../../../../content/scripts/custom/utilities';

class Viewer extends React.PureComponent {
  componentDidMount() {
    $(() => {
      renderChartToTarget(
        this.div,
        drawOptionsResultChart(this.getAnswerData()),
      );
    });
  }

  getAnswerData() {
    const { answerData } = this.props;

    return getUsefulAnswerBits(answerData);
  }

  render() {
    const answerData = this.getAnswerData();
    const height = (answerData.length * 100) + 'px';

    return (
      <div>
        <h5 className="text-muted">How people answered this question:</h5>
        <div className="echarts-graph" style={{ width: '100%', height }} ref={(div) => { this.div = div; }} />
      </div>
    );
  }
}

Viewer.propTypes = {
  answerData: PropTypes.object.isRequired,
  // questionData: PropTypes.object.isRequired,
};

export default Viewer;
