const fs = require('fs');
const path = require('path');

console.time('Time');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

let answer = 0;

for (let i = 0; i < lines.length; i++) {
    for (let l = 0; l < lines[i].length; l++) {
        if (lines[i][l] !== '@') continue;
        let block = [];

        if (l > 0) {
            block.push(lines[i][l - 1]);
        }

        if (l < lines[i].length - 1) {
            block.push(lines[i][l + 1]);
        }

        if (i > 0) {
            block.push(lines[i - 1][l]);
        }

        if (i < lines.length - 1) {
            block.push(lines[i + 1][l]);
        }

        if (i > 0 && l > 0) {
            block.push(lines[i - 1][l - 1]);
        }

        if (i > 0 && l < lines[i].length - 1) {
            block.push(lines[i - 1][l + 1]);
        }

        if (i < lines.length - 1 && l > 0) {
            block.push(lines[i + 1][l - 1]);
        }

        if (i < lines.length - 1 && l < lines[i].length - 1) {
            block.push(lines[i + 1][l + 1]);
        }

        if (block.filter(b => b === '@').length < 4) answer += 1;

    }
}

console.log(`Answer: ${answer}`);
console.timeEnd('Time');