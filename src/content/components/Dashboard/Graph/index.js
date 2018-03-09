import React from 'react';
import PropTypes from 'prop-types';

import { renderChartToTarget } from '../../../../content/scripts/custom/echarts/utilities';

import * as graphFunctions from '../../../../content/scripts/custom/echarts/generators';

class DashboardGraph extends React.PureComponent {
  componentDidMount() {
    const { graphData } = this.props.drawData;

    if (graphData !== null) {
      $(() => {
        const options = graphFunctions[graphData.function](graphData.data);
        renderChartToTarget(this.graphDiv, options);
      });
    }
  }

  render() {
    const { drawData } = this.props;

    let graphClassName = 'echarts-graph';
    let lockDiv = null;
    let displayDiv = null;

    if (this.props.locked === true) {
      graphClassName += ' blur-me';

      lockDiv = (
        <div
          className="lock-item"
          onClick={() => {
            this.props.lockClickHandler();
          }}
          onKeyPress={() => {
            this.props.lockClickHandler();
          }}
          role="button"
          tabIndex={0}
        />
      );
    }

    displayDiv = (
      <div
        className={graphClassName}
        ref={(graphDiv) => {
          this.graphDiv = graphDiv;
        }}
        style={{ width: '100%', height: '300px' }}
      />
    );

    return (
      <div className="graph-panel dashboard-panel drop-shadow">
        <div className="lock-parent">
          <h3>{drawData.title}</h3>
          {lockDiv}
          {displayDiv}
        </div>
      </div>
    );
  }
}

DashboardGraph.propTypes = {
  // todo get the shape here
  drawData: PropTypes.object.isRequired,
  locked: PropTypes.bool.isRequired,
  lockClickHandler: PropTypes.func.isRequired,
};

export default DashboardGraph;
