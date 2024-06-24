import { addYears, getUnixTime, format, fromUnixTime } from "date-fns";
import moment from "moment";
import dayjs from "dayjs";
import { DateTime } from "luxon";
import { momentParts, dateFnParts, dayJsParts, luxonParts } from "./constants";
const advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

function joinSuffixes(arr: string[]) {
  const output = arr;
  const suffixes = ["st", "th", "nd", "rd"];
  const indicesToRemove: Set<number> = new Set([]);
  output.forEach((elem, i) => {
    if (suffixes.includes(elem) && /\S/.test(output[i - 1])) {
      output[i - 1] += elem;
      indicesToRemove.add(i);
    }
  });
  return output.filter((_elem, i) => !indicesToRemove.has(i));
}

function group(str: string) {
  return str.match(/(\d+|[A-Za-z]+|[^\dA-Za-z]+)/g) || [];
}

export function evaluateDate(
  timestamp: Date,
  currentDate: string,
  formatter: "moment" | "dateFns" | "dayJs" | "luxon"
) {
  const config = {
    moment: {
      formatFn: (timestamp: Date, atom: string) =>
        moment(timestamp).format(atom),
      escapeMarkers: "[]",
      dateParts: momentParts,
      preprocess: (str: string) => str
    },
    dateFns: {
      formatFn: (timestamp: Date, atom: string) => format(timestamp, atom),
      escapeMarkers: "''",
      dateParts: dateFnParts,
      preprocess: (str: string) => str.replace(/'/g, "''")
    },
    dayJs: {
      formatFn: (timestamp: Date, atom: string) =>
        dayjs(timestamp).format(atom),
      escapeMarkers: "[]",
      dateParts: dayJsParts,
      preprocess: (str: string) => str
    },
    luxon: {
      formatFn: (timestamp: Date, atom: string) =>
        DateTime.fromJSDate(timestamp).toFormat(atom),
      escapeMarkers: "''",
      dateParts: luxonParts,
      preprocess: (str: string) => str.replace(/'/g, "''")
    }
  }[formatter];

  const date = joinSuffixes(group(config.preprocess(currentDate)));
  let possibilities = [""];

  for (const part of date) {
    let newPossibilities: string[] = [];
    if (!part.match(/^[a-zA-Z0-9]+$/)) {
      newPossibilities = newPossibilities.concat(
        possibilities.map(x => x + part)
      );
    } else {
      let matchFound = false;
      for (const atom of config.dateParts) {
        if (part === config.formatFn(timestamp, atom)) {
          newPossibilities = newPossibilities.concat(
            possibilities.map(x => x + atom)
          );
          matchFound = true;
        }
      }
      if (!matchFound) {
        newPossibilities = newPossibilities.concat(
          possibilities.map(
            x =>
              `${x}${config.escapeMarkers[0]}${part}${config.escapeMarkers[1]}`
          )
        );
      }
    }
    possibilities = newPossibilities;
  }
  return possibilities.filter(date => date);
}

export function generateDates() {
  const rightNow = Date.now();
  const endDate = addYears(rightNow, 4);

  const good = [];
  let tries = 0;
  while (tries < 10000) {
    const newTS = fromUnixTime(
      Math.floor(
        Math.random() * (getUnixTime(endDate) - getUnixTime(rightNow))
      ) + getUnixTime(rightNow)
    );
    const formatted = moment(newTS).format(
      "dddd, MM MMMM D, Q, YYYY hh h:mm:ss A"
    );
    const momentFormats = evaluateDate(newTS, formatted, "moment");
    const dateFnsFormats = evaluateDate(newTS, formatted, "dateFns");
    const dayJsFormats = evaluateDate(newTS, formatted, "dayJs");
    const luxonFormats = evaluateDate(newTS, formatted, "luxon");

    if (
      momentFormats.length === 1 &&
      dateFnsFormats.length === 1 &&
      dayJsFormats.length === 1 &&
      luxonFormats.length === 1
    ) {
      good.push(getUnixTime(newTS));
    }
    tries += 1;
  }
  console.log(good); // eslint-disable-line no-console
}
