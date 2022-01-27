require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_Key, process.env.PINATA_API_Secret);

pinata.testAuthentication().then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

let all_tokens = {}

for (let i = 0; i < 10; i++) {
  let sourcePath  = `media/placeholders/Unibot#${i}-placeholder.json`
  let name = `Unibot #${i}`

    const options = {
        pinataMetadata: {
            name: name,
            keyvalues: {
                customKey: 'metadata',
                customKey2: 'example'
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    pinata.pinFromFS(sourcePath, options).then((result) => {
        console.log(i);
        console.log(result);
        all_tokens[i] = `ipfs://${result.IpfsHash}`
        // if (i === 9){
                fs.appendFile("media/placeholders/all_tokens_placeholder.json", JSON.stringify(all_tokens), (err) => {
                if (err) {
                    throw err;
                }
                console.log("File is updated.");
                });
            // }

    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}
