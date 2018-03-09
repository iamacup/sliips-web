import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { fireDebouncedResizeEvents } from '../../../content/scripts/custom/utilities';

class DrawableCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: this.props.height,
      width: this.props.width,
      // this is just an array that copies all of the values that we recieve through the eraseDoodle prop
      // and if we see a new one coming in, we erase all the doodles and add it to the list
      erasedDoodles: [this.props.eraseDoodle],
    };

    this.paint = false;

    // this stores the last width used in the image resize calculations
    this.lastMaxWidth = 0;

    // this is a resized copy of the image provided via canvasImage (if provided) to fit on the view port
    this.currentImage = null;

    this.initialiseDrawVariables();
  }

  componentDidMount() {
    this.redraw();

    // make sure page is fully loaded
    $(() => {
      // listen for resize events
      fireDebouncedResizeEvents();

      // then listen for the events here
      $(document).on('debouncedResizeEvent', () => {
        this.redraw();
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    // should we erase the doodles?
    if (!_.includes(this.state.erasedDoodles, nextProps.eraseDoodle)) {
      this.initialiseDrawVariables();
      const arr = this.state.erasedDoodles;
      arr.push(nextProps.eraseDoodle);

      this.setState({
        erasedDoodles: arr,
      });
    }
  }

  componentDidUpdate() {
    this.redraw();
  }

  // this returns a promise that contains the apropriate base 64 encoded image
  getCanvasData() {
    return new Promise((resolve) => {
      const canvasBGImage = document.createElement('canvas');
      const canvasDoodles = document.createElement('canvas');

      // draw the doodles onto the doodle canvas
      canvasDoodles.width = this.canvas.width;
      canvasDoodles.height = this.canvas.height;
      this.drawDoodles(canvasDoodles);

      if (this.props.canvasImage !== null) {
        // what we do is create a canvas with image as high resolution as we can - i.e. original
        const image = new Image();

        image.onload = () => {
          canvasBGImage.width = image.width;
          canvasBGImage.height = image.height;
          const context = canvasBGImage.getContext('2d');
          context.drawImage(image, 0, 0, image.width, image.height);

          // then we convert the doodles into an image and 'paste it' onto the background
          const imageDoodles = new Image();

          imageDoodles.onload = () => {
            context.drawImage(imageDoodles, 0, 0, image.width, image.height);

            resolve({
              imageWithDoodles: canvasBGImage.toDataURL(),
              doodles: canvasDoodles.toDataURL(),
            });
          };

          imageDoodles.src = canvasDoodles.toDataURL();
        };

        image.src = this.props.canvasImage.src;
      } else {
        // we just return the doodles for both
        resolve({
          imageWithDoodles: canvasDoodles.toDataURL(),
          doodles: canvasDoodles.toDataURL(),
        });
      }
    });
  }

  getMousePosition(e) {
    const rect = this.canvas.getBoundingClientRect();

    return {
      mouseX: e.clientX - rect.left,
      mouseY: e.clientY - rect.top,
    };
  }

  initialiseDrawVariables() {
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
    this.size = [];
  }

  mouseDown(e) {
    const { mouseX, mouseY } = this.getMousePosition(e);

    this.paint = true;
    this.addClick(mouseX, mouseY);
    this.redraw();
  }

  mouseMove(e) {
    if (this.paint) {
      const { mouseX, mouseY } = this.getMousePosition(e);

      this.addClick(mouseX, mouseY, true);
      this.redraw();
    }
  }

  mouseUp() {
    this.paint = false;
  }

  mouseLeave() {
    this.paint = false;
  }

  addClick(x, y, dragging) {
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
    this.size.push(this.props.drawSize);
  }

  redraw() {
    const context = this.canvas.getContext('2d');

    // clear the canvas
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw the image if it is there
    if (this.props.canvasImage !== null) {
      // we have to see if we need to duplicate the input image, or draw a new one from the old image
      const maxWidth =
        $(this.canvas)
          .parent()
          .width() * 0.96;

      // if we don't have a current image stored on the object, or the widths are different,
      // create a new image from original image
      if (maxWidth !== this.lastMaxWidth || this.currentImage === null) {
        const image = new Image();

        image.onload = () => {
          if (image.width > maxWidth) {
            image.height *= maxWidth / image.width;
            image.width = maxWidth;
          }

          this.canvas.width = image.width;
          this.canvas.height = image.height;
          context.drawImage(image, 0, 0, image.width, image.height);

          this.lastMaxWidth = maxWidth;
          this.currentImage = image;
        };

        image.src = this.props.canvasImage.src;
      } else {
        // we can just craw the current image to the canvas as no resize required
        const image = this.currentImage;
        context.drawImage(image, 0, 0, image.width, image.height);
      }
    }

    this.drawDoodles(this.canvas);

    if (
      this.state.height !== this.canvas.height ||
      this.state.width !== this.canvas.width
    ) {
      this.setState({ height: this.canvas.height, width: this.canvas.width });
    }
  }

  drawDoodles(canvas) {
    const context = canvas.getContext('2d');

    // setup the doodle style
    context.strokeStyle = this.props.drawColor;
    context.lineJoin = 'round';

    // draw the doodles
    for (let i = 0; i < this.clickX.length; i++) {
      context.lineWidth = this.size[i];
      context.beginPath();

      if (this.clickDrag[i] && i) {
        context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
      } else {
        context.moveTo(this.clickX[i] - 1, this.clickY[i]);
      }

      context.lineTo(this.clickX[i], this.clickY[i]);
      context.closePath();
      context.stroke();
    }
  }

  render() {
    return (
      <canvas
        width={this.state.width}
        height={this.state.height}
        className={
          this.props.canvasActive === true ? this.props.activeClassName : ''
        }
        onMouseLeave={() => {
          this.mouseLeave();
        }}
        onMouseUp={() => {
          this.mouseUp();
        }}
        onMouseMove={(e) => {
          this.mouseMove(e);
        }}
        onMouseDown={(e) => {
          this.mouseDown(e);
        }}
        ref={(canvas) => {
          this.canvas = canvas;
        }}
        id={this.props.htmlID}
      />
    );
  }
}

DrawableCanvas.propTypes = {
  canvasActive: PropTypes.bool.isRequired,
  activeClassName: PropTypes.string,
  canvasImage: PropTypes.any,
  drawSize: PropTypes.number,
  drawColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  eraseDoodle: PropTypes.string,
  htmlID: PropTypes.string,
};

DrawableCanvas.defaultProps = {
  activeClassName: 'file-uploader-canvas',
  canvasImage: null,
  drawSize: 10,
  drawColor: '#000',
  width: 1,
  height: 1,
  eraseDoodle: 'nothing',
  htmlID: 'canvas',
};

export default DrawableCanvas;
