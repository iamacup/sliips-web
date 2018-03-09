import React from 'react';

class Page extends React.PureComponent {
  componentDidMount() {
    window.location.replace(this.getRedirectURL());
  }

  getRedirectURL() {
    const pathArray = window.location.pathname.split('/');
    const defaultItem = 'https://blogs.sliips.com/';

    if (pathArray.length >= 3) {
      const id = Number.parseInt(pathArray[2], 10);

      switch (id) {
        case 1:
          return 'https://blogs.sliips.com/lets-talk-about-pay-accurately/';
        case 2:
          return 'https://blogs.sliips.com/sliips-an-agile-and-empirical-approach-to-pay/';
        case 3:
          return 'https://blogs.sliips.com/the-rise-of-singlism/';
        case 4:
          return 'https://blogs.sliips.com/are-you-a-happy-worker/';
        case 5:
          return 'https://blogs.sliips.com/lets-talk-about-pay-anonymously/';
        case 6:
          return 'https://blogs.sliips.com/lets-talk-about-pay-honestly/';
        case 8:
          return 'https://blogs.sliips.com/we-heart-users/';
        case 9:
          return 'https://blogs.sliips.com/sliips-is-live/';
        case 10:
          return 'https://blogs.sliips.com/education-graduate-earnings-and-the-gender-pay-gap/';
        case 11:
          return 'https://blogs.sliips.com/new-year-new-you/';
        case 12:
          return 'https://blogs.sliips.com/sliips-begins-ignite/';
        case 13:
          return 'https://blogs.sliips.com/users-users-users/';
        case 14:
          return 'https://blogs.sliips.com/school-of-hard-knocks/';
        case 15:
          return 'https://blogs.sliips.com/love-your-work/';
        case 16:
          return 'https://blogs.sliips.com/make-better-mistakes/';
        case 17:
          return 'https://blogs.sliips.com/training-is-over-now-we-must-do/';
        case 18:
          return 'https://blogs.sliips.com/is-the-gender-pay-gap-really-a-problem/';
        case 19:
          return 'https://blogs.sliips.com/what-really-motivates-you/';
        case 20:
          return 'https://blogs.sliips.com/sliips-on-mcr-live/';
        case 21:
          return 'https://blogs.sliips.com/is-a-degree-worth-it/';
        case 22:
          return 'https://blogs.sliips.com/pmqs-budgets-and-international-womens-day/';
        case 24:
          return 'https://blogs.sliips.com/is-your-payrise-fair/';
        case 25:
          return 'https://blogs.sliips.com/the-kids-arent-alright-salary-expectations-of-millennials/';
        case 26:
          return 'https://blogs.sliips.com/consultant-career-progression-4-signs-youre-on-track/';
        case 27:
          return 'https://blogs.sliips.com/how-to-negotiate-a-pay-rise/';
        default:
          return defaultItem;
      }
    } else return defaultItem;
  }

  render() {
    return (
      <div className="c1 page-section text-center">
        <h4>
          If you are not automatically redirected to our new blog site click{' '}
          <a href={this.getRedirectURL()}>Here</a>
        </h4>
      </div>
    );
  }
}

export default Page;
