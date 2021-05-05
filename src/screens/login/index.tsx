import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";

import appLogo from "../../images/app-logo.svg";

import FormLabel from "../../components/FormLabel";
import FormInput from "../../components/FormInput";
import FormPasswordInput from "../../components/FormPasswordInput";
import Button from "../../components/Button";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./index.less";
import { useStores } from "../../models";
import Loading from "../../components/Loading";

interface IFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const location = useLocation();

  const history = useHistory();

  const { authStore, userStore } = useStores();

  const [isLoading, setIsLoading] = useState(false);

  const loginFormSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(loginFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: IFormInputs) => {
    setIsLoading(true);

    const payload = {
      email: data.email,
      password: data.password,
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
      {isLoading && <Loading />}
      <div className="login-container">
        <div className="logo-container">
          <img src={appLogo} />

          <h1 className="header">Clarity</h1>
        </div>

        <div className="login-form-container">
          <h4 className="title">Login to Clarity</h4>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="form-group" controlId="formBasicEmail">
              <FormLabel>Email address</FormLabel>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { ref, ...rest }, fieldState }) => (
                  <FormInput
                    type="email"
                    placeholder="Enter email"
                    {...rest}
                    {...fieldState}
                  />
                )}
              />
              <span className="error-text">{errors.email?.message}</span>
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicPassword">
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
              <span className="error-text">{errors.password?.message}</span>
            </Form.Group>

            <Button label="Login" variant="primary" type="submit" />

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
