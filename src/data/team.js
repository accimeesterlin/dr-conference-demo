import { API, graphqlOperation } from "aws-amplify";
import useSWR from "swr";
import { getTeamById } from "@Libs/api-team";

export const useTeam = (id) => {
  const { data, mutate, error } = useSWR(
    id ? `${getTeamById}/${id}` : null,
    async () => getTeamById(id),
    { initialData: {} }
  );

  const loading = !data && !error;

  return {
    loading,
    data,
    mutate,
    error,
  };
};

// TODO move posting complety to the back-end for security purpose
const query = /* GraphQL */ `
  query GetTeam($id: ID!) {
    teamInfo: getTeam(id: $id) {
      id
      name
      editors
      owner
      channels
    }
  }
`;

export const useSharedTeamInfo = (id) => {
  const { data, mutate, error } = useSWR(
    id ? `useSharedTeamInfo/${id}` : null,
    () =>
      API.graphql(graphqlOperation(query, { id })).then(
        ({ data: { teamInfo } }) => ({
          id: teamInfo.id,
          name: teamInfo.name,
          editors: teamInfo.editors,
          owner: teamInfo.owner,
          channels: teamInfo.channels
            ? teamInfo.channels.map((el) => JSON.parse(el))
            : [],
        })
      )
  );

  return {
    loading: !data && !error,
    data,
    mutate,
    error,
  };
};
