module.exports = {
  host: process.env.NODE_HOST || '0.0.0.0', // Define your host from 'package.json'
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Sliips',
    titleTemplate: 'Sliips - %s',
    meta: [
      {
        name: 'description',
        content: 'We crowdsource payslips in an anonymous to make sure companies can\'t hide bad pay practices.',
      },
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:site',
        content: '@paysliips',
      },
      {
        name: 'twitter:creator',
        content: '@paysliips',
      },
      {
        property: 'og:url',
        content: 'https://www.sliips.com/',
      },
      {
        property: 'og:title',
        content: 'Sliips - Make your payslip public!',
      },
      {
        property: 'og:description',
        content: 'We crowdsource payslips in an anonymous to make sure companies can\'t hide bad pay practices.',
      },
      {
        property: 'og:image',
        content: 'https://files.sliips.com/images/ogicon.png',
      },
    ],
  },
};
