const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

console.time('Time');

let startX, startY;
let array = [];

setGrid();

let answer = 0;
let loopCheckArray = {};

y:
for (let i = 0; i < array.length; i++) {
    x:
    for (let l = 0; l < array[i].length; l++) {
        if (l === startX && i === startY) continue x;

        if (array[i][l] === '#') continue x;
        array[i][l] = '#';

        const result = patrol();

        if (result === 'loop') {
            answer++;
        }

        setGrid();
    }
}

console.log(`Answer: ${answer}`);
console.timeEnd('Time');

function loopCheck(y, x, dir) {
    if (!loopCheckArray[dir]) {
        loopCheckArray[dir] = [];
    }

    if (!loopCheckArray[dir][y]) {
        loopCheckArray[dir][y] = [];
    }

    if (loopCheckArray[dir][y].includes(x)) {
        return true;
    }

    loopCheckArray[dir][y].push(x);

    return false;
}

function patrol() {
    let x = startX;
    let y = startY;

    let pos = 1;
    let dir = 0;

    loopCheckArray = [];

    while (x < array[y].length - 1 && y < array.length - 1 && x > 0 && y > 0) {
        takeStep();

        if (array[y][x] === '^' && loopCheck(y, x, dir)) {
            return 'loop';
        }

        if (array[y][x] !== '^') pos++;

        array[y][x] = '^';
    }

    return pos;

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
}

function setGrid() {
    array = [];

    startX = undefined;
    startY = undefined;

    for (const i in lines) {
        const newLine = lines[i].split('');
        array.push(newLine);

        if (startX !== undefined) continue;

        const index = newLine.indexOf('^');

        if (index !== -1) {
            startX = index;
            startY = parseInt(i);
        }
    }
}

function printGrid() {
    console.log('\n\n\n\n\n\n\n');

    for (const line of array) {
        console.log(line.join(''));
    }
}