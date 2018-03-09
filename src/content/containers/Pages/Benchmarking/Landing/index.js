import React from 'react';
import Helmet from 'react-helmet';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typed from 'typed.js';

// import Footer from '../../../../../content/components/Footers/b2b';

class Page extends React.Component {
  componentDidMount() {
    // Wait for page to load (so the bootstrap plugins etc. are loaded)
    $(() => {
      const strings = [
        'How much do I pay a developer in <strong>Newcastle</strong>?',
        'How much do I pay a developer in <strong>Birmingham</strong>?',
        'How much do I pay a developer in <strong>London</strong>?',
        'How much do I pay a developer in <strong>London</strong> excellent at <strong>React JS</strong>?',
        'How much do I pay a developer in <strong>London</strong> experienced in <strong>C++</strong>?',
        "How much do I pay a developer in <strong>London</strong> with five years' experience of <strong>Java and C#</strong>?",
        'How much are people paid at <strong>Barclays</strong>?',
        'How much are people paid at <strong>IBM</strong>?',
        'How much are people paid at <strong>Facebook</strong>?',
        'How much are people paid at <strong>Facebook</strong> that are <strong>Full Stack Developers</strong>?',
        'How much are people paid at <strong>Facebook</strong> that are <strong>Full Stack Developers</strong> on the <strong>Grad Scheme</strong>?',
        "How much are people paid at <strong>Facebook</strong> that are <strong>Full Stack Developers</strong> with <strong>three years' experience</strong>?",
        'What is the average salary for a <strong>Developer</strong>?',
        'What is the average salary for an <strong>IT Consultant</strong>?',
        'What is the average salary for a <strong>Project Manager</strong>?',
        'What is the average salary for a <strong>Project Manager</strong> working at <strong>Microsoft</strong>?',
        'What is the average salary for a <strong>Project Manager</strong> working at <strong>Deloitte</strong>?',
        'What is the average salary for a <strong>Project Manager</strong> working at <strong>Uber</strong>?',
        'What is the average salary for a <strong>Project Manager</strong> working at <strong>Uber</strong> with <strong>Disaster Recovery Experience</strong>',
        "What is the average salary for a <strong>Project Manager</strong> working at <strong>Uber</strong> with <strong>five years' Delivery Experience</strong>?",
        'What is the average salary for a <strong>Project Manager</strong> working at <strong>Uber</strong> with <strong>a strong Scrum foundation</strong>?',
        'What companies pay <strong>£46,000</strong> per year for a <strong>Javascript Developer</strong>',
        'What companies pay <strong>£46,000</strong> per year for a <strong>COBOL Specialist</strong>',
        'What companies pay <strong>£46,000</strong> per year for a <strong>AngularJS Ninja</strong>',
        'What companies pay <strong>£46,000</strong> per year for a <strong>AngularJS Ninja</strong> in <strong>Bath</strong>',
        'What companies pay <strong>£46,000</strong> per year for a <strong>AngularJS Ninja</strong> in <strong>Bristol</strong>',
        'What companies pay <strong>£46,000</strong> per year for a <strong>AngularJS Ninja</strong> in <strong>Manchester</strong>',
      ];

      const options = {
        strings,
        smartBackspace: true,
        typeSpeed: 20,
        backSpeed: 0,
        startDelay: 500,
        loop: true,
        showCursor: false,
      };

      const typed = new Typed('#typeitem', options); // eslint-disable-line no-unused-vars
    });
  }

  onClick() {
    this.changeLocation();
  }

  changeLocation() {
    this.context.router.history.push('/benchmarking-signup');
  }

  keyUp(e) {
    e.preventDefault();

    if (e.keyCode === 13) {
      this.changeLocation();
    }
  }

  render() {
    return (
      <div className="p-customer">
        <Helmet title="Clever Salary Analytics" />
        <section className="c1 page-section" style={{ paddingBottom: '0' }}>
          <div className="container text-center">
            <div className="row">
              <div className="col-xs-10 col-xs-push-1 col-sm-8 col-sm-push-2 col-md-6 col-md-push-3 col-lg-4 col-lg-push-4">
                <img
                  alt="Sliips Logo"
                  src={require('../../../../../content/theme/custom/images/logo-medium-trans-inv.png')}
                  className="img-responsive img-responsive-center"
                />
              </div>
            </div>

            <h2 style={{ fontSize: '28px', color: '#812470' }}>
              Clever Salary Analytics
            </h2>

            <br />

            <div className="row">
              <div className="col-md-8 col-md-push-2">
                <form
                  style={{ padding: '30px' }}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <p className="input-group">
                    <input
                      type="text"
                      className="form-control search-input"
                      placeholder="Ask a question..."
                      style={{
                        height: '56px',
                        fontSize: '32px',
                        borderRadius: '25px 0 0 25px',
                      }}
                      onKeyUp={(e) => {
                        this.keyUp(e);
                      }}
                    />
                    <span
                      className="input-group-addon search-icon"
                      onClick={() => {
                        this.onClick();
                      }}
                      onKeyPress={() => {
                        this.onClick();
                      }}
                      role="button"
                      tabIndex={0}
                      style={{ borderRadius: '0 25px 25px 0' }}
                    >
                      <span
                        className="glyphicon glyphicon-search"
                        aria-hidden="true"
                        style={{ fontSize: '40px' }}
                      />
                    </span>
                  </p>
                </form>

                <div
                  id="typeitem"
                  style={{ height: '50px', fontSize: '20px' }}
                />
              </div>
            </div>
          </div>
        </section>
        {/* <Footer /> */}
      </div>
    );
  }
}

Page.contextTypes = {
  router: PropTypes.object,
};

export default Page;
