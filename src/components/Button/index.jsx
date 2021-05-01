import "./index.less";
import * as React from "react";

import { Button as BSButton } from "react-bootstrap";
import classNames from "classnames";

const Button = ({
  label,
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
      className={`app-button ${buttonClass} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children || label}
    </BSButton>
  );
};

export default Button;
