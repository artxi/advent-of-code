const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const settings = require('../config/settings')

function initDay(year, day) {
    const basePath = path.resolve(__dirname, '../');

    const dayPath = initFileSystem(basePath, year, day);

    getInput(dayPath, year, day);

    return;
}

function initFileSystem(basePath, year, day) {
    const template = fs.readFileSync(path.resolve(basePath, 'config/dayTemplate.js'), 'utf-8');

    day = (day.length < 2 ? '0' : '') + day;
    const yearPath = path.resolve(basePath, year);
    const dayPath = path.resolve(yearPath, day);

    if (!fs.existsSync(yearPath)) {
        fs.mkdirSync(yearPath);
        console.log(`   Created folder ${year}`);
    }

    if (!fs.existsSync(dayPath)) {
        fs.mkdirSync(dayPath);
        console.log(`   Created folder ${day}`);

        fs.writeFileSync(path.resolve(dayPath, 'part1.js'), template);
        fs.writeFileSync(path.resolve(dayPath, 'part2.js'), template);

        console.log(`   Created part templates`);
    }

    return dayPath;
}

async function getInput(dayPath, year, day) {
    if (existsInputFile(dayPath)) {
        return;
    }

    await getInputData(dayPath, year, day);
}

function existsInputFile(basePath) {
    return fs.existsSync(path.resolve(basePath, 'input.txt'));
}

async function getInputData(filePath, year, day) {
    const inputFileName = path.resolve(filePath, 'input.txt');

    let fileStream = fs.createWriteStream(inputFileName);

    await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
        method: 'GET',
        headers: {
            'Cookie': settings.cookie,
        }
    })
    .then(
        res =>
        new Promise((resolve, reject) => {
            res.body.pipe(fileStream);
            res.body.on("end", () => {
                fs.readFile(inputFileName, 'utf-8', (err, data) => {
                    if(err) {
                        return reject(err);
                    }
                    console.log(`   Created input file`);
                });
            });
            fileStream.on("error", reject);
        })
    );
}

module.exports = {
    initDay
}