const readline = require("readline");
const dayController = require('./controllers/day');

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
});

rl.question('Year ', (year) => {
    rl.question('Day ', (day) => {
        dayController.initDay(year, day);

        rl.close();
    });
});