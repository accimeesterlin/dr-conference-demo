// import useSWR from "swr";
import { API, graphqlOperation, Auth } from "aws-amplify";
import * as queries from "@Graphql/queries";
import * as mutations from "@Graphql/mutations";
import useSWR from "swr";
import { createNewTeamV2 } from "./api-team";

export const getUserProfile = (email) =>
  API.graphql(graphqlOperation(queries.getUser, { id: email })).then(
    ({ data: { getUser } }) => getUser
  );

export const createUserProfile = (values) =>
  API.graphql(graphqlOperation(mutations.createUser, { input: values })).then(
    ({ data: { createUser } }) => createUser
  );

export const updateUserProfile = (values) =>
  API.graphql(
    graphqlOperation(mutations.updateUser, {
      input: values,
    })
  ).then(({ data: { updateUser } }) => updateUser);

export const getUserSub = (email) =>
  API.graphql(graphqlOperation(queries.userSubIdentity, { email })).then(
    ({ data: { userSubIdentity } }) => userSubIdentity
  );

export async function getActiveTeamId() {
  let user = null;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (error) {
    console.error("We could not retrieve user");
    return;
  }

  const {
    username,
    attributes: { email },
  } = user;

  let profile = await getUserProfile(email);
  if (!profile) {
    try {
      profile = await createUserProfile({
        id: email,
        email,
        owner: username,
      });
    } catch (error) {
      console.error("we could not create a profile");
      console.error(error);
      return;
    }
  }

  const { workingTeam } = profile;
  if (workingTeam) {
    return workingTeam;
  }

  let teamId = "";

  try {
    const team = await createNewTeamV2("Demo Team", "demo-team", email);
    teamId = team.id;
  } catch (error) {
    console.error("we could not create the demo team");
    console.error(error);
    return;
  }

  try {
    await updateUserProfile({
      id: email,
      workingTeam: teamId,
    });
    return teamId;
  } catch (error) {
    console.error(" we could not update the user profile");
    console.error(error);
  }

  return "";
}

export async function useActiveTeamId() {
  const { data } = useSWR("workingTeam", getActiveTeamId, {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });
  return data;
}

export async function markAsActiveTeam(teamId) {
  let user = null;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (error) {
    console.error("We could not retrieve user");
    return;
  }

  const {
    attributes: { email },
  } = user;

  try {
    await updateUserProfile({
      id: email,
      workingTeam: teamId,
    });
    return teamId;
  } catch (error) {
    console.error(" we could not update the user profile");
    console.error(error);
  }
  return "";
}
