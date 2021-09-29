/* Amplify Params - DO NOT EDIT
	API_LETRAAIGRAPHQL_GRAPHQLAPIIDOUTPUT
	API_LETRAAIGRAPHQL_USERTABLE_ARN
	API_LETRAAIGRAPHQL_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

const { API_LETRAAIGRAPHQL_USERTABLE_NAME } = process.env;

AWS.config.apiVersions = {
  dynamodb: "2012-08-10",
  // other service API versions
};
exports.handler = async (event) => {
  const { email } = event.arguments;
  if (!email) throw new Error("Email is required");
  // const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: "us-east-1",
  });
  const params = {
    TableName: API_LETRAAIGRAPHQL_USERTABLE_NAME,
    Key: { id: email },
  };

  try {
    const sub = await new Promise((resolve, reject) => {
      documentClient.get(params, (err, data) => {
        if (err) {
          return reject(err);
        }

        if (!data) {
          return reject(new Error("User not found"));
        }

        const item = data.Item || null;

        if (!item) {
          return reject(new Error("Null Item"));
        }

        resolve(item.owner);
      });
    });

    return sub;
  } catch (error) {
    console.log(error);
    throw new Error("Information not found");
  }
};
