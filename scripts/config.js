require('dotenv').config()

const { ADMIN } = require('./testbots-util');

const supportedChains = {
	local: 'local',
	mainnet: 'mainnet',
	granadanet: 'granadanet',
	florencenet: 'florencenet',
	hangzhounet: 'hangzhounet'
}

const endpoints = {
	local: 'https://127.0.0.1:8888',
	mainnet: 'https://mainnet.smartpy.io',
	granadanet: 'https://granadanet.smartpy.io',
	florencenet: 'https://florencenet.smartpy.io',
	hangzhounet: 'https://hangzhounet.smartpy.io'
}

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

const chain = process.env.PROTOCOL_NAME

const endpoint = endpoints[chain]
const ownerKeys = ownerPublicKeysByChain[chain]

module.exports = {
	endpoint, ownerKeys, chain
}