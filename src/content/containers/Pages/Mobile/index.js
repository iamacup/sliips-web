import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import NavBar from '../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../content/components/Footers/general';

export default () => (
  <div>
    <Helmet title="Mobile" />
    <NavBar color="purple" />

    <header className="header-section-lg c3">
      <div className="container text-center">
        <i
          className="fa fa-mobile"
          style={{ fontSize: '5em', marginRight: '10px' }}
        />
        <i className="fa fa-desktop" style={{ fontSize: '9em' }} />
        <i
          className="fa fa-tablet"
          style={{ fontSize: '7em', marginLeft: '10px' }}
        />
        <div style={{ marginTop: '60px' }}>
          <h1>
            SLIIPS MOBILE
            <sup
              className="text-red"
              style={{ fontSize: '50%', top: '-1.2em' }}
            >
              BETA
            </sup>
          </h1>
        </div>
      </div>
    </header>

    <section className="c1 page-section text-center">
      <div className="container-fluid">
        <h2>Coming soon!</h2>
        <div className="seperator" />
        <div className="row">
          <div className="col-xs-10 col-xs-push-1 col-sm-6 col-sm-push-3">
            <div className="jumbo header-no-margin">
              <div className="row">
                <div className="col-xs-6">
                  <i
                    className="fa fa-apple fa-4x wow bounceIn text-purple"
                    data-wow-delay=".1s"
                  />
                  <br />
                  <h3>Apple</h3>
                </div>
                <div className="col-xs-6">
                  <i
                    className="fa fa-android fa-4x wow bounceIn text-purple"
                    data-wow-delay=".3s"
                  />
                  <br />
                  <h3>Android</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="seperator" />

      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-push-3">
            <h3 className="text-muted">
              We are working hard on the mobile app. Sign up{' '}
              <Link to="/get-started/1" href="/get-started/1">
                here
              </Link>{' '}
              to be notified when it is available.
            </h3>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);
