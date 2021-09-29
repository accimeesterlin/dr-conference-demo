import useSWR from "swr";
import { Auth } from "aws-amplify";
import { getUserProfile } from "@Libs/api-user";

export const useCognitoUser = () => {
  const { data, mutate, error } = useSWR("cognitoUser", async () => {
    try {
      const r1 = await Auth.currentAuthenticatedUser({
        bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      });
      const r2 = await Auth.currentCredentials();
      if (!r1) {
        if (typeof window !== "undefined") {
          window.location = "/";
        }
        return {
          data: null,
          loading: false,
          error: new Error("No user"),
          mutate,
        };
      }

      return {
        ...r1,
        identityId: r2?.identityId,
      };
    } catch (err) {
      if (typeof window !== "undefined") {
        window.location = "/";
      }
      return {
        data: null,
        loading: false,
        error: new Error("No user"),
        mutate,
      };
    }
  });

  return {
    data,
    mutate,
    error,
    loading: !data && !error,
  };
};

export const useUserProfile = () => {
  const { data: user } = useCognitoUser();
  const { data, mutate, error } = useSWR(
    () => `USER_PROFILE_${user?.attributes?.email}`,
    () => getUserProfile(user?.attributes?.email)
  );

  return {
    data,
    mutate,
    error,
    loading: data === undefined && !error,
    email: user?.attributes?.email,
  };
};

// import { getTeamById } from "@Libs/api-team";

// export const useTeam = (id) => {
//   const { data, mutate, error } = useSWR(
//     id ? `${getTeamById}/${id}` : null,
//     () => getTeamById(id),
//     { initialData: {} }
//   );

//   const loading = !data && !error;

//   return {
//     loading,
//     data,
//     mutate,
//     error,
//   };
// };
