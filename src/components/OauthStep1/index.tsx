import * as React from "react";

import oauthStep1 from "../../images/oauthStep1.png";
import todoHand from "../../images/todo-hand.png";
import connectIcon from "../../images/connectIcon.svg";

import Button from "../Button";

import "./index.less";

const OauthStep1 = ({ onConnect = () => {} }) => {
  return (
    <div id="oauth-step-1">
      <img src={oauthStep1} alt="oauth step1" className="logo" />
      <p className="glad-text">We’re glad you’re here,</p>

      <div>
        <img src={todoHand} alt="logo-hand" className="logo-hand" />{" "}
        <span className="todo-details">
          I would like to get data from my health plan
        </span>
      </div>

      <Button
        label="Connect"
        className="connect-button"
        Icon={<img src={connectIcon} alt="connect icon" />}
        onClick={(event: any) => {
          event.stopPropagation();
          onConnect();
        }}
      />
    </div>
  );
};

export default OauthStep1;
