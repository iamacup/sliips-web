import React from 'react';
import PropTypes from 'prop-types';

// import { drawWordCloud } from '../../../../content/scripts/custom/echarts/generators';
// import { renderChartToTarget, redrawCharts } from '../../../../content/scripts/custom/echarts/utilities';
import * as CompanyUtility from '../../../../../content/containers/Pages/CompanyProfile/utility';

class Viewer extends React.Component {
  componentDidMount() {
    $(() => {
      /* const data = [
        { name: 'Free coffee & tea', value: 1 },
        { name: 'Free beer fridge for Fridays', value: 1 },
        { name: 'Free Netflix and Spotify', value: 1 },
        { name: 'Car allowance', value: 1 },
        { name: 'Dental insurance', value: 1 },
        { name: 'Private health insurance', value: 1 },
        { name: 'Monthly discounts and vouchers', value: 1 },
        { name: 'Company car', value: 1 },
        { name: 'Discounted car rentals', value: 1 },
      ];

      renderChartToTarget('benefitsWordCloud',
        drawWordCloud({ data })); */
    });
  }

  componentDidUpdate() {
    // redrawCharts();

    if (this.props.active === true) {
      // introJs().start(); // eslint-disable-line no-undef
    }
  }

  render() {
    return (
      <div>
        <div className="">
          <div className="widget_tally_box text-left drop-shadow">
            <div className="x_panel c1">
              <div className="x_title">
                <h3>Other Benefits</h3>
                <div className="clearfix" />
              </div>
              <div className="x_content">
                <div className="seperator" />

                <div className="row text-center">
                  <div className="col-sm-8 col-sm-push-2">
                    <h4
                      className="text-purple textw700"
                      style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
                    >
                      Some people like having extra perks from their job, while
                      others prefer salary and bonus, see what Acme Corp offers
                      to its employees:
                    </h4>
                  </div>
                </div>

                <div className="seperator" />

                <div className="row">
                  <div className="col-sm-10 col-sm-push-1">
                    <div className="jumbo c1" style={{ padding: '12px' }}>
                      {CompanyUtility.getBinaryRowLRDesc(
                        'fa-star-o',
                        'fa-star',
                        'Standard Benefits',
                        'Bells & Whistles',
                        '50',
                        null,
                        null,
                      )}
                    </div>
                  </div>
                </div>

                <div className="seperator" />

                <div className="text-center">
                  <h2>The Benefits Cake</h2>
                  <h4 className="text-muted">
                    What's on the menu at Acme Corp?
                  </h4>
                </div>

                <div className="seperator" />

                <div className="text-center">
                  <div className="row flex-v-center-sm">
                    <div className="col-md-3 text-center hidden-xs hidden-sm">
                      <button
                        className="btn btn-purple-2 btn-circle btn-circle-outline text-purple btn-multiline"
                        onClick={() => {
                          CompanyUtility.collapse('#cherry');
                        }}
                        style={{ outline: '0' }}
                      >
                        <div className="row flex-v-center-sm">
                          <div className="col-sm-10">
                            <h4>Cherry on top benefits</h4>
                            <h5 className="text-muted">Extra special perks</h5>
                          </div>
                          <div className="col-sm-2">
                            <i className="fa fa-angle-double-right fa-2x" />
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="col-sm-12 col-md-9">
                      <div>
                        <button
                          onClick={() => {
                            CompanyUtility.collapse('#cherry');
                          }}
                          style={{ outline: '0' }}
                        >
                          <img
                            className="img-responsive img-responsive-center"
                            alt=""
                            src={require('../../../../../content/theme/custom/images/company-profile/cake/smaller/top-top.png')}
                          />
                        </button>
                        <div id="cherry" className="collapse">
                          <div className="other-benefit-top-item round-corners">
                            <div className="hidden-md hidden-lg">
                              <h4>Cherry on top benefits</h4>
                              <h5 className="text-muted">
                                Extra special perks
                              </h5>
                            </div>

                            <div className="row">
                              <div className="col-sm-4 col-sm-push-2">
                                <div className="drop-shadow benefit-item-text-box round-corners flex-center">
                                  <h4>
                                    Free Netflix and Spotify for all employess
                                  </h4>
                                </div>
                              </div>
                              <div className="col-sm-4 col-sm-push-2">
                                <div className="drop-shadow benefit-item-text-box round-corners flex-center">
                                  <h4>
                                    Company holiday every year - all expenses
                                    paid
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            CompanyUtility.collapse('#cherry');
                          }}
                          style={{ outline: '0' }}
                        >
                          <img
                            className="img-responsive img-responsive-center"
                            alt=""
                            src={require('../../../../../content/theme/custom/images/company-profile/cake/smaller/top-bot.png')}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="row flex-v-center-sm">
                    <div className="col-md-3 text-center hidden-xs hidden-sm">
                      <button
                        className="btn btn-purple-2 btn-circle btn-circle-outline text-purple btn-multiline"
                        onClick={() => {
                          CompanyUtility.collapse('#icing');
                        }}
                        style={{ outline: '0' }}
                      >
                        <div className="row flex-v-center-sm">
                          <div className="col-sm-10">
                            <h4>Icing on the cake benefits</h4>
                            <h5 className="text-muted">Above and beyond</h5>
                          </div>
                          <div className="col-sm-2">
                            <i className="fa fa-angle-double-right fa-2x" />
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="col-sm-12 col-md-9" role="button">
                      <div
                        data-step="1"
                        data-intro="Press any part of the cake to see the benefits Acme Corp offers at different levels!"
                      >
                        <button
                          onClick={() => {
                            CompanyUtility.collapse('#icing');
                          }}
                          style={{ outline: '0' }}
                        >
                          <img
                            className="img-responsive img-responsive-center"
                            alt=""
                            src={require('../../../../../content/theme/custom/images/company-profile/cake/smaller/mid-top.png')}
                          />
                        </button>
                        <div id="icing" className="collapse">
                          <div className="other-benefit-mid-bot-item round-corners">
                            <div className="hidden-md hidden-lg">
                              <h4>Icing on the cake benefits</h4>
                              <h5 className="text-muted">Above and beyond</h5>
                            </div>

                            <div className="row">
                              <div className="col-sm-12">
                                <div className="drop-shadow benefit-item-text-box-base round-corners">
                                  <h3>Insurance</h3>
                                  <h4
                                    style={{ marginLeft: '16px' }}
                                    className="text-muted"
                                  >
                                    Life Insurance, Dental Insurance and
                                    Critical Illness Cover are offered as
                                    standard
                                  </h4>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-12">
                                <div className="drop-shadow benefit-item-text-box-base round-corners">
                                  <h3>Stock Options</h3>
                                  <h4
                                    style={{ marginLeft: '16px' }}
                                    className="text-muted"
                                  >
                                    No stock options are offered
                                  </h4>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-sm-4 col-sm-push-2">
                                <div className="drop-shadow benefit-item-text-box round-corners flex-center">
                                  <h4>Bike to Work Scheme</h4>
                                </div>
                              </div>
                              <div className="col-sm-4 col-sm-push-2">
                                <div className="drop-shadow benefit-item-text-box round-corners flex-center">
                                  <h4>Employee Discounts</h4>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-4 col-sm-push-2">
                                <div className="drop-shadow benefit-item-text-box round-corners flex-center">
                                  <h4>Gym Membership</h4>
                                </div>
                              </div>
                              <div className="col-sm-4 col-sm-push-2">
                                <div className="drop-shadow benefit-item-text-box round-corners flex-center">
                                  <h4>Car Allowance</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            CompanyUtility.collapse('#icing');
                          }}
                          style={{ outline: '0' }}
                        >
                          <img
                            className="img-responsive img-responsive-center"
                            alt=""
                            src={require('../../../../../content/theme/custom/images/company-profile/cake/smaller/mid-bot.png')}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="row flex-v-center-sm">
                    <div className="col-md-3 text-center hidden-xs hidden-sm">
                      <button
                        className="btn btn-purple-2 btn-circle btn-circle-outline text-purple btn-multiline"
                        onClick={() => {
                          CompanyUtility.collapse('#base');
                        }}
                        style={{ outline: '0' }}
                      >
                        <div className="row flex-v-center-sm">
                          <div className="col-sm-10">
                            <h4>Mandatory Benefits</h4>
                            <h5 className="text-muted">The legal minimum</h5>
                          </div>
                          <div className="col-sm-2">
                            <i className="fa fa-angle-double-right fa-2x" />
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="col-sm-12 col-md-9">
                      <div>
                        <button
                          onClick={() => {
                            CompanyUtility.collapse('#base');
                          }}
                          style={{ outline: '0' }}
                        >
                          <img
                            className="img-responsive img-responsive-center"
                            alt=""
                            src={require('../../../../../content/theme/custom/images/company-profile/cake/smaller/bot-top.png')}
                          />
                        </button>
                        <div id="base" className="collapse">
                          <div className="other-benefit-mid-bot-item round-corners text-left">
                            <div className="hidden-md hidden-lg">
                              <h4>Mandatory Benefits</h4>
                              <h5 className="text-muted">The legal minimum</h5>
                            </div>

                            <div className="row">
                              <div className="col-sm-12">
                                <div className="drop-shadow benefit-item-text-box-base round-corners">
                                  <h3>Holidays</h3>
                                  <h4
                                    style={{ marginLeft: '16px' }}
                                    className="text-muted"
                                  >
                                    Standard statutory holiday.
                                  </h4>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-12">
                                <div className="drop-shadow benefit-item-text-box-base round-corners">
                                  <h3>Sickness</h3>
                                  <h4
                                    style={{ marginLeft: '16px' }}
                                    className="text-muted"
                                  >
                                    Standard statutory sick pay.
                                  </h4>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-12">
                                <div className="drop-shadow benefit-item-text-box-base round-corners">
                                  <h3>Maternity and Paternity Pay</h3>
                                  <h4
                                    style={{ marginLeft: '16px' }}
                                    className="text-muted"
                                  >
                                    Statutory Maternity and Paternity pay are
                                    available to all employees. In addition Acme
                                    corp allows all employees to take up to 15
                                    child care days a year unpaid.
                                  </h4>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-12">
                                <div className="drop-shadow benefit-item-text-box-base round-corners">
                                  <h3>Pension Plan</h3>
                                  <h4
                                    style={{ marginLeft: '16px' }}
                                    className="text-muted"
                                  >
                                    Puts 9x the employee pension contribution
                                    into the pension pot
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            CompanyUtility.collapse('#base');
                          }}
                          style={{ outline: '0' }}
                        >
                          <img
                            className="img-responsive img-responsive-center"
                            alt=""
                            src={require('../../../../../content/theme/custom/images/company-profile/cake/smaller/bot-bot.png')}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Viewer.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default Viewer;
