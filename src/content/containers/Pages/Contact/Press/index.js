import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import NavBar from '../../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../../content/components/Footers/general';
import Header from '../../../../../content/containers/Pages/Contact/Shared';

export default () => (
  <div className="p-press">
    <Helmet title="Press Kit" />
    <NavBar color="purple" />

    <Header active="press" />

    <section className="c1 page-section">
      <div className="container text-center">
        <h2>Press Kit Information</h2>
        <div className="text-left">
          <h3>Media Contact</h3>
          <p>
            Hi there, we would love to hear from you directly! Please send all
            queries to <strong>press@sliips.com</strong> and we will be right
            back in touch.
          </p>
          <br />
          <br />
          <h3>Press Release & Company Information</h3>
          <p>
            Our press releases are available{' '}
            <b>
              <Link to="/press-releases" href="/press-releases">
                here
              </Link>
            </b>.
          </p>
          <p>
            There is also other information on the{' '}
            <b>
              <Link to="/about-us" href="/about-us">
                Company Information Page
              </Link>
            </b>.
          </p>
          <br />
          <br />
          <h3>Press Appearances</h3>
          <h4>
            <a href="http://www.wearethecity.com/new-tech-startup-helping-gender-pay-gap-become-transparent/">
              We Are The City
            </a>
          </h4>
          <h4>
            <a href="http://learnfromthelegends.co.uk/index.php/2017/06/15/patrick-mcconnell-how-to-use-data-to-transform-the-workplace/">
              Learn From The Legends
            </a>
          </h4>
          <h4>
            <a href="http://www.techworld.com/careers/how-hire-more-women-into-technology-roles-3661336/">
              Techworld
            </a>
          </h4>
          <h4>
            <a href="http://followinnovation.com/enabling-honest-conversations-about-pay/">
              FollowInnovation
            </a>
          </h4>
          <h4>
            <a href="http://www.huffingtonpost.co.uk/samantha-webb/gender-pay-gap_b_15626638.html">
              Huffington Post
            </a>
          </h4>
          <br />
          <br />
          <div className="text-center">
            <h3>Branding and Logos</h3>
            <p>
              We provide copies of both our <b>Logo</b> and <b>Icon</b> for your
              use in various sizes as well as SVG for any resolution.
            </p>
            <div className="row">
              <div className="col-sm-6">
                <h4>Standard</h4>
                <p>
                  Background color: <b>#2c1e31</b>
                  <br />
                  All other features are: <b>#ffffff</b>
                </p>
              </div>
              <div className="col-sm-6">
                <h4>Alternative</h4>
                <p>
                  Background color: <b>transparent/#ffffff/#2c1e31</b>
                  <br />
                  All other features are: <b>#812470</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <br />
          <br />
          <h3>PNG - Small</h3>
          <hr />

          <div className="row">
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">Colored Background</h5>
              <h5 className="text-muted">400 x 257</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/logo-small-color.png')}
                />
              </div>
            </div>
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">Colored Background</h5>
              <h5 className="text-muted">400 x 257</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/icon-small-color.png')}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">Transparent Background</h5>
              <h5 className="text-muted">400 x 257</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-background img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/logo-small-trans.png')}
                />
              </div>
            </div>
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">Transparent Background</h5>
              <h5 className="text-muted">400 x 257</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-background img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/icon-small-trans.png')}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">
                Transparent Background - Alternative
              </h5>
              <h5 className="text-muted">400 x 257</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-background img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/logo-small-trans-inv.png')}
                />
              </div>
            </div>
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">
                Transparent Background - Alternative
              </h5>
              <h5 className="text-muted">400 x 257</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-background img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/icon-small-trans-inv.png')}
                />
              </div>
            </div>
          </div>

          <br />
          <br />
          <h3>PNG - Medium</h3>
          <hr />

          <div className="row">
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">Colored Background</h5>
              <h5 className="text-muted">700 x 450</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/logo-medium-color.png')}
                />
              </div>
            </div>
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">Colored Background</h5>
              <h5 className="text-muted">700 x 450</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/icon-medium-color.png')}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">Transparent Background</h5>
              <h5 className="text-muted">700 x 450</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-background img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/logo-medium-trans.png')}
                />
              </div>
            </div>
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">Transparent Background</h5>
              <h5 className="text-muted">700 x 450</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-background img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/icon-medium-trans.png')}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">
                Transparent Background - Alternative
              </h5>
              <h5 className="text-muted">700 x 450</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-background img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/logo-medium-trans-inv.png')}
                />
              </div>
            </div>
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">
                Transparent Background - Alternative
              </h5>
              <h5 className="text-muted">700 x 450</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-background img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/icon-medium-trans-inv.png')}
                />
              </div>
            </div>
          </div>

          <br />
          <br />
          <h3>PNG - Large</h3>
          <hr />

          <div className="row">
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">Colored Background</h5>
              <h5 className="text-muted">1400 x 900</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/logo-large-color.png')}
                />
              </div>
            </div>
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">Colored Background</h5>
              <h5 className="text-muted">1400 x 900</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/icon-large-color.png')}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">Transparent Background</h5>
              <h5 className="text-muted">1400 x 900</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-background img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/logo-large-trans.png')}
                />
              </div>
            </div>
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">Transparent Background</h5>
              <h5 className="text-muted">1400 x 900</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-background img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/icon-large-trans.png')}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">
                Transparent Background - Alternative
              </h5>
              <h5 className="text-muted">1400 x 900</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-background img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/logo-large-trans-inv.png')}
                />
              </div>
            </div>
            <div className="col-sm-5 col-sm-push-1">
              <h5 className="text-muted">
                Transparent Background - Alternative
              </h5>
              <h5 className="text-muted">1400 x 900</h5>
              <div className="responsive-margins-1">
                <img
                  alt="Sliips Logo"
                  className="img-background img-responsive img-responsive-center"
                  src={require('../../../../../content/theme/custom/images/pressLogos/icon-large-trans-inv.png')}
                />
              </div>
            </div>
          </div>

          <br />
          <br />
          <h3>SVG's</h3>
          <hr />

          <div className="row">
            <div className="col-sm-5 col-sm-push-1">
              <h4>Company Logo</h4>
              <h5 className="text-muted">Colored Background</h5>
              <a
                className="btn btn-purple-2"
                href={require('../../../../../content/theme/custom/images/pressLogos/SLIIPS-LOGOFinal-PurpleBG-SVG.svg')}
              >
                {' '}
                Download{' '}
              </a>
            </div>
            <div className="col-sm-5 col-sm-push-1">
              <h4>Company Icon</h4>
              <h5 className="text-muted">Colored Background</h5>
              <a
                className="btn btn-purple-2"
                href={require('../../../../../content/theme/custom/images/pressLogos/SLIIPS-ICONFinal-PurpleBG-SVG.svg')}
              >
                {' '}
                Download{' '}
              </a>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-5 col-sm-push-1">
              <h4>Company Logo</h4>
              <h5 className="text-muted">Transparent Background</h5>
              <a
                className="btn btn-purple-2"
                href={require('../../../../../content/theme/custom/images/pressLogos/SLIIPS-LOGOFinal-TransBG-SVG.svg')}
              >
                {' '}
                Download{' '}
              </a>
            </div>
            <div className="col-sm-5 col-sm-push-1">
              <h4>Company Icon</h4>
              <h5 className="text-muted">Transparent Background</h5>
              <a
                className="btn btn-purple-2"
                href={require('../../../../../content/theme/custom/images/pressLogos/SLIIPS-ICONFinal-TransBG-SVG.svg')}
              >
                {' '}
                Download{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);
