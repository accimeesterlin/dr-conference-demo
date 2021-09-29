import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
// import * as queries from "@Graphql/queries";s
import * as mutations from "@Graphql/mutations";

const isNumber = (n) => !Number.isNaN(parseFloat(n)) && !Number.isNaN(n - 0);

export const createNewTeam = (values) =>
  API.graphql(graphqlOperation(mutations.createTeam, { input: values })).then(
    ({ data: { createTeam } }) => createTeam
  );

export const createNewTeamV2 = (name, slug, email) => {
  if (!name || !slug || !email) {
    throw new Error("We need name, slug and email");
  }

  let suffix = uuidv4().split("-")[1];
  while (isNumber(suffix)) {
    // eslint-disable-next-line
    suffix = uuidv4().split("-")[1];
  }

  return createNewTeam({
    name,
    id: `${slug}-${suffix}`,
    ownerEmail: email,
  });
};

export const updateTeamById = (values) =>
  API.graphql(graphqlOperation(mutations.updateTeam, { input: values })).then(
    ({ data: { updateTeam } }) => parseTeam(updateTeam)
  );

/**
 *
 */

const getTeamOnlyInfo = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      name
      publicationUrl
      newsapiKey
      createdAt
      updatedAt
      ownerEmail
    }
  }
`;

export const getTeamById = (id) =>
  API.graphql(graphqlOperation(getTeamOnlyInfo, { id })).then((result) => {
    const {
      data: { getTeam },
    } = result;

    return getTeam;
  });

const loadMyTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        editors
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;

export const getMyTeams = (nextToken, limit) => {
  const options = { nextToken: nextToken || null, limit: limit || null };

  return API.graphql(graphqlOperation(loadMyTeams, options)).then(
    ({ data: { listTeams } }) => listTeams
  );
};

export const getSharedTeamInfo = (id) => {
  const query = /* GraphQL */ `
    query GetTeam($id: ID!) {
      teamInfo: getTeam(id: $id) {
        id
        name
        editors
        editorsEmail
        owner
      }
    }
  `;

  return API.graphql(graphqlOperation(query, { id })).then(
    ({ data: { teamInfo } }) => teamInfo
  );
};

export const getChannelInfo = (id) => {
  const query = /* GraphQL */ `
    query GetTeam($id: ID!) {
      teamInfo: getTeam(id: $id) {
        channels
      }
    }
  `;

  return API.graphql(graphqlOperation(query, { id })).then(
    ({ data: { teamInfo } }) => ({
      channels: teamInfo.channels
        ? teamInfo.channels.map((el) => JSON.parse(el))
        : [],
    })
  );
};

export const getOwnerLevelTeamInfo = (id) => {
  const query = /* GraphQL */ `
    query GetTeam($id: ID!) {
      teamInfo: getTeam(id: $id) {
        publicationUrl
        newsapiKey
        channels
      }
    }
  `;

  return API.graphql(graphqlOperation(query, { id })).then(
    ({ data: { teamInfo } }) => ({
      publicationUrl: teamInfo.publicationUrl,
      newsapiKey: teamInfo.newsapiKey,
      channels: teamInfo.channels
        ? teamInfo.channels.map((el) => JSON.parse(el))
        : [],
    })
  );
};

export function parseTeam(team = {}) {
  const f = {
    ...team,
    channels: team.channels ? team.channels.map((el) => JSON.parse(el)) : [],
  };
  return f;
}
