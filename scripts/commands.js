#!/usr/bin/env node

const { contracts, publicKeys, owner, chain, sleep, isLocalNode } = require('./config')
const { compileContract } = require('./compile')
const { testContract } = require('./test')
const { deploy } = require('./deploy')
const { estimate } = require('./estimate')

const { contract_exists } = require('./utils')

const prompt = require('prompt-sync')()




async function compile () {

  // compile contracts
  console.log('**** COMPILING CONTRACTS\n')

  await Promise.all( contracts.map(contract => {
    return compileContract({
      contract: contract,
      path: `./src/${contract}.py`      
    })
  }))

  console.log('Compilation finished!\n\n')

}


async function compile_contract ( contractName ) {
  
  // compile a given contract
  let contract = contracts.filter(c => c == contractName)
  if (contract.length > 0) {
    contract = contract[0]
  } else {
    console.log('contract not found')
    return
  }

  console.log(`COMPILING CONTRACT ${contractName}`)

  await compileContract({
    contract: contract,
    path: `./src/${contract}.py`      
  })

  console.log('Compilation finished!\n\n')


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

  console.log('testing finished\n\n')

}


async function test_contract ( contractName ) {

  // test a given contract
  let contract = contracts.filter(c => c == contractName)
  if (contract.length > 0) {
    contract = contract[0]
  } else {
    console.log('contract not found')
    return
  }

  console.log(`TESTING CONTRACT ${contractName}`)

  await testContract({
    contract: contract,
    path: `./src/${contract}.py`      
  })

  console.log('testing finished\n\n')


}




async function run ( contractName ) {

  // compile an deploy a given contract
  let contract = contracts.filter(c => c == contractName)
  if (contract.length > 0) {
    contract = contract[0]
  } else {
    console.log('contract not found')
    return
  }

  if (!isLocalNode()) {
    const option = prompt(`You are about to run a command on ${chain}, are you sure? [y/n] `)
    if (option.toLowerCase() !== 'y') { return }
  }

  await compile_contract( contractName )

  await deploy( contractName ) 

  



}

async function deploy_contract ( contractName ) {

  // deploy a given contract
  let contract = contracts.filter(c => c == contractName)
  if (contract.length > 0) {
    contract = contract[0]
  } else {
    console.log('contract not found')
    return
  }

  if (!isLocalNode()) {
    const option = prompt(`You are about to run a command on ${chain}, are you sure? [y/n] `)
    if (option.toLowerCase() !== 'y') { return }
  }

  await deploy( contractName )


}

async function deploy_contract_github ( contractName ) {

  // deploy a given contract
  let contract = contracts.filter(c => c == contractName)
  if (contract.length > 0) {
    contract = contract[0]
  } else {
    console.log('contract not found')
    return
  }

  await deploy( contractName )


}

async function estimate_contract ( contractName ) {
  // estimate deploy cost of a given contract
  let contract = contracts.filter(c => c == contractName)
  if (contract.length > 0) {
    contract = contract[0]
  } else {
    console.log('contract not found')
    return
  }

  if (!isLocalNode()) {
    const option = prompt(`You are about to run a command on ${chain}, are you sure? [y/n] `)
    if (option.toLowerCase() !== 'y') { return }
  }

  await estimate( contractName )
}

async function estimate_contract_github ( contractName ) {
  // estimate deploy cost of a given contract
  let contract = contracts.filter(c => c == contractName)
  if (contract.length > 0) {
    contract = contract[0]
  } else {
    console.log('contract not found')
    return
  }

  await estimate( contractName )
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
      console.log('Invalid input.')
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