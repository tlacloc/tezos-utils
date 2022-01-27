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

console.log('***** Start adding earlybots process *****');
Tezos.contract.at(process.env.CROWDSALE_CONTRACT_ADDRESS)
    .then(contract => {
        return contract.methods.add_earlybots([
            "tz1dWuBhVBcfSzDAuM7YsomUX8yw3RzwHDss", "tz1cWX1M7v3zxJ2BMVbBXeHWxJpgujcb5BNu", "tz2Bkg14sufsQCfC8a248g9PQdCJfMNbzSkc", "tz1L6qxHK6biAYVKtZTv9FdNKxn8Ko8BtBF5", "tz1URdJTzHC53TqMQDMn39HpLnpCMGCKotes", "tz1P1cRCbGs8dHDrovsQaiKky2ca3yHHKGSy", "tz1Tk1MJDZ96bK85RLAqtKfnptZZyXsJ2jaq", "tz1eTsNNkxKquK96GZXTpyci4HrrB86MzWy4", "tz1U9ZoiU5HRvQD29kjK1roSUiLDamMrjDJ9", "tz1MrpnRbw6HqHvKyBE3811uHgJYuvVj2hwN", "tz1awxrDd3XbabtrEPHWKGy2CAtzoL5fJUWz", "tz2LYELYe16viwVBaRjZc8GsauKRsxTGPvB1", "tz1YFkDj3fqq2Ee5Uwx1EpxVtifvv9vm49SE", "tz1gE2DwibdhvFsZVfzEJJUc9QHQ5fXZgEqA", "tz1dKjizZy6FxZaYuaK6HM8Xx3yP558MwaAp", "tz1cp312oRvwp5honfR55EsWUF1nA7QZYxT7", "tz1cbzLKZmSB9hKGHN8bgwqy1CKgHi3KTpV1", "tz1i35AGt1HS1FKN1Mqw4DuCMYHvWAHnUT3H", "tz1dacw9ht5cGFNNb2TUvsfUyJ5LpovoHg8M", "tz1VqZhZjAX4nHukvDRjichfF83CR5D4zRJ2", "tz1d1JfZgKvQNz1p3CBDT4ojLcv5qRGjNUpS", "tz1d482tkbJp5KU4G4XMwbbqSCcU9Xyn9KDx", "tz1TZfBq35tE72CE6JDcmnAbaukW48yvGhVU", "tz1eN8M9eBnNL9Cyr2ADNXZeFKopGa39hqbs"
            ]).send()
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