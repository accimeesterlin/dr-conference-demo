import React from "react";
import { Box } from "@chakra-ui/react";

import { LeftPanelProfile } from "@Blocks/LeftPanelProfile";
import { LeftPanelMenu } from "@Blocks/LeftPanelMenu";

export function LeftPanel() {
  return (
    <Box minWidth="224px" marginRight="36px">
      <LeftPanelProfile />
      <LeftPanelMenu />
      <Box marginTop="70px" id="left-panel-portal" />
    </Box>
  );
}
