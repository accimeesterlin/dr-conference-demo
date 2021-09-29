import React, { createRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Heading,
  Flex,
  Box,
  HStack,
  Text,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  IconButton,
  VStack,
  Button,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { RefreshButton, UploadButton } from "@Blocks/Buttons";
import { ResizableTextArea } from "@Blocks/TextArea";

const MetaInfo = ({ label, value }) => (
  <VStack align="flex-start">
    <Text marginRight={16} fontWeight="regular" fontSize={14}>
      {label}
    </Text>
    <Text fontWeight="medium" fontSize={18} color="brand.green">
      {value}
    </Text>
  </VStack>
);

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

export function EditDrawer({ article, onCancel }) {
  // const [channel, setChannel] = useState("wp");
  const titleRef = createRef();
  const {
    register,
    // handleSubmit,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      title: article.title || "",
      content: article.content.join("\n") || "",
    },
  });
  const watchAllFields = watch();
  console.log(watchAllFields);

  return (
    <DrawerContent>
      <DrawerHeader
        backgroundColor="#414155"
        padding="8"
        height="96px"
        color="#ffffff"
      >
        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="md" as="h4">
            Article - Edit
          </Heading>
          <IconButton
            onClick={onCancel}
            border="none"
            variant="outline"
            aria-label="Cancel and close"
            icon={<CloseIcon w={4} h={4} />}
          />
        </HStack>
      </DrawerHeader>
      <DrawerBody padding={0}>
        <HStack
          padding="16px 32px"
          justifyContent="space-between"
          borderBottom="1px solid #D8D8D8"
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            border="3px solid #16D898"
            width="91px"
            height="65px"
          >
            <span width="80px" height="54px">
              IMG
            </span>
            {/* <Image width="80px" height="54px"/> */}
          </Flex>
          <UploadButton />
        </HStack>
        <Box padding="16px 32px 32px" borderBottom="1px solid #D8D8D8">
          <HStack justifyContent="space-between" mb="4">
            <HStack>
              <MetaInfo label="Tone" value="Neutral" />
              <MetaInfo label="Length" value="Medium (10 - 15 words)" />
            </HStack>

            <RefreshButton />
          </HStack>

          <Heading
            as="h3"
            size="md"
            fontSize="28px"
            color="#414155"
            fontWeight="light"
            contentEditable
            suppressContentEditableWarning
            outline="0px solid transparent"
            ref={titleRef}
            onKeyUp={() => {
              console.log("cool");
              console.log(titleRef.current.innerText);
            }}
          >
            {article.title}
          </Heading>
        </Box>

        <Box padding="16px 32px">
          <HStack justifyContent="space-between" mb="4">
            <HStack>
              <MetaInfo label="Tone" value="Neutral" />
              <MetaInfo label="Length" value="350 - 475 words" />
            </HStack>

            <RefreshButton />
          </HStack>
        </Box>

        <Box padding="16px 32px">
          {/* <Textarea
            className="auto-resize-textarea"
            placeholder="Here is a sample placeholder"
            onKeyUp={autoGrowTextArea}
          /> */}

          <ResizableTextArea
            id="contentEditor"
            defaultValue={getValues().content}
            {...register("content")}
          />

          {/* <Text contentEditable mb="3" outline="0px solid transparent">
            {article.content.join("\n\n\n")}
          </Text> */}

          {/* {article.content.map((el, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Text mb="3" key={`content-${article._key ?? article.id}-${i}`}>
              {el}
            </Text>
          ))} */}
        </Box>

        <Box mt="8" />
      </DrawerBody>
      <DrawerFooter borderTop="1px solid #D8D8D8">
        <HStack width="100%" justifyContent="space-between">
          <Box>
            {/* <Text fontSize={14}>Publishing Time:</Text>
            <Text fontSize={18} fontWeight="medium" color="brand.green">
              Next Available (12:16pm)
            </Text> */}
          </Box>
          <MainActionButton text="Next: Twitter" />
        </HStack>
      </DrawerFooter>
    </DrawerContent>
  );
}
