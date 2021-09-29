/* Amplify Params - DO NOT EDIT
	API_LETRAAIGRAPHQL_GRAPHQLAPIIDOUTPUT
	API_LETRAAIGRAPHQL_POSTTABLE_ARN
	API_LETRAAIGRAPHQL_POSTTABLE_NAME
	API_LETRAAIGRAPHQL_TEAMTABLE_ARN
	API_LETRAAIGRAPHQL_TEAMTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/* eslint-disable no-await-in-loop */

const {
  getPostsByScheduleTime,
  getTeamInfoById,
  confirmPublication,
  getSinglePost,
} = require("./libs/loaders");
const { generateTimes } = require("./libs/utils");
const { publisher } = require("./libs/publisher");
const { publishOnAll } = require("./libs/publishers");

const sleep = async (msec) => {
  return new Promise((resolve) => setTimeout(resolve, msec));
};

const handleScheduling = async () => {
  const [time] = generateTimes();

  let next = true;
  let startKey;

  const teamCache = {};

  while (next) {
    next = false;
    let teams = {};
    let r = null;

    try {
      const postQuery = { scheduleTime: time, startKey, limit: 100 };
      r = await getPostsByScheduleTime(postQuery);
      startKey = r.LastEvaluatedKey;
      if (startKey) {
        next = true;
      }
    } catch (error) {
      console.log(error);
      return JSON.stringify({
        statusCode: 500,
        body: "Error",
      });
    }

    if (r.Items.length === 0) {
      return JSON.stringify({
        statusCode: 200,
        body: "success: no more",
      });
    }

    r.Items.forEach((el) => {
      if (!teamCache[el.teamId]) {
        teams[el.teamId] = "";
      }
    });

    teams = Object.keys(teams);

    if (teams.length) {
      try {
        const infoList = await getTeamInfoById(teams);
        infoList.forEach((el) => {
          teamCache[el.id] = el;
        });
      } catch (error) {
        console.log(error);
        return JSON.stringify({
          statusCode: 500,
          body: "Error",
        });
      }
    }

    // console.log(r.Items.map((el) => el.id));

    // now we need to publish for each one
    const scheduledPosts = r.Items.filter(
      (el) =>
        Array.isArray(teamCache[el.teamId].channels) &&
        teamCache[el.teamId].channels.length !== 0
    );

    // we will publish 10 articles at the same time
    const CONCURRENT = 10;

    let done = 0;

    while (done < scheduledPosts.length) {
      const slice = scheduledPosts.slice(done, done + CONCURRENT);

      // const publishedIdes = await publisher(slice, teamCache);
      const publicationResult = await Promise.all(
        slice.map((post) => publishOnAll(post, teamCache[post.teamId].channels))
      );

      /**
       * TODO In the future it needs to be know what to when
       * 1 - one channel failed
       * 2 - all channels failed
       */

      const time = new Date().toISOString();
      await Promise.allSettled(
        publicationResult
          .filter((el) => el.pointer !== "none")
          .map((el) => confirmPublication(el, time))
      );

      done += slice.length;
    }
  } // end of while below

  return JSON.stringify({
    statusCode: 200,
    body: "success: final",
  });
};

const handleDirectPublication = async (event) => {
  const { teamId, createdAt, userEmail } = event.arguments;

  // first retrive the post

  const r = await Promise.all([
    getSinglePost(teamId, createdAt),
    getTeamInfoById([teamId]).then((response) => response[0]),
  ]);

  if (r?.state === "rejected") {
    return JSON.stringify({
      statusCode: 500,
      body: "Something went wrong on the server",
    });
  }

  const [post, team] = r;

  if (!post || !team || !team.channels) {
    return JSON.stringify({
      statusCode: 500,
      body: "Please review your post and team configurations",
    });
  }

  const publicationResult = await publishOnAll(post, team.channels);

  if (publicationResult.pointer === "none") {
    return JSON.stringify({
      statusCode: 400,
      body: "Publication failed. Review connected channels",
    });
  }

  let confirmed = false;
  const confirmationInfo = {
    teamId,
    createdAt,
    userEmail,
  };

  const time = new Date().toISOString();

  try {
    await confirmPublication(confirmationInfo, time);
    confirmed = true;
  } catch (error) {
    console.log(" we could not confirm the publication");
    console.log(error);
  }

  if (!confirmed) {
    await sleep(2000); // might be a temporary network problem
    try {
      await confirmPublication(confirmationInfo, time);
      confirmed = true;
    } catch (error) {
      console.log(
        " Post was published but we could not update confirmation records "
      );
      console.log(error);
    }
  }

  const body = {
    updatedAt: time,
  };

  if (publicationResult.pointer === "some") {
    body.failedChannels = publicationResult.failedChannels;
  }

  return JSON.stringify({
    statusCode: 200,
    body,
  });
};

const handler = async (event) => {
  if (event.arguments?.action && event.arguments.action === "direct") {
    return handleDirectPublication(event);
  }
  return handleScheduling();
};

exports.handler = handler;
