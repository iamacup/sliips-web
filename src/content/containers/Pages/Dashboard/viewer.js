import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { enableSmoothScroll } from '../../../../content/scripts/custom/utilities';
import { drawSemiCircleChart } from '../../../../content/scripts/custom/echarts/generators';
import { renderChartToTarget } from '../../../../content/scripts/custom/echarts/utilities';

class Viewer extends React.PureComponent {
  componentDidMount() {
    // wait for page to load
    $(() => {
      // draw the profile graph
      let formattedSalary = 'Unknown';

      if (this.props.data.salary > 0) {
        formattedSalary = '£' + this.props.data.salary.toLocaleString();
      }

      renderChartToTarget(
        'graph1',
        drawSemiCircleChart(
          100,
          formattedSalary,
          'Your Salary',
          '#9979ad',
          '#9979ad',
          '#777',
          1000,
        ),
      );

      // add edut profile button stuff
      $('#editProfileButton').on('click', () => {
        $('#splashHeaderContent').animate(
          { width: 0, opacity: 0 },
          500,
          'swing',
          () => {
            $('#splashHeaderContent').addClass('hidden');
            $('#splashProfileContent')
              .removeClass('hidden')
              .animate({ width: '100%', opacity: 1 }, 500, 'swing', () => {});
          },
        );
      });

      // add back to profile button stuff
      $('#backProfileButton').on('click', () => {
        $('#splashProfileContent').animate(
          { width: 0, opacity: 0 },
          500,
          'swing',
          () => {
            $('#splashProfileContent').addClass('hidden');
            $('#splashHeaderContent')
              .removeClass('hidden')
              .animate({ width: '100%', opacity: 1 }, 500, 'swing', () => {});
          },
        );
      });

      enableSmoothScroll('a.page-scroll');
    });
  }

  showCompanyData() {
    console.log(this.props);
  }

  showIndustryData() {
    console.log(this.props);
  }

  render() {
    const SubComponent = this.props.subComponent;
    const { data } = this.props;

    let navigation = null;

    if (this.props.showNavigation === true) {
      navigation = (
        <div className="text-center" style={{ paddingTop: '20px' }}>
          <Link
            to="/dashboard/company"
            href="/dashboard/company"
            className="btn btn-purple-1 btn-xl btn-circle"
          >
            {' '}
            Company Data{' '}
          </Link>
          <Link
            to="/dashboard/industry"
            href="/dashboard/industry"
            className="btn btn-purple-1 btn-xl btn-circle"
          >
            {' '}
            Job Market Data{' '}
          </Link>
        </div>
      );
    }

    return (
      <div>
        <div
          className="text-center c1 page-section container db-top-section"
          style={{ borderBottom: '1px solid #e6e9ed' }}
        >
          <div id="splashHeaderContent">
            <div className="row">
              <div className="col-sm-6">
                <div
                  className="echarts-graph"
                  id="graph1"
                  style={{ width: '100%', height: '300px' }}
                />
              </div>

              <div className="col-sm-6 text-left">
                <div className="profile">
                  <h2>Salary:</h2>
                  <h3
                    className={
                      data.salaryVerified === true ? 'text-green' : 'text-red'
                    }
                  >
                    {data.salaryVerified === true ? 'Verified' : 'Not Verified'}
                  </h3>
                  <h2>Job Title:</h2>
                  <h3 className="text-light-purple">{data.jobTitle}</h3>
                  <h2>Working At:</h2>
                  <h3 className="text-light-purple">{data.companyName}</h3>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: '40px' }} />

            <div className="row">
              <div className="col-sm-8 col-sm-push-2 col-md-6 col-md-push-3">
                <h3>
                  Your Profile:
                  <span
                    className={
                      // eslint-disable-line no-nested-ternary
                      data.profileCompletion <= 40 // eslint-disable-line no-nested-ternary
                        ? 'text-red' // eslint-disable-line no-nested-ternary
                        : data.profileCompletion <= 85 // eslint-disable-line no-nested-ternary
                          ? 'text-orange' // eslint-disable-line no-nested-ternary
                          : 'text-green' // eslint-disable-line no-nested-ternary
                    } // eslint-disable-line no-nested-ternary
                  >
                    {' ' + data.profileCompletion + '% Complete'}
                  </span>
                  <sup>
                    <span className="tipWrapper text-purple">
                      <i className="fa fa-question-circle-o" />
                      <div className="tooltip" style={{ width: '150px' }}>
                        <h4>What is this?</h4>
                        This shows how much of your profile is complete. Click
                        the edit profile button to earn points and finish your
                        profile.
                      </div>
                    </span>
                  </sup>
                </h3>
                <div className="row">
                  <div className="col-sm-9">
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-purple"
                        role="progressbar"
                        aria-valuenow="4"
                        aria-valuemin="0"
                        aria-valuemax="10"
                        style={{ width: data.profileCompletion + '%' }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <button
                      id="editProfileButton"
                      className="btn btn-purple-1 btn-circle"
                    >
                      Edit Profile <i className="fa fa-arrow-circle-o-right" />{' '}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="hidden"
            id="splashProfileContent"
            style={{ width: '0%', opacity: '0', right: '0px' }}
          >
            <h2>Coming Soon...</h2>
            <div style={{ paddingTop: '50px' }} />
            <button
              id="backProfileButton"
              className="btn btn-purple-1 btn-circle"
            >
              Back <i className="fa fa-arrow-circle-o-left" />{' '}
            </button>
          </div>

          <div className="row">
            <div className="col-xs-12 text-center red-links animated animate-five bounce">
              <a
                href="#data-viewer"
                className="page-scroll"
                style={{ fontSize: '50px' }}
              >
                {' '}
                <i className="fa fa-chevron-circle-down" />{' '}
              </a>
            </div>
          </div>

          <div style={{ paddingTop: '20px' }} />
        </div>

        {navigation}

        <div id="data-viewer" className="text-center c1 page-section container">
          {SubComponent}
        </div>
      </div>
    );
  }
}

Viewer.propTypes = {
  subComponent: PropTypes.element.isRequired,
  showNavigation: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    salaryVerified: PropTypes.bool.isRequired,
    jobTitle: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    profileCompletion: PropTypes.number.isRequired,
  }).isRequired,
};

export default Viewer;
