import React from "react";
import { Box, Button, Menu, MenuButton } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";

export const Dropdown = ({ text }) => (
  <Box>
    <Menu>
      <MenuButton
        as={Button}
        pr="0"
        pl="2px"
        size="sm"
        variant="ghost"
        rightIcon={<TriangleDownIcon boxSize={2.5} />}
        _focus={{
          outline: "none",
        }}
        _hover={
          {
            // backgroundColor: "#fff",
          }
        }
        _active={
          {
            // backgroundColor: "#fff",
          }
        }
      >
        {text}
      </MenuButton>
    </Menu>
  </Box>
);
