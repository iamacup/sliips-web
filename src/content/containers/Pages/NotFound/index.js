import React from 'react';
import Helmet from 'react-helmet';

import NavBar from '../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../content/components/Footers/general';
import FullPageError from '../../../../content/components/Errors/fullPage';

export default () => (
  <div>
    <Helmet title="Page Not Found!" />
    <NavBar color="white" />

    <section className="c1 page-section container">
      <FullPageError
        title="We can't find that page."
        message="We looked really hard, but it's just not there!"
      />
    </section>

    <Footer />
  </div>
);
