const fs = require('fs');
const path = require('path');

console.time('Time');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').map(l => l.replaceAll('\r', '').split(''));

let answer = 0;

let beamPositions = [lines[0].indexOf('S')];
lines[0][beamPositions[0]] = '|';

for (let l = 0; l < lines.length; l++) {
    const line = lines[l];

    for (const position of beamPositions) {
        if (line[position] === '.') {
            line[position] = '|';
            continue;
        }

        if (line[position] === '^') {
            line[position - 1] = '|';
            line[position + 1] = '|';
            answer += 1;
            continue;
        }
    }

    beamPositions = findBeamIndexes(line);
}

console.log(`Answer: ${answer}`);
console.timeEnd('Time');

function findBeamIndexes(line) {
    const indexes = [];

    for (let i = 0; i < line.length; i++) {
        if (line[i] === '|') indexes.push(i);
    }

    return indexes;
}