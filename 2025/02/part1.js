const fs = require('fs');
const path = require('path');

console.time('Time');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split(',').filter(l => l).map(l => l.split('-').map(n => parseInt(n)));

let answer = 0;

for (let line of lines) {
    checkRange(line);
}

console.log(`Answer: ${answer}`);
console.timeEnd('Time');

function checkRange(range) {
    for (let i = range[0]; i <= range[1]; i++) {
        const numString = i.toString();

        if (numString.length % 2 === 1) continue;

        const first = parseInt(numString.substring(0, numString.length / 2));
        const second = parseInt(numString.substring(numString.length / 2));

        if (first === second) {
            answer += i;
        }
    }
}