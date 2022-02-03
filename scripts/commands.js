const { contracts, publicKeys, owner, chain, sleep, isLocalNode } = require('./config')
const { compileContract } = require('./compile')
const { testContract } = require('./test')

const { createAccount, deployContract } = require('./deploy')

const prompt = require('prompt-sync')()


async function compile () {

  // compile contracts
  console.log('**** COMPILING CONTRACTS\n')

  await Promise.all(contracts.map(contract => {
    return compileContract({
      contract: contract,
      path: `./src/${contract}.py`      
    })
  }))

  console.log('compilation finished\n\n')

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

  console.log('compilation finished\n\n')


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




async function run ( contract ) {
  // compile an deploy a given contract

}





async function main () {

  if (!isLocalNode()) {
    const option = prompt(`You are about to run a command on ${chain}, are you sure? [y/n] `)
    if (option.toLowerCase() !== 'y') { return }
  }

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

    case 'run':
      await run(args[1])
      break;


    default:
      console.log('Invalid input.')
      break;

  } 

}

main()