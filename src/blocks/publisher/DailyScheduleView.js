import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  PopoverTrigger,
  Popover,
  Circle,
  useToast,
} from "@chakra-ui/react";
import { PublishPopover } from "@Blocks";
import { DateTime } from "luxon";

function Number({ isFirst = false, number }) {
  if (!number) return null;
  return (
    <Circle
      color="#ffffff"
      backgroundColor="rgba(0, 162, 109, 1)"
      marginLeft={isFirst ? "10px" : "20px"}
      height="20px"
      width="20px"
      padding="2px"
      borderRadius="50%"
      fontSize="10px"
    >
      {number}
    </Circle>
  );
}

function Line({
  times,
  start,
  end,
  isFirst = false,
  isLast = false,
  endNumber,
  data,
  selected,
  onHourClick,
}) {
  // remove the startNumber
  const am = data.filter((el) => el.localISO.slice(11, 13) === times[0]);

  const pm = data.filter((el) => el.localISO.slice(11, 13) === times[1]);

  const selectedStyles = {
    bgColor: "rgba(22, 216, 152, 0.25)",
  };

  let amSelected = {};
  let pmSelected = {};

  if (selected === times[0]) {
    amSelected = {
      ...selectedStyles,
    };
  }

  if (selected === times[1]) {
    pmSelected = {
      ...selectedStyles,
    };
  }

  return (
    <Flex height="34px" direction="row" fontWeight="medium" fontSize="12px">
      <Flex
        alignItems="center"
        direction="row"
        width="50%"
        // lineHeight="34px"
        verticalAlign="middle"
        borderBottom={!isLast ? "1px solid #EAEDF3" : ""}
        onClick={() => {
          const ides = am.map((el) => el.id);
          onHourClick(times[0], ides);
        }}
        cursor="pointer"
        {...amSelected}
      >
        <Box> {isFirst ? `${start} am` : start} </Box>
        <Number number={am.length} isFirst={isFirst} />
      </Flex>
      <Flex
        alignItems="center"
        direction="row"
        width="50%"
        // lineHeight="34px"
        verticalAlign="middle"
        borderBottom={!isLast ? "1px solid #EAEDF3" : ""}
        onClick={() => {
          const ides = pm.map((el) => el.id);

          onHourClick(times[1], ides);
        }}
        cursor="pointer"
        {...pmSelected}
      >
        <Box> {isFirst ? `${end} pm` : end} </Box>
        <Number number={pm.length} isFirst={isFirst} />
      </Flex>
    </Flex>
  );
}

export const DailyScheduleView = ({ day, data, onHourClick }) => {
  const toast = useToast();
  const [selected, setSelected] = useState(false);
  const _data = (data || []).map((el) => {
    return {
      ...el,
      localISO: DateTime.fromISO(el.scheduleTime).toString(),
    };
  });

  const updateSelected = (v) => {
    if (selected === v) {
      setSelected("");
    } else {
      setSelected(v);
    }
  };

  const _onHourClick = (hour, ides) => {
    setSelected(hour);

    if (!ides.length) {
      toast({
        title: "No post schedule.",
        description:
          "No post have been schedule for this time range. Schedule one or refresh the page to get the latest information",
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
      });
      return;
    }

    onHourClick(ides);
  };

  return (
    <Box>
      <Box fontSize="14px">Schedule for: </Box>
      <Text fontSize="14px" fontWeight="medium">
        {DateTime.fromISO(day).toFormat("DDDD")}
      </Text>
      <Box
        marginTop="16px"
        padding="16px"
        backgroundColor="white"
        border="1px solid #EAEDF3"
      >
        <Line
          data={data}
          selected={selected}
          times={["00", "12"]}
          data={_data}
          start="12:00"
          end="12:00"
          onHourClick={_onHourClick}
          isFirst
        />
        <Line
          data={data}
          selected={selected}
          times={["01", "13"]}
          data={_data}
          start="1:00"
          end="1:00"
          onHourClick={_onHourClick}
        />
        <Line
          data={data}
          selected={selected}
          times={["02", "14"]}
          data={_data}
          start="2:00"
          end="2:00"
          onHourClick={_onHourClick}
        />
        <Line
          data={data}
          selected={selected}
          times={["03", "15"]}
          data={_data}
          start="3:00"
          end="3:00"
          onHourClick={_onHourClick}
        />
        <Line
          data={data}
          selected={selected}
          times={["04", "16"]}
          data={_data}
          start="4:00"
          end="4:00"
          onHourClick={_onHourClick}
        />
        <Line
          data={data}
          selected={selected}
          times={["05", "17"]}
          data={_data}
          start="5:00"
          end="5:00"
          onHourClick={_onHourClick}
        />
        <Line
          data={data}
          selected={selected}
          times={["06", "18"]}
          data={_data}
          start="6:00"
          end="6:00"
          onHourClick={_onHourClick}
        />
        <Line
          data={data}
          selected={selected}
          times={["07", "19"]}
          data={_data}
          start="7:00"
          end="7:00"
          onHourClick={_onHourClick}
        />
        <Line
          data={data}
          selected={selected}
          times={["08", "20"]}
          data={_data}
          start="8:00"
          end="8:00"
          onHourClick={_onHourClick}
        />
        <Line
          data={data}
          selected={selected}
          times={["09", "21"]}
          data={_data}
          start="9:00"
          end="9:00"
          onHourClick={_onHourClick}
        />
        <Line
          data={data}
          selected={selected}
          times={["10", "22"]}
          data={_data}
          start="10:00"
          end="10:00"
          onHourClick={_onHourClick}
        />
        <Line
          data={data}
          selected={selected}
          times={["11", "23"]}
          data={_data}
          start="11:00"
          end="11:00"
          onHourClick={_onHourClick}
          isLast
        />
      </Box>
    </Box>
  );
};
