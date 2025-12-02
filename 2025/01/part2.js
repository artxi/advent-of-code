const fs = require('fs');
const path = require('path');

console.time('Time');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

let answer = 0;

let position = 50;

for (const line of lines) {
    answer += zeroCounts(line);
}

console.log(`Answer: ${answer}`);
console.timeEnd('Time');

function zeroCounts(move) {
    let zeroCounts = 0;
    let steps = parseInt(move.slice(1));

    if (move.charAt(0) === "L") steps *= -1;

    if (steps > 0) {
        zeroCounts += Math.floor((position + steps) / 100) - Math.floor(position / 100);
    } else {
        zeroCounts += Math.floor((position - 1) / 100) - Math.floor((position - 1 + steps) / 100);
    }

    position = (position + steps + 100) % 100;

    return zeroCounts;
}