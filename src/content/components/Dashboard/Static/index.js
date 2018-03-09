import React from 'react';
import PropTypes from 'prop-types';

class DashboardStatic extends React.PureComponent {
  render() {
    const { drawData } = this.props;

    let lockDiv = null;
    let graphClassName = '';

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

    return (
      <div className="graph-panel dashboard-panel drop-shadow">
        <div className="lock-parent">
          <h3>{drawData.title}</h3>
          {lockDiv}
          <div
            className={graphClassName}
            style={{ width: '100%', height: '300px', paddingTop: '120px' }}
          >
            <h4 className="text-muted">{drawData.data}</h4>
          </div>
        </div>
      </div>
    );
  }
}

DashboardStatic.propTypes = {
  // todo get the shape here
  drawData: PropTypes.object.isRequired,
  locked: PropTypes.bool.isRequired,
  lockClickHandler: PropTypes.func.isRequired,
};

export default DashboardStatic;
