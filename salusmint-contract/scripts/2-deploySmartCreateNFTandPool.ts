import { ethers } from "hardhat";

import SmartMintFactoryJson from "../artifacts/contracts/SmartMintFactory.sol/SmartMintFactory.json";

import erc20TokenJson from "../artifacts/contracts/test/Token.sol/Token.json";


const smartMintFactoryJsonAbi = SmartMintFactoryJson.abi;
const erc20TokenJsonAbi = erc20TokenJson.abi;


async function main() {
  
    const [signer, creator1] = await ethers.getSigners();
  
    
    const erc20TokenAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // erc20 token contract address


    const smartMintFactoryAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"; // placeholder   
    const smartMintFactoryContract = new ethers.Contract(smartMintFactoryAddress, smartMintFactoryJsonAbi, signer);
   
    // create nft info
    const nftName = "TestNFT";
    const nftSymbol = "tNFT";

    const creator1Address = creator1.address;

    const initNFTInput = [nftName, nftSymbol, erc20TokenAddress, creator1Address];

    // struct CreateVaultInput {
    //     string name;
    //     string symbol;
    //     IERC20 depositToken;
    //  }
     
    const vaultName = "TestVault";
    const vaultSymbol = "TV";
    const createVaultInput = [vaultName, vaultSymbol, erc20TokenAddress];


    const tx = await smartMintFactoryContract.connect(signer).createSalusNFTPool(initNFTInput, createVaultInput);
  
    console.log("upgradeVersion tx: ", tx);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });