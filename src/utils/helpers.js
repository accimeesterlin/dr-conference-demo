export function fbLogin(callback) {
  FB.login(callback, {
    scope: "pages_manage_posts, pages_read_engagement",
    auth_type: "rerequest",
  });
}

export function loadPermissions(callback) {
  // setWorking(true);
  FB.api("/me/accounts", (response) => {
    callback(response);
  });
}

export function getLongLiveToken(data, callback) {
  const { fbAppId, fbAppSecret, exchange_token } = data;

  FB.api(
    "/oauth/access_token",
    "GET",
    {
      grant_type: "fb_exchange_token",
      client_id: fbAppId,
      client_secret: fbAppSecret,
      fb_exchange_token: exchange_token,
    },
    callback
  );
}

export function getPageAccessToken(data, callback) {
  const { access_token, pageId } = data;
  FB.api(
    pageId,
    "GET",
    {
      fields: "access_token",
      access_token,
    },
    callback
  );
}
