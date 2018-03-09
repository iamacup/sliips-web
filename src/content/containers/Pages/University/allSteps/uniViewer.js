
import React from 'react';
import PropTypes from 'prop-types';

import { dNc } from '../../../../../content/scripts/custom/utilities';

class Viewer extends React.PureComponent {
  render() {
    const { statusCode, data } = this.props;

    if (data.length === 0) {
      return null;
    }

    const finalResult = [];
    let count = 0;

    data.forEach((value) => {
      let degreeLevel = null;
      let courseType = null;
      let courseFTPT = null;
      let graduationYear = null;
      let startYear = null;
      let subject = null;

      console.log(value);

      value.data.forEach((value2) => {
        if (value2.friendlyName === 'degreeLevel') {
          degreeLevel = value2.optionValue;
        } else if (value2.friendlyName === 'courseType') {
          courseType = value2.optionValue;
        } else if (value2.friendlyName === 'courseFTPT') {
          courseFTPT = value2.optionValue;
        } else if (value2.friendlyName === 'graduationYear') {
          graduationYear = value2.optionValue;
        } else if (value2.friendlyName === 'startYear') {
          startYear = value2.optionValue;
        } else if (value2.friendlyName === 'subject') {
          subject = value2.optionValue;
        }
      });

      const obj = (
        <div className="row" key={count + 'key'}>
          <div className="col-sm-12">
            <h4>{value.name} - {courseType}</h4>
            <div style={{ paddingLeft: '20px' }}>
              <h5>Start: <strong>{startYear}</strong></h5>
              <h5>End: <strong>{graduationYear}</strong></h5>
            </div>
          </div>
        </div>
      );

      finalResult.push(obj);
      count++;
    });

    return (
      <div>
        <h3>Your Education</h3>
        {finalResult}
      </div>
    );
  }
}

Viewer.propTypes = {
  data: PropTypes.any.isRequired,
  statusCode: PropTypes.string.isRequired,
};

export default Viewer;
