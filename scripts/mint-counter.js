require('dotenv').config()

const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner, importKey } = require('@taquito/signer');

const { userA, userB } = require('./testbots-util');
const { endpoint, ownerKeys, chain } = require('./config');

const Tezos = new TezosToolkit('https://api.tez.ie/rpc/delphinet');

const signer = new InMemorySigner(ownerKeys.secretKey);

Tezos.setSignerProvider(signer);
Tezos.setProvider({ rpc: endpoint });

console.log("Starting...");
console.log(chain, '\n');

Tezos.contract.at(process.env.FA2_CONTRACT_ADDRESS)
.then(contract => {
    // Access and return the contract storage
    return contract.storage()
})
.then(storage => {
    // Access and return the value of tokens minteed
    return storage.token_index.c[0]
})  
.then(res => {
    console.log(res)
})      
.catch((error) => console.log(error));