require('dotenv').config();
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_Key, process.env.PINATA_API_Secret);

async function uploadToIPFS(sourcePath, outputName, customKey, customKey1) {
  const options = {
    pinataMetadata: {
        name: outputName,
        keyvalues: {
            customKey: customKey1,
            customKey2: customKey2
        }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    pinata.pinFromFS(sourcePath, options).then((result) => {
        return result.IpfsHash
    }).catch((err) => {
        console.log(err);
    });
}

module.exports.uploadToIPFS = uploadToIPFS;
