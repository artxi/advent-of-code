const fs = require('fs');
const path = require('path');

console.time('Time');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
const lines = input.split('\n').filter(l => l);

let answer = 0;

const games = formatLines();
const cubes = {
    red: 12,
    green: 13,
    blue: 14
};

games:
for (const game of games) {
    let possible = true;

    for (const key in game) {
        if (cubes[key] && game[key] > cubes[key]) {
            possible = false;
            continue games;
        }
    }

    answer += game.id;
}

console.log(`Answer: ${answer}`);
console.timeEnd('Time');

function formatLines() {
    const games = [];

    for (const line of lines) {
        const l = line.split(': ');

        const game = {
            id: parseInt(l[0].split(' ')[1])
        };

        for (const round of l[1].split('; ')) {
            for (const color of round.split(', ')) {
                const [colorNum, colorName] = color.split(' ');
                if (!game[colorName] || colorNum > game[colorName]) {
                    game[colorName] = parseInt(colorNum);
                }
            }
        }

        games.push(game);
    }

    return games;
}