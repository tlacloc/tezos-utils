require('dotenv').config()

const fs = require('fs');
const os = require('os');
const uuid = require('uuid');
const path = require('path');
const { TezosToolkit, MichelsonMap } = require('@taquito/taquito');
const { importKey } = require('@taquito/signer');
const { char2Bytes } = require('@taquito/tzip16');

const { ADMIN, userA, userB } = require('./testbots-util');
const { endpoint } = require('./config');

const Tezos = new TezosToolkit('https://api.tez.ie/rpc/delphinet');

importKey(
  Tezos,
  ADMIN.email,
  ADMIN.password,
  ADMIN.mnemonic.join(' '),
  ADMIN.secret
);

// set cathargenet as the rpc provider (link of selected test network node.)
Tezos.setProvider({ rpc: endpoint });

console.log("Starting transfer...")
Tezos.contract.at(process.env.CONTRACT_ADDRESS)
.then(contract => {
    // transfer 2 tokens from your previous account to the new one which you generated recently.
    return contract.methods.transfer([
      {
        from_: ADMIN.pkh,
        txs: [{ to_: userA.pkh, token_id: 0, amount: 2 }]
      }
    ]).send();
})
.then(operation => {

    console.log("Waiting for confirmation")
    return operation.confirmation(3).then(() => operation.hash);

})
.then(hash => console.log(`Operation injected: https://carthagenet.tzstats.com/${hash}`))
.catch(error => console.error(error));
