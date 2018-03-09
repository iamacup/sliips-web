import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Page extends React.Component {
  showCompanyData() {
    this.context.router.history.push('/dashboard/company');
  }

  showIndustryData() {
    this.context.router.history.push('/dashboard/industry');
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-6 col-md-4 col-md-push-2">
          <div className="red-links">
            <button
              className="btn btn-no-style"
              onClick={() => {
                this.showCompanyData();
              }}
            >
              <i className="fa fa-building-o" style={{ fontSize: '80px' }} />
              <br />
              <div
                href="#data-viewer"
                className="btn btn-purple-1 btn-xl btn-circle"
              >
                Show me Company data
              </div>
            </button>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-md-push-2">
          <div className="red-links">
            <button
              className="btn btn-no-style"
              onClick={() => {
                this.showIndustryData();
              }}
            >
              <i className="fa fa-rocket" style={{ fontSize: '80px' }} />
              <br />
              <div
                href="#data-viewer"
                className="btn btn-purple-1 btn-xl btn-circle"
              >
                Show me Job Market data
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Page.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = null;

const mapDispatchToProps = null;

/* const mapDispatchToProps = dispatch => ({
  reduxAction_doReset: () => dispatch(pageAction.doReset()),
}); */

export default connect(mapStateToProps, mapDispatchToProps)(Page);
