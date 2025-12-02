const fs = require('fs');
const path = require('path');

console.time('Time');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

let answer = 0;

let position = 50;

for (const line of lines) {
    if (isZeroPosition(line)) answer++;
}

console.log(`Answer: ${answer}`);
console.timeEnd('Time');

function isZeroPosition(move) {
    const direction = move.charAt(0);
    const steps = parseInt(move.slice(1));

    position = direction === 'L' ? position - steps : position + steps;

    while (position < 0) {
        position += 100;
    }

    while (position > 99) {
        position -= 100;
    }

    if (position === 0) {
        return true;
    }
}
