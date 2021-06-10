import React from "react";
import SecondaryButton from "../SecondaryButton";
import FormInput from "../FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./index.less";
import { Controller, useForm } from "react-hook-form";
import { Form, FormLabel } from "react-bootstrap";
import Button from "../Button";

interface IFormInputs {
  pin: string;
}

const forgotPasswordFormStep2Schema = yup.object().shape({
  pin: yup.string().required(),
});

const ForgotPasswordStep2 = ({
  forgotPasswordSubmit = (data: any) => {},
  onBackPress = () => {},
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    resolver: yupResolver(forgotPasswordFormStep2Schema),
    mode: "onChange",
  });

  return (
    <div id="forgot-password-form-step2-container">
      <SecondaryButton
        onClick={onBackPress}
        label="Back"
        className="back-button"
      />

      <p className="instructions">Enter Pin</p>

      <p className="step-label">Step 2 of 3</p>

      <Form onSubmit={handleSubmit(forgotPasswordSubmit)}>
        <Form.Group className="form-group" controlId="formBasicEmail">
          <FormLabel>Pin</FormLabel>
          <Controller
            name="pin"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...rest }, fieldState }) => (
              <FormInput
                type="text"
                placeholder="Enter 5 digit pin sent to you"
                {...rest}
                {...fieldState}
              />
            )}
          />
          <span className="error-text">{errors.pin?.message}</span>
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

export default ForgotPasswordStep2;
