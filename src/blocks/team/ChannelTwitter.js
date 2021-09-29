import React from "react";
import { useRouter } from "next/router";
import { Box, Text, Button, useToast } from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";

export function TwitterChannel() {
  const router = useRouter();
  const toast = useToast();
  const { id: teamId } = router.query;

  const startTwitterConnection = () => {
    fetch("/api/auth/twitter?step=1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        team: teamId,
        origin: window.location.origin,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.error) {
          toast({
            title: "Something went wrong. Try again",
            // description: "We could not link to facebook",
            status: "error",
            duration: 3000,
            isClosable: true,
          });

          console.error("Internal server error ");

          setTimeout(() => {
            window.location.reload();
          }, 1500);
          return;
        }

        const { url, tokenSecret } = r;

        window.localStorage.setItem("@twTokenSecret", tokenSecret);

        window.location.assign(url);
      });
  };

  return (
    <Box>
      <Box mb="3">
        <Text mb="2">
          Use the button below to authorize the application to your Twitter
        </Text>
      </Box>
      <Button
        size="sm"
        colorScheme="twitter"
        leftIcon={<FaTwitter />}
        onClick={startTwitterConnection}
      >
        Connect to twitter
      </Button>
    </Box>
  );
}
