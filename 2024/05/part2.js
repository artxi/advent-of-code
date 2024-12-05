const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

// const lines = input.split('\n');

const lines = [
    "47|53",
    "97|13",
    "97|61",
    "97|47",
    "75|29",
    "61|13",
    "75|53",
    "29|13",
    "97|29",
    "53|29",
    "61|53",
    "97|53",
    "61|29",
    "47|13",
    "75|47",
    "97|75",
    "47|61",
    "75|61",
    "47|29",
    "75|13",
    "53|13",
    "",
    "75,47,61,53,29",
    "97,61,53,29,13",
    "75,29,13",
    "75,97,47,61,53",
    "61,13,29",
    "97,13,75,29,47",
];

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
            sum += fixUpdate(update);
            continue update;
        }
    }
}

console.log(`Answer: ${sum}`);

function fixUpdate(update) {
    console.log('------');
    const fixedUpdate = [];

    update:
    while (update.length > 0) {
        console.log(update);

        num:
        for (let i = update.length - 1; i >= 0; i--) {
            const rule = ruleIndex[update[i]];

            if (!rule) {
                fixedUpdate.push(update[i]);
                update = update.slice(0, i);

                continue update;
            }

            const previousNums = update.slice(0, i);

            const found = previousNums.some(r=> rule.includes(r));

            if (found) {
                continue num;
            }
            
            fixedUpdate.push(update[i]);
            update = update.slice(0, i);

            continue update;
        }
    }

    console.log('////');
    console.log(fixedUpdate);
    return parseInt(update[Math.floor((update.length - 1) / 2)]);
}