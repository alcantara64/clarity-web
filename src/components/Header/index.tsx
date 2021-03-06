import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { getNameAlias, getPageName } from "../../factories/utils";
import { useStores } from "../../models";

import { observer } from "mobx-react-lite";

import "./index.less";
import { ROUTES } from "../../constants/routes";

const AppHeader = observer(() => {
  const location = useLocation();

  const history = useHistory();
  const {
    userStore: { userProfile },
  } = useStores();

  const [name, setName] = useState("");

  useEffect(() => {
    setName((userProfile?.firstName || "") + (userProfile?.lastName || ""));
  }, [userProfile]);

  return (
    <div id="app-header" className="fixed-top">
      <h5 className="header-title">{getPageName(location.pathname)}</h5>
      <div
        className="name-container"
        onClick={() => {
          history.push(ROUTES.profile);
        }}
      >
        <p className="name-text">{name}</p>
        <div className="alias-container">{getNameAlias(name)}</div>
      </div>
    </div>
  );
});

export default AppHeader;
