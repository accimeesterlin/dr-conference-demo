import React from "react";
import { Flex } from "@chakra-ui/react";

export function PageTopMenu({ children, ...rest }) {
  return (
    <Flex
      minHeight="96px"
      direction="row"
      alignItems="baseline"
      sx={{
        "& > *": {
          margin: "auto 0px",
        },
      }}
      {...rest}
    >
      {children}
    </Flex>
  );
}
