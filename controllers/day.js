const fs = require('fs');
const path = require('path');

function initDay(year, day) {
    const basePath = path.resolve(__dirname, '../');

    initFileSystem(basePath, year, day);

    // TO-DO: Get puzzle input

    return;
}

function initFileSystem(basePath, year, day) {
    fs.readFile(path.resolve(basePath, 'config/dayTemplate.js'), 'utf-8', (err, template) => {
        const yearPath = path.resolve(basePath, year);
        const dayPath = path.resolve(yearPath, (day.length < 2 ? '0' : '') + day);

        const templatePaths = [
            path.resolve(dayPath, 'part1.js'),
            path.resolve(dayPath, 'part2.js')
        ];

        if(!fs.existsSync(yearPath)) {
            fs.mkdirSync(yearPath);
        }

        if(!fs.existsSync(dayPath)) {
            fs.mkdirSync(dayPath);
        }

        for (const path of templatePaths) {
            fs.writeFile(path, template, (err) => {
                if(err) {
                    console.log(err);
                }
            });
        }
    });
}

module.exports = {
    initDay
}