const fs = require('fs');
const os = require('os');
const uuid = require('uuid');
const path = require('path');
const { TezosToolkit } = require('@taquito/taquito');
const { importKey } = require('@taquito/signer');

const CODE_JSON = require('../artifacts/code.json');
const STORAGE_JSON = require('../artifacts/storage.json');
const FAUCET_KEY = require('../faucet_key.json')

console.log('Code:');
console.log(CODE_JSON);
console.log('Storage:');
console.log(STORAGE_JSON);

console.log(`FAUCET_KEY: ${FAUCET_KEY.pkh}`);

const Tezos = new TezosToolkit('https://api.tez.ie/rpc/delphinet')

importKey(
  Tezos,
  FAUCET_KEY.email,
  FAUCET_KEY.password,
  FAUCET_KEY.mnemonic.join(' '),
  FAUCET_KEY.secret
);

console.log(`Tezoz signer: ${Tezos.signer._key.key}`);

Tezos.estimate.originate({
code: CODE_JSON,
init: STORAGE_JSON
})
.then(opEstimate=> {
console.log(opEstimate)
})
.catch(error => console.log(`Error: ${JSON.stringify(error, null, 2)}`));

Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/delphinet' });
console.log(`Tezoz rcp: ${Tezos._rpc}`);

Tezos.estimate.originate({
  code: CODE_JSON,
  init: STORAGE_JSON
})
.then(opEstimate=> {
  console.log(opEstimate)
})
.catch(error => console.log(`Error: ${JSON.stringify(error, null, 2)}`));