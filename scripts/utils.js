#!/usr/bin/env node


require('dotenv').config()

async function contract_exists ( contractName ) {

  let contract = contracts.filter(c => c == contractName)
  if (contract.length > 0) {
    contract = contract[0]
  } else {
    console.log('contract not found')
    return
  }
  
}

module.exports = {
	contract_exists
}
