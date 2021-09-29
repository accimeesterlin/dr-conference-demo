import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Flex,
  Button,
  IconButton,
  Wrap,
  WrapItem,
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  List,
  ListItem,
} from "@chakra-ui/react";
import { CloseIcon, TriangleDownIcon } from "@chakra-ui/icons";
// Match design can be better

const SearchInput = styled.input`
  font-size: 28px;
  color: #fff;
  background-color: #414155;
  border: none;
  margin-left: 20px;
  outline: none;

  &::placeholder {
    color: #16d898;
  }

  &::focus {
    outline: none;
  }
`;

const TermView = ({ item, remove, choice }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <WrapItem mb="2">
      <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={close}>
        <PopoverTrigger>
          <Button
            rightIcon={<TriangleDownIcon />}
            mr="0"
            pr="0"
            ml="20px"
            borderRightRadius="0"
            bgColor="#fff"
            borderLeftRadius="24px"
            onClick={open}
          >
            {item.name}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader px="6">Customize keyword!</PopoverHeader>
          <PopoverBody>
            <List role="menu" px="4">
              <ListItem
                role="menuitem"
                onClick={() => {
                  choice("AND", item.name);
                  close();
                }}
                py="2"
                cursor="pointer"
                _hover={{
                  bg: "gray.200",
                }}
              >
                Must Included
              </ListItem>
              <hr />
              <ListItem
                role="menuitem"
                onClick={() => {
                  choice("NOT", item.name);
                  close();
                }}
                py="2"
                cursor="pointer"
                _hover={{
                  bg: "gray.200",
                }}
              >
                Not Mentioned
              </ListItem>
              <hr />
              <ListItem
                role="menuitem"
                onClick={() => {
                  choice("OR", item.name);
                  close();
                }}
                py="2"
                cursor="pointer"
                _hover={{
                  bg: "gray.200",
                }}
              >
                Also Included
              </ListItem>
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Center
        bgColor="#fff"
        height="100%"
        borderRightRadius="24px"
        _hover={{
          backgroundColor: "gray.200",
        }}
        onClick={() => remove(item.name)}
      >
        <IconButton
          aria-label="Remove option"
          icon={
            <CloseIcon
              _hover={{
                backgroundColor: "gray.200",
              }}
            />
          }
          ml="0"
          borderLeftRadius="0"
          bgColor="#fff"
          size="sm"
          display="block"
          borderRightRadius="24px"
          px="1"
          _hover={{
            backgroundColor: "gray.200",
          }}
        />
      </Center>
    </WrapItem>
  );
};

export const SearchTerms = ({
  onSubmit,
  searchTerms: searchTermsValue,
  removeSearchTerms,
  updateSearchTerms,
  register,
}) => (
  <Flex
    as="form"
    onSubmit={onSubmit}
    backgroundColor="#414155"
    p="20px"
    w="100%"
  >
    <img src="/iris-scan-search.svg" alt="" />
    <Wrap>
      {searchTermsValue && searchTermsValue.length > 0
        ? searchTermsValue.map((item) => (
            <TermView
              key={item.name}
              item={item}
              remove={removeSearchTerms}
              choice={updateSearchTerms}
            />
          ))
        : null}
    </Wrap>
    <SearchInput
      type="text"
      {...register("q")}
      placeholder="Enter Search Terms"
    />
  </Flex>
);
