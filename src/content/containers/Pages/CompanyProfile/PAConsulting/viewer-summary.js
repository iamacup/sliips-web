import React from 'react';
import PropTypes from 'prop-types';

import * as CompanyUtility from '../../../../../content/containers/Pages/CompanyProfile/utility';

import { drawWordCloud } from '../../../../../content/scripts/custom/echarts/generators';
import {
  renderChartToTarget,
  redrawCharts,
} from '../../../../../content/scripts/custom/echarts/utilities';

class Viewer extends React.Component {
  componentDidMount() {
    $(() => {
      const style = [
        { name: 'IBM', value: 1 },
        { name: 'Accenture', value: 1 },
        { name: 'BCS Consulting', value: 1 },
        { name: 'Google', value: 1 },
        { name: 'PWC', value: 1 },
        { name: 'Deloitte', value: 1 },
        { name: 'Microsoft', value: 1 },
      ];

      const office = [
        { name: 'IBM', value: 1 },
        { name: 'Barclays', value: 1 },
        { name: 'EY', value: 1 },
        { name: 'KPMG', value: 1 },
        { name: 'Capgemini', value: 1 },
        { name: 'Cisco', value: 1 },
        { name: 'VMWare', value: 1 },
        { name: 'Expedia', value: 1 },
        { name: 'Microsoft', value: 1 },
      ];

      const career = [
        { name: 'Facebook', value: 1 },
        { name: 'Infosys', value: 1 },
        { name: 'Wipro', value: 1 },
        { name: 'HP ', value: 1 },
        { name: 'DELL', value: 1 },
        { name: 'Onfido', value: 1 },
        { name: 'City Mapper', value: 1 },
        { name: 'Vodafone', value: 1 },
        { name: 'Telefonica', value: 1 },
        { name: 'SendGrid', value: 1 },
      ];

      const benefits = [
        { name: 'Oracle', value: 1 },
        { name: 'Apple', value: 1 },
        { name: 'Airbnb', value: 1 },
        { name: 'NVIDIA', value: 1 },
        { name: 'Salesforce', value: 1 },
        { name: 'SAP', value: 1 },
        { name: 'Adobe', value: 1 },
        { name: 'LinkedIn', value: 1 },
      ];

      renderChartToTarget('sum1', drawWordCloud({ data: style }));

      renderChartToTarget('sum2', drawWordCloud({ data: office }));

      renderChartToTarget('sum3', drawWordCloud({ data: career }));

      renderChartToTarget('sum4', drawWordCloud({ data: benefits }));
    });
  }

  componentDidUpdate() {
    if (this.props.active === true) {
      redrawCharts();
    }
  }

  render() {
    return (
      <div>
        <div className="">
          <div className="widget_tally_box text-left drop-shadow">
            <div className="x_panel c1">
              <div className="x_title">
                <h3>Some Title</h3>
                <div className="clearfix" />
              </div>
              <div className="x_content text-center">
                <div className="seperator" />
                <h3>Key Stats</h3>

                <div className="row text-left">
                  <div className="col-sm-6 col-sm-push-3">
                    <div className="drop-shadow top-summary-box round-corners">
                      <h4>
                        Industry:{' '}
                        <span className="text-muted">
                          Cloud Computing & Technology
                        </span>
                      </h4>
                      <h4>
                        Founded:{' '}
                        <span className="text-muted">June 16, 2001 </span>
                      </h4>
                      <h4>
                        Headquarters:{' '}
                        <span className="text-muted">London, UK </span>
                      </h4>
                      <h4>
                        CEO: <span className="text-muted">John Doe </span>
                      </h4>
                      <h4>
                        Companies Served:{' '}
                        <span className="text-muted">London, UK </span>
                      </h4>
                      <h4>
                        Number of Employees:{' '}
                        <span className="text-muted">3,400 </span>
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="seperator" />
                <h3>Similar Companies</h3>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="seperator-xs" />
                    <div className="similar-box drop-shadow">
                      <div className="row">
                        <div className="col-sm-10 col-sm-push-1">
                          <h4 className="text-purple">
                            <i className="fa fa-briefcase" /> Company Style
                          </h4>
                          <div style={{ marginTop: '6px' }}>
                            {CompanyUtility.getBinaryRowReallyTiny(
                              '70',
                              'Very Startup',
                              'Very Corporate',
                            )}
                          </div>
                          <div
                            className="echarts-graph"
                            id="sum1"
                            style={{ width: '100%', height: '220px' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="seperator-xs" />
                    <div className="similar-box drop-shadow">
                      <div className="row">
                        <div className="col-sm-10 col-sm-push-1">
                          <h4 className="text-purple">
                            <i className="fa fa-building-o" /> Office and Swag
                          </h4>
                          <div style={{ marginTop: '6px' }}>
                            {CompanyUtility.getBinaryRowReallyTiny(
                              '80',
                              'Traditional',
                              'Has a Slide',
                            )}
                          </div>
                          <div
                            className="echarts-graph"
                            id="sum2"
                            style={{ width: '100%', height: '220px' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="seperator-xs" />
                    <div className="similar-box drop-shadow">
                      <div className="row">
                        <div className="col-sm-10 col-sm-push-1">
                          <h4 className="text-purple">
                            <i className="fa fa-rocket" /> Career Trend
                          </h4>
                          <div style={{ marginTop: '6px' }}>
                            {CompanyUtility.getBinaryRowReallyTiny(
                              '80',
                              'Unstructured',
                              'Structured',
                            )}
                          </div>
                          <div
                            className="echarts-graph"
                            id="sum3"
                            style={{ width: '100%', height: '220px' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="seperator-xs" />
                    <div className="similar-box drop-shadow">
                      <div className="row">
                        <div className="col-sm-10 col-sm-push-1">
                          <h4 className="text-purple">
                            <i className="fa fa-smile-o" /> Other Benefits
                          </h4>
                          <div style={{ marginTop: '6px' }}>
                            {CompanyUtility.getBinaryRowReallyTiny(
                              '50',
                              'Standard',
                              'Bells & Whistles',
                            )}
                          </div>
                          <div
                            className="echarts-graph"
                            id="sum4"
                            style={{ width: '100%', height: '220px' }}
                          />
                        </div>
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
