import * as React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => (
  <div style={{ paddingTop: 100, textAlign: "center" }}>
    <Spinner animation="grow" />
  </div>
);

export default Loading;
