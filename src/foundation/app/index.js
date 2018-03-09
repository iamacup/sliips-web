import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';

import config from '../../foundation/config';
import routes from '../../content/bootstrap/routes';
import Bootstrap from '../../content/bootstrap/AppGlobals';

const App = () => {
  const routeWithSubRoutes = route => (
    <Route
      key={route.path}
      exact={route.exact || false}
      path={route.path}
      render={props => (
        // Pass the sub-routes down to keep nesting
        // TODO i think we pass down the reduxAction which we do not need to..?
        <route.component {...props} routes={route.routes} />
      )}
    />
  );

  return (
    <div>
      <Helmet {...config.app} />
      <Switch>{routes.map(route => routeWithSubRoutes(route))}</Switch>
      <Bootstrap />
    </div>
  );
};

export default App;
