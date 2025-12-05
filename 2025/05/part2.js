const fs = require('fs');
const path = require('path');

console.time('Time');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

const freshRanges = [];

for (let line of lines) {
    line = line.replace('\r', '');
    if (!line) continue;

    if (line.includes('-')) {
        freshRanges.push([parseInt(line.substring(0, line.indexOf('-'))), parseInt(line.substring(line.indexOf('-') + 1))]);
        continue;
    }
}

const sortedRanges = freshRanges.sort((a, b) => a[0] - b[0]);

let min = sortedRanges[0][0];
let max = sortedRanges[0][1];

let answer = max - min + 1;

for (const range of sortedRanges.slice(1)) {
    if (range[0] <= min) {
        range[0] = min + 1;
    }

    if (range[0] <= range[1]) {
        answer += range[1] - range[0] + 1;

        max = range[0];
        min = range[1];
    }
}

console.log(`Answer: ${answer}`);
console.timeEnd('Time');