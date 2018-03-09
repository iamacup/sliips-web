import React from 'react';

import * as CompanyUtility from '../../../../../content/containers/Pages/CompanyProfile/utility';

const Viewer = () => (
  <div>
    <div className="">
      <div className="widget_tally_box text-left drop-shadow">
        <div className="x_panel c1">
          <div className="x_title">
            <h3>Office and Swag</h3>
            <div className="clearfix" />
          </div>
          <div className="x_content">
            <div className="seperator" />

            <div className="row text-center">
              <div className="col-sm-8 col-sm-push-2">
                <h4
                  className="text-purple textw700"
                  style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
                >
                  Not all offices are the same. A slide to the cafeteria doesn't
                  suit everyone and many prefer a more traditional office.
                  Here's how Acme Corp shapes up:
                </h4>
              </div>
            </div>

            <div className="seperator" />

            <div className="row">
              <div className="col-sm-10 col-sm-push-1">
                <div className="jumbo c1" style={{ padding: '12px' }}>
                  {CompanyUtility.getBinaryRowLRDesc(
                    'fa-building-o',
                    'fa-rocket',
                    'Traditional',
                    'Has a Slide',
                    '80',
                    null,
                    null,
                  )}
                </div>
              </div>
            </div>

            <div className="seperator" />

            <div className="text-center">
              <h3>What is the office like?</h3>
            </div>

            <div className="seperator" />

            <div className="row text-center">
              <div className="col-sm-3 col-sm-push-2">
                <div className="office-perk drop-shadow round-corners flex-center">
                  <h5>Fridges to store lunch and snacks</h5>
                </div>
              </div>
              <div className="col-sm-3 col-sm-push-4">
                <div className="office-perk drop-shadow round-corners flex-center">
                  <h5>Beanbags in breakout areas</h5>
                </div>
              </div>
            </div>

            <div className="row text-center">
              <div className="col-sm-3">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="office-perk drop-shadow round-corners flex-center top-margin-temp">
                      <h5>Outdoor space with picnic tables</h5>
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="office-perk drop-shadow round-corners flex-center">
                      <h5>Plenty of bike parking</h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div
                  id="myCarousel"
                  className="carousel slide"
                  data-ride="carousel"
                  style={{ margin: '10px 5px' }}
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#myCarousel"
                      data-slide-to="0"
                      className="active"
                    />
                    <li data-target="#myCarousel" data-slide-to="1" />
                  </ol>
                  <div className="carousel-inner">
                    <div className="item active">
                      <img
                        className="round-corners"
                        src={require('../../../../../content/theme/custom/images/company-profile/office1.png')}
                        alt="Office 1"
                      />
                    </div>
                    <div className="item">
                      <img
                        className="round-corners"
                        src={require('../../../../../content/theme/custom/images/company-profile/office2.png')}
                        alt="Office 2"
                      />
                    </div>
                  </div>
                  <a
                    className="left carousel-control"
                    href="#myCarousel"
                    data-slide="prev"
                    style={{ backgroundImage: 'none' }}
                  >
                    <span className="glyphicon glyphicon-chevron-left" />
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="right carousel-control"
                    href="#myCarousel"
                    data-slide="next"
                    style={{ backgroundImage: 'none' }}
                  >
                    <span className="glyphicon glyphicon-chevron-right" />
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>

              <div className="col-sm-3">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="office-perk drop-shadow round-corners flex-center">
                      <h5>
                        Not in a basement - very well lit with natural light
                      </h5>
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="office-perk drop-shadow round-corners flex-center">
                      <h5>Showers and changing facilities</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row text-center">
              <div className="col-sm-3 col-sm-push-2">
                <div className="office-perk drop-shadow round-corners flex-center">
                  <h5>Open plan</h5>
                </div>
              </div>
              <div className="col-sm-3 col-sm-push-4">
                <div className="office-perk drop-shadow round-corners flex-center">
                  <h5>Adjustable air conditioning</h5>
                </div>
              </div>
            </div>

            <div className="seperator" />

            <div className="text-center">
              <h3>What Swag Do I Get?</h3>
            </div>

            <div className="seperator" />

            <div className="row text-center">
              <div className="col-sm-4">
                <div className="office-perk drop-shadow round-corners flex-center">
                  <h5>Mobile Phone</h5>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="office-perk drop-shadow round-corners flex-center">
                  <h5>Kindle</h5>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="office-perk drop-shadow round-corners flex-center">
                  <h5>Pick your own laptop</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Viewer;
