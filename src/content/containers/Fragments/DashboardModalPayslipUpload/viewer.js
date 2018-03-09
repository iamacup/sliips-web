import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import DrawableCanvas from '../../../../content/components/DrawableCanvas';

import {
  dNc,
  convertDataURIToBinary,
  isNumeric,
  logError,
} from '../../../../content/scripts/custom/utilities';

class Viewer extends React.Component {
  static setError(message) {
    $.notify(
      {
        message,
      },
      {
        type: 'danger',
        z_index: 9000,
        placement: {
          from: 'top',
          align: 'center',
        },
      },
    );
  }

  constructor(props) {
    super(props);

    this.canvasHTMLID = 'payslipCanvas';
    this.drawableCanvas = null;

    this.state = {
      fileHovering: false,
      canvasActive: false,
      canvasImage: null,
      brushSize: 20,
      eraseDoodle: 'nothing',
    };
  }

  setCanvasActive(canvasImage) {
    const image = new Image();

    image.onload = () => {
      this.setState({
        fileHovering: false,
        canvasActive: true,
        canvasImage: image,
      });
    };

    image.src = canvasImage;
  }

  startDrag(e) {
    e.preventDefault();
    this.setState({ fileHovering: true });
  }

  stopDrag(e) {
    e.preventDefault();
    this.setState({ fileHovering: false });
  }

  changeBrushSize(size) {
    this.setState({ brushSize: size });
  }

  eraseDoodle() {
    this.setState({
      eraseDoodle: _.uniqueId(),
    });
  }

  handleButtonFile(/* e */) {
    this.handleFiles(this.fileInput.files);
  }

  handleDroppedFile(e) {
    e.preventDefault();

    if (
      dNc(e.nativeEvent) &&
      dNc(e.nativeEvent.dataTransfer) &&
      e.nativeEvent.dataTransfer.files
    ) {
      const { files } = e.nativeEvent.dataTransfer;
      this.handleFiles(files);
    } else {
      logError({ message: 'Something went wrong with the drag and drop', e });
      Viewer.setError('Something went wrong with the drag and drop.');
    }
  }

  handleFiles(files) {
    if (files.length === 1) {
      const file = files[0];

      const imageType = /^image\//;

      // if true we are not looking at an image
      if (!imageType.test(file.type)) {
        // IE will not always deted a mimetype IF there is no PDF registry key or something -
        // really hard to debug so we say that if there is no type - we take a look at the file extension
        if (
          file.type === 'application/pdf' ||
          file.name.toLowerCase().endsWith('pdf')
        ) {
          const reader = new FileReader();

          reader.onload = (renderE) => {
            // we have to specify this here because IE does not auto set it correctly
            // NOTE this version is built in to the URL and must match that on html.js
            PDFJS.workerSrc = // eslint-disable-line no-undef
              'https://unpkg.com/pdfjs-dist@1.9.638/build/pdf.worker.min.js';

            const pdfAsArray = convertDataURIToBinary(renderE.target.result);
            const loadingTask = PDFJS.getDocument(pdfAsArray); // eslint-disable-line no-undef

            loadingTask.onPassword = (updatePassword /* , reason */) => {
              // TODO password prompt is ugly and shit
              const password = prompt('Please enter the PDF password.'); // eslint-disable-line no-alert

              if (dNc(password)) {
                updatePassword(password);
              } else {
                Viewer.setError('You did not supply a password');
              }
            };

            loadingTask
              .then((pdfDocument) => {
                let pageNumber = 1;

                if (pdfDocument.numPages > 1) {
                  // TODO ugly and shit prompy
                  // eslint-disable-next-line no-alert
                  let userPageNumber = prompt(
                    'More than one page found in PDF. Which page number is your payslip on?',
                  );

                  if (dNc(userPageNumber) && isNumeric(userPageNumber)) {
                    userPageNumber = Number.parseInt(userPageNumber, 10);

                    if (
                      userPageNumber <= pdfDocument.numPages &&
                      userPageNumber >= 1
                    ) {
                      pageNumber = userPageNumber;
                    }
                  } else {
                    // TODO we need to re ask for this data
                    Viewer.setError(
                      'You did not supply a valid page number, we are displaying page 1',
                    );
                  }
                }

                pdfDocument
                  .getPage(pageNumber)
                  .then((page) => {
                    this.renderPDFPageToCanvas(page);
                  })
                  .catch((error) => {
                    logError({ message: 'Could not render the PDF', error });
                    Viewer.setError('Could not render the PDF');
                  });
              })
              .catch((error) => {
                logError({ message: 'Could not render the PDF', error });
                Viewer.setError('Could not render the PDF');
              });
          };

          reader.readAsDataURL(file);
        } else {
          Viewer.setError(
            "We don't support that file type, please use a PDF, PNG, JPEG or other image format.",
          );
        }
      } else if (typeof file === 'string') {
        // we have a base 64 encoded string
        this.setCanvasActive(file);
      } else {
        // we have an actual file we need to load and read
        const reader = new FileReader();

        reader.onload = (e2) => {
          this.setCanvasActive(e2.target.result);
        };

        reader.readAsDataURL(file);
      }
    } else if (files.length === 0) {
      Viewer.setError('We could not find any file to upload.');
    } else {
      Viewer.setError(
        'Looks like you uploaded multiple files, please only use one.',
      );
    }
  }

  sendPayslip() {
    this.drawableCanvas.getCanvasData().then((successData) => {
      this.props.saveButtonHandler(successData);
    });
  }

  renderPDFPageToCanvas(page) {
    const scale = 1.5;
    const viewport = page.getViewport(scale);

    // Prepare canvas using PDF page dimensions.
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context.
    const renderContext = {
      canvasContext: context,
      viewport,
    };

    page
      .render(renderContext)
      .then(() => {
        const imageData = canvas.toDataURL();
        this.setCanvasActive(imageData);
      })
      .catch((error) => {
        logError({ message: 'Could not render the PDF', error });
        Viewer.setError('Could not render the PDF');
      });
  }

  render() {
    return (
      <div
        className="p-payslip-upload"
        onDragExit={(e) => {
          this.stopDrag(e);
        }}
        onDragEnter={(e) => {
          this.startDrag(e);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          this.handleDroppedFile(e);
        }}
      >
        <div className="text-center">
          <div className="row">
            <div className="col-xs-10 col-xs-push-1 col-sm-10 col-sm-push-1 col-md-10 col-md-push-1 text-center">
              <ul className="progressbar">
                <li className="active z1">
                  <h4>Upload</h4>
                  <p className="list-group-item-text">
                    Drag your payslip into the box below
                  </p>
                </li>
                <li className="active z2">
                  <h4>Scrub</h4>
                  <p className="list-group-item-text">
                    Remove any personal information
                  </p>
                </li>
                <li className="active z3">
                  <h4>Submit</h4>
                  <p className="list-group-item-text">
                    Send your payslip for verification
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-10 col-xs-push-1 col-sm-8 col-sm-push-2 col-md-8 col-md-push-2 text-center">
              <br />
              <br />
              <div className="alert alert-sliips-grey">
                <h4>Our data is verified by using crowdsourced payslips.</h4>
                <span className="text-muted">
                  We use
                  <span className="tipWrapper text-purple">
                    {' '}
                    Gross Salary
                    <div className="tooltip">
                      <h4>Gross Salary</h4>
                      This is your basic salary before any additions (eg car
                      allowance) or deductions (eg tax or student loans).
                    </div>
                  </span>,
                  <span className="tipWrapper text-purple">
                    {' '}
                    Company Name
                    <div className="tooltip">
                      <h4>Company Name</h4>
                      This should be an easy one...it's your company name.
                    </div>
                  </span>{' '}
                  and
                  <span className="tipWrapper text-purple">
                    {' '}
                    Payslip Date
                    <div className="tooltip">
                      <h4>Payslip Date</h4>
                      We only really need the month and year.
                    </div>
                  </span>. Any other personal information should be removed
                  using this tool.
                </span>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="text-center add-sliip-canvas-width">
          <div
            className={
              this.state.fileHovering === true
                ? 'file-uploader drag-enter'
                : 'file-uploader'
            }
          >
            <div className={this.state.canvasActive === true ? '' : 'hidden'}>
              <div className="tools">
                <h4>Brush Sizes</h4>
                <button
                  className="btn btn-no-style"
                  onClick={() => {
                    this.changeBrushSize(10);
                  }}
                >
                  <i className="fa fa-1x fa-paint-brush" />
                </button>
                <button
                  className="btn btn-no-style"
                  onClick={() => {
                    this.changeBrushSize(20);
                  }}
                >
                  <i className="fa fa-2x fa-paint-brush" />
                </button>
                <button
                  className="btn btn-no-style"
                  onClick={() => {
                    this.changeBrushSize(30);
                  }}
                >
                  <i className="fa fa-3x fa-paint-brush" />
                </button>
                <button
                  className="btn btn-no-style"
                  onClick={() => {
                    this.changeBrushSize(40);
                  }}
                >
                  <i className="fa fa-4x fa-paint-brush" />
                </button>
              </div>
              <button
                className="btn btn-default"
                onClick={() => {
                  this.eraseDoodle();
                }}
              >
                <span>Erase All Doodles</span>{' '}
                <i className="fa fa-eraseDoodler" />
              </button>
              <br />
            </div>
            <div
              className={
                this.state.canvasActive === true
                  ? 'file-uploader-message hidden'
                  : 'file-uploader-message'
              }
            >
              <h3>Drop your payslip here</h3>
            </div>
            <DrawableCanvas
              canvasActive={this.state.canvasActive}
              canvasImage={this.state.canvasImage}
              drawSize={this.state.brushSize}
              eraseDoodle={this.state.eraseDoodle}
              htmlID={this.canvasHTMLID}
              ref={(canvas) => {
                this.drawableCanvas = canvas;
              }}
            />
          </div>
        </div>

        <div className="text-center">
          <div className={this.state.canvasActive === true ? 'hidden' : ''}>
            <br />
            <br />
            <span className="btn btn-purple-2 btn-file btn">
              <span>Or, select a file</span>
              <input
                type="file"
                onChange={(e) => {
                  this.handleButtonFile(e);
                }}
                ref={(fileInput) => {
                  this.fileInput = fileInput;
                }}
              />
            </span>
          </div>
          <div className={this.state.canvasActive === true ? '' : 'hidden'}>
            <br />
            <button
              className="btn btn-red-ish-1"
              onClick={() => {
                this.sendPayslip();
              }}
            >
              <span>Send us your payslip</span>{' '}
              <i className="fa fa-angle-double-right" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Viewer.propTypes = {
  saveButtonHandler: PropTypes.func.isRequired,
};

export default Viewer;
