const fs = require('fs');
const path = require('path');

function initDay(year, day) {
    const basePath = path.resolve(__dirname, '../');

    const dayPath = initFileSystem(basePath, year, day);

    getInput(dayPath, year, day);

    return;
}

function initFileSystem(basePath, year, day) {
    const template = fs.readFileSync(path.resolve(basePath, 'config/dayTemplate.js'), 'utf-8');

    const yearPath = path.resolve(basePath, year);
    const dayPath = path.resolve(yearPath, (day.length < 2 ? '0' : '') + day);

    if (!fs.existsSync(yearPath)) {
        fs.mkdirSync(yearPath);
    }

    if (!fs.existsSync(dayPath)) {
        fs.mkdirSync(dayPath);
    }

    fs.writeFileSync(path.resolve(dayPath, 'part1.js'), template);
    fs.writeFileSync(path.resolve(dayPath, 'part2.js'), template);

    return dayPath;
}

async function getInput(path, year, day) {
    if (existsInputFile(path)) {
        return;
    }

    // TO-DO: Get input file
    const data = 'kk';

    createInputFile(path, data);
}

function createInputFile(filePath, data) {
    fs.writeFileSync(path.resolve(filePath, 'input.txt'), data);
}

function existsInputFile(basePath) {
    return fs.existsSync(path.resolve(basePath, 'input.txt'));
}

module.exports = {
    initDay
}