import React from "react";

import {
  Box,
  Heading,
  HStack,
  Text,
  FormLabel,
  Button,
} from "@chakra-ui/react";

export function LabelView({ text }) {
  return <FormLabel mb="3">{text}</FormLabel>;
}

export function FormView({
  children,
  helperText,
  titleText,
  onSubmit,
  isSubmitting,
}) {
  return (
    <Box
      as="section"
      bg="#fff"
      border="1px solid #eaeaea"
      borderRadius="5px"
      maxW="746px"
      mb="8"
    >
      <Box as="form" onSubmit={onSubmit}>
        <Box
          sx={{
            input: {
              width: "360px",
              maxWidth: "100%",
            },
          }}
          p="5"
        >
          <Heading as="h3" size="md" fontWeight="500" mb="4">
            {titleText}
          </Heading>
          {children}
        </Box>
        <HStack
          as="footer"
          borderTop="1px solid #eaeaea"
          justifyContent="space-between"
          p="5"
        >
          <Text>{helperText}</Text>
          <Button
            type="submit"
            colorScheme="teal"
            size="sm"
            px="6"
            fontWeight={400}
            // fontSize=""
            bg="#000"
            disabled={isSubmitting}
          >
            Save
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}

export function SectionView({
  externalWrapperProps = {},
  onSubmit = null,
  formProps = {},
  internalWrapperProps = {},
  titleText,
  titleTextProps = {},
  children,
  isSubmitting,
  footer,
  footerProps = {},
  extraInfoText,
  extraInfoTextProps = {},
  actionButton,
  actionButtonText = "Save",
  actionButtonType = "submit",
  actionButtonProps = {},
  onClick = null,
}) {
  return (
    <Box
      as="section"
      bg="#fff"
      border="1px solid #eaeaea"
      borderRadius="5px"
      maxW="746px"
      {...externalWrapperProps}
    >
      <Box as={onSubmit ? "form" : "div"} onSubmit={onSubmit} {...formProps}>
        <Box
          sx={{
            input: {
              width: "360px",
              maxWidth: "100%",
            },
          }}
          p="5"
          {...internalWrapperProps}
        >
          <Heading
            as="h3"
            size="md"
            fontWeight="500"
            mb="4"
            {...titleTextProps}
          >
            {titleText}
          </Heading>
          {children}
        </Box>
        {footer ?? (
          <HStack
            as="footer"
            borderTop="1px solid #eaeaea"
            justifyContent="space-between"
            p="5"
            {...footerProps}
          >
            {extraInfoText ? (
              <Text {...extraInfoTextProps}>{extraInfoText}</Text>
            ) : null}

            {actionButton ?? (
              <Button
                type={actionButtonType ?? null}
                colorScheme="teal"
                size="sm"
                px="6"
                fontWeight={400}
                // fontSize=""
                bg="#000"
                onClick={onClick ?? null}
                disabled={isSubmitting}
                _hover={{
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #000000",
                }}
                {...actionButtonProps}
              >
                {actionButtonText}
              </Button>
            )}
          </HStack>
        )}
      </Box>
    </Box>
  );
}
