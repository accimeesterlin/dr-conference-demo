import axios from "axios";

function buildPostForChannel(post) {
  const { content, channelsContent } = post;

  // common

  const common = {
    title: content.customTitle || content.title,
    description: content.customDescription || content.description,
    content: content.customContent || content.content,
  };

  const meta = {
    author: content.author,
    publishedAt: content.publishedAt,
    url: content.url,
    urlToImage: content.urlToImage,
  };

  // wordpress
  let wordpress = common;

  if (channelsContent) {
    const wpContent = channelsContent.filter((el) => el.channel === "wp")[0];
    if (wpContent) {
      wordpress = wpContent;
    }
  }

  // twitter
  let twitter = common;

  if (channelsContent) {
    const twitterContent = channelsContent.filter(
      (el) => el.channel === "twitter"
    )[0];
    if (twitterContent) {
      twitter = twitterContent;
    }
  }

  // facebook

  // twitter
  let fbpage = common;

  if (channelsContent) {
    const fbpageContent = channelsContent.filter(
      (el) => el.channel === "fbpage"
    )[0];
    if (fbpageContent) {
      fbpage = fbpageContent;
    }
  }

  return {
    common,
    wordpress: {
      action: "create_post",
      post_content: wordpress.content,
      post_title: wordpress.title,
      post_category: "country,travel,tourist,haiti",
      tags_input: "travel,startup,health,customer",
      post_author: meta.author,
      post_status: "publish",
    },
    twitter: tweetMessage(meta.url, twitter.content),
    fbpage,
    meta,
  };
}

function tweetMessage(url, message) {
  const reserve = 280 - (url.length + 4);
  if (message.length <= reserve) {
    return `${message}\n${url}`;
  }
  return `${message.slice(0, reserve)}...\n${url}`;
}

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

const publishOnTwitter = async (post, config) => {
  const { twitter } = post;
  const meta = extractMeta(post);
  const message = tweetMessage(
    meta.url,
    twitter?.content || meta.content || ""
  );

  return fetch("/api/twit", {
    method: "POST",
    body: JSON.stringify({
      oauthAccessTokenSecret: config.userTokenSecret,
      oauthAccessToken: config.userToken,
      message,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((r) => {
      if (r.error) {
        return { ok: false, type: "twitter" };
      }
      return { ok: true, type: "twitter" };
    })
    .catch((error) => {
      console.log(error);
      return { ok: false, type: "twitter" };
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
    const { id, access_token } = page;
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
          return { type: "fbpage", ok: false, pageId: id };
        }
        return { type: "fbpage", ok: true, pageId: id };
      })
      .catch((error) => {
        console.log("fb failed");
        console.log(error);
        return { type: "fbpage", ok: false, pageId: id };
      });
  });
  return Promise.all(actions);
};

const publishOnWordpress = (post, config) => {
  const { wp } = post;
  const meta = extractMeta(post);

  // TODO UPDATE META

  return { type: "wp", ok: true };

  return {
    type: "wp",
    meta,
    message: {
      action: "create_post",
      post_content: wp?.content || meta.content || "",
      post_title: wp?.title || meta.title || "",
      post_category: "country,travel,tourist,haiti",
      tags_input: "travel,startup,health,customer",
      post_author: wp?.author || meta.author || "",
      post_status: "publish",
    },
  };
};

export const publishPost = async (p, channels) => {
  return Promise.all(
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
};
