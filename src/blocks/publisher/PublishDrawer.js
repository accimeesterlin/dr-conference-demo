import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  Box,
  Heading,
  Flex,
  IconButton,
  Text,
  HStack,
  VStack,
  Button,
  CheckboxGroup,
  Checkbox,
  Image,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { DateAndTimePicker } from "@Blocks/publisher";
import TimePicker from "react-time-picker/dist/entry.nostyle";

const Content = styled(Box)`
  border: 1px solid #eaedf3;
  border-radius: 8px;
  margin: 20px 40px;
  padding-bottom: 30px;
`;

const StyledText = styled(Text)`
  letter-spacing: 0.4px;
  color: #414155;
  font-weight: normal;
  margin: 10px 30px;
`;

function MainActionButton({ text }) {
  return (
    <Button
      color="#ffffff"
      backgroundColor="brand.green"
      size="lg"
      borderRadius="full"
      padding="0 48px"
    >
      {text}
    </Button>
  );
}

export function PublishDrawer({ onCancel }) {
  const [value, onChange] = useState("10:00");

  return (
    <DrawerContent>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        height="96px"
        backgroundColor="#414155"
        color="#ffffff"
        padding="8"
      >
        <Heading size="md" as="h4" color="#ffffff">
          Article - Publish
        </Heading>
        <div>
          <IconButton
            onClick={onCancel}
            border="none"
            variant="outline"
            aria-label="Cancel and close"
            icon={<CloseIcon w={4} h={4} />}
          />
        </div>
      </Flex>
      <DrawerBody>
        <Content>
          <DateAndTimePicker />
          <HStack>
            <StyledText>Time :</StyledText>
            <TimePicker
              clearIcon={null}
              clockIcon={null}
              onChange={onChange}
              value={value}
              maxDetail="minute"
            />
          </HStack>
        </Content>
        <VStack align="flex-start" padding="5">
          <StyledText>Blog URL</StyledText>
          <Box
            margin="20px !important"
            border="1px solid #EAEDF3"
            borderRadius="8px"
          >
            <StyledText>
              .../dgrasso/2021/03/03/pfizer-coronavirus-vaccine-receives-emergency-use-approval-by-us-food-and-drug-administration
            </StyledText>
          </Box>
          <StyledText paddingLeft="20px">Social Media Posts</StyledText>
          <CheckboxGroup>
            <HStack paddingLeft="20px">
              <Checkbox
                value="fb"
                colorScheme="#86869F"
                iconColor="#86869F"
                margin="auto"
                spacing="1rem"
              >
                <Image src="/assets/fb-filled-icon.svg" alt="fb icon" />
              </Checkbox>
              <Checkbox
                colorScheme="#86869F"
                iconColor="#86869F"
                value="twitter"
                spacing="1rem"
                marginLeft="20px !important"
              >
                <Image
                  src="/assets/twitter-filled-icon.svg"
                  alt="twitter icon"
                />
              </Checkbox>
            </HStack>
          </CheckboxGroup>
        </VStack>
      </DrawerBody>
      <DrawerFooter borderTop="1px solid #D8D8D8">
        <HStack width="100%" justifyContent="flex-end">
          <MainActionButton text="Next: Social Media" />
        </HStack>
      </DrawerFooter>
    </DrawerContent>
  );
}
