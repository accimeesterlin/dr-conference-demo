import React, { useState } from "react";
import {
  Box,
  Divider,
  Flex,
  Button,
  Text,
  HStack,
  Center,
} from "@chakra-ui/react";
import createPersistedState from "use-persisted-state";
import { useToasts } from "react-toast-notifications";
import { createNewPost, removePostById } from "@Libs/api-post";
import { getSentiment } from "@Libs/api-tone";

// import { processSimpleOptions } from "./helpers";
import { LogoIcon, FolderIcon, CheckIcon } from "@Blocks/LetraIcon";
import { formatedDateAndTime } from "./helpers";
import { Dropdown } from "./atom";

const useLocalQueueState = createPersistedState("localQueueCache");

const ButtonHover = ({ text = "", hoverText = "", ...rest }) => {
  const [isOver, setOver] = useState(false);
  const onMouseOut = () => {
    setOver(false);
  };
  const onMouseOver = () => {
    setOver(true);
  };
  return (
    <Button {...rest} onMouseOut={onMouseOut} onMouseOver={onMouseOver}>
      {isOver ? hoverText : text}
    </Button>
  );
};

const InlineView = ({
  article,
  addToQueue,
  // addToQueueWithTone,
  removeFromQueue,
  inQueueId,
}) => {
  const { content, publishedAt } = article;
  const { date, time } = formatedDateAndTime(publishedAt);
  const [loading, setLoading] = useState(false);
  // const [tone, setTone] = useState("");

  const _addToQueue = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO better to keep it undefined
    const tone = "neutral";

    try {
      await addToQueue(article, tone);
    } catch (error) {
      console.error("Error setting in queue");
      console.error(error);
    }

    setLoading(false);
  };

  const _removeFromQueue = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await removeFromQueue(inQueueId, article);
    } catch (error) {
      console.error("Error setting in queue");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <Flex px="5" pt="5">
      <Box>IMG</Box>
      <Box pl="5" pb="5" maxW="598px">
        <Text noOfLines={2}>{content}</Text>
        <Flex mt="3">
          <ButtonHover
            borderRadius="25"
            bgColor="#000"
            color="#fff"
            onClick={inQueueId ? _removeFromQueue : _addToQueue}
            leftIcon={<LogoIcon fill="#fff" mt="1" boxSize={4} />}
            rightIcon={inQueueId ? <CheckIcon w={4} h={4} /> : null}
            _hover={{
              bgColor: "#000",
              transform: "scale(1.1)",
            }}
            text="LetraPublisher&trade;"
            hoverText={inQueueId ? "Remove from queue" : "Add to queue"}
            disabled={loading}
          />

          <Button
            ml="4"
            borderRadius="25"
            variant="outline"
            borderColor="#000"
            borderWidth="1.5"
            leftIcon={<FolderIcon boxSize={4} />}
            _hover={{
              bgColor: "none",
              transform: "scale(1.1)",
            }}
          >
            Save To Library
          </Button>
        </Flex>
      </Box>
      <Flex width="full" justifyContent="flex-end">
        <Box bgColor="rgba(134, 134, 159, 0.05)" px="2" pt="2">
          <Box fontWeight="medium" fontSize="14px" w="76px">
            {date}
          </Box>
          <Box fontWeight="light" fontSize="12px" w="76px">
            {time}
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export const InlineResults = ({
  articles,
  loadMore,
  isLoading,
  createdByField,
  teamId,
}) => {
  const [localQueue, updateLocalQueue] = useLocalQueueState({});
  const { addToast } = useToasts();

  if (!articles || articles.length === 0) {
    return (
      <Box p="8" bg="#fff">
        <Text textAlign="center" fontSize="lg" fontWeight="semibold">
          No articles. Try with new search terms.
        </Text>
      </Box>
    );
  }

  const addToQueue = (article, tone) =>
    createNewPost({
      source: "newsapi",
      teamId,
      content: article,
      tone,
      createdByField,
    })
      .then((r) => {
        const { id } = r;
        updateLocalQueue({
          ...localQueue,
          [article.url]: id,
        });
        return r;
      })
      .catch(() => {
        addToast("Action failed, try again", { appearance: "error" });
        throw new Error("Try again");
      }); // TODO
  const removeFromQueue = (id, article) =>
    removePostById(id)
      .then((r) => {
        const t = {
          ...localQueue,
        };
        delete t[article.url];
        updateLocalQueue(t);
        return r;
      })
      .catch((error) => {
        addToast("Action failed, try again", { appearance: "error" });
        console.error(error);
        throw new Error("Try again");
      });

  const addToQueueWithTone = (article, tone) => {
    const { content, description } = article;
    const text = content?.slice(0, 300) || description?.slice(0, 300) || "";

    if (tone) {
      return createNewPost({
        source: "newsapi",
        teamId,
        content: article,
        tone,
        createdByField,
      })
        .then((r) => {
          const { id } = r;
          updateLocalQueue({
            ...localQueue,
            [article.url]: id,
          });
          return r;
        })
        .catch((err) => {
          addToast("Action failed, try again", { appearance: "error" });
          console.error(err);
          throw new Error("Try again");
        });
    }

    return getSentiment(text).then((resp) =>
      createNewPost({
        source: "newsapi",
        teamId,
        content: article,
        tone: resp,
        createdByField,
      }).catch((err) => {
        console.error(err);
        addToast("Action failed, try again", { appearance: "error" });
        throw new Error("Try again");
      })
    );
  };

  return (
    <Box>
      <HStack px="5" justifyContent="space-between">
        <Dropdown text="Publication" />
        <Dropdown text="Published" />
      </HStack>
      <Box bgColor="#fff">
        {articles.map((el) => (
          <InlineView
            key={el.url}
            article={el}
            addToQueue={addToQueue}
            removeFromQueue={removeFromQueue}
            addToQueueWithTone={addToQueueWithTone}
            inQueueId={localQueue[el.url]}
          />
        ))}
      </Box>
      <Divider />

      {loadMore ? (
        <Center my="2" h="100px" onClick={loadMore}>
          <Button
            bg="brand.green"
            color="#fff"
            size="lg"
            isLoading={isLoading}
            loadingText="Loading"
          >
            Load more
          </Button>
        </Center>
      ) : null}
    </Box>
  );
};
