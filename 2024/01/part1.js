const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

const left = [], right = [];

for(let line of lines) {
    if (!line) continue;

    line = line.split('   ');

    left.push(line[0]);
    right.push(line[1]);
}

left.sort();
right.sort();

let sum = 0;

for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
}

console.log(sum);
