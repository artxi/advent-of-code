const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

const found = input.match(/mul\([0-9]+,[0-9]+\)/g);

let sum = 0;

for (const f of found) {
    const numbers = f.match(/[0-9]+/g);
    sum += parseInt(numbers[0]) * parseInt(numbers[1]);
}

console.log(sum);