import React from 'react';

import { drawSemiCircleChart } from '../../../../../content/scripts/custom/echarts/generators';
import { renderChartToTarget } from '../../../../../content/scripts/custom/echarts/utilities';

class Viewer extends React.Component {
  componentDidMount() {
    $(() => {
      setTimeout(() => {
        renderChartToTarget(
          this.div,
          drawSemiCircleChart(
            100,
            '58 Years Old',
            '',
            '#9979ad',
            '#9979ad',
            '#777',
            1000,
            22,
          ),
        );
      }, 1000);
    });
  }

  render() {
    return (
      <div
        className="echarts-graph"
        ref={(div) => {
          this.div = div;
        }}
        style={{ width: '100%', height: '240px' }}
      />
    );
  }
}

export default Viewer;
