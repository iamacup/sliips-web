import React from 'react';

import * as CompanyUtility from '../../../../../content/containers/Pages/CompanyProfile/utility';

class Viewer extends React.Component {
  componentDidMount() {
    $(() => {
      // todo
    });
  }

  render() {
    return (
      <div>
        <div className="">
          <div className="widget_tally_box text-left drop-shadow">
            <div className="x_panel c1">
              <div className="x_title">
                <h3>Career Trend</h3>
                <div className="clearfix" />
              </div>
              <div className="x_content text-center">
                <div className="seperator" />

                <div className="row text-center">
                  <div className="col-sm-8 col-sm-push-2">
                    <h4
                      className="text-purple textw700"
                      style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
                    >
                      An unstructured career path is what some want, others want
                      to know exactly what will be provided and when. Here's
                      what Acme offers:
                    </h4>
                  </div>
                </div>

                <div className="seperator" />

                <div className="row">
                  <div className="col-sm-10 col-sm-push-1">
                    <div className="jumbo c1" style={{ padding: '12px' }}>
                      {CompanyUtility.getBinaryRowLRDesc(
                        'fa-bar-chart',
                        'fa-line-chart',
                        'Unstructured',
                        'Structured',
                        '80',
                        null,
                        null,
                      )}
                    </div>
                  </div>
                </div>

                <div className="seperator" />

                <div className="text-center">
                  <h2>Coming Soon</h2>
                  <h4 className="text-muted">We're designing this page...</h4>
                </div>

                <div className="seperator" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Viewer;
