import {
  API,
  graphqlOperation
} from "aws-amplify";
import * as queries from "@Graphql/queries";
import axios from 'axios';

const endpoint = `https://letra-scrape-article-details.herokuapp.com/scrape/search?`;

export const getGpt3Text = (text) =>
  API.graphql(
    graphqlOperation(queries.getGpt3Text, {
      text,
    })
  ).then(({
    data: {
      getGPT3Text
    }
  }) => JSON.parse(getGPT3Text));


export const scrapeArticlePage = async (url, source) => {
  try {
    const fullUrl = `${endpoint}url=${url}&source=${source}`
    const response = await axios(fullUrl);

    return {
      isError: false,
      result: response.data
    }
  } catch (error) {
    return {
      isError: true,
      result: error
    }
  }
};
