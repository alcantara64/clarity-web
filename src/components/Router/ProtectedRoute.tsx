import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useStores } from "../../models";

const isGranted = (permission: any) => {
  return true;
};

const ProtectedRoute = ({
  path,
  component: Component,
  permission,
  render,
  ...rest
}: any) => {
  console.log("permission", permission);

  const {
    authStore: { token },
    payerStore
  } = useStores();

  const defaultPayer = payerStore.defaultPayer();

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log('location ==>', props.location.pathname === ROUTES.timeLine)
        if (!token)
          return (
            <Redirect
              to={{
                pathname: ROUTES.loginPage,
                state: { from: props.location },
              }}
            />
          );
        if (!defaultPayer?.is_connected && props.location.pathname === ROUTES.timeLine)
          return (
            <Redirect
              to={{
                pathname: ROUTES.oauth,
                state: { from: props.location },
              }}
            />
          );

        if (permission && !isGranted(permission)) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.exceptionPage,
                state: { from: props.location },
              }}
            />
          );
        }

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
