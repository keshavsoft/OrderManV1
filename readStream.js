const fs = require('fs');
const { chain } = require('stream-chain');
const { parser } = require('stream-json');
const { pick } = require('stream-json/filters/Pick');
const { streamArray } = require('stream-json/streamers/StreamArray');
const destinationFile = './destination.json';


const pipeline = chain([
    fs.createReadStream('ledgers.json', { encoding: 'utf16le' }),
    parser(),
    pick({ filter: 'data.collection' }),
    streamArray()
]);

let count = 0;
let Array1 = [];

pipeline.on('data', ({ value }) => {
    Array1.push({
        "AccountName": value?.metadata?.name,
        "Parent": value?.parent?.value
    });
});

pipeline.on('end', () => {
    fs.writeFileSync(destinationFile, JSON.stringify(Array1), 'utf8');

    console.log("FINISHED:", Array1);
});