const fs = require('fs');
const path = require('path');

console.time('Time');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);
const tests = lines.map(l => {
    const line = l.split(': ');
    return {test: parseInt(line[0]), values: line[1].split(' ').map(i => parseInt(i))};
});

let answer = 0;

for (const test of tests) {
    if (testFunc(test.test, test.values, test.values[0], 1)) {
        answer += test.test;
    }
}

console.log(`Answer: ${answer}`);
console.timeEnd('Time');

function testFunc(test, values, result, index) {
    if (result > test) return;
    if (index === values.length) return result === test;

    const op1 = result + values[index];
    const op2 = result * values[index];
    const op3 = parseInt(`${result.toString()}${values[index].toString()}`);

    index++;

    const check1 = testFunc(test, values, op1, index);
    const check2 = testFunc(test, values, op2, index);
    const check3 = testFunc(test, values, op3, index);

    return check1 || check2 || check3;
}
