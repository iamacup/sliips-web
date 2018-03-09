// Fragments
import authentication from '../../content/containers/Fragments/Authentication/reducer';
import modal from '../../content/containers/Fragments/Modal/reducer';
import wizzardPane from '../../content/containers/Fragments/WizzardPane/reducer';
import questions from '../../content/containers/Fragments/Questions/Components/reducer';
import questionRenderWrapper from '../../content/containers/Fragments/Questions/Utility/QuestionRenderWrapper/reducer';
import payslipUpload from '../../content/containers/Fragments/DashboardModalPayslipUpload/reducer';
import resetPassword from '../../content/containers/Fragments/ResetPassword/reducer';

// Dashboards
import dashboardIndustryData from '../../content/containers/Pages/Dashboard/IndustryData/reducer';
import dashboardCompanyData from '../../content/containers/Pages/Dashboard/CompanyData/reducer';

// Pages
import errorViewerPage from '../../content/containers/Pages/ErrorViewer/reducer';
import dashboardPage from '../../content/containers/Pages/Dashboard/reducer';
import companyPage from '../../content/containers/Pages/CompanyProfile/reducer';
import loginPage from '../../content/containers/Pages/Login/reducer';

// This gets put into the global reducers
export default {
  authentication,
  modal,
  wizzardPane,
  questions,
  questionRenderWrapper,
  payslipUpload,
  resetPassword,

  dashboardIndustryData,
  dashboardCompanyData,

  errorViewerPage,
  dashboardPage,
  companyPage,
  loginPage,
};
