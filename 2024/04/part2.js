const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

const array = [];
let sum = 0;

for (const line of lines) {
    array.push(line.split(''));
}

const valid = ['MAS', 'SAM'];

for (let y = 1; y < array.length - 1; y++) {
    for (let x = 1; x < array[y].length - 1; x++) {
        if (array[y][x] !== 'A') continue;

        const upLeft = array[y-1][x-1] + 'A' + array[y+1][x+1];
        const upRight = array[y-1][x+1] + 'A' + array[y+1][x-1];

        if (valid.includes(upLeft) && valid.includes(upRight)) {
            sum++
        }
    }
}

console.log(sum);