import "./AppLayout.less";

import React, { useState } from "react";

import { Route, Switch, NavLink, Redirect } from "react-router-dom";

import { appRouters } from "../Router/router.config";
import { ROUTES } from "../../constants/routes";
import AppSideBar from "../SideBar";
import classNames from "classnames";
import { isMobile } from "react-device-detect";
import AppHeader from "../Header";

const AppLayout = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(isMobile);

  const sideBarClass = classNames({
    sideBarCollapsed: sideBarCollapsed,
    sideBarOpen: !sideBarCollapsed,
  });

  return (
    <div id="app-layout">
      <AppSideBar
        onSidebartoggle={(state: any) => {
          setSideBarCollapsed(state);
        }}
      />
      <div id="app-main" className={`${sideBarClass}`}>
        <AppHeader />
        <main id="app-main-content">
          <div className="height-padder"></div>
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
          <Redirect from="/" to={`${ROUTES.oauth}`} />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
