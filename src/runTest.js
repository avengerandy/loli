const path = require('path');
const runIfFunction = require('./runIfFunction.js');
const runTestFile = require('./runTestFile.js');
const eachSeries = require('./eachSeries.js');

module.exports = async function runTest (testFiles, config, count) {
    await eachSeries(testFiles, async function (testFilePath) {
        count.fileTestCount++;
        const testFile = require(testFilePath);
        console.group(count.fileTestCount + '. test ' + path.basename(testFilePath));
        count.subTestCount = 0;
        await runIfFunction(testFile.startFunction);
        await runTestFile(testFile, config, count);
        await runIfFunction(testFile.endFunction);
        console.groupEnd();
    });
};
