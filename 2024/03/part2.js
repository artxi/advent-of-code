const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

const dos = input.split("do()");

let sum = 0;

for (let d of dos) {
    let index = d.indexOf("don't()");

    if (index !== -1) d = d.substring(0, index);

    const found = d.match(/mul\([0-9]+,[0-9]+\)/g);

    if (!found) continue;

    for (const f of found) {
        const numbers = f.match(/[0-9]+/g);
        sum += parseInt(numbers[0]) * parseInt(numbers[1]);
    }

}

console.log(sum);