import * as React from "react";
import { useLocation } from "react-router";
import { getPageName } from "../../factories/utils";

import "./index.less";

const AppHeader = () => {
  const location = useLocation();

  const name = "Jane Doe";

  const getNameAlias = () => {
    const matches = name.match(/\b(\w)/g);

    const alias = (matches && (matches[0] || "") + (matches[1] || "")) || "";

    return alias;
  };
  return (
    <div id="app-header">
      <h5 className="header-title">{getPageName(location.pathname)}</h5>
      <div className="name-container">
        <p className="name-text">{name}</p>
        <div className="alias-container">{getNameAlias()}</div>
      </div>
    </div>
  );
};

export default AppHeader;
