import React from 'react';
import PropTypes from 'prop-types';

import RightComponents from '../../../../content/components/Navigation/RightComponents/companyProfile';
import LeftComponents from '../../../../content/components/Navigation/LeftComponents/companyProfile';
import NavBar from '../../../../content/components/Navigation/NavBars/general';
import Select2 from '../../../../content/components/Select2';

import { getAPIUrl } from '../../../../content/scripts/custom/utilities';

const CompositeNavBar = ({ companyName }) => (
  <NavBar
    leftNav={<LeftComponents companyName={companyName} />}
    rightNav={RightComponents}
    color="transparent"
    applyPadding={false}
    centerNav={
      <form className="navbar-form navbar-left">
        <div className="form-group nav-search-select">
          <Select2
            placeholder="Look at another company..."
            remoteOptionsURL={
              getAPIUrl() +
              'api/questions/additionalData/companyListByPartialCompanyName?additionalData=false'
            }
            callback={(data) => {
              console.log('change');
              console.log(data);
            }}
            options={<option />}
          />
        </div>
      </form>
    }
    brand={null}
    baseClass="company-profile-nav"
  />
);

CompositeNavBar.propTypes = {
  companyName: PropTypes.string.isRequired,
};

export default CompositeNavBar;
