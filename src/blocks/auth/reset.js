import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useToasts } from "react-toast-notifications";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorMessageView } from "./auth";

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

const SendCode = ({ updateView, setEmail }) => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      code: "",
      password: "",
      passwordConf: "",
    },
  });
  const { addToast } = useToasts();

  const onSubmit = async (values) => {
    Auth.forgotPassword(values.email)
      .then(() => {
        setEmail(values.email);
      })
      .catch((err) => {
        console.error(err);
        addToast("Could not send code", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const { isSubmitting } = formState;

  return (
    <Container>
      <Login>
        <Title className="h1">DR Conference </Title>
        <Text>Reset your password</Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Enter your email"
            {...register("email", { required: true })}
            required
            readOnly={isSubmitting}
            size="lg"
          />

          <Link
            onClick={() => {
              updateView("signin");
            }}
            text="Back to Sign In"
          />

          <Button disabled={isSubmitting} text="Send code" />
        </Form>
      </Login>
    </Container>
  );
};

const ResetPassword = ({ updateView, email }) => {
  const { register, handleSubmit, getValues, formState } = useForm();
  const { addToast } = useToasts();

  const { errors, isSubmitting } = formState;

  const onSubmit = async (values) => {
    const { code, password } = values;

    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      addToast("Password was changed", {
        appearance: "success",
        autoDismiss: true,
      });
      updateView("signin");
    } catch (error) {
      console.error(error);
      addToast("Could not change password. Try again", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <Container>
      <Login>
        <Title />
        <Text>Reset your password</Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="h4 mb-3 mb-lg-4">Reset your password</h3>

          <Input
            placeholder="Enter code"
            {...register("code", { required: true })}
            required
            readOnly={isSubmitting}
            size="lg"
          />

          <Input
            placeholder="Enter password"
            {...register("password", { required: true })}
            required
            type="password"
            readOnly={isSubmitting}
            size="lg"
          />

          <Input
            placeholder="Re-enter password"
            {...register("passwordConf", {
              required: "Field is required",
              validate: (value) => {
                const values = getValues();
                return values.password === value || "Passwords don't match";
              },
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

          <Link
            onClick={() => {
              updateView("signin");
            }}
            text="Back to Sign In"
          />

          <Button readOnly={isSubmitting} text="Submit" />
        </Form>
      </Login>
    </Container>
  );
};

export const Reset = ({ updateView }) => {
  const [email, setEmail] = useState("");

  if (email) {
    return <ResetPassword updateView={updateView} email={email} />;
  }

  return <SendCode updateView={updateView} setEmail={setEmail} />;
};
