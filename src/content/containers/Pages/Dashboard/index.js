import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DefaultView from './DefaultData';
import IndustryView from './IndustryData';
import CompanyView from './CompanyData';
import Viewer from './viewer';
import { initialState as pageInitialState } from './reducer';
import * as pageAction from './action';

import FullPageError from '../../../../content/components/Errors/fullPage';
import LoadingArea from '../../../../content/components/Loading';
import Authentication from '../../../../content/containers/Fragments/Authentication';
import NavBar from '../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../content/components/Footers/general';
import PayslipComponents from '../../../../content/components/Modals/DashboardPayslip';
import QuestionComponents from '../../../../content/components/Modals/DashboardQuestions';

import {
  getAuthenticationCookie,
  fireDebouncedResizeEvents,
} from '../../../../content/scripts/custom/utilities';
import { redrawCharts } from '../../../../content/scripts/custom/echarts/utilities';
import { initialState as authenticationInitialState } from '../../../../content/containers/Fragments/Authentication/reducer';

import * as modalAction from '../../../../content/containers/Fragments/Modal/action';

class Page extends React.Component {
  componentDidMount() {
    this.fetchDataIfNeeded();

    // wait for page ready
    $(() => {
      // listen for resize events
      fireDebouncedResizeEvents();

      // then listen for the events here
      $(document).on('debouncedResizeEvent', () => {
        // and redraw the charts
        redrawCharts();
      });
    });
  }

  componentDidUpdate() {
    this.fetchDataIfNeeded();
  }

  getPathLocation() {
    const { path } = this.props.match;

    if (path === '/dashboard/industry') {
      return 'industry';
    } else if (path === '/dashboard/company') {
      return 'company';
    }

    return 'invalid';
  }

  showPopup(data) {
    const pathLocation = this.getPathLocation();

    if (data.type === 'payslip') {
      this.props.reduxAction_showModal(PayslipComponents);
    } else if (data.type === 'questions') {
      this.props.reduxAction_showModal(
        QuestionComponents(data.data, pathLocation),
      );
    }
  }

  fetchDataIfNeeded() {
    // if the request is not finished and its not started and the user is logged in - try to fetch the data
    if (
      this.props.reduxState_page.finished !== true &&
      this.props.reduxState_page.started !== true &&
      this.props.reduxState_authentication.loggedIn === true
    ) {
      this.props.reduxAction_doFetchData(getAuthenticationCookie());
    }
  }

  retryButtonHandler() {
    this.props.reduxAction_doReset();
  }

  render() {
    const {
      generalStatus,
      /* statusCode, */ payload,
    } = this.props.reduxState_page;
    let component = null;

    if (this.props.reduxState_authentication.loggedIn !== true) {
      component = (
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-sm-push-3 text-center">
              <h3>You need to login...</h3>
              <br />
              <Authentication formID="login-page-form" />
            </div>
          </div>
        </div>
      );
    } else if (generalStatus === 'fatal') {
      component = (
        <FullPageError
          retryCallback={() => {
            this.retryButtonHandler();
          }}
        />
      );
    } else if (generalStatus === 'error') {
      if (typeof payload === 'string' || payload instanceof String) {
        component = (
          <FullPageError
            retryCallback={() => {
              this.retryButtonHandler();
            }}
            title="Backend Error"
            message={payload}
          />
        );
      } else {
        component = (
          <FullPageError
            retryCallback={() => {
              this.retryButtonHandler();
            }}
          />
        );
      }
    } else if (generalStatus === 'success') {
      let showViwerNavigation = false;
      let subComponent = <DefaultView history={this.props.history} />;
      const pathLocation = this.getPathLocation();

      // get the components we need to load
      if (pathLocation === 'industry') {
        showViwerNavigation = true;
        subComponent = (
          <IndustryView
            showPopup={(data) => {
              this.showPopup(data);
            }}
            loggedIn={this.props.reduxState_authentication.loggedIn}
          />
        );
      } else if (pathLocation === 'company') {
        showViwerNavigation = true;
        subComponent = (
          <CompanyView
            showPopup={(data) => {
              this.showPopup(data);
            }}
            loggedIn={this.props.reduxState_authentication.loggedIn}
          />
        );
      }

      component = (
        <Viewer
          data={payload}
          subComponent={subComponent}
          showNavigation={showViwerNavigation}
        />
      );
    } else {
      component = <LoadingArea />;
    }

    return (
      <div>
        <Helmet title="Your Dashboard" />
        <NavBar color="white" />

        <div className="p-dashboard-rework">
          <section className="c1 page-section">{component}</section>
        </div>

        <Footer />
      </div>
    );
  }
}

Page.propTypes = {
  reduxAction_doFetchData: PropTypes.func,
  reduxAction_doReset: PropTypes.func,
  reduxAction_showModal: PropTypes.func,
  reduxState_page: PropTypes.any,
  reduxState_authentication: PropTypes.any,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
};

Page.defaultProps = {
  reduxAction_doFetchData: () => {},
  reduxAction_doReset: () => {},
  reduxAction_showModal: () => {},
  reduxState_page: pageInitialState,
  reduxState_authentication: authenticationInitialState,
};

const mapStateToProps = state => ({
  reduxState_page: state.dashboardPage,
  reduxState_authentication: state.authentication,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doFetchData: cookieData =>
    dispatch(pageAction.doFetchData(cookieData)),
  reduxAction_doReset: () => dispatch(pageAction.doReset()),
  reduxAction_showModal: components =>
    dispatch(modalAction.doModalOpen(components, modalAction.modalSizeHuge)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
