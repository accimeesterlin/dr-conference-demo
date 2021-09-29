import React, { useState, forwardRef } from "react";
import { Box, Button } from "@chakra-ui/react";
import DatePicker from "react-datepicker";

export const ActionButton = forwardRef(
  ({ value, text, onClick, ...rest }, ref) => (
    <Button
      width="160px"
      marginBottom="12px"
      size="lg"
      variant="outline"
      fontSize="16px"
      borderColor="#414155"
      border="2px"
      borderRadius="full"
      onClick={onClick}
      {...rest}
      ref={ref}
    >
      {text || value}
    </Button>
  )
);

const CustomButton = forwardRef(({ value, onClick }, ref) => (
  <Box>
    <Button colorScheme="blue" onClick={onClick} ref={ref}>
      {value}
    </Button>
  </Box>
));

const renderDayContents = (day, date) => {
  const tooltipText = `Tooltip for date: ${date}`;
  // return <span title={tooltipText}>{getDate(date)}</span>;
  return <span title={tooltipText}>TEST</span>;
};

export const TwoMonths = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      renderCustomHeader={({
        monthDate,
        customHeaderCount,
        decreaseMonth,
        increaseMonth,
      }) => (
        <div>
          <button
            aria-label="Previous Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--previous"
            }
            style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
            onClick={decreaseMonth}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
              }
            >
              {"<"}
            </span>
          </button>
          <span className="react-datepicker__current-month">
            {monthDate.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            aria-label="Next Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--next"
            }
            style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
            onClick={increaseMonth}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
              }
            >
              {">"}
            </span>
          </button>
        </div>
      )}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      monthsShown={2}
      customInput={<CustomButton />}
      //
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
      shouldCloseOnSelect={false}
      minDate={new Date()}
    />
  );
};

export const Schedule = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState(new Date());

  console.log(value);

  return (
    // <TwoMonths />

    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ActionButton text="we are borg" />}
      // withPortal
      shouldCloseOnSelect={false}
    >
      <div>TEMPO - POSSIBLE</div>
    </DatePicker>

    // <DatePicker
    //   selected={startDate}
    //   onChange={(date) => setStartDate(date)}
    //   timeInputLabel="Time:"
    //   dateFormat="MM/dd/yyyy h:mm aa"
    //   showTimeInput
    //   shouldCloseOnSelect={false}
    //   minDate={new Date()}
    // />
    // <DatePicker
    //   selected={startDate}
    //   onChange={(date) => setStartDate(date)}
    //   monthsShown={2}
    //   timeInputLabel="Time:"
    //   dateFormat="MM/dd/yyyy h:mm aa"
    //   showTimeInput
    //   shouldCloseOnSelect={false}
    //   minDate={new Date()}
    //   calendarStartDay={1}
    // />
  );
};

// () => {
//   const [startDate, setStartDate] = useState(
//     setHours(setMinutes(new Date(), 0), 9)
//   );
//   const filterPassedTime = (time) => {
//     const currentDate = new Date();
//     const selectedDate = new Date(time);

//     return currentDate.getTime() < selectedDate.getTime();
//   };
//   return (
//     <DatePicker
//       selected={startDate}
//       onChange={(date) => setStartDate(date)}
//       showTimeSelect
//       filterTime={filterPassedTime}
//       dateFormat="MMMM d, yyyy h:mm aa"
//     />
//   );
// };
