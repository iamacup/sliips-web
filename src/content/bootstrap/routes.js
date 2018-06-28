
// todo we need to update this so that all load data methods call the login function first then the others after
// todo we should have a generic function for this instead of faffing around with horrible promise hierarchy every time

import MainPage from '../../content/containers/Pages/Main';
import AboutUsPage from '../../content/containers/Pages/AboutUs';
import CareersPage from '../../content/containers/Pages/Careers';
import FAQPage from '../../content/containers/Pages/FAQ';
import NotFoundPage from '../../content/containers/Pages/NotFound';
import MobilePage from '../../content/containers/Pages/Mobile';
import SliipsPointsPage from '../../content/containers/Pages/SliipsPoints';
import PressPage from '../../content/containers/Pages/Contact/Press';
import ContactUsPage from '../../content/containers/Pages/Contact/ContactUs';
import PressReleasesPage from '../../content/containers/Pages/Contact/PressReleases';
import PrivacyStatementPage from '../../content/containers/Pages/Legal/PrivacyStatement';
import CookiePolicyPage from '../../content/containers/Pages/Legal/CookiePolicy';
import TermsAndConditionsPage from '../../content/containers/Pages/Legal/TermsAndConditions';
import ProfilePage from '../../content/containers/Pages/Profile';
import PrivacyPage from '../../content/containers/Pages/Privacy';
import ErrorViewerPage from '../../content/containers/Pages/ErrorViewer';
import GetStartedPage from '../../content/containers/Pages/GetStarted';
import DashboardPage from '../../content/containers/Pages/Dashboard';
import AcmeCompanyPage from '../../content/containers/Pages/CompanyProfile/Acme';
import PAConsultingCompanyPage from '../../content/containers/Pages/CompanyProfile/PAConsulting';
import OldBlogPage from '../../content/containers/Pages/OldBlog';
import LifetimeOfferBouncerPage from '../../content/containers/Pages/LifetimeOfferBouncer';
import loginPage from '../../content/containers/Pages/Login';
import OfflinePage from '../../content/containers/Pages/SliipsOffline';


import companyPage, {
  fetchDataDescription as companyFetchDataDescription,
  fetchLogoDescription as companyFetchLogoDescription,
}
  from '../../content/containers/Pages/Company';

import payslipPublicPage, {
  companyListDataDescription as payslipPublicCompanyListDataDescription,
  payslipNumberDataDescription as payslipPublicPayslipNumberDataDescription,
}
  from '../../content/containers/Pages/PayslipPublic';

import graphTestPage from '../../content/containers/Pages/Testing/Graphs';

import BenchmarkingLandingPage from '../../content/containers/Pages/Benchmarking/Landing';
import BenchmarkingSignupPage from '../../content/containers/Pages/Benchmarking/Signup';
import BenchmarkingOneoffPage from '../../content/containers/Pages/Benchmarking/Oneoff';
import BenchmarkingMonthlyPage from '../../content/containers/Pages/Benchmarking/Monthly';

import { doFetchData as wizzardDoFetchData } from '../../content/containers/Fragments/WizzardPane/action';
import { doFetchData as loginDoFetchData } from '../../content/containers/Pages/Login/action';
import { doFetchData as errorViewerDoFetchData } from '../../content/containers/Pages/ErrorViewer/action';
import { doFetchData as companyDoFetchData } from '../../content/containers/Pages/CompanyProfile/action';
import { doFetchData as dashboardDoFetchData } from '../../content/containers/Pages/Dashboard/action';
import { doFetchData as dashboardDoFetchIndustryData } from '../../content/containers/Pages/Dashboard/IndustryData/action';
import { doFetchData as dashboardDoFetchCompanyData } from '../../content/containers/Pages/Dashboard/CompanyData/action';

import { initialState as dashboardCompanyInitialState } from '../../content/containers/Pages/Dashboard/CompanyData/reducer';
import { initialState as dashboardIndustryInitialState } from '../../content/containers/Pages/Dashboard/IndustryData/reducer';

import { doDataTransaction } from '../../foundation/redux/globals/DataTransactions/actions';

import { doLoginWithCookieData } from '../../content/containers/Fragments/Authentication/action';

const defaultLoadFunction = (dispatch, params, cookies) =>
  Promise.all([dispatch(doLoginWithCookieData(cookies.authentication))]);

// NOTE - you should pass in cookies to any of the methods that
// load data from the server so that their requests are able to
// be user - related

// NOTE - THE PATH ATTRIBUTE IS USED AS A KEY IN THE APP FILE FOR THE ROUTES - THIS MEANS IT IS ASSUMED TO BE UNIQUE.
// IT IT IS NOT UNIQUE WE NEED TO DO SOMETHING ELSE AS THE KEY IN THE APP!!!!!

export default [
  // {
  //   path: '/',
  //   exact: true,
  //   component: MainPage,
  //   loadData: (dispatch, params, cookies) =>
  //     Promise.all([
  //       dispatch(doLoginWithCookieData(cookies.authentication)),
  //       dispatch(
  //         wizzardDoFetchData(
  //           cookies.authentication, 1, null, 'api/questions/getStep', {
  //             groupKey: 'reduxSignupGroup',
  //             groupName: 'reduxGroup-1',
  //           },
  //         ),
  //       ),
  //     ]),
  // },
  // {
  //   path: '/admin/error-viewer/:id',
  //   exact: false,
  //   component: ErrorViewerPage,
  //   loadData: (dispatch, params, cookies) =>
  //     Promise.all([
  //       dispatch(doLoginWithCookieData(cookies.authentication)),
  //       dispatch(
  //         errorViewerDoFetchData(
  //           cookies.authentication,
  //           Number.parseInt(params.id, 10),
  //         ),
  //       ),
  //     ]),
  // },
  // {
  //   path: '/login/:id',
  //   exact: false,
  //   component: loginPage,
  //   loadData: (dispatch, params, cookies) =>
  //     Promise.all([
  //       dispatch(doLoginWithCookieData(cookies.authentication)),
  //       dispatch(loginDoFetchData(cookies.authentication, params.id)),
  //     ]),
  // },
  // {
  //   path: '/reset-password/:id',
  //   exact: false,
  //   component: loginPage,
  //   loadData: (dispatch, params, cookies) =>
  //     Promise.all([
  //       dispatch(doLoginWithCookieData(cookies.authentication)),
  //       dispatch(loginDoFetchData(cookies.authentication, params.id)),
  //     ]),
  // },
  // {
  //   path: '/company-profile/:id/Acme',
  //   exact: false,
  //   component: AcmeCompanyPage,
  //   loadData: (dispatch, params, cookies) =>
  //     Promise.all([
  //       dispatch(doLoginWithCookieData(cookies.authentication)),
  //       dispatch(
  //         companyDoFetchData(
  //           cookies.authentication,
  //           Number.parseInt(params.id, 10),
  //         ),
  //       ),
  //     ]),
  // },
  // {
  //   path: '/company-profile/:id/PA-Consulting',
  //   exact: false,
  //   component: PAConsultingCompanyPage,
  //   loadData: (dispatch, params, cookies) =>
  //     Promise.all([
  //       dispatch(doLoginWithCookieData(cookies.authentication)),
  //       dispatch(
  //         companyDoFetchData(
  //           cookies.authentication,
  //           Number.parseInt(params.id, 10),
  //         ),
  //       ),
  //     ]),
  // },
  // {
  //   path: '/dashboard',
  //   exact: true,
  //   component: DashboardPage,
  //   loadData: (dispatch, params, cookies) =>
  //     Promise.all([
  //       dispatch(doLoginWithCookieData(cookies.authentication)),
  //       dispatch(dashboardDoFetchData(cookies.authentication)),
  //     ]),
  // },
  // {
  //   path: '/dashboard/industry',
  //   exact: true,
  //   component: DashboardPage,
  //   loadData: (dispatch, params, cookies) =>
  //     Promise.all([
  //       dispatch(doLoginWithCookieData(cookies.authentication)),
  //       dispatch(dashboardDoFetchData(cookies.authentication)),
  //       dispatch(
  //         dashboardDoFetchIndustryData(
  //           cookies.authentication,
  //           dashboardIndustryInitialState.metaData,
  //         ),
  //       ),
  //     ]),
  // },
  // {
  //   path: '/dashboard/company',
  //   exact: true,
  //   component: DashboardPage,
  //   loadData: (dispatch, params, cookies) =>
  //     Promise.all([
  //       dispatch(doLoginWithCookieData(cookies.authentication)),
  //       dispatch(dashboardDoFetchData(cookies.authentication)),
  //       dispatch(
  //         dashboardDoFetchCompanyData(
  //           cookies.authentication,
  //           dashboardCompanyInitialState.metaData,
  //         ),
  //       ),
  //     ]),
  // },
  // {
  //   path: '/get-started/:id',
  //   exact: false,
  //   component: GetStartedPage,
  //   loadData: (dispatch, params, cookies) =>
  //     Promise.all([
  //       dispatch(doLoginWithCookieData(cookies.authentication)),
  //       dispatch(
  //         wizzardDoFetchData(cookies.authentication, Number.parseInt(params.id, 10),
  //           null, 'api/wizzard/getStep', {},
  //         ),
  //       ),
  //     ]),
  // },
  // {
  //   path: '/get-started',
  //   exact: true,
  //   component: GetStartedPage,
  //   loadData: (dispatch, params, cookies) =>
  //     Promise.all([
  //       dispatch(doLoginWithCookieData(cookies.authentication)),
  //       dispatch(wizzardDoFetchData(cookies.authentication, 1, null, 'api/wizzard/getStep', {})),
  //     ]),
  // },
  // {
  //   path: '/company/:id/:name',
  //   exact: false,
  //   component: companyPage,
  //   loadData: (dispatch, params, cookies) => {
  //     const transactionData = { optionID: 'options/' + params.id };

  //     // we have to resolve promises in this order to make sure tha the doLoginWithCookieData does not
  //     // fudge up the other calls - they conflict with eachother because of the reset effect a login has on much of the state
  //     // so we need to make sure the login happens BEFORE the other things
  //     return new Promise((resolve) => {
  //       dispatch(doLoginWithCookieData(cookies.authentication)).then(
  //         () => {
  //           Promise.all([
  //             dispatch(doDataTransaction(
  //               companyFetchDataDescription.url,
  //               companyFetchDataDescription.mainID,
  //               companyFetchDataDescription.subID,
  //               cookies.authentication,
  //               transactionData)),
  //             dispatch(doDataTransaction(
  //               companyFetchLogoDescription.url,
  //               companyFetchLogoDescription.mainID,
  //               companyFetchLogoDescription.subID,
  //               cookies.authentication,
  //               transactionData)),
  //           ]).then(
  //             () => {
  //               resolve();
  //             },
  //           );
  //         },
  //       );
  //     });
  //   },
  // },
  // {
  //   path: '/company/:name',
  //   exact: false,
  //   component: companyPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/make-your-payslip-public',
  //   exact: true,
  //   component: payslipPublicPage,
  //   loadData: (dispatch, params, cookies) => {
  //     const transactionData = { };

  //     // we have to resolve promises in this order to make sure tha the doLoginWithCookieData does not
  //     // fudge up the other calls - they conflict with eachother because of the reset effect a login has on much of the state
  //     // so we need to make sure the login happens BEFORE the other things
  //     return new Promise((resolve) => {
  //       dispatch(doLoginWithCookieData(cookies.authentication)).then(
  //         () => {
  //           Promise.all([
  //             dispatch(doDataTransaction(
  //               payslipPublicCompanyListDataDescription.url,
  //               payslipPublicCompanyListDataDescription.mainID,
  //               payslipPublicCompanyListDataDescription.subID,
  //               cookies.authentication,
  //               transactionData)),
  //             dispatch(doDataTransaction(
  //               payslipPublicPayslipNumberDataDescription.url,
  //               payslipPublicPayslipNumberDataDescription.mainID,
  //               payslipPublicPayslipNumberDataDescription.subID,
  //               cookies.authentication,
  //               transactionData)),
  //             dispatch(
  //               wizzardDoFetchData(
  //                 cookies.authentication, 1, null,
  //                 'api/questions/getStep', {
  //                   groupKey: 'reduxSignupGroup',
  //                   groupName: 'reduxGroup-1',
  //                 },
  //               ),
  //             ),
  //           ]).then(
  //             () => {
  //               resolve();
  //             },
  //           );
  //         },
  //       );
  //     });
  //   },
  // },
  // {
  //   path: '/about-us',
  //   exact: true,
  //   component: AboutUsPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/careers',
  //   exact: true,
  //   component: CareersPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/privacy',
  //   exact: true,
  //   component: PrivacyPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/profile',
  //   exact: true,
  //   component: ProfilePage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/privacy-statement',
  //   exact: true,
  //   component: PrivacyStatementPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/cookie-policy',
  //   exact: true,
  //   component: CookiePolicyPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/terms-and-conditions',
  //   exact: true,
  //   component: TermsAndConditionsPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/press-releases',
  //   exact: true,
  //   component: PressReleasesPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/faq',
  //   exact: true,
  //   component: FAQPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/mobile',
  //   exact: true,
  //   component: MobilePage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/sliips-points',
  //   exact: true,
  //   component: SliipsPointsPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/press',
  //   exact: true,
  //   component: PressPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/contact-us',
  //   exact: true,
  //   component: ContactUsPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/benchmarking',
  //   exact: true,
  //   component: BenchmarkingLandingPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/benchmarking-signup',
  //   exact: true,
  //   component: BenchmarkingSignupPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/benchmarking-oneoff',
  //   exact: true,
  //   component: BenchmarkingOneoffPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/benchmarking-monthly',
  //   exact: true,
  //   component: BenchmarkingMonthlyPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/blogs/:id/:name',
  //   exact: false,
  //   component: OldBlogPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/tests/graphs',
  //   exact: true,
  //   component: graphTestPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '/free-lifetime-offerNov2017',
  //   exact: true,
  //   component: LifetimeOfferBouncerPage,
  //   loadData: defaultLoadFunction,
  // },
  // {
  //   path: '*',
  //   component: NotFoundPage,
  //   loadData: defaultLoadFunction,
  // },
  {
    path: '*',
    component: OfflinePage,
    loadData: defaultLoadFunction,
  }
];
