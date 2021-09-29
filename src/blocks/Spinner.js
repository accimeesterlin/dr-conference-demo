import React from "react";
import { Spinner as CKSpinner, Center } from "@chakra-ui/react";

export const Spinner = ({ wrapper = {}, ...rest }) => (
  <Center h="100px" {...wrapper}>
    <CKSpinner
      size="xl"
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="brand.green"
      {...rest}
    />
  </Center>
);
