import Document, { Html, Head, Main, NextScript } from "next/document";

import { fbAppId, fbVersion } from "@Utils/constants";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <div id="fb-root"></div>
          <script
            async
            defer
            crossOrigin="anonymous"
            nonce="CSENcZxJ"
            src={`https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=${fbVersion}&appId=${fbAppId}&autoLogAppEvents=1`}
            // src={`https://connect.facebook.net/en_US/sdk/debug.js#xfbml=1&version=${fbVersion}&appId=${fbAppId}&autoLogAppEvents=1`}
          />

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
