import React from 'react';
import PropTypes from 'prop-types';

import RightComponents from '../../../../content/components/Navigation/RightComponents/general';
import LeftComponents from '../../../../content/components/Navigation/LeftComponents/general';
import NavBar from '../../../../content/components/Navigation/NavBars/general';

const CompositeNavBar = ({ color }) => (
  <NavBar color={color} leftNav={LeftComponents} rightNav={RightComponents} />
);

CompositeNavBar.propTypes = {
  color: PropTypes.string,
};

CompositeNavBar.defaultProps = {
  color: 'white',
};

export default CompositeNavBar;
