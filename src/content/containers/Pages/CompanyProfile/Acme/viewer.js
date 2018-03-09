import React from 'react';
import PropTypes from 'prop-types';

import NavBar from '../../../../../content/components/Navigation/Composites/companyProfile';
import Select2 from '../../../../../content/components/Select2';
import ButtonGroup from '../../../../../content/components/ButtonGroup';
import Footer from '../../../../../content/components/Footers/general';
import TabbedContent from '../../../../../content/components/TabbedContent';
import ViewerSalary from './viewer-salary';
import ViewerOther from './viewer-other';
import ViewerStyle from './viewer-style';
import ViewerOffice from './viewer-office';
import ViewerSummary from './viewer-summary';
import ViewerProgression from './viewer-progression';

import { redrawCharts } from '../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../content/scripts/custom/utilities';
import * as CompanyUtility from '../../../../../content/containers/Pages/CompanyProfile/utility';

class Viewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabData: this.getStateItems('Summary'),
    };
  }

  componentDidMount() {
    $(() => {
      console.log(this.props.data);
      /* const stickFunction = () => {
        $('#customiser-colors').addClass('stuck-corners');
        $('#customiser-titles').addClass('hidden');
      };

      const unstickFunction = () => {
        $('#customiser-colors').removeClass('stuck-corners');
        $('#customiser-titles').removeClass('hidden');
      };

      initialiseNonMobileSticky('#customiser', { offset_top: 50 }, stickFunction, unstickFunction); */

      // listen for resize events
      fireDebouncedResizeEvents();

      // then listen for the events here
      $(document).on('debouncedResizeEvent', () => {
        // and redraw the charts
        redrawCharts();
      });

      $('#theTabs a').click((e) => {
        e.preventDefault();
        $(e.target).tab('show');
      });
    });
  }

  getStateItems(activeItem) {
    const names = [
      'Summary',
      'Salaries',
      'Career Trend',
      'Other Benefits',
      'Company Style',
      'Office and Swag',
    ];
    const arr = [];

    names.forEach((vertex) => {
      if (vertex === 'Summary') {
        if (vertex === activeItem) {
          arr.push({
            name: vertex,
            content: <ViewerSummary active />,
            active: true,
          });
        } else {
          arr.push({
            name: vertex,
            content: <ViewerSummary active={false} />,
            active: false,
          });
        }
      } else if (vertex === 'Salaries') {
        if (vertex === activeItem) {
          arr.push({
            name: vertex,
            content: <ViewerSalary active />,
            active: true,
          });
        } else {
          arr.push({
            name: vertex,
            content: <ViewerSalary active={false} />,
            active: false,
          });
        }
      } else if (vertex === 'Career Trend') {
        if (vertex === activeItem) {
          arr.push({
            name: vertex,
            content: <ViewerProgression active />,
            active: true,
          });
        } else {
          arr.push({
            name: vertex,
            content: <ViewerProgression active={false} />,
            active: false,
          });
        }
      } else if (vertex === 'Other Benefits') {
        if (vertex === activeItem) {
          arr.push({
            name: vertex,
            content: <ViewerOther active />,
            active: true,
          });
        } else {
          arr.push({
            name: vertex,
            content: <ViewerOther active={false} />,
            active: false,
          });
        }
      } else if (vertex === 'Company Style') {
        if (vertex === activeItem) {
          arr.push({
            name: vertex,
            content: <ViewerStyle active />,
            active: true,
          });
        } else {
          arr.push({
            name: vertex,
            content: <ViewerStyle active={false} />,
            active: false,
          });
        }
      } else if (vertex === 'Office and Swag') {
        if (vertex === activeItem) {
          arr.push({
            name: vertex,
            content: <ViewerOffice active />,
            active: true,
          });
        } else {
          arr.push({
            name: vertex,
            content: <ViewerOffice active={false} />,
            active: false,
          });
        }
      }
    });

    return arr;
  }

  filterButtonClick(data) {
    console.log(data);
  }

  clickTab(name) {
    this.setState({ tabData: this.getStateItems(name) });
  }

  render() {
    const filterButtons = (
      <ButtonGroup
        buttons={[
          <button
            value="1"
            key="1"
            className="btn-multiline btn-default btn btn-sm"
          >
            Global Business Services (GBS)
          </button>,
          <button
            value="2"
            key="2"
            className="btn-multiline btn-default btn btn-sm"
          >
            Global Technology Services (GTS)
          </button>,
          <button
            value="3"
            key="3"
            className="btn-multiline btn-default btn btn-sm"
          >
            Software Group (SWG)
          </button>,
          <button
            value="4"
            key="4"
            className="btn-multiline btn-default btn btn-sm"
          >
            Systems Hardware Group
          </button>,
          <button
            value="5"
            key="5"
            className="btn-multiline btn-default btn btn-sm"
          >
            Operations / Support Services
          </button>,
          <button
            value="6"
            key="6"
            className="btn-multiline btn-default btn btn-sm"
          >
            Research
          </button>,
          <button
            value="7"
            key="7"
            className="btn-multiline btn-default btn btn-sm"
          >
            Sales
          </button>,
        ]}
        callback={(data) => {
          this.filterButtonClick(data);
        }}
      />
    );

    return (
      <div className="p-company p-customer">
        <NavBar companyName="Acme Corp" baseClass="company-nav" />
        <section className="purple-banner top-banner">
          <h1>Acme Corp</h1>

          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-sm-push-3">
                <h4>
                  Acme Corp has partnered with Sliips to show what it's really
                  like to work there - proving their commitment to transparency
                  and rewarding and supporting their employees.
                </h4>
              </div>
            </div>
          </div>
        </section>

        <section className="c2" style={{ paddingBottom: '100px' }}>
          <div className="container">
            <div className="jumbo c1" style={{ marginTop: '-60px' }}>
              <div className="widget_tally_box text-left">
                <div className="x_panel">
                  <div className="x_title">
                    <h3>Sliips Overall Scores</h3>
                    <div className="clearfix" />
                  </div>
                  <div className="x_content">
                    <div className="row">
                      <div className="col-sm-10 col-sm-push-1">
                        <div
                          className="row tile_count"
                          style={{ marginBottom: '0' }}
                        >
                          <div className="col-sm-4 tile_stats_count">
                            <span className="count_top text-purple">
                              <i className="fa fa-briefcase" /> Company Style
                            </span>
                            <div style={{ marginTop: '6px' }}>
                              {CompanyUtility.getBinaryRowReallyTiny(
                                '70',
                                'Very Startup',
                                'Very Corporate',
                              )}
                            </div>
                          </div>
                          <div className="col-sm-4 tile_stats_count">
                            <span className="count_top text-purple">
                              <i className="fa fa-building-o" /> Office and Swag
                            </span>
                            <div style={{ marginTop: '6px' }}>
                              {CompanyUtility.getBinaryRowReallyTiny(
                                '80',
                                'Traditional',
                                'Has a Slide',
                              )}
                            </div>
                          </div>
                          <div className="col-sm-3 col-sm-push-1 tile_stats_count tile_stats_count_line">
                            <span className="count_top text-purple">
                              <i className="fa fa-gbp" /> Salary
                            </span>
                            <div className="count text-green textw700">
                              <h3>Competitive</h3>
                            </div>
                          </div>
                        </div>

                        <div
                          className="row tile_count"
                          style={{ marginBottom: '0' }}
                        >
                          <div className="col-sm-4 tile_stats_count">
                            <span className="count_top text-purple">
                              <i className="fa fa-rocket" /> Career Trend
                            </span>
                            <div style={{ marginTop: '6px' }}>
                              {CompanyUtility.getBinaryRowReallyTiny(
                                '80',
                                'Unstructured',
                                'Structured',
                              )}
                            </div>
                          </div>
                          <div className="col-sm-4 tile_stats_count">
                            <span className="count_top text-purple">
                              <i className="fa fa-smile-o" /> Other Benefits
                            </span>
                            <div style={{ marginTop: '6px' }}>
                              {CompanyUtility.getBinaryRowReallyTiny(
                                '50',
                                'Standard',
                                'Bells & Whistles',
                              )}
                            </div>
                          </div>
                          <div className="col-sm-3 col-sm-push-1 tile_stats_count tile_stats_count_line">
                            <span className="count_top text-purple">
                              <i className="fa fa-users" /> Gender Equality
                            </span>
                            <div className="count text-orange textw700">
                              <h3>Improving</h3>
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

          <div style={{ paddingTop: '60px' }} />

          <div className="container-fluid on-top hidden" id="customiser">
            <div
              className="purple-emphasis round-corners c1"
              id="customiser-colors"
            >
              <div className="widget_tally_box text-left">
                <div className="x_panel">
                  <div className="x_content text-center">
                    <div className="row" id="customiser-titles">
                      <div className="col-sm-4">
                        <h4>Select Country</h4>
                      </div>
                      <div className="col-sm-8">
                        <h4>Select Business Units</h4>
                      </div>
                    </div>
                    <div className="row flex-v-center-sm">
                      <div className="col-sm-4">
                        <Select2
                          callback={(inData) => {
                            console.log('change');
                            console.log(inData);
                          }}
                          options={<option value="GB">United Kingdom</option>}
                          allowClear={false}
                        />
                      </div>
                      <div className="col-sm-8 border-left-md-grey">
                        <div className="form-group small-button-margin">
                          {filterButtons}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <TabbedContent
              content={this.state.tabData}
              callback={(name) => {
                this.clickTab(name);
              }}
            />
          </div>

          <div className="seperator" />

          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-sm-push-3 col-md-4 col-md-push-4">
                <div className="widget_tally_box text-left purple-banner round-corners">
                  <div className="x_panel">
                    <div className="x_title">
                      <h3>Join Sliips</h3>
                      <h5>Discover More!</h5>
                      <div className="clearfix" />
                    </div>
                    <div className="x_content">
                      <button className="btn btn-orange-1 btn-xl btn-circle fa-2x">
                        Get Started
                      </button>
                    </div>
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

Viewer.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Viewer;
