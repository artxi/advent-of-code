const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

const left = [], right = [];

for(let line of lines) {
    line = line.split('   ');

    left.push(line[0]);
    right.push(line[1]);
}

let sum = 0;

for (const item of left) {
    const arr = right.filter(r => r === item);
    sum += item * arr.length;
}

console.log(sum);