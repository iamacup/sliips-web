import React from 'react';
import Helmet from 'react-helmet';

import NavBar from '../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../content/components/Footers/general';

export default () => (
  <div>
    <Helmet title="Sliips Points" />
    <NavBar color="purple" />

    <div className="p-points">
      <header className="header-section-lg c3 text-center">
        <i className="fa fa-star-o fa-4x text-purple" />
        <i className="fa fa-star-half-o fa-4x text-purple" />
        <i className="fa fa-star fa-4x text-purple" />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-xs-10 col-xs-push-1 col-md-8 col-md-push-2">
              <h2>
                Instantly access data about{' '}
                <span className="textw800">YOUR COMPANY</span> and the{' '}
                <span className="textw800">JOB MARKET</span> once you sign up.
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-10 col-xs-push-1 col-md-8 col-md-push-2">
              <h2>
                Sliips Points are only required to unlock analytics at{' '}
                <span className="textw800">OTHER COMPANIES</span>
              </h2>
            </div>
          </div>
        </div>
      </header>

      <section className="c1 page-section text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 style={{ marginTop: '0px', marginBottom: '28px' }}>
                What do I use Sliips Points for?
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10 col-lg-offset-1">
              <div className="row">
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="seperator-xs" />
                      <div>
                        <i className="fa fa-4x fa-user wow bounceIn text-purple" />
                        <h3 className="text-purple">Instant Access</h3>
                        <h4>Your Company</h4>
                        <p className="text-muted">
                          Know what you are paid compared to others at your
                          company. Explore what progression would mean and how
                          different roles are compensated.
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="seperator-xs" />
                      <div>
                        <i
                          className="fa fa-4x fa-users wow bounceIn text-purple"
                          data-wow-delay=".1s"
                        />
                        <h3 className="text-purple">Instant Access</h3>
                        <h4>Your Job Market</h4>
                        <p className="text-muted">
                          Access information about your job market. Compare your
                          current job across the industries and across the
                          nation to see what a move would look like.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-sm-12 border-left-md red-links">
                      <div>
                        <i
                          className="fa fa-4x fa-eye wow bounceIn text-red"
                          data-wow-delay=".2s"
                        />
                        <h3 className="text-red">Unlock With Points</h3>
                        <h4>Other Companies</h4>
                        <p className="text-muted">
                          Perform detailed analytics at any company using your
                          Sliips Points, awarded whenever you share information
                          with us, or refer someone to our platform.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section c3">
        <div className="container text-left">
          <div className="row">
            <div className="col-xs-8 col-xs-push-2 col-sm-12 col-sm-push-0">
              <h2>
                Sliips is based on <span className="textw800">SHARING</span>.
                Sharing data or referring your friends gives you{' '}
                <span className="textw800">SLIIPS POINTS</span>, used to unlock
                analytics at other companies.
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="c2 page-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 style={{ marginTop: '0px' }}>
                How do you get Sliips Points?
              </h2>
            </div>
          </div>
        </div>
        <div className="container text-center">
          <div className="left-right-outer-row">
            <div className="row">
              <div className="left-right-inner-row">
                <div className="col-sm-5 col-md-4 col-md-push-1 col-lg-3 col-lg-push-2">
                  <i className="fa fa-4x fa-user-plus wow bounceIn text-purple" />
                  <h3>Refer your friends</h3>
                </div>
                <div className="col-sm-2 text-center col-md-2 col-md-push-1 col-lg-2 col-lg-push-2 hidden-xs">
                  <div className="left-right-point">1</div>
                </div>
                <div className="col-sm-5 col-md-4 col-md-push-1 col-lg-3 col-lg-push-2">
                  <p className="text-muted">
                    You gain points for referring people, because the quality of
                    our information is directly related to how many users we
                    have, we we value your recommendation above everything else.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="left-right-outer-row">
            <div className="row">
              <div className="left-right-inner-row">
                <div className="col-sm-5 col-sm-push-7 col-md-4 col-md-push-7 col-lg-3 col-lg-push-7">
                  <i
                    className="fa fa-4x fa-paper-plane wow bounceIn text-purple"
                    data-wow-delay=".1s"
                  />
                  <h3>Tell us your salary</h3>
                </div>
                <div className="col-sm-2 text-center col-md-2 col-md-push-1 col-lg-2 col-lg-push-2 hidden-xs">
                  <div className="left-right-point">2</div>
                </div>
                <div className="col-sm-5 col-sm-pull-7 col-md-4 col-md-pull-5 col-lg-3 col-lg-pull-3">
                  <p className="text-muted">
                    Your salary information is key to the success of our
                    platform. Every payslip you give us grants you more points,
                    even those from jobs you no longer work at.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="left-right-outer-row">
            <div className="row">
              <div className="left-right-inner-row">
                <div className="col-sm-5 col-md-4 col-md-push-1 col-lg-3 col-lg-push-2">
                  <i
                    className="fa fa-4x fa-pie-chart wow bounceIn text-purple"
                    data-wow-delay=".2s"
                  />
                  <h3>Answer Questions</h3>
                </div>
                <div className="col-sm-2 text-center col-md-2 col-md-push-1 col-lg-2 col-lg-push-2 hidden-xs">
                  <div className="left-right-point">3</div>
                </div>
                <div className="col-sm-5 col-md-4 col-md-push-1 col-lg-3 col-lg-push-2">
                  <p className="text-muted">
                    Occasionally we will ask you additional questions that we
                    think might have an impact on happiness or salary, answering
                    these will give you additional Sliips Points.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
);
