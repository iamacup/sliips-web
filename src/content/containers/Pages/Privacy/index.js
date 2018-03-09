import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import NavBar from '../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../content/components/Footers/general';

export default () => (
  <div>
    <Helmet title="About Us" />
    <NavBar color="white" />

    <div className="p-privacy">
      <header className="header-section c1 text-center">
        <div className="container">
          <div className="col-sm-8 col-sm-push-2">
            <h1 className="text-purple">
              IT'S <span className="textw800">YOUR</span> DATA
            </h1>
            <h3>
              We use <span className="textw800">crowdsourced payslips</span> to
              show you the truth about your company.
            </h3>
          </div>
        </div>
      </header>

      <section className="c1 page-section">
        <div className="container text-left">
          <div className="row">
            <div className="col-xs-8 col-xs-push-2 col-sm-push-0 col-sm-6 col-md-4 col-lg-3">
              <div className="privacyBox hr-above">
                <h3>We take your privacy very seriously.</h3>
              </div>
            </div>

            <div className="col-xs-8 col-xs-push-2 col-sm-push-0 col-sm-6 col-md-4 col-lg-3">
              <div className="privacyBox">
                <h4>MINIMUM</h4>
                <p className="text-muted">
                  We only take the data we need. An example is your payslip, we
                  only take company name, gross salary and date - then we delete
                  the payslip image.
                </p>
              </div>
            </div>

            <div className="col-xs-8 col-xs-push-2 col-sm-push-0 col-sm-6 col-md-4 col-lg-3">
              <div className="privacyBox">
                <h4>EU-STORAGE</h4>
                <p className="text-muted">
                  All our data is stored within European Union data centers,
                  currently located in Belgium.
                </p>
              </div>
            </div>

            <div className="col-xs-8 col-xs-push-2 col-sm-push-0 col-sm-6 col-md-4 col-lg-3">
              <div className="privacyBox">
                <h4>RESALE</h4>
                <p className="text-muted">
                  Your data is not sold on to anyone else in a way that could
                  identify you, we only sell aggregate information.{' '}
                  <Link href="/about-us" to="/about-us">
                    More info here
                  </Link>.
                </p>
              </div>
            </div>

            <div className="col-xs-8 col-xs-push-2 col-sm-push-0 col-sm-6 col-md-4 col-lg-3">
              <div className="privacyBox">
                <h4>SECURE</h4>
                <p className="text-muted">
                  Security is key, and it is our highest priority when it comes
                  to your data and what we do with it.
                </p>
              </div>
            </div>

            <div className="col-xs-8 col-xs-push-2 col-sm-push-0 col-sm-6 col-md-4 col-lg-3">
              <div className="privacyBox">
                <h4>ANONYMOUS</h4>
                <p className="text-muted">
                  Our analytics are only shown when we are confident no
                  individual can be identified.
                </p>
              </div>
            </div>

            <div className="col-xs-8 col-xs-push-2 col-sm-push-0 col-sm-6 col-md-4 col-lg-3">
              <div className="privacyBox">
                <h4>REDACTED</h4>
                <p className="text-muted">
                  Redact your own payslip. You don't even need to give us your
                  name, our tool lets you remove it before we even see it.
                </p>
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
                We <span className="textw800">REFUSE</span> to be 'that' company
                which takes your data, offers you something for free, then lets
                you down.
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="c1 page-section">
        <div className="container text-left">
          <div className="row">
            <div className="col-xs-8 col-xs-push-2 col-sm-push-0 col-sm-4">
              <div className="privacyBox hr-above">
                <h3>PRIVACY STATEMENT</h3>
                <p className="text-muted">
                  Our privacy policy explains what data we collect, who we share
                  it with and your rights and controls.
                </p>
                <p>
                  <Link to="/privacy-statement" href="/privacy-statement">
                    Privacy Statement
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-xs-8 col-xs-push-2 col-sm-push-0 col-sm-4">
              <div className="privacyBox hr-above">
                <h3>TERMS AND CONDITIONS</h3>
                <p className="text-muted">
                  The T's & C's details what you can, and cannot do with the
                  data within our platform, among other things.
                </p>
                <p>
                  <Link to="/terms-and-conditions" href="/terms-and-conditions">
                    T's & C's
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-xs-8 col-xs-push-2 col-sm-push-0 col-sm-4">
              <div className="privacyBox hr-above">
                <h3>COOKIE POLICY</h3>
                <p className="text-muted">
                  This is an EU requirement detailing how we use cookies on our
                  website.
                </p>
                <p>
                  <Link to="/cookie-policy" href="/cookie-policy">
                    Cookie Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
);
