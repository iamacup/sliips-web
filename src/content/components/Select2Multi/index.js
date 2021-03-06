import React from 'react';
import PropTypes from 'prop-types';

import { dNc, logError } from '../../../content/scripts/custom/utilities';

// TODO implement this.props.disabled

class Select2Multi extends React.PureComponent {
  componentDidMount() {
    // wait for document to be ready
    $(() => {
      const ajaxObj = this.getRemoteOptionsAjaxData();

      // here we need to look to see if there is a parent of this dropdown that is a modal -
      // if it is in a modal, we need to set the dropdownParent to that modal.
      let dropdownParent = null;
      let p = $(this.select);

      while (!p.is('html')) {
        p = p.parent();

        if (p.hasClass('modal')) {
          dropdownParent = p;
          break;
        }
      }

      this.initiateSelect2(ajaxObj, dropdownParent);
    });
  }

  getRemoteOptionsAjaxData() {
    let ajaxObj = null;

    if (dNc(this.props.remoteOptionsURL)) {
      ajaxObj = {
        url: this.props.remoteOptionsURL,
        dataType: 'json',
        delay: 250,
        async: true,
        error(xhr, status, err) {
          if (status !== 'abort') {
            const errData = { xhr, status, err };
            logError(errData);
          }
        },
        processResults(data /* , params */) {
          if (data.generalStatus === 'success') {
            if (data.payload.results === null) {
              logError(
                'got null response from API when loading partial company data for: ' +
                  this.props.remoteOptionsURL,
              );
              return { results: [], pagination: { more: false } };
            }
            return data.payload;
          }
          return { results: [], pagination: { more: false } };
        },

        cache: true,
      };
    }

    return ajaxObj;
  }

  initiateSelect2(ajaxObj, dropdownParent) {
    $(this.select)
      .select2({
        tags: true,
        allowClear: this.props.allowClear,
        width: '100%',
        tokenSeparators: [',', ' '],
        placeholder: this.props.placeholder,
        minimumInputLength: this.props.minimumInputLength,
        dropdownParent,
        createTag(/* params */) {
          return undefined;
        },
        multiple: true,
        ajax: ajaxObj,
      })
      .on('change', () => {
        const data = [];
        const tagArray = $(this.select).select2('data');

        if (tagArray.length > 0) {
          for (let a = 0; a < tagArray.length; a++) {
            data.push({ id: tagArray[a].id, text: tagArray[a].text });
          }

          this.props.callback(data);
        }
      });

    // remove any empty options so the tag stuff works
    $(this.select)
      .find('option')
      .each((index, vertex) => {
        if (!dNc($(vertex).text())) {
          $(vertex).remove();
        }
      });
  }

  render() {
    return (
      <select
        className="form-control"
        ref={(select) => {
          this.select = select;
        }}
      >
        {this.props.options}
      </select>
    );
  }
}

Select2Multi.propTypes = {
  callback: PropTypes.func.isRequired,
  options: PropTypes.any.isRequired,
  // disabled: PropTypes.bool,
  remoteOptionsURL: PropTypes.string,
  placeholder: PropTypes.string,
  minimumInputLength: PropTypes.number,
  allowClear: PropTypes.bool,
};

Select2Multi.defaultProps = {
  // disabled: false,
  remoteOptionsURL: '',
  placeholder: '',
  minimumInputLength: 1,
  allowClear: true,
};

export default Select2Multi;
