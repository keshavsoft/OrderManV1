const fs = require('fs');

const sourceFile = './ledgers.json';
const destinationFile = './destination.json';

// 1. Read the source JSON file
let data = fs.readFileSync(sourceFile, "utf16le");
console.log(data.slice(0,200));
// 2. Parse the JSON string into a JavaScript object
const jsonObject = JSON.parse(data);

jsonObject.data.collection.forEach(element => {
    console.log("aaaaaa : ", element);

});

// 3. Stringify the object to a human-readable JSON string (using 2 spaces for indentation)
const jsonString = JSON.stringify(jsonObject, null, 2);

// 4. Write the new JSON string to the destination file
// fs.writeFile(destinationFile, jsonString, 'utf8', (err) => {
