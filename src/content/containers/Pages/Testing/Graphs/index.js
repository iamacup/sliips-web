import React from 'react';
import Helmet from 'react-helmet';

import NavBar from '../../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../../content/components/Footers/general';

import {
  /* drawSemiCircleChart, drawWordCloud, */ drawOptionsResultChart,
} from '../../../../../content/scripts/custom/echarts/generators';
import {
  renderChartToTarget, /* redrawCharts, updateChartOptions */
} from '../../../../../content/scripts/custom/echarts/utilities';
import /* fireDebouncedResizeEvents */ '../../../../../content/scripts/custom/utilities';

class Viewer extends React.PureComponent {
  componentDidMount() {
    $(() => {
      /* renderChartToTarget(
        'graph1',
        drawSemiCircleChart(100, '£36,500', 'Lower Quartile', '#9979ad', '#9979ad', '#777', 1000),
      ); */

      renderChartToTarget(
        'graph1',
        drawOptionsResultChart([
          { item: 'Female', percent: 21 },
          { item: 'Male', percent: 78 },
          { item: 'Other', percent: 1 },
        ]),
      );
    });
  }


  render() {
    return (
      <div>
        <Helmet title="Sliips Points" />
        <NavBar />

        <div className="container c1 page-section">
          <h1>A Graph:</h1>

          <div
            className="echarts-graph"
            id="graph1"
            style={{ width: '100%', height: '500px' }}
          />
        </div>

        <Footer />
      </div>
    );
  }
}

export default Viewer;
