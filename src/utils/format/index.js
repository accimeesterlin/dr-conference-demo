import { DateTime } from "luxon";

export function generateTimes(t) {
  const time = t
    ? DateTime.fromISO(t).set({ second: 0 })
    : DateTime.now().set({ second: 0 });

  const { minute } = time.toObject();
  const over = minute % 5;

  const lower = time.plus({ minute: -over });
  const upperLimit = lower.plus({ minute: 5 });

  return [
    lower.toUTC().toString().slice(0, 20) + "000Z",
    upperLimit.toUTC().toString().slice(0, 20) + "000Z",
  ];
}

export const formatPhone = (phone) => `+${phone.replace(/\W/g, "")}`;

export const formatUsernameFromEmail = (email) => {
  if (!email) return "username";

  const username = email.substring(0, email.lastIndexOf("@"));
  return username;
};

export function generateMonthsRange(t) {
  const time = t
    ? DateTime.fromISO(t).set({ second: 0, minute: 0, day: 15, hour: 15 })
    : DateTime.now().set({ second: 0, minute: 0, day: 15, hour: 15 });

  let previous = time.plus({ month: -1 }).set({ day: 1 });
  let current = time.set({ day: 1 });
  let next = time.plus({ month: 1 }).set({ day: 1 });

  let previous2 = previous.plus({ month: 1 }).plus({ day: -1 });
  let current2 = current.plus({ month: 1 }).plus({ day: -1 });
  let next2 = next.plus({ month: 1 }).plus({ day: -1 });

  previous = previous.toUTC().toString().slice(0, 10);
  current = current.toUTC().toString().slice(0, 10);
  next = next.toUTC().toString().slice(0, 10);

  previous2 = previous2.toUTC().toString().slice(0, 10);
  current2 = current2.toUTC().toString().slice(0, 10);
  next2 = next2.toUTC().toString().slice(0, 10);

  return {
    previousMonth: [previous, previous2],
    currentMonth: [current, current2],
    nextMonth: [next, next2],
  };
}

/**
 *  const d = randomDate(new Date(2021, 6, 1), new Date(2021, 6, 30));
 *  => the generated date will be in the next month
 * @param {*} start Date
 * @param {*} end Date
 * @returns A random javascript date
 */
export function generateRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

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

export const calendarValues = (startWith) => {
  const d = new Date();
  d.setDate(1);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);

  const start = startWith ?? DateTime.fromISO(d.toISOString().slice(0, 10));
  const end = start
    .plus({ months: 1 })
    .plus({ days: -1 })
    .set({ hour: 23, minute: 59, second: 59 });

  let dates = [];
  let current = start;
  const beforePaddingNumber = beforePadding[current.toFormat("EEE")];
  const today = DateTime.now();

  while (current.month === start.month) {
    dates.push({
      date: current.toISO().slice(0, 10),
      dateISO: current.toISO(),
      dateUTC: current.toUTC().toString(),
      isCurrentMonth: true,
      hasPassed: current.day < today.day,
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
          date: dd.toISO().slice(0, 10),
          dateISO: dd.toISO(),
          dateUTC: dd.toUTC().toString(),
          isCurrentMonth: false,
          hasPassed: true,
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
          date: dd.toISO().slice(0, 10),
          dateISO: dd.toISO(),
          dateUTC: dd.toUTC().toString(),
          isCurrentMonth: false,
          hasPassed: false,
        },
      ];
    }
  }

  return {
    month: DateTime.fromISO(start.toISO()).toFormat("MMMM, yyyy"),
    firstDay: start.toISO(), // Local time
    lastDay: end.toISO(), // Local time
    firstDayUTC: start.toUTC().toString(), // UTC version
    lastDayUTC: end.toUTC().toString(), // UTC version
    dates,
  };
};
