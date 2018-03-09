import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <section
    className="container-fluid c3"
    style={{ backgroundColor: '#1b0921' }}
  >
    <div className="footer page-section">
      <div className="row">
        <div className="col-xs-12 col-md-4 text-center">
          <h4>MOBILE</h4>
          <Link
            className="btn btn-purple-2 btn-circle"
            to="/mobile"
            href="/mobile"
          >
            <i className="fa fa-apple" /> Apple App Store
          </Link>
          <br />
          <Link
            className="btn btn-purple-2 btn-circle"
            to="/mobile"
            href="/mobile"
          >
            <i className="fa fa-android" /> Google Play Store
          </Link>
          <br /> <br />
        </div>
        <div className="col-xs-4 col-md-2 text-center-sm">
          <h4>SLIIPS</h4>
          <b>
            <Link to="/faq/" href="/faq/">
              <p>
                <small>FAQ</small>
              </p>
            </Link>
          </b>
          <b>
            <Link to="/privacy/" href="/privacy/">
              <p>
                <small>Privacy</small>
              </p>
            </Link>
          </b>
          <b>
            <Link to="/mobile/" href="/mobile/">
              <p>
                <small>Mobile</small>
              </p>
            </Link>
          </b>
          <b>
            <a href="https://blogs.sliips.com/">
              <p>
                <small>Blogs</small>
              </p>
            </a>
          </b>
          <b>
            <Link to="/make-your-payslip-public/" href="/make-your-payslip-public/">
              <p>
                <small>Make Your Payslip Public</small>
              </p>
            </Link>
          </b>
        </div>
        <div className="col-xs-4 col-md-2 text-center-sm">
          <h4>ABOUT US</h4>
          <b>
            <Link to="/about-us/" href="/about-us/">
              <p>
                <small>Team Sliips</small>
              </p>
            </Link>
          </b>
          <b>
            <Link to="/careers/" href="/careers/">
              <p>
                <small>Careers</small>
              </p>
            </Link>
          </b>
          <b>
            <Link to="/press/" href="/press/">
              <p>
                <small>Press</small>
              </p>
            </Link>
          </b>
          <b>
            <Link to="/privacy-statement/" href="/privacy-statement/">
              <p>
                <small>Privacy Statement</small>
              </p>
            </Link>
          </b>
          <b>
            <Link to="/terms-and-conditions/" href="/terms-and-conditions/">
              <p>
                <small>Terms and Conditions</small>
              </p>
            </Link>
          </b>
          <b>
            <Link to="/cookie-policy/" href="/cookie-policy/">
              <p>
                <small>Cookie Policy</small>
              </p>
            </Link>
          </b>
        </div>
        <div className="col-xs-4 col-md-2 text-center-sm">
          <h4>SUPPORT</h4>
          <b>
            <Link to="/contact-us/" href="/contact-us/">
              <p>
                <small>Contact Us</small>
              </p>
            </Link>
          </b>
          <b>
            <Link to="/profile/" href="/profile/">
              <p>
                <small>My Account</small>
              </p>
            </Link>
          </b>
        </div>
        <div className="col-xs-12 col-md-2 text-center-sm">
          <br />
          <p>
            <b>
              <small>Copyright &copy; 2014-2018, Sliips LTD. </small>
            </b>
          </p>
          <small>
            All rights reserved. Various trademarks held by their respective
            owners.
          </small>
          <br /> <br />
          <a
            href="https://github.com/iamacup/sliips-ui/issues"
            rel="noopener noreferrer"
            target="_blank"
            style={{ paddingRight: '10px' }}
          >
            <i className="fa fa-github fa-3x" />
          </a>
          <a
            href="https://en-gb.facebook.com/sliips/"
            rel="noopener noreferrer"
            target="_blank"
            style={{ paddingRight: '10px' }}
          >
            <i className="fa fa-facebook-square fa-3x" />
          </a>
          <a
            href="https://www.linkedin.com/company/sliips"
            rel="noopener noreferrer"
            target="_blank"
            style={{ paddingRight: '10px' }}
          >
            <i className="fa fa-linkedin-square fa-3x" />
          </a>
          <a
            href="https://twitter.com/paysliips?lang=en"
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fa fa-twitter-square fa-3x" />
          </a>
        </div>
      </div>
    </div>
  </section>
);
