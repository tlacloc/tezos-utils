#!/usr/bin/env node

const { contracts, publicKeys, owner, chain, sleep, isLocalNode } = require('./config')
const { compileContract } = require('./compile')
const { testContract } = require('./test')
const { deploy } = require('./deploy')
const { estimate } = require('./estimate')

const { contract_exists } = require('./utils')
const { warnings, errors, success, start, finish, flag } = require('./ui')


const prompt = require('prompt-sync')()




async function compile () {

  // compile contracts
  console.log('**** COMPILING CONTRACTS')

  await Promise.all( contracts.map(contract => {
    return compileContract({
      contract: contract,
      path: `./src/${contract}.py`      
    })
  }))

  finish('Compilation finished!')

}


async function compile_contract ( contractName ) {
  
  // compile a given contract
  let contract = contracts.filter(c => c == contractName)
  if (contract.length > 0) {
    contract = contract[0]
  } else {
    errors(`${contractName} contract not defined for ${chain}\n   Is it defined in config.js?`)
    return
  }

  await compileContract({
    contract: contract,
    path: `./src/${contract}.py`      
  })

  finish('Compilation finished!')


}


async function test () {

  // compile contracts
  console.log('**** TESTING CONTRACTS\n')

  await Promise.all(contracts.map(contract => {
    return testContract({
      contract: contract,
      path: `./src/${contract}.py`      
    })
  }))

  finish('testing finished')

}


async function test_contract ( contractName ) {

  // test a given contract
  let contract = contracts.filter(c => c == contractName)
  if (contract.length > 0) {
    contract = contract[0]
  } else {
    errors(`${contractName} contract not defined for ${chain}\n   Is it defined in config.js?`)
    return
  }

  await testContract({
    contract: contract,
    path: `./src/${contract}.py`      
  })

  finish('testing finished')


}




async function run ( contractName ) {

  // compile an deploy a given contract
  let contract = contracts.filter(c => c == contractName)
  if (contract.length > 0) {
    contract = contract[0]
  } else {
    errors(`${contractName} contract not defined for ${chain}\n   Is it defined in config.js?`)
    return
  }

  if (!isLocalNode()) {
    const option = prompt(`You are about to run a command on ${chain}, are you sure? [y/n] `)
    if (option.toLowerCase() !== 'y') { return }
  }

  await compile_contract( contractName )

  await deploy( contractName ) 

  

  finish("Deployment completed!")

}

async function deploy_contract ( contractName ) {

  // deploy a given contract
  let contract = contracts.filter(c => c == contractName)
  if (contract.length > 0) {
    contract = contract[0]
  } else {
    errors(`${contractName} contract not defined for ${chain}\n   Is it defined in config.js?`)
    return
  }

  if (!isLocalNode()) {
    const option = prompt(`You are about to run a command on ${chain}, are you sure? [y/n] `)
    if (option.toLowerCase() !== 'y') { return }
  }

  await deploy( contractName )

  finish("Deployment completed!")


}

async function deploy_contract_github ( contractName ) {

  // deploy a given contract
  let contract = contracts.filter(c => c == contractName)
  if (contract.length > 0) {
    contract = contract[0]
  } else {
    errors(`${contractName} contract not defined for ${chain}\n   Is it defined in config.js?`)
    return
  }

  await deploy( contractName )

  finish("Deployment completed!")


}

async function estimate_contract ( contractName ) {
  // estimate deploy cost of a given contract
  let contract = contracts.filter(c => c == contractName)
  if (contract.length > 0) {
    contract = contract[0]
  } else {
    errors(`${contractName} contract not defined for ${chain}\n   Is it defined in config.js?`)
    return
  }

  if (!isLocalNode()) {
    const option = prompt(`You are about to run a command on ${chain}, are you sure? [y/n] `)
    if (option.toLowerCase() !== 'y') { return }
  }

  await estimate( contractName )

  finish("Estimation completed!")
}

async function estimate_contract_github ( contractName ) {
  // estimate deploy cost of a given contract
  let contract = contracts.filter(c => c == contractName)
  if (contract.length > 0) {
    contract = contract[0]
  } else {
    errors(`${contractName} contract not defined for ${chain}\n   Is it defined in config.js?`)
    return
  }

  await estimate( contractName )

  finish("Estimation completed!")

}

async function main () {


  const args = process.argv.slice(2)

  switch(args[0]) {


    case 'compile':
      if (args.length == 1) {
        await compile()

      } else {

        await compile_contract(args[1])
      }

      break;

    case 'test':
      if (args.length == 1) {
        await test()

      } else {

        await test_contract(args[1])
      }

      break;

    case 'deploy':
      await deploy_contract(args[1])
      break;

    case 'estimate':
      await estimate_contract(args[1])
      break;


    case 'run':
      await run(args[1])
      break;


    default:
      errors('Invalid input.')
      break;

  } 

}

module.exports = {
  compile,
  compile_contract,
  test_contract,
  deploy_contract,
  deploy_contract_github,
  estimate_contract,
  estimate_contract_github,
  run

}