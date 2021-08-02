import { dateAtoms } from './constants';

function filterResults (date) {
  return date;
}

function joinSuffixes (arr) {
  let output = arr;
  const suffixes = ['st', 'th', 'nd', 'rd'];
  output.forEach((elem, i) => {
    if (suffixes.includes(elem)) {
      output[i - 1] += elem;
    }
  });
  output = output.filter(elem => !suffixes.includes(elem));
  return output;
}

function group (str) {
  return str.match(/(\d+|[A-Za-z]+|[^\dA-Za-z]+)/g);
}

export function evaluateDate (timestamp, currentDate) {
  const date = joinSuffixes(group(currentDate) || []);
  let possibilities = [''];
  for (const part of date) {
    let newPos = [];
    if (!part.match(/^[a-zA-Z0-9]+$/)) {
      newPos = newPos.concat(possibilities.map(x => x + part));
    } else {
      let matchFound = false;
      for (const atom of dateAtoms) {
        if (part === timestamp.format(atom)) {
          newPos = newPos.concat(possibilities.map(x => x + atom));
          matchFound = true;
        }
      }
      if (!matchFound) {
        newPos = newPos.concat(possibilities.map(x => `${x}[${part}]`));
      }
    }
    possibilities = newPos;
  }
  return possibilities.filter(filterResults);
}
