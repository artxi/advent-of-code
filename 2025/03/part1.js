const fs = require('fs');
const path = require('path');

console.time('Time');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

let answer = 0;

for (const line of lines) {
    const bank = line.replace(/\r$/, '').split('').map(b => parseInt(b));

    answer += sumBank(bank);
}

console.log(`Answer: ${answer}`);
console.timeEnd('Time');

function sumBank(bank) {
    let highest = bank.slice(0, -1).sort((a, b) => b - a)[0];

    const remaining = bank.slice(bank.indexOf(highest) + 1);

    if (remaining.length === 1) return parseInt(`${highest}${remaining[0]}`);

    const secondHighest = remaining.sort((a, b) => b - a)[0];

    return parseInt(`${highest}${secondHighest}`);
}