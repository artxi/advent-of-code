const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

const array = [];
let sum = 0;

for (const line of lines) {
    array.push(line.split(''));
}

for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[y].length; x++) {
        if (array[y][x] !== 'X') continue;
        const words = {};

        if (x > 2)
            words.left = array[y][x-1] + array[y][x-2] + array[y][x-3];

        if (x < array[y].length - 3)
            words.right = array[y][x+1] + array[y][x+2] + array[y][x+3];

        if (y > 2)
            words.up = array[y-1][x] + array[y-2][x] + array[y-3][x];

        if (y < array.length - 3)
            words.down = array[y+1][x] + array[y+2][x] + array[y+3][x];

        if (y > 2 && x < array[y].length - 3)
            words.upRight = array[y-1][x+1] + array[y-2][x+2] + array[y-3][x+3];

        if (y < array.length - 3 && x < array[y].length - 3)
            words.downRight = array[y+1][x+1] + array[y+2][x+2] + array[y+3][x+3];

        if (y < array.length - 3 && x > 2)
            words.downLeft = array[y+1][x-1] + array[y+2][x-2] + array[y+3][x-3];

        if (y > 2 && x > 2)
            words.upLeft = array[y-1][x-1] + array[y-2][x-2] + array[y-3][x-3];

        for (const key in words) {
            if (Object.prototype.hasOwnProperty.call(words, key)) {
                const element = words[key];
                if (element === 'MAS') {
                    sum++;
                }
            }
        }
    }
}

console.log(sum);