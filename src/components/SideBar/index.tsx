import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import { useState } from "react";
import { isMobile } from "react-device-detect";

import ClickOutside from "../ClickOutside";

import healthDataIcon from "../../images/myHealthData.svg";
import appLogo from "../../images/app-logo.svg";
import sidearProfileIcon from "../../images/sidearProfileIcon.svg";
import sideBarConnections from "../../images/sideBarConnections.svg";
import sideBarSettingsIcon from "../../images/sideBarSettingsIcon.svg";
import onyxLogo from "../../images/Onyx.svg";
import logoutIcon from "../../images/logout-icon.svg";
import sideBarIndicatorActive from "../../images/sidebar-indicator-active.svg";

import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import "./index.less";
import { ROUTES } from "../../constants/routes";
import { useHistory, useLocation } from "react-router";
import classNames from "classnames";

const AppSideBar = ({ onSidebartoggle }: any) => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(isMobile);

  const history = useHistory();
  const location = useLocation();

  const isActiveRouteClass = (key: string) => {
    return classNames({
      activeRoute: location.pathname == key,
    });
  };
  return (
    <ClickOutside
      onClickOutside={() => {
        setSideBarCollapsed(false);
      }}
      id="app-side-bar"
    >
      <SideNav
        expanded={!sideBarCollapsed}
        onToggle={(expanded: boolean) => {
          setSideBarCollapsed(expanded);
          console.log(expanded);

          if (onSidebartoggle) {
            onSidebartoggle(expanded);
          }
        }}
        onSelect={(selected: any) => {
          if (location.pathname !== selected) {
            history.push(selected);
          }
        }}
        className="side-nav"
      >
        <div className="logo-container">
          {!sideBarCollapsed && (
            <>
              <img src={appLogo} />
              <h1 className="title">Clarity</h1>
            </>
          )}
          <SideNav.Toggle
            onClick={() => {
              setSideBarCollapsed(!sideBarCollapsed);
              if (onSidebartoggle) {
                onSidebartoggle(!sideBarCollapsed);
              }
            }}
            className="toggle-button"
          />
        </div>

        <SideNav.Nav defaultSelected={`${ROUTES.healthData}`}>
          <NavItem
            navitemClassName={`nav-item ${isActiveRouteClass(
              ROUTES.healthData
            )}`}
            eventKey={`${ROUTES.healthData}`}
          >
            <NavIcon>
              <img src={healthDataIcon} />
            </NavIcon>
            <NavText>
              <span className="nav-text">MyHealthData</span>
            </NavText>
            <img src={sideBarIndicatorActive} className="active-indicator" />
          </NavItem>
          <NavItem
            navitemClassName={`nav-item ${isActiveRouteClass(ROUTES.profile)}`}
            eventKey={`${ROUTES.profile}`}
          >
            <NavIcon>
              <img src={sidearProfileIcon} />
            </NavIcon>
            <NavText>
              <span className="nav-text">Profile</span>
            </NavText>
            <img src={sideBarIndicatorActive} className="active-indicator" />
          </NavItem>
          <NavItem
            navitemClassName={`nav-item ${isActiveRouteClass(
              ROUTES.connections
            )}`}
            eventKey={`${ROUTES.connections}`}
          >
            <NavIcon>
              <img src={sideBarConnections} />
            </NavIcon>
            <NavText>
              <span className="nav-text">Connections</span>
            </NavText>
            <img src={sideBarIndicatorActive} className="active-indicator" />
          </NavItem>
          <NavItem
            navitemClassName={`nav-item ${isActiveRouteClass(ROUTES.settings)}`}
            eventKey={`${ROUTES.settings}`}
          >
            <NavIcon>
              <img src={sideBarSettingsIcon} />
            </NavIcon>
            <NavText>
              <span className="nav-text">Settings</span>
            </NavText>
            <img src={sideBarIndicatorActive} className="active-indicator" />
          </NavItem>

          <div className="bottom-container">
            {!sideBarCollapsed && (
              <div className="nav-item-power">
                <h5 className="power-text">Powered By</h5>
                <img src={onyxLogo} />
              </div>
            )}

            <div
              className="logout-container"
              onClick={() => {
                history.push(ROUTES.loginPage);
              }}
            >
              {!sideBarCollapsed && <span>Log Out</span>}
              <img src={logoutIcon} />
            </div>
          </div>
        </SideNav.Nav>
      </SideNav>
    </ClickOutside>
  );
};

export default AppSideBar;
