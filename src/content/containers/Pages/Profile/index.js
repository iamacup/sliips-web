import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import NavBar from '../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../content/components/Footers/general';

export default () => (
  <div>
    <Helmet title="Your Profile" />
    <NavBar color="purple" />

    <header className="header-section c3 text-center">
      <i className="fa fa-cogs fa-5x text-purple" />
      <br />
      <br />
      <h1>Your Profile</h1>
    </header>

    <section className="c2 page-section">
      <div className="container text-center">
        <h2>Work in Progress</h2>

        <br />

        <i
          className="fa fa-pencil fa-5x wow bounceInLeft text-purple"
          data-wow-delay=".2s"
        />
        <i
          className="fa fa-paint-brush fa-5x wow bounceInRight text-purple"
          data-wow-delay=".2s"
        />

        <br />
        <br />

        <h3>Really sorry - we have not yet finished this feature!</h3>

        <br />
        <p className="text-muted">
          If you want to contact us, you can find out how{' '}
          <Link href="/contact-us" to="/contact-us">
            here
          </Link>
        </p>
      </div>
    </section>

    <Footer />
  </div>
);
