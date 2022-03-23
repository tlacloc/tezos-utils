#!/usr/bin/env node

const fs = require('fs')
const os = require('os')
const uuid = require('uuid')
const path = require('path')

const { TezosToolkit } = require('@taquito/taquito')
const { InMemorySigner, importKey } = require('@taquito/signer')

const { endpoint, ownerKeys, chain, chain_name } = require('./config')
const { warnings, errors, success, start, finish, flag } = require('./ui')


async function deploy(contract) {

    const Tezos = new TezosToolkit('https://api.tez.ie/rpc/delphinet')

    const signer = new InMemorySigner(ownerKeys.secretKey)

    Tezos.setSignerProvider(signer)
    Tezos.setProvider({ rpc: endpoint })

    let CODE_JSON, STORAGE_JSON, user_balance, contract_cost

    try {

        CODE_JSON = require(`../build/${contract}/compilation/step_000_cont_0_contract.json`)
        STORAGE_JSON = require(`../build/${contract}/compilation/step_000_cont_0_storage.json`)

    } catch (err) {

        flag(`Try to compile the ${contract} contract first`)
        errors(err)
        return
    }


    start('Estimating contract cost \n')

    console.log(`   CONTRACT: ${contract}`)
    console.log(`   CHAIN: ${chain}`, '\n')
    console.log(`   SIGNER: ${ownerKeys.pkh}`, '\n')

    // ACCOUNT BALANCE
    Tezos.tz
        .getBalance(ownerKeys.pkh)
        .then(balance => {
            console.log(`*****\n\n   account balance: ${balance.toNumber() / 1000000} XTZ`)
            user_balance = balance.toNumber() / 1000000
        })
        .catch(error => {
            errors(JSON.stringify(error))
        })

    Tezos.estimate.originate({
        code: CODE_JSON,
        init: STORAGE_JSON
    })
        .then(operation => {
            console.log(`   total deploy cost: ${operation.totalCost / 1000000} XTZ\n`)
            contract_cost = operation.totalCost / 1000000
            if (user_balance > contract_cost) {

                success("User is able to deploy the smart contract\n")
                start("Init the deployment process")
                Tezos.contract.originate({

                    code: CODE_JSON,
                    init: STORAGE_JSON

                }).then(origination => {
                    console.log(`   Origination waiting confirmation...\n\n`);
                    return origination.contract()

                }).then(contract => {
                    success("Origination completed\n")
                    console.log(`   Contract address: ${contract.address}`, '\n')

                    if (chain_name) {
                        console.log(`   https://better-call.dev/${chain_name}/${contract.address}/operations`)
                    }

                }).catch(error => {
                    errors(error)
                })

            }
        })
        .catch(error => {
            errors(error)
        })



}

module.exports = { deploy }