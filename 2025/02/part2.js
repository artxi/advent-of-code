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

        for (let l = 1; l < numString.length; l++) {
            if (checkId(numString, l)) {
                answer += i;
                break;
            }
        }
    }
}

function checkId(id, num) {
    if (id.length % num !== 0) return 0;

    const sequences = id.match(new RegExp('.{1,' + num + '}', 'g'));

    if (sequences.every(seq => seq === sequences[0])) return true;
}