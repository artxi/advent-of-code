const fs = require('fs');
const path = require('path');

console.time('Time');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l).map(l => l.replaceAll('\r', ''));

let answer = 0;
let index = lines[0].length - 1;
const ops = lines[lines.length - 1].split(' ').filter(o => o).reverse();
let opIndex = 0;
let nums = [];

for (let i = index; i >= 0; i--) {
    let numString = '';
    for (const line of lines.slice(0, lines.length - 1)) {
        numString += line[index];
    }

    if (index === 0) {
        nums.push(parseInt(numString));
        addToAnswer();
        opIndex++;
        break;
    }

    if (numString.trim() === '') {
        addToAnswer();
        opIndex++;
        nums = [];
    } else {
        nums.push(parseInt(numString));
    }

    index--;
}

function addToAnswer() {
    let columnResult = parseInt(nums[0]);

    for (let i = 1; i < nums.length; i++) {
        if (ops[opIndex] === '+') {
            columnResult += parseInt(nums[i]);
            continue;
        }

        columnResult *= parseInt(nums[i]);
    }

    answer += columnResult;
}

console.log(`Answer: ${answer}`);
console.timeEnd('Time');