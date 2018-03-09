import React from 'react';

import { drawOptionsResultChart } from '../../../../../content/scripts/custom/echarts/generators';
import { renderChartToTarget } from '../../../../../content/scripts/custom/echarts/utilities';

class Viewer extends React.Component {
  componentDidMount() {
    $(() => {
      /* const data = [
        { name: 'England', value: 14 },
        { name: 'Scotland', value: 4 },
        { name: 'Ireland', value: 2 },
        { name: 'Wales', value: 2 },
        { name: 'Northern Ireland', value: 3 },
        { name: 'Germany', value: 3 },
        { name: 'France', value: 2 },
        { name: 'Neatherlands', value: 1 },
        { name: 'Spain', value: 1 },
        { name: 'Japan', value: 5 },
      ];

      setTimeout(() => { renderChartToTarget(this.div, drawWordCloud({ data })); }, 1000); */

      setTimeout(() => {
        renderChartToTarget(
          this.div,
          drawOptionsResultChart([
            {
              item:
                'United Kingdom of Great Britain and Northern Ireland (the)',
              percent: 79,
            },
            { item: 'China', percent: 4 },
            { item: 'United States of America (the)', percent: 3 },
            { item: 'Japan', percent: 3 },
            { item: 'Canada', percent: 3 },
            { item: 'Germany', percent: 2 },
            // { item: 'Spain', percent: 2 },
            // { item: 'France', percent: 2 },
            // { item: 'Neatherlands', percent: 1 },
            // { item: 'India', percent: 1 },
          ]),
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
        style={{ width: '100%', height: '380px' }}
      />
    );
  }
}

export default Viewer;
