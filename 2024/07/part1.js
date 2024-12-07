const fs = require('fs');
const path = require('path');

console.time('Time');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);
const tests = lines.map(l => {
    const line = l.split(': ');
    return {test: parseInt(line[0]), values: line[1].split(' ').map(i => parseInt(i))};
})

let answer = 0;

for (const test of tests) {
    answer += testFunc(test);
}

console.log(`Answer: ${answer}`);
console.timeEnd('Time');

function testFunc(test) {
    const operations = [0, 1];

    let results = [{step: 0, value: test.values[0]}];

    for (let o = 0; o < test.values.length - 1; o++) {
        for (const op of operations) {
            for (const prev of results.filter(r => r.step === o)) {
                if (op === 0) {
                    results.push({step: o+1, value: prev.value + test.values[o+1]});
                } else {
                    results.push({step: o+1, value: prev.value * test.values[o+1]});
                }
            }
        }
    }

    if (results.map(r => r.value).includes(test.test)) {
        return test.test;
    }

    return 0;
}
