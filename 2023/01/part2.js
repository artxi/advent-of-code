const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

let sum = 0;

for(let line of lines) {
    const regex = /(?=(one|two|three|four|five|six|seven|eight|nine|[0-9]))/g;
    const matches = line.matchAll(regex);

    const digitsWords = [];

    for (const re of matches) {
        digitsWords.push(re[1]);
    }

    const digits = digitsWords.map(d => {
        switch(d) {
            case 'one':
                return '1';
            case 'two':
                return '2';
            case 'three':
                return '3';
            case 'four':
                return '4';
            case 'five':
                return '5';
            case 'six':
                return '6';
            case 'seven':
                return '7';
            case 'eight':
                return '8';
            case 'nine':
                return '9';
            default:
                return d;
        }
    });

    sum += parseInt(digits[0] + digits[digits.length - 1]);
}

console.log(sum);