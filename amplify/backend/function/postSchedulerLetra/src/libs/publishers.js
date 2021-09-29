const axios = require("axios");
const Twit = require("twit");
const fetch = require("node-fetch");

const consumerKey = "NRnzfBlfC3HeD8H4piahb0Xf1";
const consumerSecret = "XP5XPDaQtSVXCHqPLfGWW0St9ysZY1bsFihTwrrD3Nbg9mwrX9";

const extractMeta = (post) => {
  const { author, publishedAt, url, urlToImage, content, title, description } =
    post.content || {};
  return {
    author,
    publishedAt,
    url,
    urlToImage,
    content,
    title,
    description,
  };
};

function tweetMessage(url, message) {
  const reserve = 280 - (url.length + 4);
  if (message.length <= reserve) {
    return `${message}\n${url}`;
  }
  return `${message.slice(0, reserve)}...\n${url}`;
}

const publishOnWordpress = (post, config) => {
  const { wp } = post;
  const meta = extractMeta(post);

  const data = {
    action: "create_post",
    post_content: wp?.content || meta.content || "",
    post_title: wp?.title || meta.title || "",
    post_category: "usa",
    tags_input: "tech,ai,news,multiverse",
    post_author: wp?.author || meta.author || "",
    post_status: "publish",
  };

  return axios
    .post(config.publicationUrl, data)
    .then((r) => {
      return { type: "wp", ok: true };
    })
    .catch((error) => {
      console.log("Could not post on wordpress");
      console.log(error);
      return { type: "wp", ok: false };
    });
};

const publishOnTwitter = async (post, config) => {
  const { twitter } = post;
  const meta = extractMeta(post);
  const message = tweetMessage(
    twitter?.url || meta.url || "",
    twitter?.content || meta.content || ""
  );

  const T = new Twit({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token: config.userToken,
    access_token_secret: config.userTokenSecret,
    timeout_ms: 60 * 1000,
  });

  return new Promise((resolve) => {
    T.post(
      "statuses/update",
      {
        status: message,
      },
      (error) => {
        if (error) {
          console.log("Could not send tweet");
          console.log(error);
          resolve({ ok: false, type: "twitter" });
          return;
        }
        resolve({ ok: true, type: "twitter" });
      }
    );
  });
};

const publishOnFacebook = (post, pages) => {
  const { fb } = post;
  const meta = extractMeta(post);

  const message = {
    title: fb?.title || meta.title || "",
    link: fb?.url || meta.url || "",
    message: fb?.content || meta.content || "",
  };

  const actions = pages.config.map((page) => {
    const { id, access_token, name } = page;
    return fetch(
      `https://graph.facebook.com/${id}/feed?` +
        new URLSearchParams({
          ...message,
          access_token,
        }),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((r) => r.json())
      .then((r) => {
        if (r?.error) {
          console.log("Could not post to facebook page " + name);
          console.log(r.error);
          return { type: "fbpage", ok: false, pageId: id };
        }
        return { type: "fbpage", ok: true, pageId: id };
      })
      .catch((error) => {
        console.log("Could not post to facebook page " + name);
        console.log(error);
        return { type: "fbpage", ok: false, pageId: id };
      });
  });
  return Promise.all(actions);
};

const publishOnAll = async (p, channels) => {
  const result = await Promise.all(
    channels.map((channel) => {
      switch (channel.type) {
        case "fbpage":
          return publishOnFacebook(p, channel);
        case "twitter":
          return publishOnTwitter(p, channel);
        case "wp":
          return publishOnWordpress(p, channel);
        default:
          throw new Error("Unkown channel");
      }
    })
  );

  const failed = {};
  result.forEach((el) => {
    if (Array.isArray(el)) {
      el.forEach((e) => {
        if (!e.ok) {
          failed[e.type] = true;
        }
      });
      return;
    }

    if (!el.ok) {
      failed[el.type] = true;
    }
  });

  const failedChannels = Object.keys(failed);
  let pointer = "";

  if (failedChannels.length === 0) {
    pointer = "none";
  }

  if (failedChannels.length === channels.length) {
    pointer = "all";
  }

  if (failedChannels.length < channels.length) {
    pointer = "some";
  }

  return {
    teamId: p.teamId,
    createdAt: p.createdAt,
    id: p.id,
    userEmail: p.scheduleByField,
    result,
    failedChannels,
    pointer,
  };
};

exports.publishOnAll = publishOnAll;
exports.publishOnWordpress = publishOnWordpress;
exports.publishOnTwitter = publishOnTwitter;
exports.publishOnFacebook = publishOnFacebook;
