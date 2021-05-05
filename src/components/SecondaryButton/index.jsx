import * as React from "react";

import { Button as BSButton } from "react-bootstrap";
import classNames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./index.less";

const SecondaryButton = ({
  label,
  Icon = null,
  type = null,
  className = "",
  onClick = () => {},
  disabled = false,
  children = null,

  ...rest
}) => {
  const buttonClass = classNames({
    "button-disabled": disabled,
  });
  return (
    <BSButton
      className={`secondary-button  ${buttonClass} ${className}`}
      onClick={onClick}
      {...rest}
    >
      <FontAwesomeIcon icon={faChevronLeft} className="icon" />
      {children || label}
    </BSButton>
  );
};

export default SecondaryButton;
