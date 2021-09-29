import React, { useState, useRef } from "react";
// import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";
import { Heading, Text } from "@chakra-ui/react";
import { getActiveTeamId } from "@Libs/api-user";

import { formatPhone } from "@Utils/format";
import { SetupMFA } from "./mfa";
import {
  Container,
  Login,
  Title,
  Input,
  Form,
  Button,
  Link,
} from "./authStyles";

const Signin = ({ updateView, doMFA }) => {
  const userRef = useRef(null);
  const [hasCode, setHasCode] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { addToast } = useToasts();
  const router = useRouter();

  const codeVerification = async (values) => {
    const { code } = values;

    try {
      await Auth.confirmSignIn(
        userRef.current,
        code,
        userRef.current.challengeName
      );
      addToast("Welcome back.", {
        appearance: "success",
        autoDismiss: true,
      });
      const workingTeam = await getActiveTeamId();
      router.push(`/search/${workingTeam}`);
    } catch (error) {
      console.error("Failed", error);
      addToast("We could not signin, reload page and try again", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const onSubmit = async (values) => {
    const { email, password } = values;

    if (hasCode) {
      return codeVerification(values);
    }

    try {
      const user = await Auth.signIn(email, password);

      if (
        user.challengeName === "SMS_MFA" ||
        user.challengeName === "SOFTWARE_TOKEN_MFA"
      ) {
        userRef.current = user;
        setHasCode(true);
        return;
      }

      // NOTE Temporary override for emmanuel
      if (
        email === "emmanuelfleurine@gmail.com" ||
        email === "emmanuelrunner.inc@gmail.com" ||
        email === "lletra@mailpoof.com"
      ) {
        const workingTeam = await getActiveTeamId();
        router.push(`/search/${workingTeam}`);
        return;
      }

      if (user.preferredMFA === "NOMFA") {
        doMFA(user.attributes.phone_number);
        return;
      }

      addToast("Welcome back.", {
        appearance: "success",
        autoDismiss: true,
      });
      const workingTeam = await getActiveTeamId();

      router.push(`/search/${workingTeam}`);
    } catch (error) {
      console.error("error signing in", error);
      addToast("Error Signing in. Try again", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const { isSubmitting } = formState;

  return (
    <Container>
      <Login>
        <Title />
        <Heading as="h4" mb="6" fontWeight="normal" fontSize="17px">
          Login
        </Heading>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* <h3 className="h4 mb-3 mb-lg-4">Sign in to your account</h3> */}
          <Input
            placeholder="Email Address"
            type="text"
            {...register("email", { required: true })}
            required
            readOnly={isSubmitting || hasCode}
            size="lg"
          />

          {hasCode ? (
            <Input
              placeholder="Verification Code *"
              {...register("code", { required: true })}
              required
              type="number"
              readOnly={isSubmitting}
              size="lg"
            />
          ) : (
            <Input
              placeholder="Password"
              {...register("password", { required: true })}
              required
              type="password"
              readOnly={isSubmitting}
              size="lg"
            />
          )}

          <Button disabled={isSubmitting} text="Enter" />

          <Link
            onClick={() => {
              updateView("reset");
            }}
            text="I forgot my password."
          />

          {/* <Text mt="1" fontSize="14px">
            No account?{" "}
            <Link
              onClick={() => {
                updateView("register");
              }}
              text="Create account"
            />
          </Text> */}
        </Form>
        {/* <MFA /> */}
      </Login>
    </Container>
  );
};

export const SigninFlow = ({ updateView }) => {
  const [flow, setFlow] = useState("signin");
  const [phone, setPhone] = useState("");

  switch (flow) {
    case "signin":
      return (
        <Signin
          updateView={updateView}
          updateFlow={setFlow}
          doMFA={(v) => {
            setPhone(v);
            setFlow("setupMFA");
          }}
        />
      );
    case "setupMFA":
      return <SetupMFA currentPhone={formatPhone(phone)} />;
    default:
      throw new Error("Unknown state");
  }
};
