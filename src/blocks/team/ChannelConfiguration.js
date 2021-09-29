import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  UnorderedList,
  ListItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { FacebookChannel } from "./ChannelFacebook";
import { TwitterChannel } from "./ChannelTwitter";

import { SectionView } from "./Form";
import { WordPressChannel } from "./ChannelWordpress";

function AboutChannel({ name, extra }) {
  return (
    <Box as="span">
      {name}{" "}
      <Box as="span" ml="6">
        {extra}
      </Box>
    </Box>
  );
}

function ShowChannels({ id, channels, onEdit }) {
  // TODO Show only the logo of the channel instead of the text

  if (channels.length === 0) {
    return (
      <Text my="4" color="gray.600">
        NO CHANNEL CONFIGURED YET
      </Text>
    );
  }

  return channels.map((el) => (
    <Box key={`${id}/${el.type}`} mb="4">
      <Text>
        {el.type === "wp" ? (
          <AboutChannel name={el.name} extra="(wordpress site)" />
        ) : null}

        {el.type === "twitter" ? (
          <AboutChannel name={el.userName} extra="(twitter handle)" />
        ) : null}

        {el.type === "fbpage" ? (
          <AboutChannel name="Facebook pages" extra="" />
        ) : null}

        <Button
          variant="link"
          fontWeight="normal"
          colorScheme="blue"
          onClick={() => {
            onEdit(el);
          }}
        >
          edit
        </Button>
      </Text>
      {el.type === "fbpage" ? (
        <UnorderedList>
          {el.config.map((page) => (
            <ListItem key={`${id}/${el.type}/${page.id}`}>{page.name}</ListItem>
          ))}
        </UnorderedList>
      ) : null}
    </Box>
  ));
}

function generateModalTitle(type) {
  switch (type) {
    case "wp":
      return "Wordpress channel";
    case "fbpage":
      return "Facebook channel";
    case "twitter":
      return "Twitter channel";
    default:
      return "Configure channel";
  }
}

export function ChannelConfiguration({ team, updateTeam }) {
  const [info, setInfo] = useState({ type: "none" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [channels, setChannels] = useState(() =>
    Array.isArray(team.channels) ? team.channels : []
  );

  function _onClose() {
    setInfo({ type: "none" });
    onClose();
  }

  async function saveChannelInformation(values) {
    const final = {
      ...info,
      ...values,
    };

    let isUpdate = false;
    let data = channels.map((ch) => {
      if (ch.type === final.type) {
        isUpdate = true;
        return final;
      }
      return ch;
    });

    if (!isUpdate) {
      data = [...data, final];
    }

    const result = await updateTeam({
      channels: data.map((el) => JSON.stringify(el)),
    });
    if (result.ok) {
      setChannels(data);
      _onClose();
    }
  }

  const channelTypes = channels.map((el) => el.type);

  return (
    <Box>
      <SectionView
        titleText="Publication Channels"
        extraInfoText="Configure the channels where posts will be sent"
        actionButtonText="Add New Channel"
        onClick={onOpen}
      >
        <ShowChannels
          channels={channels}
          id={team.id}
          onEdit={(value) => {
            setInfo(value);
            onOpen();
          }}
        />
      </SectionView>

      {/* Modal  */}
      <Modal isOpen={isOpen} onClose={_onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom="1px solid #eaeaea" mb="4">
            {generateModalTitle(info.type)}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {info.type === "none" ? (
              <Box>
                {!channelTypes.includes("wp") ? (
                  <Button
                    m={2}
                    colorScheme="teal"
                    size="md"
                    onClick={() => {
                      setInfo({ type: "wp" });
                    }}
                    w="100%"
                  >
                    Wordpress website.
                  </Button>
                ) : null}

                {!channelTypes.includes("fbpage") ? (
                  <Button
                    colorScheme="teal"
                    m={2}
                    size="md"
                    onClick={() => {
                      setInfo({ type: "fbpage" });
                    }}
                    w="100%"
                  >
                    Facebook.
                  </Button>
                ) : null}

                {!channelTypes.includes("twitter") ? (
                  <Button
                    colorScheme="teal"
                    m={2}
                    size="md"
                    onClick={() => {
                      setInfo({ type: "twitter" });
                    }}
                    w="100%"
                  >
                    Twitter
                  </Button>
                ) : null}
              </Box>
            ) : null}

            {info.type === "wp" ? (
              <WordPressChannel data={info} onSave={saveChannelInformation} />
            ) : null}

            {info.type === "fbpage" ? (
              <FacebookChannel onSave={saveChannelInformation} />
            ) : null}

            {info.type === "twitter" ? <TwitterChannel data={info} /> : null}
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" onClick={_onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
