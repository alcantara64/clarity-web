import { ROUTES } from "../../constants/routes";
import LoadableComponent from "./../Loadable/index";

export const userRouter = [
  {
    path: ROUTES.userBase,
    name: "user",
    title: "User",
    component: LoadableComponent(
      () => import("../../components/Layout/UserLayout")
    ),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: ROUTES.loginPage,
    name: "login",
    title: "login",
    component: LoadableComponent(() => import("../../screens/login")),
    isLayout: false,
    showInMenu: false,
    exact: true,
  },
  {
    path: ROUTES.signUpPage,
    name: "signUp",
    title: "signUp",
    component: LoadableComponent(() => import("../../screens/signup")),
    isLayout: false,
    showInMenu: false,
    exact: true,
  },
];

export const appRouters = [
  {
    path: ROUTES.appBase,
    exact: false,
    name: "home",
    permission: "",
    title: "Home",
    icon: "home",
    component: LoadableComponent(
      () => import("../../components/Layout/AppLayout")
    ),
    isLayout: true,
    showInMenu: false,
  },
  // {
  //   path: ROUTES.dashboard,
  //   name: "dashboard",
  //   title: "dashboard",
  //   component: LoadableComponent(() => import("../../screens/Dashboard")),
  //   isLayout: false,
  //   showInMenu: false,
  //   exact: true,
  // },
];
export const routers = [...appRouters, ...userRouter];
