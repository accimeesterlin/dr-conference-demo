/* eslint-disable import/no-cycle */
import React from "react";
import {
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  Button,
  Box,
  Text,
  HStack,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { InternetIcon, FacebookIcon, TwitterIcon } from "@Blocks";

export function PublishPopover() {
  return (
    <PopoverContent>
      <PopoverBody padding="0px">
        <HStack>
          <Box width="80%" padding="20px">
            <Text
              color="#414155"
              lineHeight="22px"
              fontSize="16px"
              fontWeight="500"
              letterSpacing="0.4px"
            >
              GM recalling 7 million vehicles for airbag problems after losing
              fight with safety regulator
            </Text>
            <Text
              fontSize="14px"
              lineHeight="20px"
              letterSpacing="0.3px"
              fontWeight="normal"
              paddingTop="10px"
            >
              Scheduled:
            </Text>
            <Text
              fontSize="14px"
              lineHeight="20px"
              letterSpacing="0.3px"
              fontWeight="normal"
              paddingBottom="10px"
            >
              2:30pm (David Grasso)
            </Text>
            <PopoverFooter border="0">
              <Button
                backgroundColor="white"
                border="2px solid #414155"
                borderRadius="180px"
                width="160px"
              >
                Edit
              </Button>
            </PopoverFooter>
          </Box>
          <Box
            position="absolute"
            right="0px"
            margin="0px !important"
            paddingTop="10px"
            height="100%"
            width="20%"
            backgroundColor="#86869F"
            display="flex"
            justifyContent="center"
          >
            <VStack>
              <IconButton
                fontSize="24px"
                isRound
                variant="ghost"
                size="md"
                color="white"
                colorScheme="white"
                icon={<InternetIcon />}
              />
              <IconButton
                fontSize="24px"
                isRound
                variant="ghost"
                size="md"
                color="white"
                colorScheme="white"
                icon={<FacebookIcon />}
              />
              <IconButton
                fontSize="24px"
                isRound
                variant="ghost"
                size="md"
                color="white"
                colorScheme="white"
                icon={<TwitterIcon />}
              />
            </VStack>
          </Box>
        </HStack>
      </PopoverBody>
      <PopoverArrow />
    </PopoverContent>
  );
}
