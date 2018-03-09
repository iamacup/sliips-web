import React from 'react';
import Helmet from 'react-helmet';

import NavBar from '../../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../../content/components/Footers/general';

export default () => (
  <div>
    <Helmet title="Press Releases" />
    <NavBar />

    <header className="header-section c1 text-center">
      <i className="fa fa-newspaper-o fa-5x text-purple" />
      <br />
      <br />
      <h1>Press Releases</h1>
    </header>

    <section className="c1 page-section">
      <div className="container text-leftr">
        <h2>International Womens Day - 07/03/2017</h2>
        <h4>
          <a href="https://files.sliips.com/press-releases/Gender%20pay%20gap%20to%20become%20more%20transparent%20with%20crowdsourcing%20tech%20startup.doc">
            Download press release
          </a>
        </h4>
      </div>
    </section>

    <Footer />
  </div>
);
