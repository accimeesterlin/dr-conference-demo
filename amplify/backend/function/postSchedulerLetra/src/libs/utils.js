const { DateTime } = require("luxon");

function generateTimes(t) {
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

exports.generateTimes = generateTimes;
