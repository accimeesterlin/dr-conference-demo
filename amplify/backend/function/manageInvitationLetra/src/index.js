/* Amplify Params - DO NOT EDIT
	API_LETRAAIGRAPHQL_GRAPHQLAPIIDOUTPUT
	API_LETRAAIGRAPHQL_TEAMINVITATIONTABLE_ARN
	API_LETRAAIGRAPHQL_TEAMINVITATIONTABLE_NAME
	API_LETRAAIGRAPHQL_TEAMTABLE_ARN
	API_LETRAAIGRAPHQL_TEAMTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

const {
  API_LETRAAIGRAPHQL_TEAMTABLE_NAME,
  API_LETRAAIGRAPHQL_TEAMINVITATIONTABLE_NAME,
} = process.env;

AWS.config.apiVersions = {
  dynamodb: "2012-08-10",
  // other service API versions
};

const actions = ["accept", "reject"];

exports.handler = async (event) => {
  const { action, invitationId } = event.arguments;

  if (!actions.includes(action)) {
    throw new Error("Unknown action");
  }

  const TEAM_TABLE = API_LETRAAIGRAPHQL_TEAMTABLE_NAME;
  const TEAM_INVITATION_TABLE = API_LETRAAIGRAPHQL_TEAMINVITATIONTABLE_NAME;

  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: "us-east-1",
  });

  // Let's retrieve the invitation

  let invitation = null;

  try {
    invitation = await new Promise((resolve, reject) => {
      const params = {
        TableName: TEAM_INVITATION_TABLE,
        Key: { id: invitationId },
      };

      documentClient.get(params, (err, data) => {
        if (err) {
          return reject(err);
        }

        if (!data) {
          return reject(new Error("Invitation not found"));
        }

        const item = data.Item || null;

        if (!item) {
          return reject(new Error("Invitation not found"));
        }

        resolve(item);
      });
    });
  } catch (error) {
    console.log(error);
    throw new Error("Could not retrieve invitation");
  }

  // This function should be called by the invitee
  if (invitation.inviteeId !== event.identity.sub) {
    throw new Error("Only invited user can accept or reject invitation");
  }

  if (action === "reject") {
    // we just delete the invitation

    const deleteParams = {
      TableName: TEAM_INVITATION_TABLE,
      Key: { id: invitationId },
    };

    try {
      await documentClient.delete(deleteParams).promise();
      return "success";
    } catch (error) {
      console.log("Could not reject invitation");
      console.log(error);
      throw new Error("Could not complete operation");
    }
  }

  // we need to both delete the invitation and add the user to the Team

  // let's get the team

  let team = null;

  try {
    team = await documentClient
      .get({
        TableName: TEAM_TABLE,
        Key: { id: invitation.teamId },
      })
      .promise();

    if (team) {
      team = team.Item;
    } else {
      throw new Error("Could not retrieve team");
    }
  } catch (error) {
    console.log("Could not retrieve the team");
    console.log(error);
    throw new Error("Could not retrieve team");
  }

  let editors = null;
  let editorsEmail = null;

  if (team.editors) {
    if (!team.editors.includes(event.identity.sub)) {
      editors = [...team.editors, event.identity.sub];
      editorsEmail = [...team.editorsEmail, invitation.invitee];
    } else {
      editors = team.editors;
      editorsEmail = team.editorsEmail;
    }
  } else {
    editors = [event.identity.sub];
    editorsEmail = [invitation.invitee];
  }

  // Update TeamEditors and DeleteInvitation
  const updateOperation = {
    TableName: TEAM_TABLE,
    Key: { id: invitation.teamId },
    UpdateExpression: "set editors = :editors, editorsEmail = :editorsEmail",
    ExpressionAttributeValues: {
      ":editors": editors,
      ":editorsEmail": editorsEmail,
    },
  };

  const deleteOperation = {
    TableName: TEAM_INVITATION_TABLE,
    Key: { id: invitationId },
  };

  try {
    await documentClient
      .transactWrite({
        TransactItems: [
          {
            Update: updateOperation,
          },
          {
            Delete: deleteOperation,
          },
        ],
      })
      .promise();
    return "success";
  } catch (error) {
    console.log("Accepting team invitation failed");
    console.log(error);
    throw new Error("Could not complete operation");
  }
};
