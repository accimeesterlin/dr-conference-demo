import React from "react";
import { Box } from "@chakra-ui/react";
// import { DateTime } from "luxon";

import { GenericCalendar } from "./Calendar";

export function DateAndTimePicker() {
  const onDateClick = () => {};

  return (
    <Box padding="16px 32px">
      <GenericCalendar onDateClick={onDateClick} />
    </Box>
  );
}
