require('dotenv').config()

const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner, importKey } = require('@taquito/signer');

const { userA, userB } = require('./testbots-util');
const { endpoint, ownerKeys, chain } = require('./config');

const Tezos = new TezosToolkit('https://api.tez.ie/rpc/delphinet');

const signer = new InMemorySigner(ownerKeys.secretKey);

Tezos.setSignerProvider(signer);
Tezos.setProvider({ rpc: endpoint });

console.log('***** Starting to access storage *****');
console.log(chain,'\n');

Tezos.contract.at(process.env.CONTRACT_ADDRESS)
.then(contract => {
    // Return the storage of the contract.
    return contract.storage();
})
.then(storage => {
    // Initialize numTokens with `all_tokens` from conttract `storage`.
    const numTokens = storage.all_tokens
    console.log('***** Storage *****');
    console.log(storage)
    
    console.log('***** Total number of tokens *****');
    console.log(numTokens.length);

    console.log('***** Unic token flag *****');
    console.log(numTokens == 1)
})
.catch(error => console.log(error));
