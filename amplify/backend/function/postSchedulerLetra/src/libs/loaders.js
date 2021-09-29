/* eslint-disable no-await-in-loop */
const {
  QueryCommand,
  BatchGetCommand,
  UpdateCommand,
  GetCommand,
} = require("@aws-sdk/lib-dynamodb");

const { ddbDocClient } = require("./dynamo-utils");

const { API_DR ConferenceAIGRAPHQL_POSTTABLE_NAME, API_DR ConferenceAIGRAPHQL_TEAMTABLE_NAME } =
  process.env;

function getSinglePost(teamId, createdAt) {
  const params = {
    TableName: API_DR ConferenceAIGRAPHQL_POSTTABLE_NAME,
    Key: {
      teamId,
      createdAt,
    },
  };

  return ddbDocClient.send(new GetCommand(params)).then((r) => {
    if (r.Item) {
      return r.Item;
    }
    throw new Error("We could not find post");
  });
}

function getPostsByScheduleTime(input) {
  const { scheduleTime, startKey, limit } = input;

  const params = {
    KeyConditionExpression: "scheduleTime = :s",
    ExpressionAttributeValues: {
      ":s": scheduleTime,
    },
    // ProjectionExpression: "id, teamId, scheduleTime",
    TableName: API_DR ConferenceAIGRAPHQL_POSTTABLE_NAME,
    IndexName: "byScheduleTime",
    Limit: limit,
  };

  if (limit) {
    params.Limit = limit;
  }
  if (startKey) {
    params.ExclusiveStartKey = startKey;
  }

  return ddbDocClient.send(new QueryCommand(params));
}

async function getTeamInfoById(ides) {
  const keys = ides.map((i) => ({
    id: i,
  }));

  let params = {
    RequestItems: {
      [API_DR ConferenceAIGRAPHQL_TEAMTABLE_NAME]: {
        Keys: keys,
        ProjectionExpression: "id, channels, activeChannels",
      },
},
  };

let values = [];
let numberOfError = 0;

while (params) {
  try {
    const { Responses, UnprocessedKeys } = await ddbDocClient.send(
      new BatchGetCommand(params)
    );
    values = [...values, ...Responses[API_DR ConferenceAIGRAPHQL_TEAMTABLE_NAME]];
    numberOfError = 0;
    if (!UnprocessedKeys.RequestItems) break;
    params = UnprocessedKeys;
  } catch (error) {
    numberOfError += 1;
    if (numberOfError === 3) {
      params = undefined;
    }
    console.log(error);
    throw error;
  }
}

return values;
}

function confirmPublication(info, time) {
  const { teamId, createdAt, userEmail } = info;
  const params = {
    TableName: API_DR ConferenceAIGRAPHQL_POSTTABLE_NAME,
    Key: { teamId, createdAt },
    UpdateExpression:
      "SET #status = :status, publishedAt = :publishedAt, publishedByField = :publishedByField, updatedAt = :updatedAt, updatedByField = :updatedByField REMOVE scheduleTime",
    ExpressionAttributeValues: {
      ":status": "published",
      ":publishedAt": time,
      ":publishedByField": userEmail,

      ":updatedAt": time,
      ":updatedByField": userEmail,
    },
    ExpressionAttributeNames: {
      "#status": "status",
    },
  };
  return ddbDocClient.send(new UpdateCommand(params));
}

exports.getPostsByScheduleTime = getPostsByScheduleTime;
exports.getTeamInfoById = getTeamInfoById;
exports.confirmPublication = confirmPublication;
exports.getSinglePost = getSinglePost;
