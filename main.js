const dateAtoms = [
  'M',
  'Mo',
  'MM',
  'MMM',
  'MMMM',
  'Q',
  'Qo',
  'D',
  'Do',
  'DD',
  'DDD',
  'DDDo',
  'DDDD',
  'd',
  'E',
  'do',
  'dd',
  'ddd',
  'dddd',
  'w',
  'wo',
  'ww',
  'W',
  'Wo',
  'WW',
  'YY',
  'YYYY',
  'A',
  'a',
  'H',
  'HH',
  'h',
  'hh',
  'mm',
  'ss',
  'X',
  'x',
];

let time;

function numDuplicateAtoms(timestamp) {
  const parts = dateAtoms.map(x => timestamp.format(x));
  return parts.length - new Set(parts).size;
}

function generateDate() {
  const rightNow = moment().unix();
  let timestamp = moment.unix(rightNow);
  let dups = numDuplicateAtoms(timestamp);
  while (dups > 1) {
    // either H & HH or ? have to be the same
    const newTS = moment.unix(Math.floor(Math.random() * rightNow));
    if (numDuplicateAtoms(newTS) < numDuplicateAtoms(timestamp)) {
      timestamp = newTS;
      dups = numDuplicateAtoms(newTS);
    }
  }
  return timestamp;
}

function main() {
  time = generateDate();
  document.getElementById('input').placeholder = time.format('YYYY-MM-DD');
  document.getElementById('shownDate').innerText = time.format('dddd, MMMM D, YYYY h:mm:ss A');
}

function filterResults(date) {
  return date;
}

function joinSuffixes(arr) {
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

function evaluateDate() {
  let currentDate = document.getElementById('input').value.match(/(\d+|[A-Za-z]+|[^\dA-Za-z]+)/g) || [];
  currentDate = joinSuffixes(currentDate);
  let possibilities = [''];
  for (const part of currentDate) {
    let newPos = [];
    if (!part.match(/^[a-zA-Z0-9]+$/)) {
      newPos = newPos.concat(possibilities.map(x => x + part));
    } else {
      let matchFound = false;
      for (const atom of dateAtoms) {
        if (part === time.format(atom)) {
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
  possibilities = possibilities.filter(filterResults);
  const list = document.getElementById('output');
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  if (!possibilities.length) {
    const entry = document.createElement('li');
    const text = document.createTextNode('Enter a date and click generate to see your date format!');
    entry.appendChild(text);
    list.appendChild(entry);
  }
  for (const pos of possibilities) {
    const entry = document.createElement('li');
    const code = document.createElement('code');
    const text = document.createTextNode(pos);
    code.appendChild(text);
    entry.appendChild(code);
    list.appendChild(entry);
  }
}
