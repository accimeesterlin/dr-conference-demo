import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@Graphql/mutations";
import * as queries from "@Graphql/queries";

export const sendInvitation = (values) =>
  API.graphql(
    graphqlOperation(mutations.createTeamInvitation, { input: values })
  ).then(({ data: { createTeamInvitation } }) => createTeamInvitation);

export const cancelInvitation = (id) =>
  API.graphql(
    graphqlOperation(mutations.deleteTeamInvitation, { input: { id } })
  );

export const listInvitationByTeamId = (teamId, nextToken) => {
  const input = {
    filter: {
      teamId: {
        eq: teamId,
      },
    },
    nextToken: nextToken || null,
  };

  return API.graphql(graphqlOperation(queries.listTeamInvitations, input)).then(
    ({ data: { listTeamInvitations } }) => listTeamInvitations
  );
};

export const listInvitationByInvitee = (invitee, nextToken) => {
  const input = {
    filter: {
      invitee: {
        eq: invitee,
      },
    },
    nextToken: nextToken || null,
  };

  return API.graphql(graphqlOperation(queries.listTeamInvitations, input)).then(
    ({ data: { listTeamInvitations } }) => listTeamInvitations
  );
};

export const acceptInvitation = (invitationId) =>
  API.graphql(
    graphqlOperation(queries.manageInvitation, {
      action: "accept",
      invitationId,
    })
  ).then(({ data: { manageInvitation } }) => manageInvitation);

export const rejectInvitation = (invitationId) =>
  API.graphql(
    graphqlOperation(queries.manageInvitation, {
      action: "reject",
      invitationId,
    })
  ).then(({ data: { manageInvitation } }) => manageInvitation);
