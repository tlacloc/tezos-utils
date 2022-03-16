#!/usr/bin/env node

require('dotenv').config()

const { InMemorySigner } = require("@taquito/signer");
const { TezosToolkit }   = require("@taquito/taquito");

const { endpoint }       = require('./config');

const networkDisplayName = {
	mainnet: '???',
	local: 'Local',
	granadanet: 'Granadanet',
	florencenet: 'Florencenet',
	hangzhounet: 'Hangzhounet'
}

const endpoints = {
	local: 'https://127.0.0.1:8888',
	mainnet: 'https://mainnet.smartpy.io',
	granadanet: 'https://granadanet.smartpy.io',
	florencenet: 'https://florencenet.smartpy.io',
	hangzhounet: 'https://hangzhounet.smartpy.io'
}

const ownerAccounts = {

}

const publicKeys = {

}

module.exports = {
	initialize: async () => {
	        const rpc = endpoint;
	        Tezos.setRpcProvider(rpc);
	    },

	setSigner: async (secretKey) => {
	        const signer = (await InMemorySigner.fromSecretKey(secretKey));
	        Tezos.setSignerProvider(signer);
	    }
}