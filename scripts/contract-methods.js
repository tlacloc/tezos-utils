require('dotenv').config()

const { TezosToolkit, MichelsonMap } = require('@taquito/taquito');
const { importKey, InMemorySigner } = require('@taquito/signer');
const { char2Bytes } = require('@taquito/tzip16');

const { userA, userB } = require('./testbots-util');
const { endpoint, ownerKeys, chain } = require('./config');

const Tezos = new TezosToolkit('https://api.tez.ie/rpc/delphinet');

const signer = new InMemorySigner(ownerKeys.secretKey);

Tezos.setSignerProvider(signer);
Tezos.setProvider({ rpc: endpoint });

console.log('***** Contract methods *****');
Tezos.contract.at(process.env.CONTRACT_ADDRESS)
  .then((c) => {
    let methods = c.parameterSchema.ExtractSignatures();
    console.log(JSON.stringify(methods, null, 2));
  })
  .catch((error) => console.log(`Error: ${error}`));