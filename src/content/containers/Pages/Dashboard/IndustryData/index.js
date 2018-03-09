import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initialState as pageInitialState } from './reducer';
import * as pageAction from './action';

import SmallSectionError from '../../../../../content/components/Errors/smallSection';
import LoadingArea from '../../../../../content/components/Loading';
import Section from '../../../../../content/components/Dashboard/Section';
import Select2Multi from '../../../../../content/components/Select2Multi';

import {
  getAuthenticationCookie,
  dNc,
  getAPIUrl,
  initialiseNonMobileSticky,
  activateNonMobileSticky,
  deactivateSticky,
} from '../../../../../content/scripts/custom/utilities';

const stickyOptions = { offset_top: 50 };
const filterDivID = 'filters';

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalAutoShown: false,
    };
  }

  componentDidMount() {
    this.fetchDataIfNeeded();

    $(() => {
      this.showPopupIfRequired();

      initialiseNonMobileSticky('#' + filterDivID, stickyOptions);
    });
  }

  componentDidUpdate() {
    this.fetchDataIfNeeded();

    $(() => {
      this.showPopupIfRequired();

      if (this.props.reduxState_page.started === true) {
        // we dissable the sticky
        deactivateSticky('#' + filterDivID);
      }

      if (this.props.reduxState_page.finished === true) {
        // we enable the sticky
        activateNonMobileSticky('#' + filterDivID, stickyOptions);
      }

      $(document.body).trigger('sticky_kit:recalc');
    });
  }

  getFilters() {
    const select = (
      <div key="select2" className="row on-top" id={filterDivID}>
        <div className="col-sm-10 col-sm-push-1">
          <div
            className="box-border c2 drop-shadow"
            style={{ padding: '0 20px 8px 20px' }}
          >
            <h4>
              Please build your industry by selecting companies in the box
              below:
            </h4>
            <Select2Multi
              placeholder="Please select companies to compare..."
              remoteOptionsURL={
                getAPIUrl() +
                'api/questions/additionalData/companyListByPartialCompanyName?additionalData=false'
              }
              callback={(data) => {
                this.selectChange(data);
              }}
              disabled={this.areQuestionsOrPayslipRequired()}
              options={<option />}
            />
          </div>
        </div>
      </div>
    );

    return select;
  }

  getLayout(data) {
    const sections = [];

    data.forEach((value) => {
      let title = '';

      if (value.section === 'section1') {
        title = 'Your Company';
      } else if (value.section === 'section2') {
        title = 'Paygrades';
      } else if (value.section === 'section3') {
        title = 'Company Structure';
      }

      sections.push(
        <Section
          key={value.section}
          data={value.data}
          title={title}
          lockClickHandler={() => {
            this.showPopup();
          }}
          locked={this.areQuestionsOrPayslipRequired()}
        />,
      );
    });

    return sections;
  }

  selectChange(data) {
    // console.log(getAPIUrl());
    // console.log(data);

    // let metaData = {};
    this.props.reduxAction_doReset(data);
  }

  areQuestionsOrPayslipRequired() {
    if (
      this.isPayslipRequired() === true ||
      this.areQuestionsRequired() === true
    ) {
      return true;
    }

    return false;
  }

  isPayslipRequired() {
    const { payload, generalStatus } = this.props.reduxState_page;

    if (
      generalStatus === 'success' &&
      dNc(payload.payslip) &&
      payload.payslip === true
    ) {
      return true;
    }

    return false;
  }

  areQuestionsRequired() {
    const { payload, generalStatus } = this.props.reduxState_page;

    if (
      generalStatus === 'success' &&
      dNc(payload.questions) &&
      payload.questions.length > 0
    ) {
      return true;
    }

    return false;
  }

  showPopupIfRequired() {
    if (this.state.modalAutoShown === false) {
      this.showPopup();
    }
  }

  showPopup() {
    if (this.isPayslipRequired() === true) {
      this.setState({ modalAutoShown: true });

      this.props.showPopup({
        type: 'payslip',
      });
    } else if (this.areQuestionsRequired() === true) {
      this.setState({ modalAutoShown: true });

      this.props.showPopup({
        type: 'questions',
        data: this.props.reduxState_page.payload.questions,
      });
    }
  }

  fetchDataIfNeeded() {
    // if the request is not finished and its not started and the user is logged in - try to fetch the data
    if (
      this.props.reduxState_page.finished !== true &&
      this.props.reduxState_page.started !== true &&
      this.props.loggedIn === true
    ) {
      this.props.reduxAction_doFetchData(
        getAuthenticationCookie(),
        this.props.reduxState_page.metaData,
      );
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

    if (generalStatus === 'fatal') {
      component = (
        <SmallSectionError
          retryCallback={() => {
            this.retryButtonHandler();
          }}
        />
      );
    } else if (generalStatus === 'error') {
      if (typeof payload === 'string' || payload instanceof String) {
        component = (
          <SmallSectionError
            retryCallback={() => {
              this.retryButtonHandler();
            }}
            title="Backend Error"
            message={payload}
          />
        );
      } else {
        component = (
          <SmallSectionError
            retryCallback={() => {
              this.retryButtonHandler();
            }}
          />
        );
      }
    } else if (generalStatus === 'success') {
      component = (
        <div>
          {this.getFilters()}
          {this.getLayout(payload.data)}
        </div>
      );
    } else {
      component = (
        <div>
          {this.getFilters()}
          <LoadingArea />
        </div>
      );
    }

    return <div>{component}</div>;
  }
}

Page.propTypes = {
  reduxAction_doFetchData: PropTypes.func,
  reduxAction_doReset: PropTypes.func,
  reduxState_page: PropTypes.any,
  loggedIn: PropTypes.bool.isRequired,
  showPopup: PropTypes.func.isRequired,
};

Page.defaultProps = {
  reduxAction_doFetchData: () => {},
  reduxAction_doReset: () => {},
  reduxState_page: pageInitialState,
};

const mapStateToProps = state => ({
  reduxState_page: state.dashboardIndustryData,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doFetchData: (cookieData, metaData) =>
    dispatch(pageAction.doFetchData(cookieData, metaData)),
  reduxAction_doReset: metaData => dispatch(pageAction.doReset(metaData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
