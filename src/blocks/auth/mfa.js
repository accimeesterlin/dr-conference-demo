import { useState } from "react";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { getActiveTeamId } from "@Libs/api-user";

import {
  Container,
  Login,
  Title,
  Input,
  Button,
  Text,
  Form,
} from "./authStyles";

export const SetupMFA = ({ currentPhone }) => {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit } = useForm();
  const { addToast } = useToasts();

  const sendCode = () =>
    Auth.verifyCurrentUserAttribute("phone_number")
      .then(() => {
        console.log("a verification code is sent");
        addToast("A verification code is sent", {
          appearance: "success",
          autoDismiss: true,
        });
        setSent(true);
      })
      .catch((e) => {
        console.log("failed with error", e);
        addToast("Sending the code failed", {
          appearance: "success",
          autoDismiss: true,
        });
      });

  const goToDefault = async () => {
    const workingTeam = await getActiveTeamId();
    window.location = `/search/${workingTeam}`;
  };

  const onSubmit = async (values) => {
    const { code } = values;

    if (sent) {
      return Auth.verifyCurrentUserAttributeSubmit("phone_number", code)
        .then(() => Auth.currentAuthenticatedUser())
        .then((user) => Auth.setPreferredMFA(user, "SMS"))
        .then(() => {
          goToDefault();
          console.log("phone_number verified");
          addToast("The phone number has been verified and MFA Activated", {
            appearance: "success",
            autoDismiss: true,
          });
        })
        .catch((e) => {
          console.log("failed with error", e);
          addToast("Error verification failed", {
            appearance: "error",
            autoDismiss: true,
          });
        });
    }
    return sendCode();
  };

  return (
    <Container>
      <Login>
        <Title className="h1 text-centhttps://github.com/Thecodrs/DR Conferenceai-webapp.giter ">
          DR Conference
        </Title>
        <Text>Setup MFA with phone</Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Enter your phone number"
            {...register("phone", { required: true })}
            required
            size="lg"
            type="tel"
            defaultValue={currentPhone}
          />
          {sent ? (
            <Input
              placeholder="Enter code"
              {...register("code", { required: true })}
              required
              size="lg"
              type="number"
            />
          ) : null}

          <Button
            variant="primary"
            type="submit"
            size="lg"
            className=""
            text={sent ? " Verify" : "Send code"}
          />

          <Button
            className="pl-0"
            variant="link"
            padding="10px"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              sendCode();
            }}
            text="Get a new code"
          />
        </Form>
      </Login>
    </Container>
  );
};
