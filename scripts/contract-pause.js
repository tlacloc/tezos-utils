require('dotenv').config()

const { TezosToolkit, MichelsonMap } = require('@taquito/taquito');
const { importKey, InMemorySigner } = require('@taquito/signer');

const { endpoint, ownerKeys, chain } = require('./config');

const Tezos = new TezosToolkit('https://api.tez.ie/rpc/delphinet');

const signer = new InMemorySigner(ownerKeys.secretKey);

Tezos.setSignerProvider(signer);
Tezos.setProvider({ rpc: endpoint });

console.log('***** Start the contract *****');
Tezos.contract.at(process.env.CONTRACT_ADDRESS)
    .then(contract => {

        return contract.methods.set_pause(false).send();
    })
    .then(operation => {
        // Return the operation while specifying to wait for 3 confirmations.
        console.log('Waiting for confirmation')
        return operation.confirmation(3).then(() => operation.hash);
    })
    .then(hash => {
        // Print to the console - Operation injected: ${hash}
        console.log(`Operation injected: ${hash}`)
    })
    .catch(error => console.log(error.message));