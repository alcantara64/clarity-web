import "./index.less";
import * as React from "react";
import { Form } from "react-bootstrap";
import classNames from "classnames";

const FormInput = ({
  onChange = (e) => {},
  type = "",
  children = null,

  className = "",
  ...rest
}) => {
  return (
    <Form.Control
      className={`app-form-input ${className}`}
      type={type}
      onChange={onChange}
      {...rest}
    >
      {children}
    </Form.Control>
  );
};

export default FormInput;
