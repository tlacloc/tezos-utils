require('dotenv').config()

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
	hangzhounet: 'https://hangzhounet.smartpy.io',
	ithacanet: 'https://ithacanet.smartpy.io'
}

// accounts

const ownerPublicKeysByChain = {
  	[supportedChains.local]: {
		pkh : process.env.LOCAL_PUBLIC_KEY,
    	secretKey : process.env.LOCAL_PRIVATE_KEY
  	},
  	[supportedChains.granadanet]: {
		pkh  : process.env.GRANADANET_PUBLIC_KEY,
    	secretKey : process.env.GRANADANET_PRIVATE_KEY
  	},
  	[supportedChains.florencenet]: {
		pkh  : process.env.FLORENCENET_PUBLIC_KEY,
    	secretKey : process.env.FLORENCENET_PRIVATE_KEY
  	},
  	[supportedChains.hangzhounet]: {
		pkh  : process.env.HANGZHOUNET_PUBLIC_KEY,
    	secretKey : process.env.HANGZHOUNET_PRIVATE_KEY
  	},
  	[supportedChains.ithacanet]: {
		pkh  : process.env.ITHACANET_PUBLIC_KEY,
    	secretKey : process.env.ITHACANET_PRIVATE_KEY
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