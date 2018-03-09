import React from 'react';

import { drawPieChart } from '../../../../../content/scripts/custom/echarts/generators';
import { renderChartToTarget } from '../../../../../content/scripts/custom/echarts/utilities';

class Viewer extends React.Component {
  componentDidMount() {
    $(() => {
      const data = [{ value: 48, name: 'Male' }, { value: 52, name: 'Female' }];

      setTimeout(() => {
        renderChartToTarget(this.div, drawPieChart(data));
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
