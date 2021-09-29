import { API, graphqlOperation } from "aws-amplify";
import * as queries from "@Graphql/queries";

export const getNewsFromNewsApi = (params) =>
  API.graphql(
    graphqlOperation(queries.newsapiSearch, {
      params: JSON.stringify(params),
    })
  ).then(({ data: { newsapiSearch } }) => JSON.parse(newsapiSearch));
