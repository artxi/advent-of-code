const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

let sum = 0;

for(let line of lines) {
    const digits = line.match(/[0-9]/g);

    sum += parseInt(digits[0] + digits[digits.length - 1]);
}

console.log(sum);