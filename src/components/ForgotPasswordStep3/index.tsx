import React from "react";
import SecondaryButton from "../SecondaryButton";
import FormInput from "../FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./index.less";
import { Controller, useForm } from "react-hook-form";
import { Form, FormLabel } from "react-bootstrap";
import Button from "../Button";
import FormPasswordInput from "../FormPasswordInput";

interface IFormInputs {
  password: string;
  confirmPassword: string;
}

const forgotPasswordFormStep3Schema = yup.object().shape({
  password: yup
    .string()
    .required()
    .matches(
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,40})/,
      "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ForgotPasswordStep3 = ({
  forgotPasswordSubmit = (data: any) => {},
  onBackPress = () => {},
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    resolver: yupResolver(forgotPasswordFormStep3Schema),
    mode: "onChange",
  });

  return (
    <div id="forgot-password-form-step2-container">
      <SecondaryButton
        onClick={onBackPress}
        label="Back"
        className="back-button"
      />

      <p className="instructions">Reset Password</p>

      <p className="step-label">Step 3 of 3</p>

      <Form onSubmit={handleSubmit(forgotPasswordSubmit)}>
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

        <Form.Group className="form-group" controlId="formBasicConfirmPassword">
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
          <span className="error-text">{errors.confirmPassword?.message}</span>
        </Form.Group>

        <Button
          label="Next"
          variant="primary"
          type="submit"
          disabled={!isValid}
        />
      </Form>
    </div>
  );
};

export default ForgotPasswordStep3;
