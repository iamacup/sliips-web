import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavBar from '../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../content/components/Footers/general';
import WizzardPane from '../../../../content/containers/Fragments/WizzardPane';
import fetchDataBuilder from '../../../../foundation/redux/Factories/FetchData';

import {
  dNc,
} from '../../../../content/scripts/custom/utilities';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreMulti/actions';

const dataStoreID = 'siteSession';

export const payslipNumberDataDescription = {
  url: 'api/general/payslipCount',
  mainID: 'payslipNumberFetch',
  subID: 'default',
};
const PayslipNumberData = fetchDataBuilder(payslipNumberDataDescription.mainID);

export const companyListDataDescription = {
  url: 'api/general/topCompanyList',
  mainID: 'topCompanyListFetch',
  subID: 'default',
};
const CompanyListData = fetchDataBuilder(companyListDataDescription.mainID);

class Page extends React.Component {
  gotoCompanyPage(data) {
    data.forEach((value) => {
      if (dNc(value.answer.company)) {
        this.props.reduxAction_doUpdate(
          'frontPageSelectedCompany',
          value.answer.company,
        );

        const { optionValue, optionID } = value.answer.company;
        const cleanOptionValue = optionValue.replace(/\W+/g, '_');

        if (optionID === null) {
          this.context.router.history.push(
            '/company/' + cleanOptionValue + '/',
          );
        } else {
          const optionKey = optionID.split('/')[1];

          this.context.router.history.push(
            '/company/' + optionKey + '/' + cleanOptionValue + '/',
          );
        }
      }
    });
  }

  signUpPress() {
    this.context.router.history.push('/get-started/1/');
  }

  render() {
    const payslipNumberData = (
      <PayslipNumberData
        active
        fetchURL={payslipNumberDataDescription.url}
        sendData={{}}
        refreshComparator={{}}
        stateSubID={payslipNumberDataDescription.subID}
      />
    );

    let payslipNumber = null;

    if (dNc(this.props.reduxState_payslipCount.default) &&
      this.props.reduxState_payslipCount.default.generalStatus === 'success') {
      payslipNumber = (
        <div>
          <h2>{this.props.reduxState_payslipCount.default.payload} Payslips collected so far...</h2>
          <h3 className="text-muted">When will you add yours?</h3>
        </div>
      );
    }

    const companyListData = (
      <CompanyListData
        active
        fetchURL={companyListDataDescription.url}
        sendData={{}}
        refreshComparator={{}}
        stateSubID={companyListDataDescription.subID}
      />
    );

    let companyList = null;

    if (dNc(this.props.reduxState_companyList.default) &&
      this.props.reduxState_companyList.default.generalStatus === 'success') {
      companyList = <h3>List</h3>;

      const arr = this.props.reduxState_companyList.default.payload;
      companyList = [];

      arr.forEach((value) => {
        const cleanOptionValue = value.companyName.replace(/\W+/g, '_');
        const link = '/company/' + value.optionID + '/' + cleanOptionValue + '/';

        const item = (
          <div key={value.optionID}>
            <Link to={link} href={link}>{value.companyName}</Link>
          </div>
        );

        companyList.push(item);
      });
    }

    const metaArray = [
      {
        property: 'og:title',
        content: 'Make your payslip public!',
      },
      {
        property: 'og:description',
        content: 'We crowdsource payslips, anonymously and securely - showing the truth and stopping companies from hiding. We need your help fixing inequality - Make your payslip public!',
      },
    ];

    return (
      <div>
        <Helmet
          title="Make your payslip public!"
          meta={metaArray}
        />
        <NavBar />

        <div className="text-center">
          <div className="seperator" />
          <div className="seperator" />
          {payslipNumber}
          {payslipNumberData}
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

        <div className="seperator" />

        <div className="text-center">
          <i className="fa-4x fa fa-angle-double-down text-purple" />
        </div>

        <div className="seperator" />

        <section className="text-center c1">
          <div className="container">
            <div className="row flex-v-center-sm">
              <div className="col-sm-6 col-sm-push-6">
                <div className="style-inputs box-padding">
                  <h4>Find your company:</h4>

                  <WizzardPane
                    history={this.props.history}
                    location={this.props.location}
                    startStep={1}
                    saveOverrideCallback={(data) => {
                  this.gotoCompanyPage(data);
                }}
                    questionsURL="api/questions/getStep"
                    additionalQuestionUrlData={{
                  groupKey: 'reduxSignupGroup',
                  groupName: 'reduxGroup-1',
                }}
                    wizzardDoneContent={
                      <div>
                        <div style={{ textAlign: 'left' }} />
                        <Link
                          to="/dashboard"
                          href="/dashboard"
                          className="btn btn-purple-2 btn-xl btn-circle fa-2x"
                        >
                          <i className="fa fa-line-chart" />take a look
                        </Link>
                        <h4>
                      The only website powered by crowdsourced payslips.
                        </h4>
                      </div>
                }
                    nextButtonClassName="btn btn-purple-2 btn-xl btn-circle gs-button-pad"
                    nextButtonContent={
                      <span>

                    take a look
                      </span>
                }
                    showTitles={false}
                  />
                </div>

                <div className="visible-xs-block">

                  <div className="seperator" />
                  <hr />
                  <div className="seperator" />
                </div>
              </div>

              <div className="col-sm-6 col-sm-pull-6">
                <div className="box-padding drop-shadow box-border">
                  <h4 className="text-muted">Top 5 companies with most number of user payslips</h4>
                  <br />
                  {companyListData}
                  {companyList}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="seperator" />
        <div className="seperator" />

        <section className="text-center c3">
          <div className="seperator" />
          <div className="seperator" />
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-sm-push-2">
                <div className="jumbo c2">
                  <h3 className="text-purple">Ready to send your data?</h3>
                  <h4 className="text-muted">We need your help to show what it's really like where you work, both the amazing and not-so-amazing bits.</h4>
                  <button onClick={() => { this.signUpPress(); }} className="animated infinite pulse btn btn-purple-2 btn-lg btn-circle">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
          <div className="seperator" />
          <div className="seperator" />
        </section>


        <Footer />
      </div>
    );
  }
}

Page.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  reduxAction_doUpdate: PropTypes.func,
  reduxState_payslipCount: PropTypes.object,
  reduxState_companyList: PropTypes.object,
};

Page.defaultProps = {
  reduxAction_doUpdate: () => {},
  reduxState_payslipCount: {},
  reduxState_companyList: {},
};

Page.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  reduxState_payslipCount: state.dataTransactions[payslipNumberDataDescription.mainID],
  reduxState_companyList: state.dataTransactions[companyListDataDescription.mainID],
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (subID, data) =>
    dispatch(storeAction.doUpdate(dataStoreID, subID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
