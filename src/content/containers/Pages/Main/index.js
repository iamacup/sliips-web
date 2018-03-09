import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavBar from '../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../content/components/Footers/general';
import ContactButtons from '../../../../content/components/ContactButtons';
import WizzardPane from '../../../../content/containers/Fragments/WizzardPane';

import {
  drawConsultingMarketSalariesByYears,
  drawConusltingLevelProgressionStacked,
  drawConsultingJobSpecPercentage,
} from '../../../../content/scripts/custom/echarts/statics';
import {
  renderChartToTarget,
  redrawCharts,
} from '../../../../content/scripts/custom/echarts/utilities';
import {
  fireDebouncedResizeEvents,
  dNc,
} from '../../../../content/scripts/custom/utilities';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreMulti/actions';

const dataStoreID = 'siteSession';

class Page extends React.Component {
  componentDidMount() {
    // Wait for page to load (so the bootstrap plugins etc. are loaded)
    $(() => {
      // draw out the graphs
      renderChartToTarget('graph1', drawConsultingMarketSalariesByYears());
      renderChartToTarget('graph2', drawConusltingLevelProgressionStacked());
      renderChartToTarget('graph3', drawConsultingJobSpecPercentage());

      // listen to scroll events on the carousel
      require('../../../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js');

      $('#graph-slides').bind('slid.bs.carousel', () => {
        redrawCharts();
      });

      // listen for resize events
      fireDebouncedResizeEvents();

      // then listen for the events here
      $(document).on('debouncedResizeEvent', () => {
        // and redraw the charts
        redrawCharts();
      });
    });
  }

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

  playExplainerVideo = () => {
    // any javascript / css that this page needs from external libraries
    const Fitvids = require('fitvids');

    // load the player - note - this loads the constructor directly (unlike vim docs) - https://github.com/vimeo/player.js/issues/81
    const Vimeo = require('@vimeo/player');

    // do some jiggery pokery with visibility
    $('#videoDiv').removeClass('hidden');
    $('#videoButtonDiv').addClass('hidden');

    // make it so the video is fluid
    Fitvids('#videoDiv');

    // grab the iframe for vimeo and make the vimeo player object
    const iframe = document.querySelector('iframe');
    const player = new Vimeo(iframe);

    // wait for the player to be ready
    player.ready().then(() => {
      // make the player play
      player
        .play()
        .then(() => {
          // playing
        })
        .catch(() => {
          // error
        });

      // build the function for handling what happens when the video finishes
      const onEnded = () => {
        // reverse the hidden stuff we did at the start of this method
        $('#videoDiv').addClass('hidden');
        $('#videoButtonDiv').removeClass('hidden');
      };

      // add the listener to that function
      player.on('ended', onEnded);
    });
  };

  render() {
    return (
      <div>
        <Helmet title="Home" />
        <NavBar />
        <div className="p-splash">
          <header className="fullpage-header-home">
            <div className="container">
              <div className="row flex-v-center-sm">
                <div className="col-sm-6">
                  <br />
                  <br />
                  <div className="text-left textHeaderFont">
                    <h1 style={{ marginBottom: '0px' }}>
                      <span
                        className="textw800 text-light-purple"
                        style={{ fontSize: '50px' }}
                      >
                        BE CURIOUS.
                      </span>
                    </h1>
                    <h3 style={{ marginTop: '0px' }}>
                      <span className="textw600 text-dark">
                        Find out how much people are paid.
                      </span>
                    </h3>
                  </div>

                  <div className="style-inputs">
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
                            <i className="fa fa-line-chart" />SEE THE DATA
                          </Link>
                          <h4>
                            The only website powered by crowdsourced payslips.
                          </h4>
                        </div>
                      }
                      nextButtonClassName="btn btn-purple-2 btn-xl btn-circle fa-2x gs-button-pad"
                      nextButtonContent={
                        <span>
                          <i className="fa fa-line-chart" />
                          SEE THE DATA
                        </span>
                      }
                      showTitles={false}
                    />
                  </div>
                </div>
                <div className="col-sm-6 hidden-xs">
                  <div
                    className="echarts-graph hidden"
                    style={{ width: '100%', height: '300px' }}
                    id="info-graph"
                  />
                  <div
                    className="header-image-container"
                    id="top-image-container"
                  >
                    <img
                      alt="A computer monitor with various analytics displayed"
                      src={require('../../../../content/theme/custom/images/bg6-small.png')}
                      className="img-responsive img-responsive-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="c1 page-section" style={{ paddingTop: '0px' }}>
            <div className="container text-center">
              <h2 className="section-heading">
                Unlike other websites, our data is based on payslips.
              </h2>
              <div className="seperator" />
              <div className="row">
                <div className="col-xs-4">
                  <Link to="/get-started/1" href="/get-started/1">
                    <i className="fa fa-4x fa-user-plus wow bounceIn text-purple" />
                    <h3 className="text-purple">1. Create an Account</h3>
                  </Link>
                  <h4 className="text-muted hidden-xs">
                    Answer five questions to get free access
                  </h4>
                </div>
                <div className="col-xs-4">
                  <i
                    className="fa fa-4x fa-pie-chart wow bounceIn text-purple"
                    data-wow-delay=".1s"
                  />
                  <h3 className="text-purple">2. Analyse the Data</h3>
                  <h4 className="text-muted hidden-xs">
                    Find out if you are paid fairly
                  </h4>
                </div>
                <div className="col-xs-4">
                  <i
                    className="fa fa-4x fa-paper-plane wow bounceIn text-purple"
                    data-wow-delay=".2s"
                  />
                  <h3 className="text-purple">3. Verify Your Salary</h3>
                  <h4 className="text-muted hidden-xs">
                    Send us a picture of your payslip, without your name on it,
                    to see how much your colleagues are paid!
                  </h4>
                </div>
              </div>
            </div>
          </section>

          <section className="c2 page-section">
            <div className="container text-center">
              <h2 className="section-heading">
                Sliips explained in 59 seconds!
              </h2>
              <div className="seperator" />
              <div className="row">
                <div className="col-sm-10 col-sm-push-1 col-md-8 col-md-push-2">
                  <div className="hidden" id="videoDiv">
                    <iframe
                      src="https://player.vimeo.com/video/172724541"
                      width="640"
                      height="360"
                      frameBorder="0"
                      allowFullScreen
                      title="sliips-explainer"
                    />
                  </div>
                  <div id="videoButtonDiv" className="video-fake-container">
                    <button
                      onClick={this.playExplainerVideo}
                      className="btn-no-style text-purple"
                    >
                      <i className="fa fa-5x fa-play-circle-o" />
                    </button>
                    <div className="prog-bar-holder">
                      <div
                        className="pull-left"
                        style={{ marginTop: '1px', width: '88%' }}
                      >
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-purple"
                            role="progressbar"
                            aria-valuenow="1"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: '1%' }}
                          />
                        </div>
                      </div>
                      <div
                        className="pull-right textw700 text-center"
                        style={{ width: '12%' }}
                      >
                        0:59
                      </div>
                      <div className="clearfix" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="seperator" />
            </div>
          </section>

          <section className="c1 page-section">
            <div className="container text-center">
              <h2 className="section-heading">
                We use payslips to verify what people are telling us.
              </h2>
              <div className="seperator" />
              <img
                alt="6 different people (Male and Female) that represent the Sliips user base"
                src={require('../../../../content/theme/custom/images/users-small.png')}
                className="img-responsive img-responsive-center"
              />
              <div className="seperator" />
              <h3 className="text-muted">
                No matter who you are, Sliips will help you:
              </h3>
              <div className="row">
                <div className="col-sm-4 col-sm-push-2">
                  <div className="benefit">
                    <h4>
                      Know exactly what you are worth in the market place.
                    </h4>
                  </div>
                </div>
                <div className="col-sm-4 col-sm-push-2">
                  <div className="benefit">
                    <h4>See what real people are paid at your company.</h4>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4 col-sm-push-4">
                  <div className="benefit">
                    <h4>
                      Make decisions without relying on your manager, unverified
                      websites or recruiters.
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="c2 page-section hidden-xs" id="our-data">
            <div className="container-fluid text-center">
              <div
                id="graph-slides"
                className="carousel slide"
                data-ride="carousel"
                data-interval="8000"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#graph-slides"
                    data-slide-to="0"
                    className="active"
                  />
                  <li data-target="#graph-slides" data-slide-to="1" />
                  <li data-target="#graph-slides" data-slide-to="2" />
                </ol>
                <div className="carousel-inner">
                  <div className="item active">
                    <div className="carousel-item-container">
                      <h3>Explore your earnings potential in your industry.</h3>
                      <h4 className="text-muted">
                        Data shown for consulting companies.
                      </h4>
                      <div
                        className="echarts-graph"
                        style={{ width: '100%', height: '300px' }}
                        id="graph1"
                      />
                    </div>
                  </div>
                  <div className="item">
                    <div className="carousel-item-container">
                      <h3>
                        When are you likely to be promoted at different
                        companies?
                      </h3>
                      <h4 className="text-muted">
                        Data shown for consulting companies.
                      </h4>
                      <div
                        className="echarts-graph"
                        style={{ width: '100%', height: '300px' }}
                        id="graph2"
                      />
                    </div>
                  </div>
                  <div className="item">
                    <div className="carousel-item-container">
                      <h3>
                        What will you spend your time doing in the future?
                      </h3>
                      <h4 className="text-muted">
                        Data shown for consulting companies.
                      </h4>
                      <div
                        className="echarts-graph"
                        style={{ width: '100%', height: '300px' }}
                        id="graph3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="c1 page-section" id="principles">
            <div className="container text-center">
              <h2 className="section-heading">
                Even with a payslip, we don't know who our users are!
              </h2>
              <h4 className="text-muted">
                We use your payslip to verify the salary you type in, then{' '}
                <span className="textw700 text-purple">DELETE</span> it.
              </h4>
              <div className="seperator" />
              <div className="row flex-v-center-sm">
                <div className="col-sm-6">
                  <i
                    className="fa fa-5x fa-user-secret wow bounceIn text-purple"
                    data-wow-delay=".1s"
                  />
                  <h3 className="text-purple">Anonymous</h3>
                </div>
                <div className="col-sm-6 text-left text-muted numbered-list text-center-xs">
                  <h4>We only need 3 things from your payslip:</h4>
                  <ol className="list-group textw700 text-purple">
                    <li className="list-group-item">Company Name</li>
                    <li className="list-group-item">Date of Payslip</li>
                    <li className="list-group-item">Gross Salary</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <section id="join" className="c3 join purple-list-group">
            <div className="container text-center">
              <div className="call-to-action">
                <div className="row">
                  <div className="col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8">
                    <h2>Are you paid fairly?</h2>
                    <div className="hidden-xs hidden-sm">
                      <br />
                      <br />
                    </div>
                    <div className="row flex-v-center-md">
                      <div className="col-md-6 col-md-push-6 border-left-md">
                        <Link
                          to="/get-started/1"
                          href="/get-started/1"
                          className="btn btn-red-ish-1 btn-xl fa-2x btn-circle-outline btn-multiline"
                        >
                          Find out now
                        </Link>
                        <h4 className="text-light">
                          The only website powered by crowdsourced payslips.
                        </h4>
                      </div>
                      <div className="col-md-6 col-md-pull-6">
                        <div className="seperator-sm" />
                        <h3>Still have questions?</h3>
                        <div className="list-group">
                          <Link
                            to="/privacy/"
                            href="/privacy/"
                            className="list-group-item"
                          >
                            How do we protect your data?
                          </Link>
                          <Link
                            to="/about-us/"
                            href="/about-us/"
                            className="list-group-item"
                          >
                            Who is behind Sliips?
                          </Link>
                          <Link
                            to="/FAQ/"
                            href="/FAQ/"
                            className="list-group-item"
                          >
                            Other frequent questions
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="community" className="c2 page-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-lg-offset-2 text-center">
                  <h2 className="section-heading">Want to talk to us?</h2>
                  <br />
                </div>
              </div>
              <ContactButtons />
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

Page.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  reduxAction_doUpdate: PropTypes.func,
};

Page.defaultProps = {
  reduxAction_doUpdate: () => {},
};

Page.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (subID, data) =>
    dispatch(storeAction.doUpdate(dataStoreID, subID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
