import React from 'react';
import Helmet from 'react-helmet';

import AnimationContainer from '../../../../../content/components/AnimationContainer';
import NewWizzardPane from '../../../../../content/containers/Fragments/NewWizzardPane';
import Graph1 from './graph1';
import Graph2 from './graph2';
import Graph3 from './graph3';
import Graph4 from './graph4';

import { redrawCharts } from '../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../content/scripts/custom/utilities';

class Viewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boxes: [],
    };
  }

  componentDidMount() {
    $(() => {
      this.addStepContent(1, this.step1Box());

      setTimeout(() => {
        this.addStepContent(2, this.step2Box());
      }, 3000);

      // listen for resize events
      fireDebouncedResizeEvents();

      // then listen for the events here
      $(document).on('debouncedResizeEvent', () => {
        // and redraw the charts
        redrawCharts();
      });
    });

    /* this.addStepContent(1, this.step1Box());
    this.addStepContent(2, this.step2Box());
    this.addStepContent(3, this.step3Box());
    this.addStepContent(4, this.step4Box());
    this.addStepContent(5, this.step5Box());
    this.addStepContent(6, this.step6Box());
    this.addStepContent(7, this.step7Box());
    this.addStepContent(8, this.step8Box());
    this.addStepContent(9, this.step9Box());
    this.addStepContent(10, this.step10Box());
    this.addStepContent(11, this.step11Box());
    this.addStepContent(12, this.step12Box());
    this.addStepContent(13, this.step13Box()); */
  }

  getContentLeftBox(content, step) {
    return (
      <AnimationContainer animationClass="bounceInUp">
        <div
          className="row"
          style={{ marginTop: '20px' }}
          id={'elementForStep-' + step}
        >
          <div className="col-sm-8">
            <div className="drop-shadow box-border box-padding round-corners responsive-margins-2">
              {content}
            </div>
          </div>
        </div>
      </AnimationContainer>
    );
  }

  getContentRightBox(content, step) {
    return (
      <AnimationContainer animationClass="bounceInUp">
        <div
          className="row"
          style={{ marginTop: '20px' }}
          id={'elementForStep-' + step}
        >
          <div className="col-sm-8 col-sm-push-4">
            <div className="drop-shadow box-border box-padding round-corners responsive-margins-2 text-center">
              {content}
            </div>
          </div>
        </div>
      </AnimationContainer>
    );
  }

  getContentCenterBox(content, step) {
    return (
      <AnimationContainer animationClass="bounceInUp">
        <div
          className="row"
          style={{ marginTop: '20px' }}
          id={'elementForStep-' + step}
        >
          <div className="col-sm-12">
            <div className="box-padding responsive-margins-2 text-center">
              {content}
            </div>
          </div>
        </div>
      </AnimationContainer>
    );
  }

  scrollToTopOfStepElement(step) {
    require('jquery.easing');

    const $element = $('#elementForStep-' + step);

    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: $element.offset().top - 50,
        },
        1250,
        'easeInOutExpo',
      );
  }

  addStepContent(step, content) {
    const { boxes } = this.state;

    boxes.push({ step, content });

    this.setState({ boxes });

    setTimeout(() => {
      this.scrollToTopOfStepElement(step);
    }, 1100);
  }

  step1Box() {
    const content = (
      <div>
        <p>
          Hey there, welcome to YourAlumni.com - a tool to see what happened
          after university!
        </p>

        <p>
          First thing's first, <strong>Boomtown University</strong> have sent
          you this link in order to learn a bit more about their alumni.
        </p>

        <p>
          Any information you enter into this tool will{' '}
          <strong>
            not be individually identifiable to Boomtown University
          </strong>, we only provide them with agregate data.
        </p>

        <p>
          Unlike other surveys,{' '}
          <strong>
            when you answer questions, we show you what other people are up to!
          </strong>
        </p>

        <p>
          For instance, did you know that{' '}
          <strong>some cool fact about Boomtown Uni Grads</strong>
        </p>
      </div>
    );

    return this.getContentLeftBox(content, 1);
  }

  step2Box() {
    const content = (
      <div>
        <h4>Ready to find out cool stuff?</h4>
        <button
          className="btn btn-purple-2 btn-circle animated animate-five pulse btn-xl"
          onClick={() => {
            this.addStepContent(3, this.step3Box());
          }}
        >
          Yes - Let's go!
        </button>
      </div>
    );

    return this.getContentCenterBox(content, 2);
  }

  showAnalytics(questionStep) {
    if (questionStep === 1) {
      this.addStepContent(4, this.step4Box());
    } else if (questionStep === 2) {
      this.addStepContent(7, this.step7Box());
    } else if (questionStep === 3) {
      this.addStepContent(10, this.step10Box());
    } else if (questionStep === 4) {
      this.addStepContent(13, this.step13Box());
    }
  }

  step3Box() {
    const content = (
      <div>
        <div className="text-center">
          <h3>Your Nationality</h3>
          <h4 className="text-muted">
            We need to know a couple of things about where you were born, and if
            you hold passports from any other countries. We use this information
            to check the university is fantastic for students from all
            countries.
          </h4>
        </div>
        <div className="seperator" />
        <NewWizzardPane
          step="1-1"
          submitCallback={() => {
            this.showAnalytics(1);
          }}
          saveAPI="api/universityWizzard/saveStep-noCheck/"
          fetchAPI="api/universityWizzard/getStep-noCheck/"
          stepDoneContent={
            <AnimationContainer animationClass="bounceInRight">
              <div className="row">
                <div className="col-sm-8 col-sm-push-2">
                  <div className="jumbo">
                    <h3>
                  Thanks!
                    </h3>
                  </div>
                  <div className="seperator" />
                </div>
              </div>
            </AnimationContainer>
          }
        />
      </div>
    );

    return this.getContentRightBox(content, 3);
  }

  step4Box() {
    const content = (
      <div>
        <div className="text-center">
          <h3>Where people came from</h3>
          <h4 className="text-muted">
            Top countries that people were born in who then attended Boomtown
            University.
          </h4>
        </div>
        <Graph2 />
      </div>
    );

    setTimeout(() => {
      this.addStepContent(5, this.step5Box());
    }, 3000);

    return this.getContentLeftBox(content, 4);
  }

  step5Box() {
    const content = (
      <div>
        <h4>Onto the next step?</h4>
        <button
          className="btn btn-purple-2 btn-circle animated animate-five pulse btn-xl"
          onClick={() => {
            this.addStepContent(6, this.step6Box());
          }}
        >
          Yes - Let's go!
        </button>
      </div>
    );

    return this.getContentCenterBox(content, 5);
  }

  step6Box() {
    const content = (
      <div>
        <div className="text-center">
          <h3>Where do you live?</h3>
          <h4 className="text-muted">
            We want to know where you live right now so we can see where people
            who graduated from Boomtown University ended up.
          </h4>
        </div>
        <div className="seperator" />
        <NewWizzardPane
          step="1-2"
          submitCallback={() => {
            this.showAnalytics(2);
          }}
          saveAPI="api/universityWizzard/saveStep-noCheck/"
          fetchAPI="api/universityWizzard/getStep-noCheck/"
          stepDoneContent={
            <AnimationContainer animationClass="bounceInRight">
              <div className="row">
                <div className="col-sm-8 col-sm-push-2">
                  <div className="jumbo">
                    <h3>
                  Awesome!
                    </h3>
                  </div>
                  <div className="seperator" />
                </div>
              </div>
            </AnimationContainer>
          }
        />
      </div>
    );

    return this.getContentRightBox(content, 6);
  }

  step7Box() {
    const content = (
      <div>
        <div className="text-center">
          <h3>Where everyone ended up</h3>
          <h4 className="text-muted">
            Have a play with this map, it shows where people ended up and the
            density for each country.
          </h4>
        </div>
        <Graph1 />
      </div>
    );

    setTimeout(() => {
      this.addStepContent(8, this.step8Box());
    }, 3000);

    return this.getContentLeftBox(content, 7);
  }

  step8Box() {
    const content = (
      <div>
        <h4>Ready to find out who your alumni are?</h4>
        <button
          className="btn btn-purple-2 btn-circle animated animate-five pulse btn-xl"
          onClick={() => {
            this.addStepContent(9, this.step9Box());
          }}
        >
          Yes - Let's go!
        </button>
      </div>
    );

    return this.getContentCenterBox(content, 8);
  }

  step9Box() {
    const content = (
      <div>
        <div className="text-center">
          <h3>About you</h3>
          <h4 className="text-muted">
            We need a couple of bits of biographical information from you to
            make the data relevant.
          </h4>
        </div>
        <div className="seperator" />
        <NewWizzardPane
          step="1-3"
          submitCallback={() => {
            this.showAnalytics(3);
          }}
          saveAPI="api/universityWizzard/saveStep-noCheck/"
          fetchAPI="api/universityWizzard/getStep-noCheck/"
          stepDoneContent={
            <AnimationContainer animationClass="bounceInRight">
              <div className="row">
                <div className="col-sm-8 col-sm-push-2">
                  <div className="jumbo">
                    <h3>
                  Cheers!
                    </h3>
                  </div>
                  <div className="seperator" />
                </div>
              </div>
            </AnimationContainer>
          }
        />
      </div>
    );

    return this.getContentRightBox(content, 9);
  }

  step10Box() {
    const content = (
      <div className="text-center">
        <h3>Demographics</h3>
        <div className="row">
          <div className="col-sm-6">
            <h4 className="text-muted">
              The gender split of the alumni of Boomtown
            </h4>
            <Graph3 />
          </div>
          <div className="col-sm-6">
            <h4 className="text-muted">
              Average age of the alumni of Boomtown
            </h4>
            <Graph4 />
          </div>
        </div>
      </div>
    );

    setTimeout(() => {
      this.addStepContent(11, this.step11Box());
    }, 3000);

    return this.getContentLeftBox(content, 10);
  }

  step11Box() {
    const content = (
      <div>
        <h4>The last set of questions:</h4>
        <button
          className="btn btn-purple-2 btn-circle animated animate-five pulse btn-xl"
          onClick={() => {
            this.addStepContent(12, this.step12Box());
          }}
        >
          I'm ready!
        </button>
      </div>
    );

    return this.getContentCenterBox(content, 11);
  }

  step12Box() {
    const content = (
      <div>
        <div className="text-center">
          <h3>More detail about you</h3>
          <h4 className="text-muted">
            All of the following questions have opt-out options if you don't
            want to answer them, we know you might find them personal, but by
            answering them you will help Boomtown improve.
          </h4>
          <div className="row">
            <div className="col-sm-8 col-sm-push-2">
              <div className="jumbo">
                <h4>
                  You won't see any feedback data on these questions regardless
                  of how you answer them.
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="seperator" />
        <NewWizzardPane
          step="1-4"
          submitCallback={() => {
            this.showAnalytics(4);
          }}
          saveAPI="api/universityWizzard/saveStep-noCheck/"
          fetchAPI="api/universityWizzard/getStep-noCheck/"
          stepDoneContent={
            <AnimationContainer animationClass="bounceInRight">
              <div className="row">
                <div className="col-sm-8 col-sm-push-2">
                  <div className="jumbo">
                    <h3>
                  Fantastic!
                    </h3>
                  </div>
                  <div className="seperator" />
                </div>
              </div>
            </AnimationContainer>
          }
        />
      </div>
    );

    return this.getContentRightBox(content, 12);
  }

  step13Box() {
    const content = (
      <div className="row">
        <div className="col-sm-8 col-sm-push-2">
          <div className="seperator" />
          <div className="jumbo">
            <h3>It's as easy as that!</h3>
            <h4 className="text-muted">
              Now we know abit about you - and you know abit about the other
              Alumni, are you ready to take a look at employment?
            </h4>
            <button
              className="btn btn-purple-2 btn-circle animated animate-five pulse btn-xl"
              onClick={() => {}}
            >
              Goto employment information!
            </button>
          </div>
        </div>
      </div>
    );

    return this.getContentCenterBox(content, 13);
  }

  render() {
    const { boxes } = this.state;

    const content = [];

    boxes.forEach((value) => {
      content.push(value.content);
    });

    return (
      <div>
        <Helmet title="Boomtown University" />

        <div className="container c1 page-section">
          <div className="text-center">
            <h2>Boomtown University</h2>
            <hr />
          </div>
          {content}
        </div>

        <div id="bottomOfPage" />
      </div>
    );
  }
}

export default Viewer;
