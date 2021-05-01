import "./index.less";
import * as React from "react";
import { Button, Form } from "react-bootstrap";

const FormPasswordInput = ({
  onChange = (e) => {},
  type = "",
  children = null,
  className = "",
  ...rest
}) => (
  <div className="app-password-form-input">
    <Form.Control
      className={`form-input-control ${className}`}
      type={type}
      onChange={onChange}
      {...rest}
    >
      {children}
    </Form.Control>
    <Button className="control-label">Show</Button>
  </div>
);

export default FormPasswordInput;
