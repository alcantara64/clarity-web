import * as React from "react";
import { Spinner } from "react-bootstrap";

import "./index.less";

const OauthLoading = () => {
  return (
    <div id="oauth-loading">
      <Spinner animation="border" className="spinner-loader" />
      <h5 className="wait-text">Waiting for connection</h5>
      <p className="description-text">
        Come back to this page after making your connection
      </p>
    </div>
  );
};

export default OauthLoading;
