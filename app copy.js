const http = require('node:http');
const fs = require("fs");
const path = require("path");

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer(async (req, res) => {
    try {
        await callServer();
        // Example of an asynchronous operation using await
        // Replace 'someAsyncFunctionThatReturnsAPromise()' with your actual async logic

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    };
});

async function callServer() {

    // const filePath = path.join(__dirname, "tallyResponse.json");
    const filePath = path.join(process.cwd(), "tallyResponse.json");

    const response = await fetch("http://127.0.0.1:9000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Tallyrequest": "Export",
            "Type": "collection",
            "Id": "Ledger"
        },
        body: `{
    "static_variables": [
        {
            "name": "svExportFormat",
            "value": "jsonex"
        },
        {
            "name": "svCurrentCompany",
            "value": "Mani2"
        }
    ]
}`
    });

    if (!response.ok) {
        // throw new Error("Server responded " + response.status);
    }

    // Convert WebStream -> Node stream
    const nodeStream = require("stream").Readable.fromWeb(response.body);

    const fileStream = fs.createWriteStream(filePath);

    // PIPE (zero memory usage)
    await new Promise((resolve, reject) => {
        nodeStream.pipe(fileStream);
        nodeStream.on("error", reject);
        fileStream.on("finish", resolve);
        fileStream.on("error", reject);
    });

    console.log("Saved successfully!");
};

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
