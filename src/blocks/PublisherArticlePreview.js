import React from "react";
import { Box, Flex, Button, SimpleGrid, Text, Heading } from "@chakra-ui/react";

const ActionButton = ({ text }) => (
  <Button
    width="160px"
    marginBottom="12px"
    size="lg"
    variant="outline"
    fontSize="16px"
    borderColor="#414155"
    border="2px"
    borderRadius="full"
  >
    {text}
  </Button>
);

export function PublisherArticlePreview() {
  return (
    <Box
      maxW="960px"
      backgroundColor="#ffffff"
      borderRadius="8px"
      marginBottom="32px"
    >
      <Flex
        direction="row"
        justifyContent="space-between"
        padding="24px 24px 0"
        minHeight="120px"
      >
        <SimpleGrid columns={2} templateColumns="64px auto">
          <Box width="48px" height="48px" marginRight="16px">
            CNN
          </Box>
          <Box maxW="600px">
            <Heading
              as="h3"
              size="md"
              marginBottom="16px"
              fontSize="16px"
              fontWeight="medium"
            >
              Moderna COVID-19 vaccine recommended for authorization by FDA
              advisory panel - Yahoo Finance
            </Heading>
            <Text paddingBottom="30px" fontSize="14px">
              Moderna's (MRNA) COVID-19 was recommended for emergency use
              authorization (EAU)Thursday evening by an advisory board committee
              to the U.S. Food and Drud administration in a majority vote, with
              just one abstention. The vote brings the company one step clover
              ...
            </Text>
          </Box>
        </SimpleGrid>
        <Flex direction="column">
          <ActionButton text="Edit Article" />
          <ActionButton text="Publish" />
        </Flex>
      </Flex>
      <Flex
        padding="0 24px"
        dir="row"
        justifyContent="space-between"
        alignItems="center"
        height="48px"
        backgroundColor="#414155"
        color="#B3B3C6"
        borderBottomLeftRadius="8px"
        borderBottomRightRadius="8px"
      >
        <Flex dir="row">
          <Box marginRight="50px" width="320px">
            Added: 2/25/21 (David Grasso)
          </Box>
          <Box>Tone: Neutral</Box>
        </Flex>
        <Box color="#FF8B8B">Delete</Box>
      </Flex>
    </Box>
  );
}
