import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { ArticleDrawer } from "@Components/articleDrawer";

export const ArticleDrawerButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    onOpen();
  };

  return (
    <>
      <Button onClick={handleClick}>Click me</Button>
      <ArticleDrawer onClose={onClose} isOpen={isOpen} />
    </>
  );
};
