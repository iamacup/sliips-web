import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import Footer from '../../../../../content/components/Footers/b2b';

class Page extends React.Component {
  /* componentDidMount() {
    // Wait for page to load (so the bootstrap plugins etc. are loaded)
    $(() => {
      $('body').css('margin-top', '0');
    });
  } */

  handleOneOffClick() {
    this.context.router.history.push('/benchmarking-oneoff');
  }

  handleMonthlyClick() {
    this.context.router.history.push('/benchmarking-monthly');
  }

  render() {
    return (
      <div className="p-customer">
        <Helmet title="Clever Salary Analytics" />
        <section className="c2 page-section">
          <div className="container text-center">
            <div className="row">
              <div className="col-xs-10 col-xs-push-1 col-sm-8 col-sm-push-2 col-md-6 col-md-push-3 col-lg-4 col-lg-push-4">
                <img
                  alt="Sliips Logo"
                  src={require('../../../../../content/theme/custom/images/logo-medium-trans-inv.png')}
                  className="img-responsive img-responsive-center"
                />
                <h4 style={{ color: '#812470' }}>Packages</h4>
                <br />
                <br />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-md-push-1 widget_tally_box">
                <div
                  className="x_panel c1 page-section ui-ribbon-container drop-shadow"
                  style={{ minHeight: '400px' }}
                >
                  <div className="ui-ribbon-wrapper">
                    <div className="ui-ribbon">One Off</div>
                  </div>
                  <div className="x_title">
                    <h2 className="text-purple">Starter</h2>
                    <div className="clearfix" />
                  </div>
                  <div className="x_content">
                    <div style={{ marginTop: '20px' }} />
                    <h3 className="name_title">£40</h3>
                    <div style={{ marginTop: '20px' }} />
                    <div className="pricing_features">
                      <ul className="list-unstyled text-left">
                        <li>
                          <i className="fa fa-check text-success" />{' '}
                          <strong>Real time compensation data</strong>
                        </li>
                        <li>
                          <i className="fa fa-check text-success" /> One-off{' '}
                          <strong> answers to salary questions</strong>
                        </li>
                        <li>
                          <i className="fa fa-check text-success" />{' '}
                          <strong>Market movement update emails</strong>
                        </li>
                        <li>
                          <i className="fa fa-check text-success" />{' '}
                          <strong>PDF / CSV downloads</strong>
                        </li>
                        <li>
                          <i className="fa fa-times text-danger" /> Access{' '}
                          <strong> to unlimited analytics</strong>
                        </li>
                        <li>
                          <i className="fa fa-times text-danger" />{' '}
                          <strong>Named competitor</strong> analysis
                        </li>
                      </ul>
                    </div>
                    <p className="text-muted">
                      For companies that need to know how much to pay someone,
                      or check where you are relative to the job market.
                    </p>
                    <div className="divider" />
                    <button
                      onClick={() => {
                        this.handleOneOffClick();
                      }}
                      className="btn btn-purple-2 btn-circle btn-circle-outline text-purple"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        this.handleOneOffClick();
                      }}
                      className="btn btn-purple-2 btn-circle"
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-md-push-1 widget_tally_box">
                <div className="seperator-sm" />
                <div
                  className="x_panel c1 page-section ui-ribbon-container drop-shadow"
                  style={{ minHeight: '400px' }}
                >
                  <div className="ui-ribbon-wrapper">
                    <div className="ui-ribbon">Monthly</div>
                  </div>
                  <div className="x_title">
                    <h2 className="text-purple">Agility</h2>
                    <div className="clearfix" />
                  </div>
                  <div className="x_content">
                    <div className="row">
                      <div className="col-sm-4 price_item">
                        <h3 className="name_title">
                          £100<span style={{ fontSize: '14px' }}>p/m</span>
                        </h3>
                        <h5>&lt; 10 Staff</h5>
                      </div>
                      <div className="col-sm-4 price_item">
                        <h3 className="name_title">
                          £150<span style={{ fontSize: '14px' }}>p/m</span>
                        </h3>
                        <h5>10-99 Staff</h5>
                      </div>
                      <div className="col-sm-4 price_item">
                        <h3 className="name_title">
                          £250<span style={{ fontSize: '14px' }}>p/m</span>
                        </h3>
                        <h5>100+ Staff</h5>
                      </div>
                    </div>

                    <div className="pricing_features">
                      <ul className="list-unstyled text-left">
                        <li>
                          <i className="fa fa-check text-success" />{' '}
                          <strong>Real time compensation data</strong>
                        </li>
                        <li>
                          <i className="fa fa-check text-success" /> One-off{' '}
                          <strong> answers to salary questions</strong>
                        </li>
                        <li>
                          <i className="fa fa-check text-success" />{' '}
                          <strong>Market movement update emails</strong>
                        </li>
                        <li>
                          <i className="fa fa-check text-success" />{' '}
                          <strong>PDF / CSV downloads</strong>
                        </li>
                        <li>
                          <i className="fa fa-check text-success" /> Access{' '}
                          <strong> to unlimited analytics</strong>
                        </li>
                        <li>
                          <i className="fa fa-check text-success" />{' '}
                          <strong>Named competitor</strong> analysis
                        </li>
                      </ul>
                    </div>
                    <p className="text-muted">
                      For companies that want to stay ahead of the curve and
                      offer the most competitive renumeration packages.
                    </p>
                    <div className="divider" />
                    <button
                      onClick={() => {
                        this.handleMonthlyClick();
                      }}
                      className="btn btn-purple-2 btn-circle btn-circle-outline text-purple"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        this.handleMonthlyClick();
                      }}
                      className="btn btn-purple-2 btn-circle"
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

Page.contextTypes = {
  router: PropTypes.object,
};

export default Page;
