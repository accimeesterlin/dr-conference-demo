import React from "react";
import { Button } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { UploadIcon } from "@Blocks/DR ConferenceIcon";

function ActionButton({ text, ...rest }) {
  return (
    <Button
      width={128}
      backgroundColor="#414155"
      color="#ffffff"
      fontWeight="medium"
      fontSize={16}
      borderRadius="full"
      {...rest}
    >
      {text}
    </Button>
  );
}

export function RefreshButton({ ...rest }) {
  return (
    <ActionButton
      aria-label="Refresh data"
      text="Refresh"
      leftIcon={<RepeatIcon />}
      {...rest}
    />
  );
}

export function UploadButton({ ...rest }) {
  return (
    <ActionButton
      aria-label="Upload photo"
      text="Upload"
      leftIcon={<UploadIcon />}
      {...rest}
    />
  );
}
