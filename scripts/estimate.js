#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const uuid = require('uuid');
const path = require('path');

const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner, importKey } = require('@taquito/signer');

const { endpoint, ownerKeys, chain } = require('./config');

async function estimate ( contract ) {

    const Tezos = new TezosToolkit('https://api.tez.ie/rpc/delphinet');

    const signer = new InMemorySigner(ownerKeys.secretKey);

    Tezos.setSignerProvider(signer);
    Tezos.setProvider({ rpc: endpoint });

    // console.log('***** Contract CODE *****');
    const CODE_JSON = require(`../build/${contract}/compilation/step_000_cont_0_contract.json`);
    // console.log(CODE_JSON,'\n');

    // console.log('***** Contract STORAGE *****');
    const STORAGE_JSON = require(`../build/${contract}/compilation/step_000_cont_0_storage.json`);
    // console.log(STORAGE_JSON,'\n');

    console.log('***** Estimating contract cost *****','\n');
    console.log(`CONTRACT: ${contract}`)
    console.log(`CHAIN: ${chain}`,'\n');
    console.log(`SIGNER: ${ownerKeys.pkh}`,'\n');

    // ACCOUNT BALANCE
    Tezos.tz
      .getBalance(ownerKeys.pkh)
      .then(balance => console.log(`*****\naccount balance: ${balance.toNumber() / 1000000} XTZ`))
      .catch(error => console.log(JSON.stringify(error)));

    // CONTRACT COST
    Tezos.estimate.originate({
        // Pass in the CODE_JSON as `code` and STORAGE_JSON as `init`.
        code: CODE_JSON,
        init: STORAGE_JSON
      })
      .then(operation => {
        // print `totalCost` required for the origination of the contract.
        console.log(`total deploy cost: ${operation.totalCost / 1000000} XTZ`)
      })
      // .catch(error => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
      .catch(error => {
        console.log(error)
      })

}

module.exports = { estimate }