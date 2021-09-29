import React, { useState } from "react";
import { Box, Heading, Flex, SimpleGrid, IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { DateTime } from "luxon";

const beforePadding = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
  Sat: 5,
  Sun: 6,
};
const afterPadding = {
  Mon: 6,
  Tue: 5,
  Wed: 4,
  Thu: 3,
  Fri: 2,
  Sat: 1,
  Sun: 0,
};

export const DayBox = ({ data, count, onDateClick, isSelected = true }) => {
  const { date, isCurrentMonth } = data;

  let color = "";
  if (isSelected) {
    color = "#414155";
  } else {
    color = isCurrentMonth ? "brand.green" : "brand.lightGray";
  }

  return (
    <Box
      paddingTop="2"
      paddingLeft="4"
      paddingRight="4"
      paddingBottom="8"
      borderBottom="1px solid #EAEDF3"
      borderRight={count !== 0 && count % 7 === 0 ? "" : "1px solid #EAEDF3"}
      color={color}
      backgroundColor={isSelected ? "#C5F5E5" : null}
      fontWeight="semibold"
    >
      <Box
        onClick={() => {
          onDateClick(data);
        }}
        _hover={{
          cursor: "pointer",
        }}
      >
        {date}
      </Box>
    </Box>
  );
};

const WeekHeader = ({ value }) => (
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

const calendarValues = (startWith) => {
  const d = new Date();
  d.setDate(1);
  d.setUTCHours(0);
  const start = startWith ?? DateTime.fromISO(d.toISOString().slice(0, 10));

  let dates = [];
  let current = start;
  const beforePaddingNumber = beforePadding[current.toFormat("EEE")];

  while (current.month === start.month) {
    dates.push({
      date: current.day,
      dateISO: current.toISO(),
      isCurrentMonth: true,
    });
    current = current.plus({ days: 1 });
  }

  current = current.plus({ days: -1 });
  const afterPaddingNumber = afterPadding[current.toFormat("EEE")];

  if (beforePaddingNumber > 0) {
    for (let i = 1; i <= beforePaddingNumber; i += 1) {
      const dd = start.plus({ days: -i });
      dates = [
        {
          date: dd.day,
          dateISO: dd.toISO(),
          isCurrentMonth: false,
        },
        ...dates,
      ];
    }
  }

  if (afterPaddingNumber > 0) {
    for (let ii = 1; ii <= afterPaddingNumber; ii += 1) {
      const dd = current.plus({ days: ii });

      dates = [
        ...dates,
        {
          date: dd.day,
          dateISO: dd.toISO(),
          isCurrentMonth: false,
        },
      ];
    }
  }

  return { firstDay: start.toISO(), dates };
};

export function GenericCalendar({ onDateSelected, wrapper = {} }) {
  const [activeDate, setActiveDate] = useState("");
  const [state, setState] = useState(calendarValues);
  const monthFormat = "MMMM, yyyy";
  const month = DateTime.fromISO(state.firstDay).toFormat(monthFormat);

  const previousMonth = () => {
    setState(
      calendarValues(DateTime.fromISO(state.firstDay).plus({ months: -1 }))
    );
  };
  const nextMonth = () => {
    setState(
      calendarValues(DateTime.fromISO(state.firstDay).plus({ months: 1 }))
    );
  };

  const _onDateClick = (data) => {
    // we highlight the background of cell which where click.
    if (activeDate === data.dateISO) {
      setActiveDate("");
    } else {
      setActiveDate(data.dateISO);
    }
    console.log("On Data Click: ", data);
  };

  return (
    <Box {...wrapper}>
      <Box padding="4" backgroundColor="white" mb="4" p="8" borderRadius="md">
        <Flex direction="row" justifyContent="space-between">
          <Box>
            <IconButton
              variant="link"
              aria-label="Next month"
              size="md"
              icon={<ArrowLeftIcon w={4} h={4} color="brand.lightGray" />}
              onClick={previousMonth}
            />
          </Box>
          <Heading as="h4" fontWeight="medium" fontSize={20}>
            {month}
          </Heading>
          <Box>
            <IconButton
              variant="link"
              aria-label="Next month"
              size="md"
              icon={<ArrowRightIcon w={4} h={4} color="brand.lightGray" />}
              onClick={nextMonth}
            />
          </Box>
        </Flex>
        <Flex direction="row" marginTop="8">
          <WeekHeader value="Mon" />
          <WeekHeader value="Tue" />
          <WeekHeader value="Wed" />
          <WeekHeader value="Thu" />
          <WeekHeader value="Fri" />
          <WeekHeader value="Sat" />
          <WeekHeader value="Sun" />
        </Flex>
        <SimpleGrid columns={7}>
          {state.dates.map((el, i) => (
            <DayBox
              key={`${el.dateISO}`}
              count={i + 1}
              data={el}
              onDateClick={_onDateClick}
              isSelected={activeDate === el.dateISO}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
