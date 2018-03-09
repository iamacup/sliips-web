import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import NavBar from '../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../content/components/Footers/general';
import ContactButtons from '../../../../content/components/ContactButtons';

export default () => (
  <div>
    <Helmet title="About Us" />
    <NavBar color="white" />

    <section className="c1 page-section" id="payslips">
      <div className="container text-center">
        <div className="row">
          <div className="col-xs-8 col-xs-push-2 col-sm-6 col-sm-push-3">
            <h2 className="text-muted">
              Sliips is run by a team of people that believe in{' '}
              <span className="textw800 text-purple">Pay Transparency</span>.
            </h2>
          </div>
        </div>
        <div className="seperator" />
        <div className="row">
          <div className="col-xs-6 col-sm-push-2 col-sm-4">
            <div className="profile-image-container">
              <img
                alt="Tom Pickard's Mug Shot"
                src={require('../../../../content/theme/custom/images/people/TP-Circle-small.png')}
                className="img-responsive img-responsive-center"
                style={{ borderRadius: '50%' }}
              />
            </div>
            <h3>Tom Pickard</h3>
            <h4 className="text-muted">
              Runs all the tech stuff, makes sure the fancy graphs work and
              keeps all the cogs and wheels spinning{' '}
            </h4>
          </div>
          <div className="col-xs-6 col-sm-push-2 col-sm-4">
            <div className="profile-image-container">
              <img
                alt="Samantha Webb's Mug Shot"
                src={require('../../../../content/theme/custom/images/people/SW-Circle-small.png')}
                className="img-responsive img-responsive-center"
                style={{ borderRadius: '50%' }}
              />
            </div>
            <h3>Samantha Webb</h3>
            <h4 className="text-muted">
              {' '}
              Writes our amazing content and works with the community to keep
              Sliips in touch with what our users want{' '}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 col-xs-push-3 col-sm-push-4 col-sm-4">
            <div className="profile-image-container">
              <img
                alt="Patrick McConnell's Mug Shot"
                src={require('../../../../content/theme/custom/images/people/PM-Circle-small.png')}
                className="img-responsive img-responsive-center"
                style={{ borderRadius: '50%' }}
              />
            </div>
            <h3>Patrick McConnell</h3>
            <h4 className="text-muted">
              Sorts out everything that makes a company tick, works with our
              partner organisations and customers{' '}
            </h4>
          </div>
        </div>
        <div className="seperator" />
        <div className="row red-links">
          <div className="col-xs-8 col-xs-push-2 col-sm-10 col-sm-push-1">
            <h3 className="text-muted">
              Using payslips, we expose real data so that{' '}
              <span className="textw800 text-purple">COMPANIES CAN'T HIDE</span>,
              making sure that you know{' '}
              <span className="textw800 text-purple">
                EXACTLY WHAT IS GOING ON
              </span>{' '}
              and can plan your career with confidence.
            </h3>
          </div>
        </div>
      </div>
    </section>

    <section className="c2 page-section">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <h2 className="text-purple">Why we started Sliips:</h2>
            <br />
            <h3>We want to know what fair is</h3>
            <p className="text-muted">
              What is your fair salary? It's hard to know for sure because there
              is no reliable source. Our aim is to find out, and tell you for
              free.
            </p>
            <h3>While respecting your privacy</h3>
            <p className="text-muted">
              We wanted to achieve detailed analysis but, we hate 'free'
              services that sell our data, without our knowledge, resulting in
              spam emails and calls further down the line.
            </p>
            <h3>By monetising fairly</h3>
            <p className="text-muted">
              Sliips is a company, with staff and infrastructure. We need to
              have an income in order to run, but we don't do that at the
              expense of your sensitive data - see the{' '}
              <a href="#money" className="page-scroll">
                section below
              </a>{' '}
              for full details.
            </p>
            <h3>And thinking about the future</h3>
            <p className="text-muted">
              We know there is more to life than salary. We are developing
              Sliips to understand everything from maternity leave to company
              culture. We want to make a tool for any career decision.
            </p>
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

    <section className="c2 page-section" id="money">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1 text-center">
            <h2>How we generate income</h2>
            <h4 className="text-purple">
              It's your data - you should know what we do with it
            </h4>
            <br />
            <p className="text-muted">
              You get free access to real-time data at any company you submit a
              payslip for. We operate a points system that is fully explained{' '}
              <Link to="/sliips-points" href="/sliips-points">
                here
              </Link>, but in short, if you send us data, you can unlock
              companies you don't work at for free.
            </p>
            <div className="row">
              <div className="col-md-4">
                <div className="box-padding">
                  <i className="fa fa-4x fa-star wow bounceIn text-purple" />
                  <h3>Sliips Points</h3>
                  <p className="text-muted">
                    Sliips is free for your company, and the wider job market.
                    For other companies, you either need to earn points by
                    submitting payslips, or if you are in a rush - you can buy
                    points with cash. More info{' '}
                    <Link to="/sliips-points" href="/sliips-points">
                      here
                    </Link>.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="box-padding">
                  <i
                    className="fa fa-4x fa-building wow bounceIn text-purple"
                    data-wow-delay=".1s"
                  />
                  <h3>Companies</h3>
                  <p className="text-muted">
                    We will provide a service that lets companies perform
                    real-time salary benchmarking. The data will be aggregate
                    and completely anonymous. They will see the same data you
                    see, but through different tools.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="box-padding">
                  <i
                    className="fa fa-4x fa-picture-o wow bounceIn text-purple"
                    data-wow-delay=".2s"
                  />
                  <h3>Adverts</h3>
                  <p className="text-muted">
                    We will be placing adverts on our platform. This will be
                    non-invasive and relevant to you. Advertisers will never
                    know who you are.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="c1 page-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 text-center">
            <h2>I still have questions!</h2>
            <h4 className="text-purple">
              Cool - we want to be open about things.
            </h4>
            <br />
          </div>
        </div>
        <div className="text-center">
          <div className="row">
            <div className="col-sm-6 col-sm-push-3">
              <div className="box-border box-padding c2">
                <h3>FAQ</h3>
                <h5 className="text-muted">
                  Check out the Frequently Asked Questions page
                </h5>
                <Link to="/FAQ" href="/FAQ" className="btn btn-purple-2">
                  View FAQ
                </Link>
              </div>
            </div>
          </div>
          <br />
          <h4>Or, just talk to us directly, we would love to hear from you!</h4>
          <br />
        </div>
        <ContactButtons />
      </div>
    </section>

    <Footer />
  </div>
);
