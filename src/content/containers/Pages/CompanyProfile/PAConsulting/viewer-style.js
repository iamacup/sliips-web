import React from 'react';

import * as CompanyUtility from '../../../../../content/containers/Pages/CompanyProfile/utility';

const Viewer = () => (
  <div>
    <div className="">
      <div className="widget_tally_box text-left drop-shadow">
        <div className="x_panel c1">
          <div className="x_title">
            <h3>Company Style</h3>
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
                  Not every company is right for every person, some people
                  thrive on structure while others excel with little, here's
                  where Acme Corp sits:
                </h4>
              </div>
            </div>

            <div className="seperator" />

            <div className="row">
              <div className="col-sm-10 col-sm-push-1">
                <div className="jumbo c1" style={{ padding: '12px' }}>
                  {CompanyUtility.getBinaryRowLRDesc(
                    'fa-rebel',
                    'fa-briefcase',
                    'Very Startup',
                    'Very Corporate',
                    '70',
                    <div className="text-muted">
                      <h5>Virtually no business admin and process</h5>
                      <h5>Mostly flat structure with fluid roles</h5>
                    </div>,
                    <div className="text-muted">
                      <h5>High levels of business admin and process</h5>
                      <h5>Very hierarchical structure with clear roles</h5>
                    </div>,
                  )}
                </div>
              </div>
            </div>

            <div className="seperator" />

            <div className="row">
              <div className="col-sm-6">
                <div className="seperator-xs" />
                <div className="box-border" style={{ padding: '10px' }}>
                  <div className="text-center">
                    <h4>Business Admin & Process</h4>
                  </div>
                  <div style={{ margin: '0 10%' }}>
                    {CompanyUtility.getBinaryRowTiny('70', 'Less', 'More')}
                  </div>
                  <div className="text-center">
                    <h5 className="text-muted">
                      A high business admin level lends the organisation to
                      overall fairness of process regarding promotions,
                      assignments etc.
                    </h5>
                  </div>
                  <div
                    className="text-center"
                    style={{ padding: '4px 0', margin: '6px 30% 0' }}
                  >
                    <button
                      onClick={() => {
                        CompanyUtility.collapse('#collapse1');
                      }}
                    >
                      <i
                        id="collapse1icon"
                        className="fa fa-chevron-circle-down fa-3x text-red"
                      />
                    </button>
                  </div>
                  <div id="collapse1" className="collapse">
                    <h5>Weekly Admin</h5>
                    <div style={{ margin: '0 0 0 10px' }}>
                      <h6>
                        <span className="textw700">Timesheets</span>
                      </h6>
                    </div>
                    <h5>Semi Regular Admin</h5>
                    <div style={{ margin: '0 0 0 10px' }}>
                      <h6>
                        <span className="textw700">Project Assessments: </span>Completed
                        for every finished project.
                      </h6>
                      <h6>
                        <span className="textw700">Promotion Cases: </span>Created
                        for each promotion.
                      </h6>
                      <h6>
                        <span className="textw700">Procurement: </span>Business
                        cards, replacement parts etc.
                      </h6>
                    </div>
                    <h5>Yearly Admin</h5>
                    <div style={{ margin: '0 0 0 10px' }}>
                      <h6>
                        <span className="textw700">Yearly Reviews: </span>For
                        annual apprasal.
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="seperator-xs" />
                <div className="box-border" style={{ padding: '10px' }}>
                  <div className="text-center">
                    <h4>Organisation and Roles</h4>
                  </div>
                  <div style={{ margin: '0 10%' }}>
                    {CompanyUtility.getBinaryRowTiny(
                      '90',
                      'Unstructured',
                      'Structured',
                    )}
                  </div>
                  <div className="text-center">
                    <h5 className="text-muted">
                      A highly structured organisation allows for a defined
                      chain of command and clear roles and responsibilities.
                    </h5>
                  </div>
                  <div
                    className="text-center"
                    style={{ padding: '4px 0', margin: '6px 30% 0' }}
                  >
                    <button
                      onClick={() => {
                        CompanyUtility.collapse('#collapse2');
                      }}
                    >
                      <i
                        id="collapse2icon"
                        className="fa fa-chevron-circle-down fa-3x text-red"
                      />
                    </button>
                  </div>
                  <div id="collapse2" className="collapse">
                    <h5>Structure</h5>
                    <div style={{ margin: '0 0 0 10px' }}>
                      <h6>
                        <span className="textw700">Pryamid</span>: Acme has a
                        pyramid structure where key decisions are made at the
                        top.
                      </h6>
                    </div>
                    <h5>Roles</h5>
                    <div style={{ margin: '0 0 0 10px' }}>
                      <h6>
                        <span className="textw700">Well Defined: </span>Job
                        expectations are well defined and layed out within
                        employee contracts.
                      </h6>
                    </div>
                  </div>
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
