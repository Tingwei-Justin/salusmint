import "hardhat-deploy";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-storage-layout";
import "hardhat-gas-reporter";
import "dotenv/config";
import "@primitivefi/hardhat-dodoc";

const settings = {
  optimizer: {
    enabled: true,
    runs: 200,
    // details: {
    //   yul: false,
    // },
  },
  viaIR: false, // bug of code coverage zero due to this to true https://github.com/sc-forks/solidity-coverage/issues/760
};

module.exports = {
  solidity: {
    compilers: [{ version: "0.8.13", settings }],
  },
  namedAccounts: {
    deployer: 0,
    manageAddress: 1,
    tokenOwner: 2,
    purchaser1: 3,
    purchaser2: 4,
    creator1: 5,
    nftAuthroizer2: 6,
    sigSinger1: 7,
    sigSinger2: 8,
    notOwner: 9,
  },
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY_RINKEBY}`,
      accounts: [`${process.env.TEST_PRIVATE_KEY_DEPLOY}`],
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_GOERLI}`,
      accounts: [
        `${process.env.TEST_PRIVATE_KEY_DEPLOY}`,
        `${process.env.TEST_PRIVATE_KEY_USER}`,
        `${process.env.TEST_PRIVATE_KEY_LICENSOR}`,
      ],
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MUMBAI}`,
      accounts: [`${process.env.TEST_PRIVATE_KEY_DEPLOY}`],
    },

  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: 
    {
      mainnet: process.env.ETHERSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
    }
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  // docgen for contract auto-generated documentation: https://github.com/primitivefinance/primitive-dodoc
  dodoc: {
    runOnCompile: false,
    debugMode: true,
    include: ["contracts/v2/protocol"],
    exclude: ["test", "libraries"],
    // More options...
  },
  // plugins: ["solidity-coverage"]
};

// const config: HardhatUserConfig = {

//   // Your Hardhat config...
//   dodoc: {
//     runOnCompile: true,
//     debugMode: true,
//     include:["contracts/v2/protocol"],
//     exclude: ['test', 'libraries'],
//     // More options...
//   },
// };

// export default config;
