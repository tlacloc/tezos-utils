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

// ACCOUNT BALANCE
Tezos.tz
  .getBalance(ownerKeys.pkh)
  .then(balance => console.log(`***** Account balance *****\n${chain}\naccount balance: ${balance.toNumber() / 1000000} ꜩ`))
  .catch(error => console.log(JSON.stringify(error)));

// CONTRACT COST
Tezos.estimate.originate({
    // Pass in the CODE_JSON as `code` and STORAGE_JSON as `init`.
    code: CODE_JSON,
    init: STORAGE_JSON
  })
  .then(operation => {
    // print `totalCost` required for the origination of the contract.
    console.log(`***** Estimating cost of deploying the contract *****\n${chain}\ntotal cost: ${operation.totalCost / 1000000} ꜩ`)
  })
  // .catch(error => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
  .catch(error => {
    console.log(error)
  })