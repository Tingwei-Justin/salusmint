# salusmint

## Deploy Salusmint Core Contracts in local host

1. Start the goerli fork network: `yarn fork https://eth-goerli.g.alchemy.com/v2/<your id>`
2. Run `python3 main.py`
3. Run `npx hardhat run ./scripts/1-deploySmartMintFactory.ts --network localhost`
4. Get USDC address and SalusMint Factory address
5. copy `huma-contracts-fork/deployment/localhost-deployed-contracts.json` to `pool.ts` DEPLOYED_CONTRACTS

## Deploy Salusmint Core Contracts in Polygam Mumai TestNet

## Setup SSV Pool for staking

### Setup the Brownie Envionrment

1. Go to ssv-fork/ssv-contract-fork folder
2. Setup RPC `export WEB3_ALCHEMY_PROJECT_ID=<your id>`
3. Setup deployer private key `brownie accounts new deployer`
4. Install latest openzeppelin contracts `brownie pm install OpenZeppelin/openzeppelin-contracts-upgradeable@4.8.0`

### Deploy the SSV staking pool address

1.  Run `brownie console`
2.  Run `run('deploy')`
3.  You can find it in contrat_addresses.json, it is also printed on the console.

### Run the SSV Staking

1.  Update the Staking pool Contract under sample_config/stake-config.json.
2.  Under ssv-fork folder run `python main.py stake -c sample_config/stake-config.json`.
