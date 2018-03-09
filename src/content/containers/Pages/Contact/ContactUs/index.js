import React from 'react';
import Helmet from 'react-helmet';

import NavBar from '../../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../../content/components/Footers/general';
import ContactButtons from '../../../../../content/components/ContactButtons';
import Header from '../../../../../content/containers/Pages/Contact/Shared';

export default () => (
  <div>
    <Helmet title="Contact Us" />
    <NavBar color="purple" />

    <Header active="contact" />

    <section className="c1 page-section">
      <div className="container text-center">
        <h3 className="text-purple textw700">We like to talk:</h3>
        <br />
        <ContactButtons />
      </div>
    </section>

    <Footer />
  </div>
);
