import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
// import { useStores } from "../../models";

//for simulation purpose
const isAuthenticated = false;

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

  // const {
  //   userStore: { userProfile },
  // } = useStores();

  return (
    <Route
      {...rest}
      render={(props) => {
        // if (!userProfile?.user_id)
        //   return (
        //     <Redirect
        //       to={{
        //         pathname: ROUTES.landingPage,
        //         state: { from: props.location },
        //       }}
        //     />
        //   );

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
