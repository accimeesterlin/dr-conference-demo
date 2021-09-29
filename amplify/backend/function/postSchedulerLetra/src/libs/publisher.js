const axios = require("axios");

// TODO REMOVE TEST URL IN CLEANING
const testUrl =
  "https://accimeesterlin.com/DR Conferencei-ai/?wpwhpro_action=main_5900&wpwhpro_api_key=zgelayc3btpywfpf6rtkwyrc6aouiipbx2bh7t6r5ssci9xyonhkdpairor4ne14";

function postToWordpress(data, url = testUrl) {
  const { title, content, description } = data;

  const wpData = {
    action: "create_post",
    post_content: description || content || "Test",
    post_title: title,
    post_category: "usa",
    tags_input: "tech,ai,metaverse,multiverse",
    post_author: "DR Conference ",
    post_status: "publish",
  };

  return axios.post(url, wpData);
}

function publisher(posts, teamInfo) {
  return Promise.all(
    posts.map((post) => {
      const { id, teamId, content, wp } = post;

      // return { [teamId]: teamInfo[teamId] };

      return Promise.all(
        teamInfo[teamId].channels.map((el) => {
          if (el.type === "wp") {
            return postToWordpress(wp || content, el.publicationUrl)
              .then(() => ({ key: "wp", value: 1 }))
              .catch((error) => {
                console.log(error);
                return { key: "wp", value: 0 };
              });
          }
          return { key: el.type, value: 0 }; //
        })
      ).then((values) => ({
        id,
        values: values.reduce(
          (accumulator, currentValue) => {
            if (currentValue.value) {
              accumulator.success.push(currentValue.key);
            } else {
              accumulator.failure.push(currentValue.key);
            }
            return accumulator;
          },
          { success: [], failure: [] }
        ),
      })); // here we can decide what to do when posting failed
    })
  ).then((values) => values);
}

exports.postToWordpress = postToWordpress;
exports.publisher = publisher;
