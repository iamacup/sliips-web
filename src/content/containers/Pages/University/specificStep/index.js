
import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import AnimationContainer from '../../../../../content/components/AnimationContainer';
import NewWizzardPane from '../../../../../content/containers/Fragments/NewWizzardPane';

import { redrawCharts } from '../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../content/scripts/custom/utilities';

class Viewer extends React.Component {
  render() {
    const { step } = this.props.match.params;

    return (
      <div>
        <Helmet title="Step 2" />

        <div className="container c1 page-section">
          <NewWizzardPane
            step={step}
            saveAPI="api/universityWizzard/saveStep-noCheck/"
            fetchAPI="api/universityWizzard/getStep-noCheck/"
          />
        </div>

      </div>
    );
  }
}

Viewer.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Viewer;
