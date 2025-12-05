const fs = require('fs');
const path = require('path');

console.time('Time');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

let answer = 0;

const freshRanges = [];
const ingredients = [];

for (let line of lines) {
    line = line.replace('\r', '');
    if (!line) continue;

    if (line.includes('-')) {
        freshRanges.push([parseInt(line.substring(0, line.indexOf('-'))), parseInt(line.substring(line.indexOf('-') + 1))]);
        continue;
    }

    ingredients.push(parseInt(line))
}

for (const ingredient of ingredients) {
    if (freshRanges.some(r => ingredient >= r[0] && ingredient <= r[1])) answer++;
}

console.log(`Answer: ${answer}`);
console.timeEnd('Time');