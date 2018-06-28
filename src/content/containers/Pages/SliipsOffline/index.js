import React from 'react';
import Helmet from 'react-helmet';

export default () => (
  <div>
    <Helmet title="Home" />
	<div classNAme="container">
    	<div classNAme="row" style={{ marginTop: '15%' }}>
	    	<div classNAme="col-sm-8 col-sm-push-2">
	    		<img className="img-responsive" src={require('../../../../content/theme/custom/images/logo-medium-trans-inv.png')} alt="Sliips" style={{ margin: '0 auto' }} />

				<h2 className="section-heading text-center" style={{ marginTop: '5%', marginBottom: '12%' }}>
				<br />
				<br />
                We are currently rebuilding this site,<br />please come back soon.
              </h2>

	    	</div>
    	</div>
	</div>
  </div>
    );