
<div align="center">

  [![dependencies Status](https://david-dm.org/iamacup/sliips-web/status.svg)](https://david-dm.org/iamacup/sliips-web)
  [![devDependencies Status](https://david-dm.org/iamacup/sliips-web/dev-status.svg)](https://david-dm.org/iamacup/sliips-web?type=dev)
  [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

  [![Twitter Follow](https://img.shields.io/twitter/follow/paysliips.svg?style=social&label=Follow)](https://www.twitter.com/paysliips)

</div>

What is Sliips?
-------

Sliips is a website about salary transparency and openness - we build and maintain a platform that allows users to share their salary data with real verified payslips underpinning the data set.

This is the UI component of our project.

The Sliips UI Frontend is based on the fantastic [React Cool Starter](https://github.com/wellyshen/react-cool-starter/) project, which we love. :)


Why did we opensource this?
-------

We were previously working on an older much more custom React setup that was becoming fairly tangled together with its backend / API and it was all becoming rather unwieldy. 

We also wanted to rewrite for Webpack (instead of our previous Gulp / Bower combo) and really wanted to take advantage of server side rendering as SEO is key for Sliips.

Finally, we are looking to hire developers, and as a result we decided that creating an open source project for a large part of our code base would be beneficial for us and anyone we hired, for three reasons: 

1. We love transparency
2. We wanted to make it as easy as possible for a new hire to understand what they're working on
3. We care about people's career development so wanted any hire to be able to showcase their skills whenever they eventually leave us

We hope the rest of this repository is useful for you. If you have any questions - just ask! :)

Getting Started
-------

**1. You can start by cloning the repository on your local machine by running:**

```bash
git clone https://github.com/iamacup/sliips-web.git
```

**2. Install all of the dependencies:**

```bash
yarn install
```

**3. Start to run it locally (will point the api endpoint to local.sliips.com:8080):**

```bash
yarn build:local && yarn start:local
```

**To the following other options are available to start:**

In order for this to run locally, you will need to edit the package.json and provide a port for start:dev command under betterScripts - it will point the api endpoint to beta-api.sliips.com

```bash
yarn build:dev && yarn start:dev
```

In order for this to run locally, you will need to edit the package.json and provide a port for start:prod command under betterScripts - it will point the api endpoint to api.sliips.com

```bash
yarn build:prod && yarn start:prod
```

The API
-------

This project comprises only the front-end of Sliips and communicates with REST endpoints provided by the Sliips API, which is [documented here](https://github.com/iamacup/sliips-api-docs)

Commercial Licenses
-------

We have included some dependencies (wowjs, formvalidation.io) etc. which we own licenses for - if you are using this as a whole project - there are some project dependencies that are not free for commercial use. Sorry! 

Contact
-------

If you have a specific feature request or find a bug, [please open a GitHub issue](https://github.com/iamacup/sliips-web/issues/new). We encourage you to fork these docs for local reference and happily accept pull requests with improvements.

We would love to talk with anyone that has questions or comments, this is an open project driven by the Sliips values - www.sliips.com/contact-us/.

Conduct
-------

Please note that this project is released with a [Contributor Code of Conduct](https://github.com/iamacup/alumnibase-data/blob/master/CONDUCT.md). By participating in discussions about this project, you agree to abide by these terms.

