import React from 'react';

class Page extends React.PureComponent {
  componentDidMount() {
    window.location.replace(this.getRedirectURL());
  }

  getRedirectURL() {
    return 'https://www.sliips.com/get-started/1/';
  }

  render() {
    return (
      <div className="c1 page-section text-center">
        <h4>
          If you are not automatically redirected please click{' '}
          <a href={this.getRedirectURL()}>Here</a>
        </h4>
      </div>
    );
  }
}

export default Page;
