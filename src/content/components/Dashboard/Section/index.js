import React from 'react';
import PropTypes from 'prop-types';

import Graph from '../../../../content/components/Dashboard/Graph';
import Static from '../../../../content/components/Dashboard/Static';

class DashboardSection extends React.PureComponent {
  getRowClass(dimensions) {
    const layout = dimensions.split(':');
    let rowClass = '';

    for (let a = 0; a < layout.length; a++) {
      if (layout[a] > 0) {
        if (a === 0) {
          rowClass += 'col-xs-' + layout[a] + ' ';
        } else if (a === 1) {
          rowClass += 'col-sm-' + layout[a] + ' ';
        } else if (a === 2) {
          rowClass += 'col-md-' + layout[a] + ' ';
        } else if (a === 3) {
          rowClass += 'col-lg-' + layout[a] + ' ';
        }
      }
    }

    return rowClass;
  }

  render() {
    const rows = [];
    let count = 0;

    this.props.data.forEach((value) => {
      count++;

      if (value.type === 'echart') {
        const rowClass = this.getRowClass(value.dimensions);
        const obj = (
          <div key={rowClass + count} className={rowClass}>
            <Graph
              drawData={value.drawData}
              locked={this.props.locked}
              lockClickHandler={() => {
                this.props.lockClickHandler();
              }}
            />
          </div>
        );

        rows.push(obj);
      } else if (value.type === 'react') {
        const rowClass = this.getRowClass(value.dimensions);
        const obj = (
          <div key={rowClass + count} className={rowClass}>
            <Static
              drawData={value.drawData}
              locked={this.props.locked}
              lockClickHandler={() => {
                this.props.lockClickHandler();
              }}
            />
          </div>
        );

        rows.push(obj);
      } else {
        // todo error?
      }
    });

    return (
      <div className="graph-section">
        <div className="row">
          <h1>{this.props.title}</h1>
          {rows}
        </div>
      </div>
    );
  }
}

DashboardSection.propTypes = {
  // todo get the shape here
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  lockClickHandler: PropTypes.func.isRequired,
  locked: PropTypes.bool.isRequired,
};

export default DashboardSection;
