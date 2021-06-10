import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import "./index.less";

const Provider = ({ name, isConnected, onClick = () => {} }: any) => {
  const connectedClass = classNames({
    "status-connected": isConnected,
  });

  return (
    <div id="app-provider" onClick={onClick}>
      <span className="provider-name">{name}</span>

      <div className={`status-container ${connectedClass}`}>
        {isConnected ? "Connected" : "Connect"}{" "}
        <FontAwesomeIcon icon={faCheckCircle} className="icon" />
      </div>
    </div>
  );
};

export default Provider;
