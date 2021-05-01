import React, { useState } from "react";
import { Form } from "react-bootstrap";

import appLogo from "../../images/app-logo.svg";

import FormLabel from "../../components/FormLabel";
import FormInput from "../../components/FormInput";
import FormPasswordInput from "../../components/FormPasswordInput";
import Button from "../../components/Button";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import "./index.less";

const Login = () => {
  const location = useLocation();

  const history = useHistory();

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
          <h4 className="title">Login to Clarity</h4>
          <Form>
            <Form.Group className="form-group" controlId="formBasicEmail">
              <FormLabel>Email address</FormLabel>
              <FormInput type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicPassword">
              <FormLabel>Password</FormLabel>
              <FormPasswordInput type="password" placeholder="Password" />
            </Form.Group>

            <Button
              label="Login"
              variant="primary"
              type="submit"
              onClick={() => {
                history.push(ROUTES.dashboard);
              }}
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
