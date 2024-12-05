const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

let sum = 0;

for(let line of lines) {
    const report = line.split(/\s+/).map(x => +x);

    let safe = isSafe(report);

    if (safe) {
        sum++;

        continue;
    }

    for (let i = 0; i < report.length && !safe; i++) {
        let copy = [...report];
        copy.splice(i, 1);

        safe = isSafe(copy);
    }

    if (safe) {
        sum++;
    }
}

console.log(sum);

function isSafe(report) {
    let dir = undefined;

    for (let i = 1; i < report.length; i++) {
        const current = report[i];
        const previous = report[i-1];

        if (current === previous) return false;

        const diff = Math.abs(current - previous);

        if (diff > 3 || diff < 1) return false;

        if (typeof dir === 'undefined') {
            dir = current > previous;
        } else {
            if (dir && current < previous || !dir && current > previous) return false;
        }
    }

    return true;
}