import React from "react";
import { DateTime } from "luxon";
import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  Heading,
  Button,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
  ButtonGroup,
  useBoolean,
} from "@chakra-ui/react";
import { ActionButton } from "./Button";

const formatTime = (v) => DateTime.fromISO(v).toFormat("LL/dd/yy");

export const Item = ({ id, onEdit, onSchedule, onPublish, onDelete, data }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const [publishConfirmation, setPublishConfirmation] = useBoolean();

  const {
    updatedAt,
    addedBy = "",
    tone,
    content: { title, content },
    scheduleAt,
    createdAt,
    scheduleBy,
    scheduleTime,
    publishedAt,
    publishedBy,
  } = data;

  let extra = null;

  if (scheduleTime && scheduleAt) {
    extra = (
      <Box>
        Schedule for:{" "}
        {`${DateTime.fromISO(scheduleAt).toFormat("DD")} ${DateTime.fromISO(
          scheduleAt
        ).toFormat("ttt")}`}{" "}
        {scheduleBy?.fullName ? `(${scheduleBy.fullName})` : ""}
      </Box>
    );
  }

  if (publishedAt) {
    extra = (
      <Box>
        Publish on:{" "}
        {`${DateTime.fromISO(publishedAt).toFormat("DD")} ${DateTime.fromISO(
          publishedAt
        ).toFormat("ttt")}`}{" "}
        {publishedBy?.fullName ? `(${publishedBy.fullName})` : ""}
      </Box>
    );
  }

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
            N/A
          </Box>
          <Box maxW="600px">
            <Heading
              as="h3"
              size="md"
              marginBottom="16px"
              fontSize="16px"
              fontWeight="medium"
            >
              {title}
            </Heading>
            <Text paddingBottom="30px" fontSize="14px">
              {content}
            </Text>
          </Box>
        </SimpleGrid>
        <Flex direction="column">
          <ActionButton value="Edit" onClick={() => onEdit(id)} />
          {/* <ActionButton value="Publish" onClick={() => onPublish(id)} /> */}
          {/*  */}
          <Popover
            isOpen={publishConfirmation}
            onClose={setPublishConfirmation.off}
          >
            <PopoverTrigger>
              <ActionButton
                value="Publishi2"
                onClick={() => setPublishConfirmation.on()}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>
                <Text>Are you sure you want to publish this post?</Text>
                <ButtonGroup d="flex" mt="4" justifyContent="flex-end">
                  <Button
                    variant="outline"
                    onClick={setPublishConfirmation.off}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setPublishConfirmation.off();
                      onPublish(id);
                    }}
                    colorScheme="teal"
                  >
                    Publish
                  </Button>
                </ButtonGroup>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          {/*  */}
          <ActionButton value="Schedule" onClick={() => onSchedule(id)} />
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
        <HStack spacing="24px">
          {tone ? <Box>Tone: {tone}</Box> : null}

          <Box>
            Created on: {formatTime(createdAt)} {addedBy}
          </Box>
          {extra}
        </HStack>

        <Box>
          <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <PopoverTrigger>
              <Button color="#FF8B8B" variant="link">
                Delete
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>
                <Text>
                  Are you sure you want to delete that post? It will be gone
                  permanently.
                </Text>
                <ButtonGroup d="flex" mt="4" justifyContent="flex-end">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={() => onDelete(id)} colorScheme="teal">
                    Delete
                  </Button>
                </ButtonGroup>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </Flex>
    </Box>
  );
};
