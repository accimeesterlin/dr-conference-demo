const fbAppId = "2033904083432971";
const fbVersion = "v12.0";

window.fbAsyncInit = function () {
  FB.init({
    appId: fbAppId,
    autoLogAppEvents: true,
    xfbml: true,
    version: fbVersion,
  });
  FB.AppEvents.logPageView();
};
