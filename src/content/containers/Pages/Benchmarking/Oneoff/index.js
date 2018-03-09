import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import Footer from '../../../../../content/components/Footers/b2b';
import NavBar from '../../../../../content/components/Navigation/Composites/benchmarking';

import {
  drawSemiCircleChart,
  drawWordCloud,
} from '../../../../../content/scripts/custom/echarts/generators';
import {
  renderChartToTarget,
  redrawCharts,
  updateChartOptions,
} from '../../../../../content/scripts/custom/echarts/utilities';
import {
  fireDebouncedResizeEvents,
  debounce,
} from '../../../../../content/scripts/custom/utilities';

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      industryWordCloud: [
        { name: 'IBM', value: 1 },
        { name: 'Accenture', value: 1 },
        { name: 'BCS Consulting', value: 1 },
        { name: 'Google', value: 1 },
        { name: 'PWC', value: 1 },
        { name: 'Deloitte', value: 1 },
        { name: 'Microsoft', value: 1 },
        { name: 'IBM', value: 1 },
        { name: 'Barclays', value: 1 },
        { name: 'EY', value: 1 },
        { name: 'KPMG', value: 1 },
        { name: 'Capgemini', value: 1 },
        { name: 'Cisco', value: 1 },
        { name: 'VMWare', value: 1 },
        { name: 'Expedia', value: 1 },
        { name: 'Microsoft', value: 1 },
        { name: 'Oracle', value: 1 },
        { name: 'Apple', value: 1 },
        { name: 'Airbnb', value: 1 },
        { name: 'NVIDIA', value: 1 },
        { name: 'Salesforce', value: 1 },
        { name: 'SAP', value: 1 },
        { name: 'Adobe', value: 1 },
        { name: 'LinkedIn', value: 1 },
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
      ],
      ageValues: [1, 3],
      viewSalary: false,
    };
  }

  componentDidMount() {
    // Wait for page to load (so the bootstrap plugins etc. are loaded)
    $(() => {
      // listen for resize events
      fireDebouncedResizeEvents();

      // then listen for the events here
      $(document).on('debouncedResizeEvent', () => {
        // and redraw the charts
        redrawCharts();
      });

      // do the salary graph
      renderChartToTarget(
        'graph1',
        drawSemiCircleChart(
          100,
          '£-',
          'Lower Quartile',
          '#9979ad',
          '#9979ad',
          '#777',
          1000,
        ),
      );

      renderChartToTarget(
        'graph2',
        drawSemiCircleChart(
          100,
          '£-',
          'Average Salary',
          '#9979ad',
          '#9979ad',
          '#777',
          1000,
        ),
      );

      renderChartToTarget(
        'graph3',
        drawSemiCircleChart(
          100,
          '£-',
          'Upper Quartile',
          '#9979ad',
          '#9979ad',
          '#777',
          1000,
        ),
      );

      // do the select
      $(this.selectJobTitle)
        .select2({
          maximumSelectionLength: Infinity,
          tags: true,
        })
        .on('change', () => {
          this.updateSalaryNumbers();
        });

      $(this.selectSkills)
        .select2({
          maximumSelectionLength: Infinity,
          tags: true,
        })
        .on('change', () => {
          this.updateSalaryNumbers();
        });

      $(this.selectLocation)
        .select2({
          maximumSelectionLength: Infinity,
          tags: true,
        })
        .on('change', () => {
          this.updateSalaryNumbers();
        });

      $(this.selectCompany)
        .select2({
          placeholder: 'Build your industry',
        })
        .on('change', () => {
          if ($(this.selectCompany).val().length > 0) {
            const companyID = $(this.selectCompany).val();
            const companyName = $(this.selectCompany)
              .find("option[value='" + companyID + "']")
              .text();

            const newData = [];

            this.state.industryWordCloud.forEach((value) => {
              if (companyName !== value.name) {
                newData.push(value);
              }
            });

            newData.push({ name: companyName, value: 1 });

            this.setState({ industryWordCloud: newData }, () => {
              this.updateIndustryCloud(newData);
              $(this.selectCompany)
                .val('')
                .change();
              this.updateSalaryNumbers();
            });
          }
        });

      $(this.selectIndustry)
        .select2({
          placeholder: 'Select premade industry',
        })
        .on('change', () => {
          if ($(this.selectIndustry).val().length > 0) {
            const indID = $(this.selectIndustry).val();
            const indName = $(this.selectIndustry)
              .find("option[value='" + indID + "']")
              .text();

            const newData = [{ name: indName, value: 1 }];

            this.setState({ industryWordCloud: newData }, () => {
              this.updateIndustryCloud(newData);
              $(this.selectIndustry)
                .val('')
                .change();
              this.updateSalaryNumbers();
            });
          }
        });

      // sliders
      $(this.sliderExperience).slider({
        min: 0,
        max: 20,
        step: 1,
        value: [1, 3],
      });

      const executeFunction = debounce((e) => {
        this.setState({ ageValues: e.value });
        this.updateSalaryNumbers();
      }, 250);

      $(this.sliderExperience).on('slideStop', executeFunction);

      // industry stuff
      const chart = renderChartToTarget(
        'graph0',
        drawWordCloud({ data: this.state.industryWordCloud }),
      );

      chart.on('click', (params) => {
        const newData = [];

        this.state.industryWordCloud.forEach((value) => {
          if (params.data.name !== value.name) {
            newData.push(value);
          }
        });

        this.setState({ industryWordCloud: newData }, () => {
          this.updateIndustryCloud(newData);
          this.updateSalaryNumbers();
        });
      });
    });
  }

  componentDidUpdate() {
    if (this.state.viewSalary === true) {
      $(this.sliderExperience).slider('disable');
    }
  }

  onClick() {
    this.changeLocation();
  }

  getJobTitleSelect() {
    return (
      <select
        disabled={this.state.viewSalary}
        style={{ width: '100%' }}
        defaultValue={['dev']}
        multiple="multiple"
        className="form-control"
        ref={(select) => {
          this.selectJobTitle = select;
        }}
      >
        <option key="all" value="all">
          All Jobs
        </option>
        <option key="dev" value="dev">
          Developer
        </option>
      </select>
    );
  }

  getSkillsSelect() {
    return (
      <select
        disabled={this.state.viewSalary}
        style={{ width: '100%' }}
        defaultValue={['js']}
        multiple="multiple"
        className="form-control"
        ref={(select) => {
          this.selectSkills = select;
        }}
      >
        <option key="all" value="all">
          All Skills
        </option>
        <option key="js" value="js">
          Javascript
        </option>
      </select>
    );
  }

  getCompanySelect() {
    return (
      <select
        style={{ width: '100%' }}
        ref={(select) => {
          this.selectCompany = select;
        }}
        className="form-control"
      >
        <option />
        <option key="1" value="company">
          IBM
        </option>
        <option key="2" value="company">
          Accenture
        </option>
        <option key="3" value="company">
          BCS Consulting
        </option>
        <option key="4" value="company">
          Google
        </option>
        <option key="5" value="company">
          PWC
        </option>
        <option key="6" value="company">
          Deloitte
        </option>
        <option key="7" value="company">
          Microsoft
        </option>
        <option key="8" value="company">
          IBM
        </option>
        <option key="9" value="company">
          Barclays
        </option>
        <option key="10" value="company">
          EY
        </option>
        <option key="11" value="company">
          KPMG
        </option>
        <option key="12" value="company">
          Capgemini
        </option>
        <option key="13" value="company">
          Cisco
        </option>
        <option key="14" value="company">
          VMWare
        </option>
        <option key="15" value="company">
          Expedia
        </option>
        <option key="16" value="company">
          Microsoft
        </option>
        <option key="17" value="company">
          Oracle
        </option>
        <option key="18" value="company">
          Apple
        </option>
        <option key="19" value="company">
          Airbnb
        </option>
        <option key="20" value="company">
          NVIDIA
        </option>
        <option key="21" value="company">
          Salesforce
        </option>
        <option key="22" value="company">
          SAP
        </option>
        <option key="23" value="company">
          Adobe
        </option>
        <option key="24" value="company">
          LinkedIn
        </option>
        <option key="25" value="company">
          Facebook
        </option>
        <option key="26" value="company">
          Infosys
        </option>
        <option key="27" value="company">
          Wipro
        </option>
        <option key="28" value="company">
          HP
        </option>
        <option key="29" value="company">
          DELL
        </option>
        <option key="30" value="company">
          Onfido
        </option>
        <option key="31" value="company">
          City Mapper
        </option>
        <option key="32" value="company">
          Vodafone
        </option>
        <option key="33" value="company">
          Telefonica
        </option>
        <option key="34" value="company">
          SendGrid
        </option>
      </select>
    );
  }

  getIndustrySelect() {
    return (
      <select
        disabled={this.state.viewSalary}
        style={{ width: '100%' }}
        ref={(select) => {
          this.selectIndustry = select;
        }}
        className="form-control"
      >
        <option />
        <option key="1" value="industry1">
          Technology
        </option>
        <option key="2" value="indutsry2">
          Consumer Goods
        </option>
        <option key="3" value="industry3">
          Banking
        </option>
        <option key="4" value="industry4">
          Professional Services
        </option>
        <option key="5" value="industry5">
          Financial Services
        </option>
      </select>
    );
  }

  getExperienceSlider() {
    return (
      <input
        type="text"
        value=""
        ref={(input) => {
          this.sliderExperience = input;
        }}
      />
    );
  }

  getLocationsSelect() {
    return (
      <select
        disabled={this.state.viewSalary}
        style={{ width: '100%' }}
        defaultValue={['london']}
        multiple="multiple"
        className="form-control"
        ref={(select) => {
          this.selectLocation = select;
        }}
      >
        <option key="all" value="all">
          All Locations
        </option>
        <option key="london" value="london">
          London
        </option>
      </select>
    );
  }

  getRandomInt(min, max) {
    return (
      Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) +
      Math.ceil(min)
    );
  }

  getViewSalaryButton() {
    if (this.state.viewSalary === false) {
      return (
        <button
          className="btn btn-purple-2 btn-circle"
          onClick={() => {
            this.viewSalary();
          }}
        >
          View salary information
        </button>
      );
    }

    return null;
  }

  keyUp(e) {
    e.preventDefault();

    if (e.keyCode === 13) {
      this.changeLocation();
    }
  }

  changeLocation() {
    this.context.router.history.push('/benchmarking-signup');
  }

  updateSalaryNumbers() {
    const seedNumber = this.getRandomInt(50000, 60000);
    const upperLower = this.getRandomInt(5000, 10000);

    let low = Math.ceil((seedNumber - upperLower) / 100) * 100;
    let higher = Math.ceil((seedNumber + upperLower) / 100) * 100;
    let mid = Math.ceil(seedNumber / 100) * 100;

    if (this.state.viewSalary === false) {
      low = '-';
      higher = '-';
      mid = '-';
    }

    updateChartOptions(
      'graph1',
      drawSemiCircleChart(
        100,
        '£' + low.toLocaleString(),
        'Lower Quartile',
        '#9979ad',
        '#9979ad',
        '#777',
        1000,
      ),
    );

    updateChartOptions(
      'graph2',
      drawSemiCircleChart(
        100,
        '£' + mid.toLocaleString(),
        'Average Salary',
        '#9979ad',
        '#9979ad',
        '#777',
        1000,
      ),
    );

    updateChartOptions(
      'graph3',
      drawSemiCircleChart(
        100,
        '£' + higher.toLocaleString(),
        'Upper Quartile',
        '#9979ad',
        '#9979ad',
        '#777',
        1000,
      ),
    );
  }

  updateIndustryCloud(data) {
    if (data.length === 0) {
      updateChartOptions(
        'graph0',
        drawWordCloud({ data: [{ name: 'All Companies', value: 1 }] }),
      );
    } else {
      updateChartOptions('graph0', drawWordCloud({ data }));
    }
  }

  clearAllClick() {
    const newData = [];

    this.setState({ industryWordCloud: newData }, () => {
      this.updateIndustryCloud(newData);
      this.updateSalaryNumbers();
    });
  }

  viewSalary() {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const conf = confirm(
      'Your account will be charged and you will not be able to change your filters.',
    );

    if (conf === true) {
      this.setState({ viewSalary: true }, () => {
        this.updateSalaryNumbers();
      });
    }
  }

  render() {
    return (
      <div className="p-customer c2">
        <Helmet title="Clever Salary Analytics" />
        <NavBar />
        <section className="c2 page-section" style={{ padding: '10px 0 30px' }}>
          <div className="container text-center">
            <h1>You asked:</h1>
            <h3 className="text-muted">
              "How much should I pay a{' '}
              <span className="text-purple">Javascript Developer</span> in{' '}
              <span className="text-purple">London</span> with{' '}
              <span className="text-purple">1 to 3 years experience</span>"
            </h3>

            <div className="row">
              <div className="col-sm-10 col-sm-push-1 col-md-8 col-md-push-2">
                <form
                  style={{ padding: '16px' }}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <p className="input-group">
                    <input
                      type="text"
                      className="form-control search-input"
                      placeholder="Ask a different question..."
                      style={{
                        height: '36px',
                        fontSize: '22px',
                        borderRadius: '25px 0 0 25px',
                      }}
                      onKeyUp={(e) => {
                        this.keyUp(e);
                      }}
                    />
                    <span
                      className="input-group-addon search-icon"
                      onKeyPress={() => {
                        this.onClick();
                      }}
                      onClick={() => {
                        this.onClick();
                      }}
                      role="button"
                      tabIndex={0}
                      style={{ borderRadius: '0 25px 25px 0' }}
                    >
                      <span
                        className="glyphicon glyphicon-search"
                        aria-hidden="true"
                        style={{ fontSize: '18px' }}
                      />
                    </span>
                  </p>
                </form>
              </div>
            </div>

            <div className="widget_tally_box text-left seperator">
              <div className="x_panel c1 page-section drop-shadow">
                <div className="x_title">
                  <h3>Your question breakdown:</h3>
                  <div className="clearfix" />
                </div>
                <div className="x_content" style={{ marginLeft: '16px' }}>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="row">
                        <div className="col-sm-6">
                          <h4 className="text-muted">Job Title:</h4>
                          {this.getJobTitleSelect()}
                        </div>
                        <div className="col-sm-6">
                          <h4 className="text-muted">Skillset:</h4>
                          {this.getSkillsSelect()}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <h4 className="text-muted">Location:</h4>
                          {this.getLocationsSelect()}
                        </div>
                        <div className="col-sm-6">
                          <h4 className="text-muted">Years Experience:</h4>

                          <div className="row">
                            <div className="col-sm-8">
                              <div style={{ marginTop: '6px' }}>
                                {this.getExperienceSlider()}
                              </div>
                            </div>
                            <div className="col-sm-4 text-center">
                              <h5>
                                Between {this.state.ageValues[0]} and{' '}
                                {this.state.ageValues[1]} years
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12">
                          <h4 className="text-muted">Industry:</h4>

                          <div className="box-border">
                            <div className="row">
                              <div className="col-sm-8 col-sm-push-2">
                                <div style={{ margin: '10px 0' }}>
                                  {this.getIndustrySelect()}
                                </div>
                              </div>
                            </div>

                            <div className="lock-parent">
                              <div className="lock-item" />
                              <div className="blur-me">
                                <div className="pull-left">
                                  <div
                                    style={{
                                      width: '200px',
                                      margin: '10px 0 0 10px',
                                    }}
                                  >
                                    {this.getCompanySelect()}
                                  </div>
                                </div>

                                <div className="pull-right">
                                  <button
                                    className="btn btn-no-style"
                                    onClick={() => {
                                      this.clearAllClick();
                                    }}
                                  >
                                    <i className="fa fa-window-close" /> clear
                                    all
                                  </button>
                                </div>

                                <div className="clearfix" />
                                <div
                                  className="echarts-graph"
                                  id="graph0"
                                  style={{ width: '100%', height: '200px' }}
                                />
                              </div>
                            </div>
                          </div>
                          <br />
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="x_title">
                  <h3>The Answer:</h3>
                  <div className="clearfix" />
                </div>

                <div className="x_content">
                  <div className="text-center">
                    {this.getViewSalaryButton()}
                  </div>

                  <div className="row flex-v-center-sm">
                    <div className="col-sm-4">
                      <div
                        className="echarts-graph"
                        id="graph1"
                        style={{ width: '100%', height: '200px' }}
                      />
                    </div>
                    <div className="col-sm-4">
                      <div
                        className="echarts-graph"
                        id="graph2"
                        style={{ width: '100%', height: '300px' }}
                      />
                    </div>
                    <div className="col-sm-4">
                      <div
                        className="echarts-graph"
                        id="graph3"
                        style={{ width: '100%', height: '200px' }}
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h4>
                      Use the Sliips Score below to guide what your offer should
                      be.
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="widget_tally_box text-left">
              <div className="x_panel c1 page-section drop-shadow">
                <div className="x_title">
                  <h3>Sliips Score for selected industry</h3>
                  <div className="clearfix" />
                </div>
                <div className="x_content">
                  <div className="row tile_count" style={{ marginBottom: '0' }}>
                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count tile_stats_count_line">
                      <span className="count_top text-purple">
                        <i className="fa fa-users" /> Diversity
                      </span>
                      <div className="count">
                        67<span className="text-muted">/100</span>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count tile_stats_count_line">
                      <span className="count_top text-purple">
                        <i className="fa fa-briefcase" /> Culture
                      </span>
                      <div className="count">
                        82<span className="text-muted">/100</span>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count tile_stats_count_line">
                      <span className="count_top text-purple">
                        <i className="fa fa-gbp" /> Salary
                      </span>
                      <div className="count">
                        91<span className="text-muted">/100</span>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count tile_stats_count_line">
                      <span className="count_top text-purple">
                        <i className="fa fa-smile-o" /> Job Satisfaction
                      </span>
                      <div className="count">
                        43<span className="text-muted">/100</span>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count tile_stats_count_line">
                      <span className="count_top text-purple">
                        <i className="fa fa-search" /> Other Benefits
                      </span>
                      <div className="count">
                        94<span className="text-muted">/100</span>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count tile_stats_count_line">
                      <span className="count_top text-purple">
                        <i className="fa fa-user" /> Sliips Score
                      </span>
                      <div className="count text-purple">
                        52<span className="text-muted">/100</span>
                      </div>
                    </div>
                  </div>

                  <br />
                  <br />

                  <div className="row text-center">
                    <div className="col-sm-4 col-sm-push-2">
                      <div className="box-border" style={{ padding: '10px' }}>
                        <h3>Underperform?</h3>
                        <h4 className="text-muted">
                          You may have to offer more than the average,
                          especially of job satisfaction is not your strong
                          point!
                        </h4>
                      </div>
                    </div>
                    <div className="col-sm-4 col-sm-push-2">
                      <div className="box-border" style={{ padding: '10px' }}>
                        <h3>Outperform?</h3>
                        <h4 className="text-muted">
                          You might be able to offer less than the average,
                          especially if culture is your strong point!
                        </h4>
                      </div>
                    </div>
                  </div>

                  <br />
                  <div className="text-center">
                    <button className="btn btn-purple-2 btn-circle">
                      Get Your Companies Sliips Score
                    </button>

                    <h5>
                      For more details on the Sliips Scores and how they are
                      calculated <span className="textPurple">Click Here</span>
                    </h5>
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
