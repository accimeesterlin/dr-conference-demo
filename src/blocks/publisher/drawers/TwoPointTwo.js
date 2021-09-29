import React, { useState } from "react";
import {
  DrawerBody,
  HStack,
  Text,
  Box,
  Link as CKLink,
  Button,
  Circle,
  FormControl,
  FormLabel,
  Switch,
  VisuallyHidden,
  Input,
} from "@chakra-ui/react";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import { GenericCalendar } from "@Blocks/publisher/Calendar";
import { FaFacebook, FaTwitter } from "react-icons/fa";

import { CustomizeHeader, Line, FooterVariant2, Wrapper } from "./Generic";

// USED FOR ARTICLE EDIT
export function TwoPointTwo({
  onCancel,
  ctaClick,
  socialMedia,
  setSocialMedia,
}) {
  const [value, onChange] = useState("10:00");

  const onDateClick = () => {};

  return (
    <>
      <CustomizeHeader drawerTitle="Article — Publish" onCancel={onCancel} />
      <DrawerBody padding={0}>
        <Wrapper>
          <Box
            border=" 1px solid #eaedf3"
            borderRadius="8px"
            // margin="20px 40px"
            // paddingBottom="30px"
          >
            <GenericCalendar
              onDateClick={onDateClick}
              // wrapper={{ padding: "16px 32px" }}
            />

            <HStack mb="4">
              <Box
                color="#414155"
                letterSpacing="0.4px"
                fontWeight="norma"
                margin="10px 30px"
              >
                Time :
              </Box>
              <TimePicker
                clearIcon={null}
                clockIcon={null}
                onChange={onChange}
                value={value}
                maxDetail="minute"
              />
            </HStack>
          </Box>
        </Wrapper>
        <Wrapper>
          <Text>Blog URL</Text>
          <Input placeholder="https://boldtv.com" />
        </Wrapper>

        <Wrapper>
          <HStack>
            <HStack alignItems="center">
              <FormControl>
                <VisuallyHidden>
                  <FormLabel htmlFor="select-facebook-channel">
                    Publish on Facebook
                  </FormLabel>
                </VisuallyHidden>
                <Switch
                  m="0px"
                  id="select-facebook-channel"
                  onChange={(e) => {
                    setSocialMedia({
                      ...socialMedia,
                      fb: e.target.checked,
                    });
                  }}
                />
              </FormControl>
              <Circle size="25px" colorScheme="facebook">
                <FaFacebook size="25px" />
              </Circle>
            </HStack>
            <HStack alignItems="center">
              <FormControl>
                <VisuallyHidden>
                  <FormLabel htmlFor="select-twitter-channel" mb="0">
                    Publish on Facebook
                  </FormLabel>
                </VisuallyHidden>
                <Switch
                  m="0px"
                  id="select-twitter-channel"
                  onChange={(e) => {
                    setSocialMedia({
                      ...socialMedia,
                      twitter: e.target.checked,
                    });
                  }}
                />
              </FormControl>
              <Circle size="25px" colorScheme="twitter">
                <FaTwitter size="25px" />
              </Circle>
            </HStack>
            '
          </HStack>
        </Wrapper>

        <Line />
        <FooterVariant2
          timeText="Next Available (12:16pm)"
          ctaText="Next: Scheduling"
          ctaClick={ctaClick}
        />
      </DrawerBody>
    </>
  );
}
