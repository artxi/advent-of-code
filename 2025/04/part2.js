const fs = require('fs');
const path = require('path');

console.time('Time');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l).map(l => l.split(''));

let answer = 0;
let keepChecking = true;

while (keepChecking) {
    const pass = checkGrid();

    if (!pass) keepChecking = false;

    answer += pass;
}

function checkGrid() {
    // printGrid();
    let valid = 0;

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

            if (block.filter(b => b === '@').length < 4) {
                lines[i][l] = 'x';
                valid += 1;
            }
        }
    }

    return valid;
}

function printGrid() {
    for (let i = 0; i < lines.length; i++) {
        let line = '';

        for (let l = 0; l < lines[i].length; l++) {
            line += lines[i][l];
        }

        console.log(line);
    }
}



console.log(`Answer: ${answer}`);
console.timeEnd('Time');