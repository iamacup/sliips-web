import React from 'react';
import PropTypes from 'prop-types';

import { drawPieChart } from '../../../../../content/scripts/custom/echarts/generators';
import {
  renderChartToTarget,
  redrawCharts,
} from '../../../../../content/scripts/custom/echarts/utilities';

class Viewer extends React.Component {
  componentDidMount() {
    $(() => {
      const data1 = [
        {
          value: 49,
          name: 'Female',
          label: { normal: { formatter: '{d}%' } },
          labelLine: { normal: { length2: 6 } },
        },
        {
          value: 51,
          name: 'Male',
          label: { normal: { formatter: '{d}%' } },
          labelLine: { normal: { length2: 6 } },
        },
      ];

      renderChartToTarget('graph1', drawPieChart(data1, true));

      const data2 = [
        {
          value: 52,
          name: 'Female',
          label: { normal: { formatter: '{d}%' } },
          labelLine: { normal: { length2: 6 } },
        },
        {
          value: 48,
          name: 'Male',
          label: { normal: { formatter: '{d}%' } },
          labelLine: { normal: { length2: 6 } },
        },
      ];

      renderChartToTarget('graph2', drawPieChart(data2, true));

      const data3 = [
        {
          value: 35,
          name: 'Female',
          label: { normal: { formatter: '{d}%' } },
          labelLine: { normal: { length2: 6 } },
        },
        {
          value: 65,
          name: 'Male',
          label: { normal: { formatter: '{d}%' } },
          labelLine: { normal: { length2: 6 } },
        },
      ];

      renderChartToTarget('graph3', drawPieChart(data3, true));

      const data4 = [
        {
          value: 21,
          name: 'Female',
          label: { normal: { formatter: '{d}%' } },
          labelLine: { normal: { length2: 6 } },
        },
        {
          value: 79,
          name: 'Male',
          label: { normal: { formatter: '{d}%' } },
          labelLine: { normal: { length2: 6 } },
        },
      ];

      renderChartToTarget('graph4', drawPieChart(data4, true));
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
                <h3>Gender Pay Reporting</h3>
                <div className="clearfix" />
              </div>
              <div className="x_content text-center">
                <div className="row" style={{ marginTop: '20px' }}>
                  <div className="col-sm-8 col-sm-push-2">
                    <div className="jumbo c1">
                      <h3>
                        Acme recognises there is a gender pay issue at the more
                        senior paygrades within its company and will close this
                        by 2020.
                      </h3>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: '0 0 0 20px',
                    borderLeft: '10px solid #6a3787',
                    margin: '20px 0',
                  }}
                >
                  <div className="text-left">
                    <h3>Breakdown by Paygrade</h3>
                  </div>

                  <div className="text-left">
                    <h4 className="text-muted">
                      Acme Corp has released the details of the average salary
                      at band for their employees split between males and
                      females.
                    </h4>
                  </div>

                  <div className="row flex-v-center-sm">
                    <div className="col-sm-3">
                      <h4 className="textw700 text-purple">Paygrade</h4>
                    </div>
                    <div className="col-sm-3">
                      <i className="fa fa-male fa-3x text-purple" />
                    </div>
                    <div className="col-sm-3">
                      <i className="fa fa-female fa-3x text-purple" />
                    </div>
                    <div className="col-sm-3">
                      <h4 className="textw700 text-purple">Difference</h4>
                    </div>
                  </div>

                  <div
                    className="border-bottom-sm-grey"
                    style={{ margin: '10px 0 0' }}
                  />

                  <div className="row flex-v-center-sm">
                    <div className="col-sm-3">
                      <div className="row row flex-v-center-xs">
                        <div className="col-xs-6">
                          <h4 className="text-purple">Band 6</h4>
                        </div>
                        <div className="col-xs-6 text-right">
                          <h4 className="textw700">Salary:</h4>
                          <h4 className="text-muted textw700">Bonus:</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <h4>£32,100</h4>
                      <h4 className="text-muted">£200</h4>
                    </div>
                    <div className="col-sm-3">
                      <h4>£32,100</h4>
                      <h4 className="text-muted">£200</h4>
                    </div>
                    <div className="col-sm-3 border-left-sm-grey">
                      <h4 className="text-green">0%</h4>
                      <h4 className="text-green">0%</h4>
                    </div>
                  </div>

                  <div className="row flex-v-center-sm c2">
                    <div className="col-sm-3">
                      <div className="row row flex-v-center-xs">
                        <div className="col-xs-6">
                          <h4 className="text-purple">Band 7</h4>
                        </div>
                        <div className="col-xs-6 text-right">
                          <h4 className="textw700">Salary:</h4>
                          <h4 className="text-muted textw700">Bonus:</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <h4>£46,700</h4>
                      <h4 className="text-muted">£450</h4>
                    </div>
                    <div className="col-sm-3">
                      <h4>£48,300</h4>
                      <h4 className="text-muted">£450</h4>
                    </div>
                    <div className="col-sm-3 border-left-sm-grey">
                      <h4 className="text-green">3%</h4>
                      <h4 className="text-green">0%</h4>
                    </div>
                  </div>

                  <div className="row flex-v-center-sm">
                    <div className="col-sm-3">
                      <div className="row row flex-v-center-xs">
                        <div className="col-xs-6">
                          <h4 className="text-purple">Band 8</h4>
                        </div>
                        <div className="col-xs-6 text-right">
                          <h4 className="textw700">Salary:</h4>
                          <h4 className="text-muted textw700">Bonus:</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <h4>£58,900</h4>
                      <h4 className="text-muted">£1,500</h4>
                    </div>
                    <div className="col-sm-3">
                      <h4>£58,200</h4>
                      <h4 className="text-muted">£1,500</h4>
                    </div>
                    <div className="col-sm-3 border-left-sm-grey">
                      <h4 className="text-orange">1%</h4>
                      <h4 className="text-green">0%</h4>
                    </div>
                  </div>

                  <div className="row flex-v-center-sm c2">
                    <div className="col-sm-3">
                      <div className="row row flex-v-center-xs">
                        <div className="col-xs-6">
                          <h4 className="text-purple">Band 9</h4>
                        </div>
                        <div className="col-xs-6 text-right">
                          <h4 className="textw700">Salary:</h4>
                          <h4 className="text-muted textw700">Bonus:</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <h4>£71,700</h4>
                      <h4 className="text-muted">£2,900</h4>
                    </div>
                    <div className="col-sm-3">
                      <h4>£70,100</h4>
                      <h4 className="text-muted">£2,900</h4>
                    </div>
                    <div className="col-sm-3 border-left-sm-grey">
                      <h4 className="text-green">2%</h4>
                      <h4 className="text-green">0%</h4>
                    </div>
                  </div>

                  <div className="row flex-v-center-sm">
                    <div className="col-sm-3">
                      <div className="row row flex-v-center-xs">
                        <div className="col-xs-6">
                          <h4 className="text-purple">Band 10</h4>
                        </div>
                        <div className="col-xs-6 text-right">
                          <h4 className="textw700">Salary:</h4>
                          <h4 className="text-muted textw700">Bonus:</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <h4>£89,100</h4>
                      <h4 className="text-muted">£8,000</h4>
                    </div>
                    <div className="col-sm-3">
                      <h4>£81,100</h4>
                      <h4 className="text-muted">£6,500</h4>
                    </div>
                    <div className="col-sm-3 border-left-sm-grey">
                      <h4 className="text-red">10%</h4>
                      <h4 className="text-red">23%</h4>
                    </div>
                  </div>

                  <div className="row flex-v-center-sm c2">
                    <div className="col-sm-3">
                      <div className="row row flex-v-center-xs">
                        <div className="col-xs-6">
                          <h4 className="text-purple">Partner</h4>
                        </div>
                        <div className="col-xs-6 text-right">
                          <h4 className="textw700">Salary:</h4>
                          <h4 className="text-muted textw700">Bonus:</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <h4>£120,000</h4>
                      <h4 className="text-muted">£15,000</h4>
                    </div>
                    <div className="col-sm-3">
                      <h4>£101,100</h4>
                      <h4 className="text-muted">£11,000</h4>
                    </div>
                    <div className="col-sm-3 border-left-sm-grey">
                      <h4 className="text-red">19%</h4>
                      <h4 className="text-red">36%</h4>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: '0 0 0 20px',
                    borderLeft: '10px solid #6a3787',
                    margin: '20px 0',
                  }}
                >
                  <div className="text-left">
                    <h3>Gender Diversity by Salary Quartile</h3>
                  </div>

                  <div className="text-left">
                    <h4 className="text-muted">
                      We ordered our entire workforce by salary (lowest to
                      highest) and then split that list into four equally sized
                      quartiles.
                    </h4>
                  </div>

                  <div className="row flex-v-center-sm">
                    <div className="col-sm-3">
                      <h4 className="textw700 text-purple">Lowest</h4>
                      <div
                        className="echarts-graph"
                        id="graph1"
                        style={{ width: '100%', height: '140px' }}
                      />
                    </div>
                    <div className="col-sm-3">
                      <h4 className="textw700 text-purple">Quartile 2</h4>
                      <div
                        className="echarts-graph"
                        id="graph2"
                        style={{ width: '100%', height: '140px' }}
                      />
                    </div>
                    <div className="col-sm-3">
                      <h4 className="textw700 text-purple">Quartile 3</h4>
                      <div
                        className="echarts-graph"
                        id="graph3"
                        style={{ width: '100%', height: '140px' }}
                      />
                    </div>
                    <div className="col-sm-3">
                      <h4 className="textw700 text-purple">Highest</h4>
                      <div
                        className="echarts-graph"
                        id="graph4"
                        style={{ width: '100%', height: '140px' }}
                      />
                    </div>
                  </div>

                  <i
                    className="fa fa-male fa-4x"
                    style={{ color: '#c5bdee', marginRight: '16px' }}
                  />
                  <i
                    className="fa fa-female fa-4x"
                    style={{ color: '#735a8b' }}
                  />

                  <h4 className="text-muted">
                    This data shows that there are significantly more men
                    working within the higher paid jobs at Acme.
                  </h4>
                </div>

                <br />
                <h5>
                  Acme has also completed their mandated high-level government
                  gender pay report which can be viewed <a href="/here">here</a>.
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div className="seperator" />

        <div className="">
          <div className="widget_tally_box text-left drop-shadow">
            <div className="x_panel c1">
              <div className="x_title">
                <h3>Salary Transparency</h3>
                <div className="clearfix" />
              </div>
              <div className="x_content text-center">
                <div className="seperator" />

                <div className="text-center">
                  <h4 className="text-muted">
                    Please login to see salaries <a href="#none">here</a>
                  </h4>
                </div>

                <div className="seperator" />
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
