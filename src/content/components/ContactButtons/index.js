import React from 'react';

class ContactButtons extends React.PureComponent {
  chatNowClick() {
    Intercom('show'); // eslint-disable-line no-undef
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-4 col-md-2 col-md-push-3 text-center">
          <a href="https://twitter.com/paySliips">
            <i className="fa fa-twitter fa-3x wow bounceIn text-purple" />
            <p>@paySliips</p>
          </a>
        </div>
        <div className="col-xs-4 col-md-2 col-md-push-3 text-center">
          <button
            onClick={() => {
              this.chatNowClick();
            }}
          >
            <i className="fa fa-comments fa-3x wow bounceIn text-purple" />
            <p>Chat Now</p>
          </button>
        </div>
        <div className="col-xs-4 col-md-2 col-md-push-3 text-center">
          <a href="mailto:hello@Sliips.com">
            <i
              className="fa fa-envelope-o fa-3x wow bounceIn text-purple"
              data-wow-delay=".1s"
            />
            <p>
              hello<span className="hidden-xs">@Sliips.com</span>
            </p>
          </a>
        </div>
      </div>
    );
  }
}

export default ContactButtons;
