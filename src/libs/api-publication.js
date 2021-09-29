import { API, graphqlOperation } from "aws-amplify";
import * as queries from "@Graphql/queries";

export const publishPost = (action, teamId, createdAt, userEmail) =>
  API.graphql(
    graphqlOperation(queries.postSchedulerLetra, {
      action,
      teamId,
      createdAt,
      userEmail,
    })
  ).then(({ data: { postSchedulerLetra } }) => JSON.parse(postSchedulerLetra));
