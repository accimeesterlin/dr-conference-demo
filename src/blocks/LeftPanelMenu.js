import React from "react";
import { Flex, Text, Img, Link as CKLink } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const MenuItemWrapper = ({
  alt = "",
  text,
  isActive = false,
  imgGray,
  imgGreen,
  number,
  navigateTo,
}) =>
  isActive ? (
    <Flex
      direction="row"
      verticalAlign="middle"
      height="48px"
      lineHeight="48px"
      paddingLeft="5px"
      color="#16D898"
      background="rgba(22, 216, 152, 0.1)"
      boxShadow="inset 3px 0px 0px #16D898"
      alignItems="center"
    >
      <Img src={imgGreen} alt={alt} width="20px" height="24px" />
      <Link href={navigateTo} passHref>
        <CKLink
          marginLeft="16px"
          _hover={{
            textDecoration: "none",
            color: "#16d898",
          }}
        >
          {text}
        </CKLink>
      </Link>
      {number ? (
        <Text marginLeft="auto" paddingLeft="2" paddingRight="2">
          {number}
        </Text>
      ) : null}
    </Flex>
  ) : (
    <Flex
      direction="row"
      verticalAlign="middle"
      height="24px"
      lineHeight="24px"
      paddingLeft="5px"
      alignItems="center"
    >
      <Img src={imgGray} alt={alt} width="20px" height="24px" />
      <Link href={navigateTo} passHref>
        <CKLink
          marginLeft="16px"
          _hover={{
            textDecoration: "none",
            color: "#16d898",
          }}
        >
          {text}
        </CKLink>
      </Link>
      {number ? (
        <Text marginLeft="auto" paddingLeft="2" paddingRight="2">
          {number}
        </Text>
      ) : null}
    </Flex>
  );

const hideForPaths = ["/teams"];

const Wrapper = ({ children }) => (
  <Flex
    color="#86869F"
    fontWeight="medium"
    height="180px"
    direction="column"
    justifyContent="space-between"
  >
    {children}
  </Flex>
);

export function LeftPanelMenu({ page, queueQuantity }) {
  const {
    query: { id },
    pathname,
  } = useRouter();

  const hide = hideForPaths.includes(pathname);

  if (hide) {
    return (
      <Wrapper>
        <MenuItemWrapper
          isActive={page.startsWith("/team")}
          text="Your Teams"
          imgGray="/assets/team-chat-gray-icon.svg"
          imgGreen="/assets/team-chat-green-icon.svg"
          alt="Team Icon"
          navigateTo="/teams"
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <MenuItemWrapper
        isActive={page.startsWith("/search")}
        text="Search & Articles"
        imgGray="/assets/file-gray-icon.svg"
        imgGreen="/assets/file-green-icon.svg"
        alt="Search & Articles Icon"
        navigateTo={`/search/${id}`}
      />
      <MenuItemWrapper
        isActive={page.startsWith("/saved")}
        text="Saved Searches"
        imgGray="/assets/folder-gray-icon.svg"
        imgGreen="/assets/folder-green-icon.svg"
        alt="Saved Searched Icon"
        navigateTo={`/saved/${id}`}
      />
      <MenuItemWrapper
        isActive={page.startsWith("/publisher")}
        text="DR ConferencePublisher&trade;"
        imgGray="/assets/DR Conference-gray-icon.svg"
        imgGreen="/assets/DR Conference-green-icon.svg"
        alt="DR Conference Publisher Icon"
        number={queueQuantity}
        navigateTo={`/publisher/${id}`}
      />
      <MenuItemWrapper
        isActive={page.startsWith("/team")}
        text="Your Team"
        imgGray="/assets/team-chat-gray-icon.svg"
        imgGreen="/assets/team-chat-green-icon.svg"
        alt="Team Icon"
        navigateTo="/teams"
      />
    </Wrapper>
  );
}
