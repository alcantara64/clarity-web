import React from "react";
import SecondaryButton from "../SecondaryButton";
import FormInput from "../FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./index.less";
import { Controller, useForm } from "react-hook-form";
import { Form, FormLabel } from "react-bootstrap";
import Button from "../Button";

interface IFormInputsStep1 {
  email: string;
}

const forgotPasswordFormStep1Schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ForgotPasswordStep1 = ({
  forgotPasswordSubmit = (data: any) => {},
  onBackPress = () => {},
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IFormInputsStep1>({
    resolver: yupResolver(forgotPasswordFormStep1Schema),
    mode: "onChange",
  });

  return (
    <div id="forgot-password-step1-form-container">
      <SecondaryButton
        onClick={onBackPress}
        label="Back"
        className="back-button"
      />

      <p className="instructions">Verify Email</p>

      <p className="step-label">Step 1 of 3</p>

      <p className="step-label-secondary ">
        A 5 digit code will be sent to this email to enable you change your
        password.
      </p>

      <Form onSubmit={handleSubmit(forgotPasswordSubmit)}>
        <Form.Group className="form-group" controlId="formBasicEmail">
          <FormLabel>Email</FormLabel>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...rest }, fieldState }) => (
              <FormInput
                type="text"
                placeholder="Your email"
                {...rest}
                {...fieldState}
              />
            )}
          />
          <span className="error-text">{errors.email?.message}</span>
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

export default ForgotPasswordStep1;
