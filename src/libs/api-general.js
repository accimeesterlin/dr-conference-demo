import { API, graphqlOperation } from "aws-amplify";

export const getData = (...args) => API.graphql(graphqlOperation(...args));
