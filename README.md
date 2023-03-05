# salusmint
## Description
SalusMint is the next generation of NFT launchpad that offers a sustainable source of income for both creators and holds, via yield generating pools (DeFi solution), therefore aligning the interest of both colelctions and holders for the long term vision of a collection and community.

## Problem statement
Today, the current NFT market is a zero sum game between creators and holders, keeping the NFT ecosystem unsustainable. Rug pulls and quick flips are rampant, because both creators and holders want to make a quick profit at the expense of the other. Ultimately, the incentives around creators and holders are not aligned.

Here are three main symptoms:
1. Creators can easily rug pull and community is lack of trust
2. Royalties income is drying up especially in Zero Royalties era.  
3. 99% of NFT lacks liquidity.

## Solution
SalusMint is an NFT launchpad that allowing all proceeds from launch enteres a yield generating pool, which offfers a sustainable source of income for both creators and holders. Here are the detail workflow.
1. Creators select the yield generating pools and launch the NFT project
2. All NFT sale proceeds from buyers are deposited into yield generating pools (e.g. Lido, SSV staking)
3. Creators will receive sustainable yield income as reward (not be affected by zero royalties era)
4. NFT buyers can exist at any time with a small penalty, which can prevent NFT buyers from losing too much.
4. Creators can borrow money from Huma Finance using the future income as collateral, which allows them to have more resources for their community.

## Innovation
1. SalusMint redefine the source of income for NFT creators using sustainable yield generating pools to build the trusted and long-term success for community.
- Before: NFT sale proceeds + royalties
- After: yield of (NFT sale proceeds + royalties)
2. Every NFT will have liquidity from beginning because all proceeds are in DeFi pool and can exit at any time with a small penalty.

## Future work
1. Launch as a NFT launch pad to redefine a fair NFT ecosystem
2. Integration with more yield-generating protocols

## Summary
SalusMint offers a revolutionary way to launch NFT, providing creators and holders with a sustainable source of income and aligning creator and holder incentives for long-term success.


## Link
- Deck: https://docs.google.com/presentation/d/1zayDtd0R8A-1cPMaDMyCkfSsO70rv8Z4/edit?usp=sharing&ouid=104915702783954666384&rtpof=true&sd=true
- Demo video: https://www.youtube.com/watch?v=kPQDr4WC21c

## Detail
SalusMint is a new project that seeks to bring together the worlds of NFTs and DeFi in a way that benefits both creators and buyers. The project offers a unique approach to NFT launches, with all proceeds from the launch entering a yield-generating pool. This pool provides a sustainable source of income for both creators and holders, and ensures that the incentives of both parties are aligned.

The current NFT market is a zero-sum game, where creators and holders are often at odds with each other. Creators want to make as much money as possible from their NFTs, while buyers are looking to make a quick profit by flipping them. This often leads to rug pulls and other forms of fraud, as creators look to cash out quickly and buyers look for the next hot NFT.

By creating a yield-generating pool that benefits both creators and buyers, SalusMint is hoping to create a more sustainable NFT ecosystem. The pool provides a way for creators to generate income from their NFTs over time, rather than simply cashing out and moving on to the next project. This income can be used as collateral to obtain a loan from Huma Finance, which in turn can provide creators with more resources for their community.

Buyers are also incentivized to hold onto their NFTs, as they can earn income through the yield pool. This creates a virtuous cycle, where both creators and buyers are working together to build a sustainable NFT ecosystem.

The use of DeFi in SalusMint is an important aspect of the project. By leveraging composibility of DeFi, SalusMint is able to create a transparent and trustless system that benefits all participants. The yield-generating pool is powered by smart contracts, which ensure that all proceeds are distributed fairly and transparently.

SalusMint is not the first project to combine NFTs and DeFi, but it is one of the most promising. The team behind the project has a deep understanding of both NFTs and DeFi, and is committed to creating a sustainable ecosystem for both creators and buyers.


## Protocol flow charts

![Mint process](./images/flowcharts/Mint.png)
![Income yield process](./images/flowcharts/Stream&Borrow.png)
![Burn mechanism](./images/flowcharts/Burn.png)

## Deploy Salusmint Core Contracts in local host

1. Start the goerli fork network: `yarn fork https://eth-goerli.g.alchemy.com/v2/<your id>`
2. Run `python3 main.py`
3. Run `npx hardhat run ./scripts/1-deploySmartMintFactory.ts --network localhost`
4. Get USDC address and SalusMint Factory address
5. copy `huma-contracts-fork/deployment/localhost-deployed-contracts.json` to `pool.ts` DEPLOYED_CONTRACTS

## Deploy Salusmint Core Contracts in Polygon Mumbai TestNet

| Contracts | Address |
| -------- | -------- |
| SmartMintFactory | 0x559A0850f8db394D2F1Bc9947d4200527C0c3D62 |
| smartMintVault1  | 0x74C2F440CFEED6F9cF1A8955ecFbDB95229E723B |
| smartMintNFT1  | 0x9102ec0345534e737dD8897bDD2DD83dDba456eb |
| smartMintVault2  | 0x32F49BAF14d5442b8D4d2295973aE65543fBe2cd |
| smartMintNFT2  | 0x3230742edc5a169fa546d0b098f3e0b3af1b48c4 |







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
