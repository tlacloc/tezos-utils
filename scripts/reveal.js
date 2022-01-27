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

const data = MichelsonMap.fromLiteral(
    {0 : MichelsonMap.fromLiteral ({ "" : char2Bytes('ipfs://test') }),
     1 : MichelsonMap.fromLiteral ({ "" : char2Bytes('ipfs://test') }),
     2 : MichelsonMap.fromLiteral ({ "" : char2Bytes('ipfs://test') })
    }      
)

const michelson = new MichelsonMap.fromLiteral( { 0 : {"" : char2Bytes('ipfs://')}})

console.log('***** Start revealing process *****');

// console.log([MichelsonMap.fromLiteral( {0 : {"" : char2Bytes('ipfs://')}}  )])

console.log(data)


Tezos.contract.at(process.env.CROWDSALE_CONTRACT_ADDRESS)
    .then(contract => {
        // return contract.methods.reveal_metadata( storageMap ).send()
        return contract.methods.reveal_metadata( data ).send()
        // return contract.methods.reveal_metadata( {0 : {"" : char2Bytes("ipfs://")}}).send();
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