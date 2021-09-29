/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  Box,
  Spinner,
  Center,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { fbAppId, fbAppSecret } from "@Utils/constants";
import { FaFacebook } from "react-icons/fa";

import {
  fbLogin,
  loadPermissions,
  getLongLiveToken,
  getPageAccessToken,
} from "@Utils/helpers";

export function FacebookChannel({ onSave }) {
  const toast = useToast();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  const orchestration = async () => {
    setLoading(true);
    console.log(" we are a go");

    // - login
    const login = await new Promise((resolve) => {
      fbLogin(resolve);
    });

    if (login.status !== "connected") {
      setLoading(false);
      toast({
        title: "Facebook link failed",
        description: "We could not link to facebook",
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
      setLoading(false);
      toast({
        title: "No pages link",
        description: "We have not detect any page links",
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
      setLoading(false);
      toast({
        title: "Something went wrong",
        description: "Please try again",
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

    await onSave({ config: finalData });
    setPages(finalData);
    setLoading(false);
  };

  return (
    <Box>
      <Text mb="4">
        Please connect and select the page where you want your post to be
        publish
      </Text>

      {loading ? (
        <HStack>
          <Spinner />
          <Text>Please wait ...</Text>
        </HStack>
      ) : (
        <Button
          size="sm"
          colorScheme="facebook"
          leftIcon={<FaFacebook />}
          onClick={orchestration}
        >
          Connect your page
        </Button>
      )}

      {pages.length > 0
        ? pages.map((el) => {
            return (
              <Box>
                <Text color="gray.300">"Stay in the loop" page connected</Text>
              </Box>
            );
          })
        : null}
    </Box>
  );
}
