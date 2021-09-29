/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  Box,
  Heading,
  Flex,
  SimpleGrid,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { DateTime } from "luxon";

import { PageTopMenu, LeftPanelPortal } from "@Blocks";
import { DailyScheduleView } from "@Blocks/publisher/DailyScheduleView";
import { loadPostsForMonth, getOnePost } from "@Libs/api-post";
import { generateMonthsRange, calendarValues } from "@Utils/format";
import { DayBox, WeekHeader } from "./PublisherCalendar";

// TODO Important we need the time in local time   IMPORTANT EDGE CASES

// 'In the morning'
// 2021-08-01T00:00:00.000-04:00
// 2021-08-01T04:00:00.000Z

// 'In the afternon'
// 2021-08-31T23:59:59.000-04:00
// 2021-09-01T03:59:59.000Z

// TODO MAKE SURE THE CALENDAR IS MOUNT ONLY ON THE CLIENT

export const PublisherMenu = ({
  teamId,
  onHourClick,
  onDayClick,
  clearFilter,
}) => {
  const toast = useToast();
  const [activeDay, setActiveDay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calendarInfo, setCalendarInfo] = useState(calendarValues);
  const [posts, setPosts] = useState([]); // contains the post which have been scheduled for the month
  const monthRef = useRef(null);

  const months = generateMonthsRange(calendarInfo.firstDayUTC);

  const fillCalendar = async (_nextToken, firstDay) => {
    let r = {};

    try {
      r = await loadPostsForMonth(teamId, firstDay, {
        nextToken: _nextToken,
      });

      if (firstDay !== calendarInfo.firstDayUTC) return; // this means another month is active
    } catch (error) {
      console.error("we could not load data");
      console.error(error);
    }

    const { items, nextToken } = r;
    if (_nextToken) {
      setPosts((prev) => [...prev, ...items]);
    } else {
      setPosts((prev) => [...items]);
    }

    if (nextToken) {
      fillCalendar(nextToken, firstDay);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!calendarInfo.firstDayUTC) return; // just a precaution
    setActiveDay(() => null);
    setPosts(() => []);
    setLoading(() => true);
    fillCalendar(null, calendarInfo.firstDayUTC);
  }, [calendarInfo.firstDayUTC]);

  const previousMonth = () => {
    setCalendarInfo(
      calendarValues(
        DateTime.fromISO(calendarInfo.firstDay).plus({ months: -1 })
      )
    );
  };
  const nextMonth = () => {
    setCalendarInfo(
      calendarValues(
        DateTime.fromISO(calendarInfo.firstDay).plus({ months: 1 })
      )
    );
  };

  const _onDateClick = (data) => {
    // we highlight the background of cell which where click.
    if (!postsByDay[data.date]?.length) {
      toast({
        title: "No post schedule.",
        description:
          "No post have been schedule for this day. Schedule one or refresh the page to get the latest information",
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
      });
      return;
    }

    if (activeDay?.date === data.date) {
      setActiveDay(null);
      clearFilter();
    } else {
      setActiveDay(data);
      onDayClick(postsByDay[data.date].map((el) => el.id));
    }
  };

  const postsByDay = posts.reduce(
    (accumulator, currentValue) => {
      // TODO use the appropriate schedule field for final version
      if (!currentValue.scheduleTime) return accumulator;

      const marker = currentValue.scheduleTime.slice(0, 10);
      if (accumulator[marker]) {
        accumulator[marker].push(currentValue);
        accumulator.length = accumulator.length + 1;
      } else {
        accumulator[marker] = [currentValue];
        accumulator.length = accumulator.length + 1;
      }

      return accumulator;
    },
    { length: 0 }
  );

  return (
    <>
      <PageTopMenu>
        <Text
          fontWeight="medium"
          fontSize="22"
          // margin="auto  10px auto 0px"
          marginRight="10px"
        >
          Article Queue (TODO)
        </Text>
        <Text
          fontWeight="medium"
          fontSize="17"
          // margin="auto 0"
          color="brand.green"
        >
          Scheduled ({postsByDay.length})
        </Text>
        {loading ? <Text ml="4">loading...</Text> : null}
      </PageTopMenu>
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
            {calendarInfo.month}
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
        <SimpleGrid key={calendarInfo.firstDayUTC} columns={7}>
          {calendarInfo.dates.map((el, i) => {
            // console.log(el)
            // console.log("the date");
            // console.log(el.date);
            // const v = el.date;
            // if (v === "2021-09-14") {
            //   console.log("in v");
            //   console.log(postsByDay["2021-09-14"]);
            //   console.log(postsByDay[v]);
            //   console.log(postsByDay[el.date]);
            // }
            // // console.log(el.date, postsByDay[el.date])
            return (
              <DayBox
                key={`${el.date}-${el.dateISO}`}
                count={i + 1}
                data={el}
                onDateClick={_onDateClick}
                isSelected={activeDay?.dateISO === el.dateISO}
                value={postsByDay[el.date] ? postsByDay[el.date].length : 0}
              />
            );
          })}
        </SimpleGrid>
      </Box>
      <LeftPanelPortal>
        {activeDay ? (
          <DailyScheduleView
            key={activeDay.date}
            day={activeDay.date}
            data={postsByDay[activeDay.date]}
            onHourClick={onHourClick}
          />
        ) : null}
      </LeftPanelPortal>
    </>
  );
};
