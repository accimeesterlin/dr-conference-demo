import { API, graphqlOperation } from "aws-amplify";
import * as queries from "@Graphql/queries";

export const publishPost = (action, teamId, createdAt, userEmail) =>
  API.graphql(
    graphqlOperation(queries.postSchedulerDR Conference, {
      action,
      teamId,
      createdAt,
      userEmail,
    })
  ).then(({ data: { postSchedulerDR Conference } }) => JSON.parse(postSchedulerDR Conference));
