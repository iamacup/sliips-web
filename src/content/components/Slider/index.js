import React from 'react';
import PropTypes from 'prop-types';

import { debounce } from '../../../content/scripts/custom/utilities';

class Slider extends React.PureComponent {
  componentDidMount() {
    $(() => {
      $(this.slider).slider(this.props.props);

      const executeFunction = debounce((e) => {
        this.props.callback(e);
      }, 250);

      $(this.slider).on('slideStop', executeFunction);

      if (this.props.disabled === true) {
        $(this.slider).slider('disable');
      }
    });
  }

  componentDidUpdate() {
    if (this.props.disabled === true) {
      $(this.slider).slider('disable');
    }
  }

  render() {
    return (
      <input
        style={{ width: '100%' }}
        type="text"
        value=""
        ref={(input) => {
          this.slider = input;
        }}
      />
    );
  }
}

Slider.propTypes = {
  props: PropTypes.object,
  callback: PropTypes.func,
  disabled: PropTypes.bool,
};

Slider.defaultProps = {
  props: {},
  callback: () => {},
  disabled: false,
};

export default Slider;
