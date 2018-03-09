import React from 'react';
import Helmet from 'react-helmet';

import NavBar from '../../../../content/components/Navigation/Composites/general';
import Footer from '../../../../content/components/Footers/general';
import AnimationContainer from '../../../../content/components/AnimationContainer';

//
class Page extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { showJob: false };
  }

  jobData() {
    return (
      <AnimationContainer animationClass="bounceInUp">
        <div className="seperator" />

        <div className="text-center text-purple row">
          <div className="col-sm-8 col-sm-push-2">
            <h3>
              Sliips - A big-data start-up are looking for a frontend designer
              and developer to join their team.
            </h3>
          </div>
        </div>

        <div className="text-left row">
          <div className="col-sm-10 col-sm-push-1">
            <h4>Who are we and what do we do?</h4>
            <h5 style={{ fontWeight: '400' }} className="text-muted">
              Sliips is a website about salary transparency and openness - we
              build and maintain a platform that allows users to share their
              salary data with real verified payslips underpinning the data set.
            </h5>

            <h4>What stage is the business at?</h4>
            <h5 style={{ fontWeight: '400' }} className="text-muted">
              Sliips has been running for a year now, and is about to launch a
              new product targeting universities. We have just closed a funding
              round and are expanding the team in order to build a fantastic
              frontend for our new product.
            </h5>

            <h4>What will you be doing?</h4>
            <h5 style={{ fontWeight: '400' }} className="text-muted">
              Working with the in-house technical team to build on the existing
              framework to create a frontend product for the university
              offering. As this is a startup, it is very welcome if you are able
              to flex and also help with the backend – the technology stack of
              which is described below – but it is not required.
            </h5>

            <h4>What is the tech stack?</h4>
            <h5 style={{ fontWeight: '400' }} className="text-muted">
              We have clear separation between our frontend product (which is
              fully open source available here:{' '}
              <a href="https://github.com/iamacup/sliips-ui">
                https://github.com/iamacup/sliips-ui
              </a>) and our backend product that provides various API endpoints.
            </h5>
            <h5 style={{ fontWeight: '400' }} className="text-muted">
              We are using, and wish to maintain, a cutting edge – latest
              version tech stack:
            </h5>

            <ul style={{ fontSize: '14px' }} className="text-muted">
              <li>
                Frontend: React, Webpack, React Router, Server Side Rendering,
                Express, Redux, Bootstrap
              </li>
              <li>Backend: PHP 7, Gulp</li>
              <li>Database: ArangoDB / Postgres</li>
              <li>Infrastructure: Kubenetes, Docker</li>
              <li>Task Management: Celery / RabbitMQ</li>
            </ul>

            <h4>Responsibilities Include:</h4>
            <ul style={{ fontSize: '14px' }} className="text-muted">
              <li>
                Collaborate with the rest of the team to create a fantastic user
                experience
              </li>
              <li>
                Inform what is required from the back end in order to build that
                experience
              </li>
              <li>
                Build frontend content and components in React, using the
                existing project structure – i.e. Redux etc.
              </li>
              <li>Optimization of the application to run cross-browser</li>
              <li>
                Attend client meetings where needed to define additional
                requirements
              </li>
              <li>Build the web application in a mobile first manner</li>
            </ul>

            <h4>Skills</h4>
            <ul style={{ fontSize: '14px' }} className="text-muted">
              <li>
                You must have web development experience – but we do not require
                vast amounts of experience with React / Redux – but it is a plus
                – we are looking for someone that is willing to work with the
                team
              </li>
              <li>
                An eye for design – you need to understand what works well on
                web pages and preferably have designed web applications in the
                past
              </li>
              <li>
                You must be able to work in a small team and take responsibility
                for tasks – as a start-up there is no room for overpromising and
                under delivering
              </li>
            </ul>

            <h4>Nice to have</h4>

            <ul style={{ fontSize: '14px' }} className="text-muted">
              <li>Backend development – PHP specifically </li>
              <li>Database knowledge - SQL / Postgres</li>
              <li>
                Understanding of Graph / Document / Multi Model databases – We
                use Arango which is similar to Mongo in many ways
              </li>
              <li>Be a high ranking eSports player to coach us</li>
            </ul>
          </div>
        </div>

        <div className="seperator" />

        <div className="text-center text-purple">
          <h3>Apply Now - careers@sliips.com</h3>
        </div>

        <div className="seperator" />
      </AnimationContainer>
    );
  }

  showJob() {
    this.setState({ showJob: !this.state.showJob });
  }

  render() {
    let job = null;

    if (this.state.showJob === true) {
      job = this.jobData();
    }

    return (
      <div>
        <Helmet title="Careers" />
        <NavBar color="white" />

        <section className="c1 page-section" style={{ paddingBottom: '0' }}>
          <div className="container text-center">
            <div className="row">
              <div className="col-xs-8 col-xs-push-2 col-sm-6 col-sm-push-3">
                <h1 className="text-muted">
                  Join the{' '}
                  <span className="textw800 text-purple">Pay Transparency</span>{' '}
                  team
                </h1>
              </div>
            </div>
          </div>
        </section>

        <section className="c1 page-section">
          <div className="container text-center">
            <h3>Curent Jobs</h3>

            <div className="seperator" />

            <div className="box-border c2 drop-shadow box-padding">
              <div className="row flex-v-center-sm">
                <div className="col-sm-8">
                  <div className="text-left">
                    <h4>FRONT-END DESIGNER / REACT DEVELOPER</h4>
                    <div className="text-muted" style={{ paddingLeft: '10px' }}>
                      <h5>
                        Job Posted: <b>20/12/2017</b>
                      </h5>
                      <h5>
                        Start Date: <b>ASAP</b>
                      </h5>
                      <h5>
                        Contract Length:{' '}
                        <b>3 Months with chance of extension</b>
                      </h5>
                      <h5>
                        Location: <b>London / Remote</b>
                      </h5>
                      <h5>
                        Apply: <b>careers@sliips.com</b>
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="text-center">
                    <button
                      className="btn btn-purple-2 btn-circle"
                      onClick={() => {
                        this.showJob();
                      }}
                    >
                      {' '}
                      {this.state.showJob === true ? 'Hide' : 'Show'} Full
                      Details{' '}
                    </button>
                  </div>
                </div>
              </div>

              {job}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default Page;
