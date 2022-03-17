# Tezos node scripts helpers

This repo contains some scripts to help in the develop of smart contract in tezos chain.

Currently it has the following features:

- Compile one or multiple contracts
- Test one or multiple contracts

## Setup
This repo is meant to be a submodule for other repos, so to setup the project follow the next commands:

Add to the submodule to your repo by running:


``` bash
git submodule add https://github.com/tlacloc/tezos-utils
```


You can run the setup.sh file with 

``` bash
sh tezos-utils/setup.sh
```

Or you can do it manually by:

- Install docker or smartpy - CLI
- Install node and npm

- Then copy scripts and src folder to main project folder.
- Copy package.json and .env.example in main project folder.
- Save .env.example as .env and fill the vairables as needed.

run `npm install` to install the modules needed for the repo (also if you want, copy .gitignore from this submodule to don't store all the crap and byte-compiled smarpy files).

### Configure the following files:

Create test account (if needed) and store the information in scripts/accounts.js.
Add the name of the smart contract file in scripts/config.js (in `contractsConfig`).

### Other configurations

I highly recommend to create build/ and test_retults/ folders on your main project before running any command of the Commands section, in some cases the ouput files/directories has root permissions, you can fix it by running the following command:

``` bash
sudo chmod -R a=wr build/
```

Do the same for the test_results

Make sure the scripts/tezos-utils.js has executable permissions.

## Commands

Before runing any of these commands, make sure the compilation target name of your smart contract is "compilation", or make a small fix at scripts/compile.js to match your compilation target name

### Compile contract

To compile all contracts in `contractsConfig` stored in src/ just run:

``` bash
node scripts/tezos-utils.js compile all
```

To compile a specific contract in `contractsConfig` stored in src/ just run:

``` bash
node scripts/tezos-utils.js compile <contract> <other contracts>
```

You can specify as many as you want.

The output of both commands would be stored at build/$CONTRACT_NAME/

### Test contract

To test all contracts in `contractsConfig` stored in src/ just run:

``` bash
node scripts/tezos-utils.js test all
```

To test a specific contract in `contractsConfig` stored in src/ just run:

``` bash
node scripts/tezos-utils.js test <contract> <other contracts>
```

You can specify as many as you want.


The output of both commands would be stored at tests_results/$CONTRACT_NAME/


### Estimate contract deployment cost


To estimate the deployment cost a specific contract in `contractsConfig` stored in src/ just run:

``` bash
node scripts/tezos-utils.js estimate <contract>
```

note: this action would be sign with the account and chain of the environment variables stored at .env, also would return the actual account balance and the deployment cost.
### Deploy contract


To deploy a specific contract in `contractsConfig` stored in src/ just run:

``` bash
node scripts/tezos-utils.js deploy <contract>
```

note: this action would be sign with the account and chain of the environment variables stored at .env

## Other features

The project can be used with github workflow, to make it possible, you would need to create an action in github based on the one stored at .github/workflows

What it does it, when there is a push or merge in the dev branch (it can be also configured to mainnet in master branch) the actions installs the app and compiles, tests, estimates and deploy the smart contract into hangzhounet tezos testnet.

If you want to do the same, you need to create the secrets in your repo, there you would need to store your public and private keys (that's why I just use it on testnet) similar as we store them in the .env file.

Then decide what contract you want to run and change the name (currently is the calculator we have for for illustrative purposes only) to the one you stored in the config file. Make sure you have configure the contract to be built in the testnet chain.