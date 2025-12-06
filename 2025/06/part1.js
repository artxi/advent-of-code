const fs = require('fs');
const path = require('path');

console.time('Time');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

let answer = 0;
const columns = [];

for (let line of lines) {
    line = line.replaceAll('\r', '');
    const array = line.split(' ').filter(l => l);

    for (let i = 0; i < array.length; i++) {
        if (!columns[i]) columns[i] = [];

        columns[i].push(array[i])
    }
}

for (const column of columns) {
    const op = column[column.length - 1];
    let columnResult = parseInt(column[0]);

    for (let i = 1; i < column.length - 1; i++) {
        if (op === '+') {
            columnResult += parseInt(column[i]);
            continue;
        }

        columnResult *= parseInt(column[i]);
    }

    answer += columnResult;
}

console.log(`Answer: ${answer}`);
console.timeEnd('Time');