import React, { useState, forwardRef } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { TwoMonths, Schedule } from "./Button";
import { DateTime } from "luxon";

export const DateAndTimeScheduler = ({ title, schedule, isOpen, onClose }) => {
  const [calendarOpen, setCalendarOpenState] = useState(false);
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const text = "no time selected yet";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Schedule post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            <Text as="span" fontWeight="bold">
              Title :
            </Text>
            <Text as="span" fontStyle="italic">
              {" "}
              {title || null}
            </Text>
          </Text>

          <Box>
            <Text py="3">
              <Text as="span" fontWeight="bold">
                Selected time:{" "}
              </Text>
              <Text as="span" fontStyle="italic">
                {touched
                  ? DateTime.fromJSDate(startDate).toFormat("ffff")
                  : "no time selected yet"}
              </Text>
            </Text>

            <Box maxWidth="200px">
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setTouched(true);
                  setStartDate(date);
                }}
                minDate={new Date()}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                shouldCloseOnSelect={false}
                autoFocus
                customInput={<Input />}
                onCalendarOpen={() => {
                  setCalendarOpenState(true);
                  // setTouched(true)
                }}
                onCalendarClose={() => {
                  setCalendarOpenState(false);
                }}
              />
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={async () => {
              setTouched(false);
              const r = await schedule(DateTime.fromJSDate(startDate));
              setTouched(true);
              if (r === "ok") {
                onClose();
              }
            }}
            disabled={calendarOpen || !touched}
          >
            Schedule
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
