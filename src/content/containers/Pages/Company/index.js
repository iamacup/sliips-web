
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import NavBar from '../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../content/components/Footers/general';
import fetchDataBuilder from '../../../../foundation/redux/Factories/FetchData';
import CompanyView from '../../../../content/containers/Pages/Dashboard/CompanyData';

import { dNc } from '../../../../content/scripts/custom/utilities';

import * as pageAction from '../../../../content/containers/Pages/Dashboard/CompanyData/action';

export const fetchDataDescription = {
  url: 'api/company/getData',
  mainID: 'companyProfileFetch',
  subID: 'default',
};
const FetchData = fetchDataBuilder(fetchDataDescription.mainID);

export const fetchLogoDescription = {
  url: 'api/general/getCompanyLogo',
  mainID: 'companyLogoFetch',
  subID: 'default',
};
const LogoData = fetchDataBuilder(fetchLogoDescription.mainID);

class Page extends React.PureComponent {
  getTitle() {
    if (dNc(this.props.reduxState_fetchDataTransaction.default)) {
      if (this.props.reduxState_fetchDataTransaction.default.generalStatus === 'success') {
        return this.props.reduxState_fetchDataTransaction.default.payload.companyName;
      }
    }

    if (dNc(this.props.reduxState_siteSession.frontPageSelectedCompany)) {
      return this.props.reduxState_siteSession.frontPageSelectedCompany.optionValue;
    }

    return 'this company';
  }

  getExplainer() {
    return (
      <div>
        <div className="seperator" />
        <div className="animated bounceInRight animate-delay-1s">
          <h3 className="text-purple">
          We crowdsource payslips, anonymously and securely
          </h3>
          <h4>
           To show the <span className="textw800">truth about pay gaps and unequal pay,</span> so you can be confident you're paid competitively and fairly.
          </h4>
        </div>

        <section className="c3 page-section" style={{ paddingTop: '0px', paddingBottom: '40px', marginTop: '40px' }}>
          <div className="container text-center">
            <div className="seperator" />
            <div className="row">
              <div className="col-xs-4">
                <div className="box-padding drop-shadow c1 animated bounceInLeft animate-delay-2s " style={{ borderRadius: '10px' }}>
                  <Link to="/get-started/1" href="/get-started/1">
                    <i className="fa fa-4x fa-user-plus text-purple" />
                    <h3 className="text-purple">We Expose Paygaps</h3>
                  </Link>
                </div>
              </div>
              <div className="col-xs-4">
                <div className="box-padding drop-shadow c1 animated bounceInUp animate-delay-3s" style={{ borderRadius: '10px' }}>
                  <i
                    className="fa fa-4x fa-pie-chart text-purple"
                  />
                  <h3 className="text-purple">We Explore Fair Pay</h3>
                </div>
              </div>
              <div className="col-xs-4">
                <div className="box-padding drop-shadow c1 animated bounceInRight animate-delay-4s" style={{ borderRadius: '10px' }}>
                  <i
                    className="fa fa-4x fa-smile-o wow bounceIn text-purple"
                  />
                  <h3 className="text-purple">We Champion Equality</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  getContentNoData() {
    return (
      <div>
        {this.getExplainer()}

        <div className="animated bounceInLeft animate-delay-1s" style={{ paddingTop: '30px' }}>
          <h3>We need more payslips!</h3>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-sm-push-3">
                <h4 className="text-muted">We can't show anything yet for this company and also maintain the anonymity of the people that have sent us their payslips.</h4>
              </div>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: '14px' }} />


        <i className="fa-4x fa fa-angle-double-down text-purple" />

      </div>
    );
  }

  getContentData(sendData) {
    return (
      <div>
        {this.getExplainer()}

        <div className="p-dashboard-rework container">

          <div className="seperator" />

          <CompanyView
            loggedIn={false}
            companyData={sendData}
            showPopup={() => {}}
          />
        </div>
      </div>
    );
  }

  getSignupArea() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-sm-push-2">
            <div className="jumbo">
              <h3 className="text-purple">Do you work at {this.getTitle()}?</h3>
              <h4 className="text-muted">We need your help to show what it's really like to work here, both the amazing and not-so-amazing bits.</h4>
              <button onClick={() => { this.signUpPress(); }} className="animated infinite pulse btn btn-purple-2 btn-lg btn-circle">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  signUpPress() {
    this.context.router.history.push('/get-started/1/');
  }

  hackyResetHandler() {
    this.props.reduxAction_doReset({});
  }

  render() {
    const { id } = this.props.match.params;

    let sendData = null;
    let active = false;
    let content = null;
    let noRender = true;
    let title = null;

    if (dNc(id)) {
      sendData = { optionID: 'options/' + id };
      active = true;
      noRender = false;
    } else {
      noRender = true;
      content = this.getContentNoData();
    }

    if (dNc(this.props.reduxState_fetchDataTransaction.default) &&
      this.props.reduxState_fetchDataTransaction.default.generalStatus === 'success') {
      title = this.getTitle();
      content = this.getContentData(sendData);
    }

    // we don't render if there was an error, because the error simply means that the key was not valid
    if (dNc(this.props.reduxState_fetchDataTransaction.default) &&
      (this.props.reduxState_fetchDataTransaction.default.generalStatus === 'error' ||
      this.props.reduxState_fetchDataTransaction.default.generalStatus === 'fatal')) {
      noRender = true;
      content = this.getContentNoData();
    }

    // check to see if the dashboad component errored
    if (this.props.reduxState_dashboard.generalStatus === 'error' || this.props.reduxState_dashboard.generalStatus === 'fatal') {
      noRender = true;
      content = this.getContentNoData();
    }

    // check to see if the dashboard component just returned a bunch of stuff that does not render (i.e. we dont have enough data to show this view)
    const responseStr = JSON.stringify(this.props.reduxState_dashboard.payload);

    if ((responseStr.split('We don\'t have enough data to show you this view').length - 1) === 6) {
      noRender = true;
      content = this.getContentNoData();
    }

    const fetchDataTransaction = (
      <FetchData
        noRender={noRender}
        active={active}
        fetchURL={fetchDataDescription.url}
        sendData={sendData}
        refreshComparator={sendData}
        stateSubID={fetchDataDescription.subID}
        resetCallback={() => { this.hackyResetHandler(); }}
      />
    );

    const logoDataTransaction = (
      <LogoData
        noRender
        active={active}
        fetchURL={fetchLogoDescription.url}
        sendData={sendData}
        refreshComparator={sendData}
        stateSubID={fetchLogoDescription.subID}
      />
    );

    let headerTitle = '';

    if (dNc(title)) {
      headerTitle = (title === 'this company') ? '' : ' - ' + title;
    }

    const metaArray = [
      {
        property: 'og:title',
        content: 'Make your payslip public!' + headerTitle,
      },
      {
        property: 'og:description',
        content: 'We crowdsource payslips, anonymously and securely - showing the truth and stopping companies from hiding. We need your help fixing inequality - Make your payslip public!',
      },
    ];

    // this.props.reduxState_logoData
    if (dNc(this.props.reduxState_logoData.default) &&
      this.props.reduxState_logoData.default.generalStatus === 'success') {
      metaArray.push({
        property: 'og:image',
        content: this.props.reduxState_logoData.default.payload,
      });
    }

    return (
      <div>
        <Helmet
          title={'Make your payslip public!' + headerTitle}
          meta={metaArray}
        />
        <NavBar color="white" />

        <div className="c1 page-section text-center" style={{ paddingTop: '20px' }}>
          <h1>{title}</h1>

          {content}
          {fetchDataTransaction}
          {logoDataTransaction}

          <div className="seperator" />

          {this.getSignupArea()}

        </div>

        <Footer />
      </div>
    );
  }
}

Page.propTypes = {
  match: PropTypes.object.isRequired,
  reduxState_fetchDataTransaction: PropTypes.object,
  reduxState_siteSession: PropTypes.object,
  reduxState_dashboard: PropTypes.object,
  reduxState_logoData: PropTypes.object,
  reduxAction_doReset: PropTypes.func,
};

Page.defaultProps = {
  reduxState_fetchDataTransaction: {},
  reduxState_siteSession: {},
  reduxState_dashboard: {},
  reduxState_logoData: {},
  reduxAction_doReset: () => {},
};

Page.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  reduxState_fetchDataTransaction: state.dataTransactions[fetchDataDescription.mainID],
  reduxState_siteSession: state.dataStoreMulti.siteSession,
  reduxState_dashboard: state.dashboardCompanyData,
  reduxState_logoData: state.dataTransactions[fetchLogoDescription.mainID],
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doReset: metaData => dispatch(pageAction.doReset(metaData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
