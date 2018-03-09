
import React from 'react';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import PropTypes from 'prop-types';
import _ from 'lodash';

import IndexPlugins from '../../content/bootstrap/IndexPlugins';

const Html = ({ store, htmlContent }) => {
  // Should be declared after "renderToStaticMarkup()" of "../server.js" or it won't work
  const head = Helmet.renderStatic();
  const attrs = head.htmlAttributes.toComponent();
  const { lang, ...rest } = attrs || {};
  const assets = webpackIsomorphicTools.assets();

  return (
    <html {...rest} lang={lang || 'en'}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />

        { IndexPlugins.headTop }

        {head.title.toComponent()}
        {head.base.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}

        {/* We make vendor come first by reversing the order - this is so that we can override it in our application */}
        {_.keys(assets.styles).reverse().map(style => (
          <link
            key={_.uniqueId()}
            href={assets.styles[style]}
            media="screen, projection"
            rel="stylesheet"
            type="text/css"
          />
        ))}

        { IndexPlugins.headBottom }
      </head>
      <body id="page-top">

        { IndexPlugins.bodyTop }

        <div
          id="react-view"
          // Rendering the route, which passed from server-side
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
        />

        <script
          // Store the initial state into window
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: store && `window.__INITIAL_STATE__=${serialize(store.getState())};`,
          }}
        />
        {
          // Reverse the order of scripts for accessing vendor.js first
          _.keys(assets.javascript).reverse().map(script =>
            <script key={_.uniqueId()} src={assets.javascript[script]} />)
        }
        {head.script.toComponent()}

        { IndexPlugins.bodyBottom }

      </body>
    </html>
  );
};

Html.defaultProps = { htmlContent: '' };

Html.propTypes = {
  store: PropTypes.any.isRequired,
  htmlContent: PropTypes.any,
};

export default Html;
