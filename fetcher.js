
const request = require('request');
const fs = require('fs');
const readline = require('readline');

const url = process.argv[2];
const filePath = process.argv[3];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let bodyFile;
request(url, (error, response, body) => {
    if (error) {
        console.error('Error:', error.message);
    }
    bodyFile = body;
    const writeToFile = () => {
        fs.writeFile(filePath, bodyFile, err => {
            if (err) {
                console.log(err);
            } else {
                console.log('Downloaded and saved 3261 bytes to ./index.html');
            }
        });
        rl.close();
    }

    if (fs.existsSync(filePath)) {
        rl.question('File already exists. Do you want to overwrite it? (Y/N) ', answer => {
            if (answer.toUpperCase() === 'Y') {
                console.log('Overwriting the file');
                writeToFile();
            } else {
                console.log('Exiting without overwriting the file.');
                rl.close();
            }
        });
    } else {
        writeToFile();
    }
});