import React from 'react';

import { worldChart } from '../../../../../content/scripts/custom/echarts/statics';
import { renderChartToTarget } from '../../../../../content/scripts/custom/echarts/utilities';

class Viewer extends React.Component {
  componentDidMount() {
    $(() => {
      setTimeout(() => {
        renderChartToTarget(this.div, worldChart());
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
        style={{ width: '100%', height: '440px' }}
      />
    );
  }
}

export default Viewer;
