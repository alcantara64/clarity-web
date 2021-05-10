import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import FormLabel from "../../components/FormLabel";
import FormPasswordInput from "../../components/FormPasswordInput";
import { ROUTES } from "../../constants/routes";

import appLogo from "../../images/app-logo.svg";
import checkCircle from "../../images/check-circle.svg";

import "./index.less";
import { useStores } from "../../models";
import Loading from "../../components/Loading";

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: string;
}

const signUpFormSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  terms: yup
    .boolean()
    .oneOf(
      [true],
      "You must agree to the terms and policy in order to proceed"
    ),
});

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    resolver: yupResolver(signUpFormSchema),
    mode: "onChange",
  });

  const { userStore } = useStores();

  const [isLoading, setIsLoading] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const history = useHistory();

  const onSubmit = async (data: IFormInputs) => {
    setIsLoading(true);

    const payload = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      isLite: true,
      lastName: data.lastName,
      notification_token:
        "e0gPcEwU_MQ:APA91bF6ysYBupCqTkLgVjy1lDA77YxF-QEP24e4IzM6dsseIiXN7tnCygXeiKmfmV0UOOBz3cihm5-SY29791cZvbnaAcaikVulgf5X2z3BpPqrCU2mMpEgkeOHmt48HdlzY35IgPGc",
      device_type: "web", // temp solution
      device_id: "web", // temp solution
      regCode: "46677757",
      platform:'web',
    };

    const resp = await userStore.userSignUp(payload).catch((ex) => {});

    if (resp.kind == "ok") {
      await userStore.fetchProfile().catch(() => {});
      setShowSuccess(true);
    }

    setIsLoading(false);
  };

  const SuccessBanner = () => {
    return (
      <div className="success-banner">
        <div className="signup-logo-container">
          <img src={appLogo} />

          <h1 className="header">Clarity</h1>
        </div>
        <div className="success-banner-content">
          <img src={checkCircle} alt="success logo" className="logo" />
          <h5 className="message">Account Created Successfully!</h5>

          <Button
            label="Proceed to Dashboard"
            onClick={() => {
              history.push(ROUTES.oauth);
            }}
            className="proceed-button"
          />
        </div>
      </div>
    );
  };

  return (
    <div id="signup-page">
      {isLoading && <Loading />}

      {showSuccess ? (
        <SuccessBanner />
      ) : (
        <div className="signup-container">
          <div className="signup-logo-container">
            <img src={appLogo} />

            <h1 className="header">Clarity</h1>
          </div>

          <div className="signup-form-container">
            <h4 className="title"> Create your account</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md={6}>
                  <Form.Group
                    className="form-group"
                    controlId="formBasicFirstname"
                  >
                    <FormLabel>First Name</FormLabel>
                    <Controller
                      name="firstName"
                      control={control}
                      defaultValue=""
                      render={({ field: { ref, ...rest }, fieldState }) => (
                        <FormInput
                          type="text"
                          placeholder="Your first name"
                          {...rest}
                          {...fieldState}
                        />
                      )}
                    />
                    <span className="error-text">
                      {errors.firstName?.message}
                    </span>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group
                    className="form-group"
                    controlId="formBasicLastname"
                  >
                    <FormLabel>Last Name</FormLabel>
                    <Controller
                      name="lastName"
                      control={control}
                      defaultValue=""
                      render={({ field: { ref, ...rest }, fieldState }) => (
                        <FormInput
                          type="text"
                          placeholder="Your last name"
                          {...rest}
                          {...fieldState}
                        />
                      )}
                    />
                    <span className="error-text">
                      {errors.lastName?.message}
                    </span>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="form-group" controlId="formBasicEmail">
                    <FormLabel>Email</FormLabel>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field: { ref, ...rest }, fieldState }) => (
                        <FormInput
                          type="email"
                          placeholder="Your email"
                          {...rest}
                          {...fieldState}
                        />
                      )}
                    />
                    <span className="error-text">{errors.email?.message}</span>
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
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      render={({ field: { ref, ...rest }, fieldState }) => (
                        <FormPasswordInput
                          type="password"
                          placeholder="Password"
                          {...rest}
                          {...fieldState}
                        />
                      )}
                    />
                    <span className="error-text">
                      {errors.password?.message}
                    </span>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group
                    className="form-group"
                    controlId="formBasicConfirmPassword"
                  >
                    <FormLabel>Confirm Password</FormLabel>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      defaultValue=""
                      render={({ field: { ref, ...rest }, fieldState }) => (
                        <FormPasswordInput
                          type="password"
                          placeholder="Confirm Password"
                          {...rest}
                          {...fieldState}
                        />
                      )}
                    />
                    <span className="error-text">
                      {errors.confirmPassword?.message}
                    </span>
                  </Form.Group>
                </Col>
              </Row>
              <div className="footer">
                <Form.Group
                  className="terms-container"
                  controlId="formBasicTerms"
                >
                  <Controller
                    name="terms"
                    control={control}
                    defaultValue={""}
                    render={({ field: { ref, ...rest }, fieldState }) => (
                      <Form.Check
                        type="checkbox"
                        {...rest}
                        {...fieldState}
                        label={
                          <span className="terms">
                            I have read and agreed to the{" "}
                            <a
                              className="privacy"
                              href={`https://mycareapi-test.mycareai.com/api/v1/privacy_policy`}
                              target="_blank"
                            >
                              Terms & Privacy Policy
                            </a>
                          </span>
                        }
                      />
                    )}
                  />
                  <span className="error-text">{errors.terms?.message}</span>
                </Form.Group>
                <Button
                  label="Create Account"
                  variant="primary"
                  type="submit"
                  className="create-account-button"
                  disabled={!isValid}
                />
                <div className="have-account">
                  Already have an account?{" "}
                  <Link className="link" to={`${ROUTES.loginPage}`}>
                    Sign In to your Account
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
