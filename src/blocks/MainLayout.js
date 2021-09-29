import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import { LeftPanelProfile } from "@Blocks/LeftPanelProfile";
import { LeftPanelMenu } from "@Blocks/LeftPanelMenu";

export function MainLayout({ children, page = "", queueQuantity = 0 }) {
  return (
    <Flex
      className="find-me-please"
      flexDirection="row"
      bg="brand.bg"
      maxWidth="1280px"
      margin="0 auto"
    >
      <Box minWidth="284px" paddingLeft="24px" marginRight="36px">
        <LeftPanelProfile />
        <LeftPanelMenu page={page} />
        <Box marginTop="70px" id="left-panel-portal" />
      </Box>
      <Box maxWidth="952px" width="100%">
        {children}
      </Box>
    </Flex>
  );
}
