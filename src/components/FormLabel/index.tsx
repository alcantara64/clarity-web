import "./index.less";

import * as React from "react";
import { Form } from "react-bootstrap";

const FormLabel = ({ label, children, ...rest }: any) => (
  <Form.Label className="app-form-label" {...rest}>
    {label || children}
  </Form.Label>
);

export default FormLabel;
