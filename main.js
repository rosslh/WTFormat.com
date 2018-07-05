let time;
const dateAtoms = ["M", "Mo", "MM", "MMM", "MMMM", "Q", "Qo", "D", "Do", "DD", "DDD", "DDDo", "DDDD", "d", "E", "do", "dd", "ddd", "dddd", "w", "wo", "ww", "W", "Wo", "WW", "YY", "YYYY", "A", "a", "H", "HH", "h", "hh", "mm", "ss", "X", "x"];

function main() {
  time = generateDate();
  document.getElementById("input").placeholder = time.format("YYYY-MM-DD");
  document.getElementById("shownDate").innerText = time.format('dddd, MMMM D, YYYY h:mm:ss A');
}

function generateDate() {
  const rightNow = moment().unix();
  let timestamp = moment.unix(rightNow);
  let dups = numDuplicateAtoms(timestamp)
  while(dups > 1){ // either H & HH or ? have to be the same
    const newTS = moment.unix(Math.floor((Math.random()*rightNow)));
    if (numDuplicateAtoms(newTS) < numDuplicateAtoms(timestamp)) {
      timestamp = newTS;
      dups = numDuplicateAtoms(newTS);
    }
  }
  return timestamp;
}

function numDuplicateAtoms(timestamp) {
  const parts = dateAtoms.map(x => timestamp.format(x));
  return parts.length - (new Set(parts)).size;
}

function filterResults(date) {
  return date;
}

function joinSuffixes(arr) {
  const suffixes = ["st", "th", "nd", "rd"];
  arr.forEach((elem, i) => {
    if(suffixes.includes(elem)) {
      arr[i-1] += elem;
    }
  });
  arr = arr.filter(elem => !suffixes.includes(elem));
  return arr;
}

function evaluateDate() {
    let currentDate = document.getElementById("input").value.match(/(\d+|[A-Za-z]+|[^\dA-Za-z]+)/g) || [];
    currentDate = joinSuffixes(currentDate);
    let possibilities = [""];
    for (const part of currentDate) {
      let newPos = [];
      if (!part.match(/^[a-zA-Z0-9]+$/)) {
        newPos = newPos.concat(possibilities.map(x => x+part));
      }
      else {
        let matchFound = false;
        for (const atom of dateAtoms) {
            if(part === time.format(atom)) {
                newPos = newPos.concat(possibilities.map(x => x+atom));
                matchFound = true;
            }
        }
        if(!matchFound) {
          newPos = newPos.concat(possibilities.map(x => x+`[${part}]`));
        }
      }
      possibilities = newPos;
    }
    possibilities = possibilities.filter(filterResults);
    const list = document.getElementById("output");
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    if(!possibilities.length) {
      var entry = document.createElement("li");
      var text = document.createTextNode("No matches.");
      entry.appendChild(text);
      list.appendChild(entry);
    }
    for(pos of possibilities) {
      var entry = document.createElement("li");
      var code = document.createElement("code");
      var text = document.createTextNode(pos);
      code.appendChild(text);
      entry.appendChild(code);
      list.appendChild(entry);
    }
}
