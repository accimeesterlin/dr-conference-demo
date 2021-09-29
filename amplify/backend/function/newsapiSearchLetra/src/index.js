/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["newsapikey"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/

const axios = require("axios");
const aws = require("aws-sdk");

const ssmClient = new aws.SSM({ ssm: "2014-11-06" });

const endpoint = "https://newsapi.org/v2/everything?apiKey=";

exports.handler = async (event) => {
  const { Parameters } = await ssmClient
    .getParameters({
      Names: ["newsapikey"].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  const apiKey = Parameters[0].Value;

  const newsapiUrl = `${endpoint}${apiKey}&sortBy=publishedAt`;

  let params = event.arguments?.params || event.params;

  try {
    params = JSON.parse(params);
  } catch (error) {
    throw new Error("params must be a valid json string");
  }

  try {
    const r = await axios.get(newsapiUrl, {
      params,
    });

    if (r.data.status === "ok") {
      return JSON.stringify(r.data);
    }
  } catch (error) {
    console.log("could not request inoformation");
    if (error.response) {
      console.log(error.reponse);
    }
    if (error.request) {
      console.log(error.request);
    }
    if (error.message) {
      console.log(error.message);
    }
    console.log(error.config);
  }

  return JSON.stringify({ status: "not okk" });
};
