import "./index.less";
import * as React from "react";
import { Button, Form } from "react-bootstrap";

const FormPasswordInput = ({
  onChange = (e) => {},
  type = "",
  children = null,
  className = "",
  ...rest
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="app-password-form-input">
      <Form.Control
        className={`form-input-control ${className}`}
        type={showPassword ? "text" : "password"}
        onChange={onChange}
        {...rest}
      >
        {children}
      </Form.Control>
      <Button
        className="control-label"
        onClick={() => {
          setShowPassword(!showPassword);
        }}
      >
        Show
      </Button>
    </div>
  );
};

export default FormPasswordInput;
