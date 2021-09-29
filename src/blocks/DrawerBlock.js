import React from "react";
import { DrawerHeader, DrawerBody } from "@chakra-ui/react";

export function CustomDrawerHeader({ children, ...rest }) {
  return (
    <DrawerHeader
      backgroundColor="#414155"
      padding="8"
      height="96px"
      color="#ffffff"
      {...rest}
    >
      {children}
    </DrawerHeader>
  );
}

export function CustomDrawerBody({ children, ...rest }) {
  return <DrawerBody {...rest}>{children}</DrawerBody>;
}
