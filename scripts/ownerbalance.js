 require('dotenv').config()

const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner, importKey } = require('@taquito/signer');

const { userA, userB } = require('./testbots-util');
const { endpoint, ownerKeys, chain } = require('./config');

const Tezos = new TezosToolkit('https://api.tez.ie/rpc/delphinet');

const signer = new InMemorySigner(ownerKeys.secretKey);

Tezos.setSignerProvider(signer);
Tezos.setProvider({ rpc: endpoint });

console.log('***** Account balance *****');
console.log(chain,'\n');

Tezos.tz
  .getBalance(ownerKeys.pkh)
  .then(balance => console.log(`account balance: ${balance.toNumber() / 1000000} ꜩ`))
  .catch(error => console.log(JSON.stringify(error)));