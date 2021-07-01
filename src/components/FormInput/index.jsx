import "./index.less";
import { Form } from "react-bootstrap";

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
