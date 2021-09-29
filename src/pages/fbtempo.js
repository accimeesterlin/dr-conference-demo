/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Text, Button, Box, Center, useToast, HStack } from "@chakra-ui/react";

import { fbAppSecret, fbAppId, fbVersion } from "@Utils/constants";

function fbLogin(callback) {
  FB.login(callback, {
    scope: "pages_manage_posts, pages_read_engagement",
    auth_type: "rerequest",
  });
}

function loadPermissions(callback) {
  // setWorking(true);
  FB.api("/me/accounts", (response) => {
    callback(response);
  });
}

function getLongLiveToken(data, callback) {
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

function getPageAccessToken(data, callback) {
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

export default function FBTempo() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [credentials, setCredentials] = useState("");

  const orchestration = async () => {
    setLoading(true);

    const login = await new Promise((resolve) => {
      fbLogin(resolve);
    });

    if (login.status !== "connected") {
      toast({
        title: "Access cancelled",
        description: "We cannot continue without the access",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const permissions = await new Promise((resolve) => {
      loadPermissions(resolve);
    });

    if (!permissions?.data || permissions.data.length === 0) {
      toast({
        title: "Access cancelled",
        description: "We could not detect any pages",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const exchangeData = {
      fbAppId,
      fbAppSecret,
      exchange_token: login.authResponse.accessToken,
    };

    const longLiveToken = await new Promise((resolve) => {
      getLongLiveToken(exchangeData, resolve);
    });

    if (!longLiveToken.access_token) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const pageTokens = await Promise.allSettled(
      permissions.data.map((el) => {
        return new Promise((resolve) => {
          getPageAccessToken(
            {
              pageId: el.id,
              access_token: longLiveToken.access_token,
            },
            resolve
          );
        });
      })
    ).then((results) => {
      return results
        .filter((el) => el.status === "fulfilled")
        .map((el) => el.value);
    });

    // mix the information together
    const finalData = pageTokens.map((el) => {
      const info = permissions.data.filter((p) => p.id === el.id)[0];
      return {
        ...el,
        name: info.name,
        category: info.category,
      };
    });

    console.log("the final data");
    console.log(finalData);

    setLoading(false);
  };

  const sendMessage = () => {
    const [pageId, access_token] = credentials.split(";");
    if (pageId && access_token) {
      FB.api(
        `${pageId}/feed`,
        "POST",
        {
          message: "This is from DR Conference",
          access_token,
        },
        (response) => {
          console.log("the publication response");
          console.log(response);
        }
      );
    } else {
      console.log("So bad - in the business");
    }
  };

  return (
    <Box>
      <Box>Hello</Box>
      <Box my="4">{loading ? <div>loading</div> : <div>not loading</div>}</Box>
      <Button onClick={orchestration}>We wil make it work</Button>

      <Text>Message</Text>
      <input
        type="text"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />

      <Text>credentials</Text>
      <input
        type="text"
        value={credentials}
        onChange={(event) => {
          setCredentials(event.target.value);
        }}
      />
      <Button onClick={sendMessage}>Send</Button>
    </Box>
  );
}
