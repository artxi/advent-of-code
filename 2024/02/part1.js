const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

let sum = 0;

report:
for(let line of lines) {
    const report = line.split(/\s+/).map(x => +x);

    let dir = undefined;

    for (let i = 1; i < report.length; i++) {
        const current = report[i];
        const previous = report[i-1];

        if (current === previous) continue report;

        const diff = Math.abs(current - previous);

        if (diff > 3 || diff < 1) continue report;

        if (typeof dir === 'undefined') {
            dir = current > previous;
        } else {
            if (dir && current < previous || !dir && current > previous) continue report;
        }
    }

    sum++;
}

console.log(sum);