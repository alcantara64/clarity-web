import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import "./index.less";

const Provider = ({ name, isConnected, onClick = () => {} }: any) => {
  return (
    <div id="app-provider" onClick={onClick}>
      <span className="provider-name">{name}</span>

      <div className="status-container">
        {isConnected ? "Connected" : "Connect"}{" "}
        <FontAwesomeIcon icon={faCheckCircle} className="icon" />
      </div>
      <div className="status-container">
        {isConnected ? "Connected" : "Connect"}{" "}
        <FontAwesomeIcon icon={faCheckCircle} className="icon" />
      </div>
    </div>
  );
};

export default Provider;
