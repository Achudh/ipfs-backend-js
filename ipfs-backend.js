// Required modules
const ipfsAPI = require('ipfs-api');
const express = require('express');
const fs = require('fs');

const app = express();

// Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' });

// Reading file from computer
const testFile = fs.readFileSync('hello.txt');
// Creating buffer for ipfs function to add file to the system
const testBuffer = Buffer.from(testFile);
let file_path;
// Addfile router for adding file a local file to the IPFS network without any local node
app.get('/addfile', function(req, res) {
        ipfs.files.add(testBuffer, function(err, file) {
                if (err) {
                        console.log(err);
                }
                file_path = file[0].path;
                console.log('file_path:', file_path);
                console.log(file);
        });
});
// Getting the uploaded file via hash code.
app.get('/getfile', function(req, res) {
        // This hash is returned hash of addFile router.
        const validCID = file_path;

        ipfs.files.get(validCID, function(err, files) {
                files.forEach(file => {
                        console.log(file.path);
                        console.log(file.content.toString());
                });
        });
});

app.listen(3000, () => console.log('App listening on port 3000!'));
