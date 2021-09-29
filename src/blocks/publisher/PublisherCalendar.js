/**
 * Backup of the original version.
 */
import React, { useState } from "react";
import {
  Box,
  Heading,
  Flex,
  SimpleGrid,
  IconButton,
  Circle,
} from "@chakra-ui/react";
export const NumberBox = ({ value, isCurrentMonth, isSelected, hasPassed }) => {
  let styles = {
    bgColor: "rgba(74, 74, 74, 0.25)",
    color: " rgba(255, 255, 255, 1)",
  };

  if (isCurrentMonth && !hasPassed) {
    styles = {
      bgColor: "rgba(22, 216, 152, 0.25)",
      color: "rgba(0, 162, 109, 1)",
    };
  }

  if (isSelected) {
    styles = {
      bgColor: "rgba(0, 162, 109, 1)",
      color: "rgba(255, 255, 255, 1)",
    };
  }

  return (
    <Circle size="25px" mt="4" fontSize="small" {...styles}>
      <span>{value}</span>
    </Circle>
  );
};

export const DayBox = ({
  data,
  count,
  onDateClick,
  value,
  isSelected = false,
}) => {
  const { date, isCurrentMonth, hasPassed } = data;

  let color = "brand.lightGray";
  // let color = "brand.green";

  if (isCurrentMonth && hasPassed) {
    color = "#414155";
  }

  if (isCurrentMonth && !hasPassed) {
    color = "brand.green";
  }

  if (isSelected) {
    color = "#414155";
  }

  return (
    <Box
      paddingTop="2"
      paddingLeft="4"
      paddingRight="4"
      paddingBottom="4"
      borderBottom="1px solid #EAEDF3"
      borderRight={count !== 0 && count % 7 === 0 ? "" : "1px solid #EAEDF3"}
      color={color}
      backgroundColor={isSelected ? "#C5F5E5" : null}
      fontWeight="semibold"
    >
      <Flex
        justifyContent="space-between"
        onClick={() => {
          onDateClick(data);
        }}
        _hover={{
          cursor: "pointer",
        }}
      >
        <Box>{date.slice(8, 10)}</Box>
        {value ? (
          <NumberBox
            value={value}
            isCurrentMonth={data.isCurrentMonth}
            isSelected={isSelected}
            hasPassed={hasPassed}
          />
        ) : null}
      </Flex>
    </Box>
  );
};

export const WeekHeader = ({ value }) => (
  <Box
    height="48px"
    width="128px"
    fontWeight="semibold"
    fontSize={16}
    color="#86869F"
    paddingLeft="4"
    paddingBottom="8"
    borderBottom="1px solid #EAEDF3"
  >
    {value}
  </Box>
);
