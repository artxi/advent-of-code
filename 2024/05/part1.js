const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

const lines = input.split('\n');

let rules = lines.filter(l => l.match(/\|/));
rules = rules.map(r => r.split('|'));

let updates = lines.filter(l => l && l.match(/^((?!\|).)*$/));
updates = updates.map(u => u.split(','));

const ruleIndex = {};

for (const rule of rules) {
    if (!ruleIndex[rule[0]]) {
        ruleIndex[rule[0]] = [];
    }

    ruleIndex[rule[0]].push(rule[1]);
}

let sum = 0;

update:
for (const update of updates) {

    num:
    for (let i = update.length - 1; i >= 0; i--) {
        const rule = ruleIndex[update[i]];

        if (!rule) {
            continue num;
        }

        const previousNums = update.slice(0, i);
        const found = previousNums.some(r=> rule.includes(r));

        if (found) {
            continue update;
        }
    }

    sum += parseInt(update[Math.floor((update.length - 1) / 2)]);
}

console.log(`Answer: ${sum}`);