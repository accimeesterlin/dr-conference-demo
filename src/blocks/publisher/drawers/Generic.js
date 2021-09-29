import React, { useState, useEffect } from "react";
import {
  Heading,
  Flex,
  Box,
  HStack,
  Text,
  DrawerHeader,
  IconButton,
  VStack,
  Button,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { fetchTrendsByDate } from "@Libs/api-analytics";
import { CloseIcon } from "@chakra-ui/icons";
import { RefreshButton, UploadButton } from "@Blocks/Buttons";

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

function MainActionButton({ text, ...rest }) {
  return (
    <Button
      color="#ffffff"
      backgroundColor="brand.green"
      size="lg"
      borderRadius="full"
      padding="0 48px"
      {...rest}
    >
      {text}
    </Button>
  );
}

export function Line() {
  return <Box height="1px" backgroundColor="#D8D8D8" />;
}

export function Wrapper({ children, ...rest }) {
  return (
    <Box pt="16px" pb="16px" pr="32px" pl="32px" mb="32px" {...rest}>
      {children}
    </Box>
  );
}

// ORDER #1
export function ImageSection({
  onUpload = () => {
    console.log("UPLOAD NEEDS TO BE IMPLEMENTED");
  },
}) {
  return (
    <Wrapper>
      <HStack justifyContent="space-between">
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
        <UploadButton onClick={onUpload} />
      </HStack>
    </Wrapper>
  );
}

export function FooterVariant3({
  ctaText = "",
  timeText = "",
  ctaClick = () => { },
}) {
  return (
    <Wrapper>
      <HStack justifyContent="space-between">
        <Box>
          {/* <Text fontSize={14}>Publishing Time:</Text>
          <Text fontSize={18} fontWeight="medium" color="brand.green">
            {timeText}
          </Text> */}
        </Box>
        <MainActionButton text={ctaText} onClick={ctaClick} />
      </HStack>
    </Wrapper>
  );
}

export function FooterVariant2({
  ctaText = "",
  secondaryText = "",
  ctaClick = () => { },
  onSecondaryActionCLick = () => { },
}) {
  return (
    <Wrapper>
      <HStack justifyContent="space-between">
        <Box>
          {secondaryText ? (
            <Button
              color="brand.green"
              variant="link"
              onClick={onSecondaryActionCLick}
            >
              {secondaryText}
            </Button>
          ) : null}
        </Box>
        <MainActionButton text={ctaText} onClick={ctaClick} />
      </HStack>
    </Wrapper>
  );
}

export function CustomizeHeader({ drawerTitle = "", onCancel }) {
  return (
    <DrawerHeader
      backgroundColor="#414155"
      padding="8"
      height="96px"
      color="#ffffff"
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Heading size="md" as="h4">
          {drawerTitle}
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
  );
}

export function TitleSection({
  title,
  toneValue = "Neutral",
  lengthValue = "Medium (10 - 15 words)",
  generateNewTitle = () => {
    console.log("I am refereshing");
  },
}) {
  return (
    <Wrapper>
      <HStack justifyContent="space-between" mb="4">
        <HStack>
          <MetaInfo label="Tone" value={toneValue} />
          <MetaInfo label="Length" value={lengthValue} />
        </HStack>
        <RefreshButton onClick={generateNewTitle} />
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
      >
        {title}
      </Heading>
    </Wrapper>
  );
}

export function ContentSection({
  toneValue = "Neutral",
  lengthValue = "350 - 475 words",
  generateNewContent = () => {
    console.log("Generate new content");
  },
  children,
}) {
  return (
    <Wrapper>
      <HStack justifyContent="space-between" mb="8">
        <HStack>
          <MetaInfo label="Tone" value={toneValue} />
          <MetaInfo label="Length" value={lengthValue} />
        </HStack>

        <RefreshButton onClick={generateNewContent} />
      </HStack>

      {children}
    </Wrapper>
  );
}

export function TwitterHashtags({ addTwitterHashTag }) {
  const [dailyHashTags, setDailyHashTags] = useState([]);
  useEffect(() => {
    fetchTrendsByDate().then((response) => {
      const { data } = response;
      const daily = data.length ? data[0].topics : [];
      setDailyHashTags(daily);
    });
  }, []);
  return (
    <Wrapper>
      <Text fontSize="sm">
        Popular Hashtags Associated With:{" "}
        <Text as="span" fontWeight="semibold">
          Pfizer, Coronavirus, Vaccine, US Food & Drug Administration
        </Text>
      </Text>
      <Wrap spacing="20px" mt="4">
        {dailyHashTags.slice(0, 15).map((el, i) => (
          <WrapItem key={`tags-${el.name}-${i}`}>
            <Button
              colorScheme="teal"
              variant="outline"
              size="lg"
              borderRadius="50px"
              borderColor="#16D898"
              color="#00A26D"
              onClick={() => addTwitterHashTag(el.name)}
            >
              #{el.name}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
    </Wrapper>
  );
}
