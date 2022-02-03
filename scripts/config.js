require('dotenv').config()

const { ADMIN } = require('./utils');

// endpoints

const supportedChains = {
	local: 'local',
	mainnet: 'mainnet',
	granadanet: 'granadanet',
	florencenet: 'florencenet',
	hangzhounet: 'hangzhounet'
}

const endpoints = {
	mainnet: 'https://mainnet.smartpy.io',
	granadanet: 'https://granadanet.smartpy.io',
	florencenet: 'https://florencenet.smartpy.io',
	hangzhounet: 'https://hangzhounet.smartpy.io'
}

// accounts

const ownerPublicKeysByChain = {
  	[supportedChains.local]: {
		pkh : ADMIN.pkh,
    	secretKey : ADMIN.secretKey
  	},
  	[supportedChains.granadanet]: {
		pkh  : ADMIN.pkh,
    	secretKey : ADMIN.secretKey
  	},
  	[supportedChains.florencenet]: {
		pkh  : ADMIN.pkh,
    	secretKey : ADMIN.secretKey
  	},
  	[supportedChains.mainnet]: {
		pkh  : process.env.TEZOS_PUBLIC_KEY,
  		secretKey : process.env.TEZOS_PRIVATE_KEY
  	}
}

// contracts

const contractsConfig = {
  [supportedChains.local]: [
    'calculator'
  ],
  [supportedChains.hangzhounet]: [
    'calculator'
  ]
}


// utils

const chain = process.env.PROTOCOL_NAME

const endpoint = endpoints[chain]
const ownerKeys = ownerPublicKeysByChain[chain]

const contracts = contractsConfig[chain]


function isLocalNode () {
  return chain == supportedChains.local
}


module.exports = {
	endpoint, ownerKeys, chain, isLocalNode, contracts
}