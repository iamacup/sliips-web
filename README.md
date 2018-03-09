
<div align="center">
  <a href="https://www.sliips.com/">
    <img width="400" heigth="257" src="https://raw.githubusercontent.com/iamacup/sliips-ui/master/src/theme/sliips/images/pressLogos/logo-medium-trans-inv.png">
  </a>

  [![dependencies Status](https://david-dm.org/iamacup/sliips-ui/status.svg)](https://david-dm.org/iamacup/sliips-ui)
  [![devDependencies Status](https://david-dm.org/iamacup/sliips-ui/dev-status.svg)](https://david-dm.org/iamacup/sliips-ui?type=dev)
  [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

  [![Twitter Follow](https://img.shields.io/twitter/follow/paysliips.svg?style=social&label=Follow)](https://www.twitter.com/paysliips)

  Site|Built Status
  ------------------|-----------
  [![dependencies Status](https://img.shields.io/badge/www-.sliips.com-6a3787.svg)](https://www.sliips.com/)|[![Shippable branch](https://img.shields.io/shippable/59aeab52d1902e07009997da/master.svg)]()
  [![dependencies Status](https://img.shields.io/badge/beta-.sliips.com-6a3787.svg)](https://beta.sliips.com/)|[![Shippable branch](https://img.shields.io/shippable/59aeab52d1902e07009997da/dev.svg)]()

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

Todo for future
-------

* [ ] In order to quickly migrate from our previous code base we did not implement a full test suite
* [ ] We have not implemented the Flow syntax everywhere

Getting Started
-------

**1. You can start by cloning the repository on your local machine by running:**

```bash
git clone https://github.com/iamacup/sliips-ui.git
cd sliips-ui
```

**2. Install all of the dependencies:**

```bash
yarn install
```

**3. Start to run it in prod mode locally (will point the api endpoint at api.sliips.com):**

```bash
yarn build:prod && yarn start:prod
```

**4. Start to run it in dev mode locally (with hot reloading) and pointing the api at local.sliips.com:8080:**

```bash
yarn build:local && yarn start:local
```

The API
-------

This project comprises only the front-end of Sliips and communicates with REST endpoints provided by the Sliips API, which is [documented here](https://github.com/iamacup/sliips-api-docs)

Commands
-------

`yarn <script>`|Description
------------------|-----------
`start:local`|Run the app on the development server at `localhost:3000`. HMR will be enabled and it will point at local.sliips.com:8080 for API calls
`start:dev`|Run the app with a production config at `localhost:8080` with API pointed at beta.sliips.com:5544
`start:prod`|Run the app with a production config at `localhost:8080` with API pointed at api.sliips.com
`build:local`|Remove the previous client and server bundled stuff and bundle them to `./public/assets`. with the api pointing at local.sliips.com:8080
`build:dev`|Remove the previous client and server bundled stuff and bundle them to `./public/assets`. with the api pointing at beta.sliips.com
`build:prod`|Remove the previous client and server bundled stuff and bundle them to `./public/assets`. with the api pointing at api.sliips.com
`lint`|Lint all `.js` and `.scss` files.
`lint:js`|Lint all `.js` files.
`lint:style`|Lint all `.scss` files.
`flow`|Run type checking for `.js` files.
`test`|Run testing once (with code coverage reports).
`test:watch`|Run testing on every test file change.
`clean:all`|Remove the client/server bundled stuff and the coverage report.
`clean:build`|Remove the server bundled stuff from the `./public/assets` folder.
`clean:test`|Remove the `./coverage` folder to clean the code coverage report.

Structure
-------

```
.
├── boilerplate        # Contains various boilerplate pages for easy replication
├── public             # Webpack outputs files here
├── src                # Main source directory
│   ├── components     # Things that are not linked up to Redux
│   ├── config         # Various configuration files for the environment
│   ├── containers     # Things that are linked up to Redux
│   │   ├── App        # The entrypoint
│   │   ├── Fragments  # Pieces reusable fragments
│   │   └── Pages      # Complete pages
│   ├── indexscripts   # Scripts that are injected onto the index page
│   ├── redux          # Redux related configuration
│   ├── scripts        # Various scripts that are not React specific
│   ├── theme          # Images, SCSS etc.
│   ├── types          # Flow types 
│   └── utils          # Application wide utilities
└── tools              # Webpack, Flow etc.

```

Commercial Licenses
-------

We have included some dependencies (wowjs, formvalidation.io) etc. which we own licenses for - if you are using this as a whole project - there are some project dependencies that are not free for commercial use. Sorry! 

Contact
-------

If you have a specific feature request or find a bug, [please open a GitHub issue](https://github.com/iamacup/sliips-ui/issues/new). We encourage you to fork these docs for local reference and happily accept pull requests with improvements.

We would love to talk with anyone that has questions or comments, this is an open project driven by the Sliips values - www.sliips.com/contact-us/.

Conduct
-------

Please note that this project is released with a [Contributor Code of Conduct](https://github.com/iamacup/sliips-ui/blob/master/CONDUCT.md). By participating in discussions about the Sliips UI, you agree to abide by these terms.

