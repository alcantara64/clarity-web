import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";

import appLogo from "../../images/app-logo.svg";

import FormLabel from "../../components/FormLabel";
import FormInput from "../../components/FormInput";
import FormPasswordInput from "../../components/FormPasswordInput";
import Button from "../../components/Button";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import "./index.less";
import { useStores } from "../../models";

const Login = () => {
  const location = useLocation();

  const history = useHistory();

  const { authStore, userStore } = useStores();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const submit = async () => {
    setIsLoading(true);

    const payload = {
      email,
      password,
      device_type: "android", // temp solution
      device_id: "web", // temp solution
    };

    const resp = await authStore.userLogin(payload).catch((ex) => {});
    setIsLoading(false);
    if (resp.kind == "ok") {
      userStore.fetchProfile().catch((ex) => {});
      history.push(ROUTES.oauth);
    }
  };

  return (
    <div
      id="login-page"
      className=" d-flex align-items-center justify-content-center"
    >
      <div className="login-container">
        <div className="logo-container">
          <img src={appLogo} />

          <h1 className="header">Clarity</h1>
        </div>

        <div className="login-form-container">
          <h4 className="title">
            Login to Clarity {isLoading && <Spinner animation="grow" />}
          </h4>
          <Form onSubmit={() => submit()}>
            <Form.Group className="form-group" controlId="formBasicEmail">
              <FormLabel>Email address</FormLabel>
              <FormInput
                type="email"
                placeholder="Enter email"
                onChange={onEmailChange}
              />
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicPassword">
              <FormLabel>Password</FormLabel>
              <FormPasswordInput
                type="password"
                placeholder="Password"
                onChange={onPasswordChange}
              />
            </Form.Group>

            <Button
              label="Login"
              variant="primary"
              type="submit"
              onClick={() => submit()}
            />

            <div className="footer">
              Don’t have an account?{" "}
              <Link className="link" to={`${ROUTES.signUpPage}`}>
                Create an Account
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
