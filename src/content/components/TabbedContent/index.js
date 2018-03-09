import React from 'react';
import PropTypes from 'prop-types';

class TabbedContent extends React.PureComponent {
  componentDidMount() {
    // wait for document to be ready
    $(() => {});
  }

  render() {
    const panes = [];
    const tabs = [];

    this.props.content.forEach((vertex, index) => {
      const tabClassName = vertex.active === true ? 'active' : '';
      const obj1 = (
        <li key={vertex.name} role="presentation" className={tabClassName}>
          {/* eslint-disable */}
          <a
            aria-controls={'tab' + index}
            tabIndex={-1}
            role="tab"
            data-toggle="tab"
            onClick={() => { this.props.callback(vertex.name); }}
          >
            {vertex.name}
          </a>
          { /* eslint-enable */ }
        </li>
      );

      tabs.push(obj1);

      const paneClassName =
        vertex.active === true ? 'tab-pane in active' : 'tab-pane';
      const obj2 = (
        <div
          key={vertex.name}
          role="tabpanel"
          className={paneClassName}
          id={'tab' + index}
        >
          {vertex.content}
        </div>
      );

      panes.push(obj2);
    });

    return (
      <div>
        <ul className="nav nav-tabs" role="tablist" id="theTabs">
          {tabs}
        </ul>

        <div className="tab-content">{panes}</div>
      </div>
    );
  }
}

TabbedContent.propTypes = {
  content: PropTypes.array.isRequired,
  callback: PropTypes.func.isRequired,
};

export default TabbedContent;
