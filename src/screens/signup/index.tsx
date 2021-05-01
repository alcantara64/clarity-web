import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import FormLabel from "../../components/FormLabel";
import FormPasswordInput from "../../components/FormPasswordInput";
import { ROUTES } from "../../constants/routes";

import appLogo from "../../images/app-logo.svg";

import "./index.less";

const SignUpPage = () => {
  return (
    <div id="signup-page">
      <div className="signup-container">
        <div className="signup-logo-container">
          <img src={appLogo} />

          <h1 className="header">Clarity</h1>
        </div>

        <div className="signup-form-container">
          <h4 className="title"> Create your account</h4>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group
                  className="form-group"
                  controlId="formBasicFirstname"
                >
                  <FormLabel>First Name</FormLabel>
                  <FormInput type="text" placeholder="Your first name" />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group
                  className="form-group"
                  controlId="formBasicLastname"
                >
                  <FormLabel>Last Name</FormLabel>
                  <FormInput type="text" placeholder="Your last name" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="form-group" controlId="formBasicEmail">
                  <FormLabel>Email</FormLabel>
                  <FormInput type="email" placeholder="Your email" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group
                  className="form-group"
                  controlId="formBasicPassword"
                >
                  <FormLabel>Password</FormLabel>
                  <FormPasswordInput type="password" placeholder="Password" />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group
                  className="form-group"
                  controlId="formBasicConfirmPassword"
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <FormPasswordInput
                    type="password"
                    placeholder="Confirm password"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="footer">
              <Form.Group
                className="terms-container"
                controlId="formBasicTerms"
              >
                <Form.Check
                  type="checkbox"
                  label={
                    <span className="terms">
                      I have read and agreed to the{" "}
                      <Link className="privacy" to={`${ROUTES.signUpPage}`}>
                        Terms & Privacy Policy
                      </Link>
                    </span>
                  }
                />
              </Form.Group>
              <Button
                label="Create Account"
                variant="primary"
                type="submit"
                className="create-account-button"
                disabled={true}
              />
              <div className="have-account">
                Already have an account?{" "}
                <Link className="link" to={`${ROUTES.loginPage}`}>
                  Sign In to your Account
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
