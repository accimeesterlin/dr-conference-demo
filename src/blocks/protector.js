import { useEffect } from "react";
import { Hub } from "aws-amplify";
import { useCognitoUser } from "@Data/user";

export const Protector = ({ children }) => {
  const { mutate, error, loading } = useCognitoUser();

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event } }) => {
      switch (event) {
        case "signOut":
          if (typeof window !== "undefined") {
            window.location = "/";
          }
          mutate(null);

          break;
        case "signIn_failure":
          if (typeof window !== "undefined") {
            window.location = "/";
          }
          mutate(null);
          break;
        default:
          break;
      }
    });
  }, []);

  if (loading) {
    return null;
  }

  if (error) {
    if (typeof window !== "undefined") {
      window.location = "/";
    }
    return null;
  }

  return children;
};
