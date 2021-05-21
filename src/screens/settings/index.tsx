import classNames from "classnames";
import React, { useState } from "react";
import { Row, Col, Accordion, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { BrowserView, MobileView } from "react-device-detect";

import Iframe from "react-iframe";

import appLogo from "../../images/app-logo.svg";
import onyxLogo from "../../images/Onyx.svg";

import "./index.less";

const SettingsPage = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const OptionItem = ({ name, selected, onClick }: any) => {
    const optionItemClass = classNames({
      optionItemSelected: selected,
    });
    return (
      <div className={`option-item  ${optionItemClass}`} onClick={onClick}>
        <span className="title">{name}</span>
        <div className="icon-container">
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    );
  };

  const AboutUs = () => {
    const APP_NAMe = process.env.REACT_APP_NAME;
    return (
      <div className="about-us-container ">
        <h2 className="header-title">About {APP_NAMe}</h2>

        <div className="logo-container">
          <img src={appLogo} />
          <span className="title">{APP_NAMe}</span>
        </div>

        <div className="description-container">
          {APP_NAMe} is a standards-based, consumer-controlled health data
          convergence hub that seamlessly and securely connects patient,
          provider, and payer. Consumers empowered with the {APP_NAMe} app for
          smartphones can access and share all their most complete, up-to-date
          healthcare records with their doctors and trusted partners. Building
          on the rights of consumers to access and aggregate their healthcare
          data, all the stakeholders in the healthcare system can realize the
          promise of value-based payment: Better health outcomes provided at a
          lower cost.{" "}
          <a
            href="https://www.onyxhealth.io/clarity/"
            target="_blank"
            className="visit-link"
          >
            Visit {APP_NAMe} website
          </a>
        </div>

        <div className="brand-container">
          <h5 className="power-text">Powered By</h5>
          <img src={onyxLogo} />
        </div>
      </div>
    );
  };

  const Privacy = () => {
    return (
      <div
        className="privacy-container"
        style={{ height: window.outerHeight - 250 }}
      >
        <Iframe
          url="https://mycareapi-test.mycareai.com/api/v1/privacy_policy"
          width="100%"
          height="100%"
          // display="initial"
          position="relative"
        />
      </div>
    );
  };

  const getSelectedClass = (selected = false) => {
    const optionItemClass = classNames({
      optionItemSelected: selected,
    });

    return optionItemClass;
  };
  const APP_NAMe = process.env.REACT_APP_NAME;
  return (
    <div id="settings-page">
      <BrowserView>
        <Row className="settings-content">
          <Col md={4}>
            <OptionItem
              name={"About" + APP_NAMe}
              selected={selectedItem == 0}
              onClick={() => {
                setSelectedItem(0);
              }}
            />
            <OptionItem
              name="Privacy policy & Terms of service"
              selected={selectedItem == 1}
              onClick={() => {
                setSelectedItem(1);
              }}
            />
          </Col>
          <Col md={8}>
            {selectedItem == 0 && <AboutUs />}
            {selectedItem == 1 && <Privacy />}
          </Col>
        </Row>
      </BrowserView>

      <MobileView>
        <Accordion defaultActiveKey="0" className="settings-accordion">
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="0"
              onClick={() => {
                setSelectedItem(0);
              }}
            >
              <div
                className={`toggle-header ${getSelectedClass(
                  selectedItem == 0
                )}`}
              >
                <span className="title">About Clarity</span>
                <div className="icon-container">
                  {(selectedItem == 0 && (
                    <FontAwesomeIcon icon={faAngleDown} className="icon-down" />
                  )) || (
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="icon-right"
                    />
                  )}
                </div>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <AboutUs />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="1"
              onClick={() => {
                setSelectedItem(1);
              }}
            >
              <div
                className={`toggle-header ${getSelectedClass(
                  selectedItem == 1
                )}`}
              >
                <span className="title">Privacy policy & Terms of service</span>
                <div className="icon-container">
                  {(selectedItem == 1 && (
                    <FontAwesomeIcon icon={faAngleDown} className="icon-down" />
                  )) || (
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="icon-right"
                    />
                  )}
                </div>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Privacy />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </MobileView>
    </div>
  );
};

export default SettingsPage;
