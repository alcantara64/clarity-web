import * as React from "react";
import "./index.less";
import { Route, Switch, useLocation, NavLink } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import appLogo from "../../images/app-logo.svg";

import ProtectedRoute from "./ProtectedRoute";
import { getPageTitle, getRoute } from "../../factories/utils";
import { ROUTES } from "../../constants/routes";
import defaulProfile from "../../images/default-profile.svg";
import DocumentTitle from "react-document-title";

const AppRouter = () => {
  const UserLayout = getRoute(ROUTES.userBase).component;
  const AppLayout = getRoute(ROUTES.appBase).component;

  const location = useLocation();

  return (
    <DocumentTitle title={getPageTitle(location.pathname)}>
      <div id="main-app-route">
        {/* <Header /> */}
        <Switch>
          <ProtectedRoute
            path="/app"
            render={(props: any) => <AppLayout {...props} />}
          />
          <Route path="/" render={(props) => <UserLayout {...props} />} />
        </Switch>
      </div>
    </DocumentTitle>
  );
};

export default AppRouter;
