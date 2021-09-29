import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { ErrorMessage } from "@hookform/error-message";
import { useToasts } from "react-toast-notifications";

import { formatPhone } from "@Utils/format";
import {
  Container,
  Login,
  Title,
  Input,
  Button,
  Text,
  Form,
  Link,
} from "./authStyles";
import { ErrorMessageView, Wrapper } from "./auth";

const Step1 = ({ updateView, setEmail }) => {
  const { register, handleSubmit, getValues, formState } = useForm();
  const { addToast } = useToasts();

  const { errors } = formState;

  const onSubmit = async (values) => {
    const { email, password, phone } = values;

    const username = email;

    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
          phone_number: formatPhone(phone), // optional - E.164 number convention
          // other custom attributes
        },
      });
      setEmail(email);
    } catch (error) {
      const { name } = error;
      if (name === "UsernameExistsException") {
        addToast("An account with that email already exist", {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }
      console.error("error signing up:", error);
      const message = error.message || "error signing up:";
      addToast(message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const { isSubmitting } = formState;

  return (
    <Container>
      <Login>
        <Title className="h1 text-centhttps://github.com/Thecodrs/DR Conferenceai-webapp.giter ">
          DR Conference
        </Title>
        <Text>Create a new account</Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Enter your email"
            {...register("email", { required: true })}
            required
            readOnly={isSubmitting}
            size="lg"
          />

          <Input
            placeholder="Password"
            {...register("password", { required: true })}
            required
            type="password"
            readOnly={isSubmitting}
            size="lg"
          />

          <Input
            placeholder="Password again"
            {...register("passwordConf", {
              required: "Field is required",
              validate: (value) =>
                getValues().password === value || "Passwords don't match",
            })}
            required
            type="password"
            readOnly={isSubmitting}
            size="lg"
          />
          <ErrorMessage
            errors={errors}
            name="passwordConf"
            render={ErrorMessageView}
          />

          <Input
            placeholder="Enter your phone number"
            {...register("phone", { required: true })}
            type="tel"
            required
            readOnly={isSubmitting}
            size="lg"
          />

          <p style={{ fontSize: 14 }}>
            Have an account?{" "}
            <Link
              onClick={() => {
                updateView("signin");
              }}
              text="Signin"
            />
          </p>

          <Button disabled={isSubmitting} text="Create account" />
        </Form>
      </Login>
    </Container>
  );
};

const Step2 = ({ updateView, email }) => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: { email },
  });
  const { addToast } = useToasts();

  const onSubmit = async (values) => {
    try {
      await Auth.confirmSignUp(email, values.code);
      addToast("Account email confirm", {
        appearance: "success",
        autoDismiss: true,
      });
      updateView("signin");
    } catch (error) {
      const { message } = error;
      if (message === "User cannot be confirmed. Current status is CONFIRMED") {
        addToast("Account email confirm", {
          appearance: "success",
          autoDismiss: true,
        });
        return;
      }

      addToast("Account email confirmation failed. Try with new code", {
        appearance: "error",
        autoDismiss: true,
      });
      console.error("error confirming sign up", error);
    }
  };

  const resendCode = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await Auth.resendSignUp(email);
      addToast("Code resent successfully", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (err) {
      addToast("Error resending code:", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const { isSubmitting } = formState;

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="h4 mb-3 mb-lg-4">Confirm Sign up</h3>
        <Input
          placeholder="Enter your email"
          {...register("email", { required: true })}
          required
          readOnly
          size="lg"
        />

        <Input
          placeholder="Enter code"
          {...register("code", { required: true })}
          required
          type="number"
          readOnly={isSubmitting}
          size="lg"
        />
        <p className="mb-2" style={{ fontSize: 14 }}>
          Lost your code?
          <Button text="Resend code" onClick={resendCode} />
        </p>

        <div className="d-flex flex-row justify-content-between align-items-center mt-3">
          <p style={{ fontSize: 14 }}>
            Have an account?
            <Link
              onClick={() => {
                updateView("signin");
              }}
              text="Back to Sign In"
            />
          </p>
          <Button disabled={isSubmitting} text="Confirm" />
        </div>
      </Form>
    </Wrapper>
  );
};

export const Register = ({ updateView }) => {
  const [email, setEmail] = useState("");

  if (email) {
    return <Step2 updateView={updateView} email={email} />;
  }

  return <Step1 updateView={updateView} setEmail={setEmail} />;
};
