import "./AppLayout.less";

import * as React from "react";

import { Route, Switch, NavLink, Redirect } from "react-router-dom";

import { appRouters } from "../Router/router.config";
import { ROUTES } from "../../constants/routes";

const AppLayout = () => {
  return (
    <div id="app-layout">
      <Switch>
        {appRouters
          .filter((item: any) => !item.isLayout)
          .map((item, index) => (
            <Route
              key={index}
              path={item.path}
              component={item.component}
              exact={item.exact}
            />
          ))}
      </Switch>
      <Redirect from="/" to={`${ROUTES.dashboard}`} />
    </div>
  );
};

export default AppLayout;
