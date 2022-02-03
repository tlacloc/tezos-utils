# Tezos node scripts helpers

This repo contains some scripts to help in the develop of smart contract in tezos chain.

Currently it has the following features:

- Compile one or multiple contracts
- Test one or multiple contracts

## Setup

This repo is meant to be a submodule for other repos, so to setup the project follow the next commands.

- Install docker or smartpy - CLI
- Install node and npm

Clone or cd to your working project and clone this one by running the following command:
`git submodule add https://github.com/tlacloc/tezos-utils`

- Then copy scripts and src folder to main project folder.
- Copy package.json and .env.example in main project folder.
- Save .env.example as .env and fill the vairables as needed.

run `npm install` to install the modules needed for the repo (also if you want, copy .gitignore from this submodule to don't store all the crap and byte-compiled smarpy files).

### Configure the following files:

Create test account (if needed) and store the information in scripts/accounts.js.
Add the name of the smart contract file in scripts/config.js (in `contractsConfig`).

### Other configurations

I highly recommend to create build/ and test_retults/ folders on your main project before running any command of the Commands section, in some cases the ouput files/directories has root permissions, you can fix it by running the following command:

`sudo chmod -R a=wr build/`

Do the same for the test_results

## Commands

### Compile contract

To compile all contracts in `contractsConfig` stored in src/ just run:

`node scripts/commands.js compile`

To compile a specific contract in `contractsConfig` stored in src/ just run:

`node scripts/commands.js compile $CONTRACT_NAME`

The output of both commands would be stored at build/$CONTRACT_NAME/

### Test contract

To test all contracts in `contractsConfig` stored in src/ just run:

`node scripts/commands.js test`

To test a specific contract in `contractsConfig` stored in src/ just run:

`node scripts/commands.js test $CONTRACT_NAME`

The output of both commands would be stored at tests_results/$CONTRACT_NAME/

