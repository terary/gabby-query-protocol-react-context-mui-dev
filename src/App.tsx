import React, { ReactElement, FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

// components
import Layout from "./components/Layout";

// app routes
import { routes } from "./config";

// constants
import { APP_TITLE } from "./utils/constants";

// interfaces
import RouteItem from "./model/RouteItem.model";

// default component
const DefaultComponent: FC<{}> = (): ReactElement => (
  <div>No Component Defined.</div>
);

function App() {
  return (
    <>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <Router>
        <Switch>
          <Layout>
            {/* for each route config, a react route is created */}
            {routes.map((route: RouteItem) =>
              route.subRoutes ? (
                route.subRoutes.map((item: RouteItem) => (
                  <Route
                    key={`${item.key}`}
                    path={`${item.path}`}
                    component={item.component || DefaultComponent}
                    exact
                  />
                ))
              ) : (
                <Route
                  key={`${route.key}`}
                  path={`${route.path}`}
                  component={route.component || DefaultComponent}
                  exact
                />
              )
            )}
          </Layout>
        </Switch>
      </Router>
    </>
  );
}

export default App;
