const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);
const array = [];

let x, y;

for (const i in lines) {
    const newLine = lines[i].split('');
    array.push(newLine);

    if (x !== undefined) continue;

    const index = newLine.indexOf('^');

    if (index !== -1) {
        x = index;
        y = i;
    }
}

let pos = 1;
let dir = 0;

while (x < array[y].length - 1 && y < array.length - 1 && x > 0 && y > 0) {
    takeStep();

    if (array[y][x] !== '^') pos++;

    array[y][x] = '^';
}

console.log(pos);

function lookAhead() {
    switch (dir) {
        case 0:
            return array[y-1][x];
        case 1:
            return array[y][x+1];
        case 2:
            return array[y+1][x];
        case 3:
            return array[y][x-1];
    }
}

function changeDir() {
    dir++;

    if (dir === 4) dir = 0;
}

function takeStep() {
    while (lookAhead() === '#') {
        changeDir();
    }

    switch (dir) {
        case 0:
            y--;
            break;
        case 1:
            x++;
            break;
        case 2:
            y++;
            break;
        case 3:
            x--;
            break;
    }
}
