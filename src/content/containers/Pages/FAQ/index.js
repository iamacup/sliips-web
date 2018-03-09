import React from 'react';
import Helmet from 'react-helmet';
import Remarkable from 'remarkable';

import Markdown from './markdown';

import NavBar from '../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../content/components/Footers/general';

import { enableSmoothScroll } from '../../../../content/scripts/custom/utilities';

class Page extends React.PureComponent {
  static createMarkup() {
    const md = new Remarkable();

    return {
      __html: md.render(Markdown),
    };
  }

  componentDidMount() {
    $(() => {
      // we have to add ID's to all of our H3's on the page
      $('h3').each((index, vertex) => {
        const jqueryItem = $(vertex);
        // replace everything that is non alpha numberic with a -
        const cleanText = jqueryItem
          .text()
          .replace(/\W+/g, '-')
          .toLowerCase();
        jqueryItem.attr('id', cleanText);
      });

      enableSmoothScroll('h5 > a');
    });
  }

  render() {
    return (
      <div className="faq-markdown-format">
        <Helmet title="Frequently Asked Questions" />
        <NavBar color="purple" />

        <header className="header-section c3 text-center">
          <i className="fa fa-question-circle-o fa-5x text-purple" />
          <br />
          <h1>Frequently Asked Questions</h1>
        </header>

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
