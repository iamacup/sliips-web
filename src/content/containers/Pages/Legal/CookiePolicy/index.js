import React from 'react';
import Helmet from 'react-helmet';
import Remarkable from 'remarkable';

import Markdown from './markdown';

import NavBar from '../../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../../content/components/Footers/general';
import Header from '../../../../../content/containers/Pages/Legal/Shared';

class Page extends React.PureComponent {
  static createMarkup() {
    const md = new Remarkable();

    return {
      __html: md.render(Markdown),
    };
  }

  render() {
    return (
      <div>
        <Helmet title="Cookie Policy" />
        <NavBar color="purple" />

        <Header active="cookie" />

        <section className="c1 page-section">
          <div className="container text-left">
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={Page.createMarkup()}
              className="text-block"
            />
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default Page;
