import React from 'react';
import PropTypes from 'prop-types';

class ButtonGroup extends React.PureComponent {
  componentDidMount() {
    // wait for document to be ready
    $(() => {
      const clickedButtons = [];

      $(this.div)
        .find('button')
        .each((index, vertex) => {
          const button = $(vertex);

          // iterate over all the buttons and attach click handlers
          button.on('click', () => {
            // do something about single clicks
            if (this.props.singleSelect === true) {
              $(this.div)
                .find('button')
                .each((index2, vertex2) => {
                  const button2 = $(vertex2);

                  button2.removeClass(this.props.clickedClass);
                  // empty the array
                  clickedButtons.splice(0, clickedButtons.length);
                });
            }

            if (!button.hasClass(this.props.clickedClass)) {
              // if the button does not have the click class, add it and do the array
              button.addClass(this.props.clickedClass);
              clickedButtons.push(button.attr('value'));
            } else {
              // remove the class and remove it from the array
              button.removeClass(this.props.clickedClass);

              const i = clickedButtons.indexOf(button.attr('value'));

              if (i !== -1) {
                clickedButtons.splice(i, 1);
              }
            }

            this.props.callback(clickedButtons);
          });
        });
    });
  }

  render() {
    return (
      <div
        ref={(div) => {
          this.div = div;
        }}
      >
        {this.props.buttons}
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  callback: PropTypes.func.isRequired,
  buttons: PropTypes.any.isRequired,
  clickedClass: PropTypes.string,
  singleSelect: PropTypes.bool,
};

ButtonGroup.defaultProps = {
  clickedClass: 'btn-default-selected',
  singleSelect: false,
};

export default ButtonGroup;
