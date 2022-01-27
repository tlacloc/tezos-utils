const fs = require('fs');
const os = require('os');
const uuid = require('uuid');
const path = require('path');

const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner, importKey } = require('@taquito/signer');

const { userA, userB } = require('./testbots-util');
const { endpoint, ownerKeys, chain } = require('./config');

const Tezos = new TezosToolkit('https://api.tez.ie/rpc/delphinet');

const signer = new InMemorySigner(ownerKeys.secretKey);

Tezos.setSignerProvider(signer);
Tezos.setProvider({ rpc: endpoint });

console.log('***** Contract CODE *****');
const CODE_JSON = require('../artifacts/testrobots/compilation/step_000_cont_0_contract.json');
console.log(CODE_JSON);

console.log('***** Contract STORAGE *****');
const STORAGE_JSON = require('../artifacts/testrobots/compilation/step_000_cont_0_storage.json');
console.log(STORAGE_JSON);

console.log('***** Deploying contract *****');
console.log(chain,'\n');

Tezos.contract.originate({
    code: CODE_JSON,
    init: STORAGE_JSON
}).then(origination => {
    console.log(`Origination waiting confirmation...`);
    return origination.contract()
}).then(contract => {
    console.log(`Origination completed.`);
    console.log(`Contract: ${contract.address}`)
})
.catch(error => console.log(error))