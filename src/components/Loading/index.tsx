import * as React from "react";
import { Spinner } from "react-bootstrap";

import appLogo from "../../images/app-logo.svg";

import "./index.less";

const Loading = () => (
  <div id="app-loader">
    <img src={appLogo} alt="logo" className="animated-logo" />
  </div>
);

export default Loading;
