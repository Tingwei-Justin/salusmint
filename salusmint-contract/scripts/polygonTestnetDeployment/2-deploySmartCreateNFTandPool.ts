import { ethers } from "hardhat";
import fs from "fs";

import SmartMintFactoryJson from "../../artifacts/contracts/SmartMintFactory.sol/SmartMintFactory.json";
import erc20TokenJson from "../../artifacts/contracts/test/Token.sol/Token.json";

const smartMintFactoryJsonAbi = SmartMintFactoryJson.abi;
const erc20TokenJsonAbi = erc20TokenJson.abi;

async function main() {
  const [signer, creator1] = await ethers.getSigners();


  const filePath = "data.json";
  const json = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(json);

  console.log("data: ", data);

  const erc20TokenAddress = data.erc20TokenConract; // erc20 token contract address
  const smartMintFactoryAddress = data.smartMintFactoryContract; // placeholder
  const smartMintFactoryContract = new ethers.Contract(
    smartMintFactoryAddress,
    smartMintFactoryJsonAbi,
    signer
  );

  // create nft info
  const nftName = "TestNFT2";
  const nftSymbol = "tNFT2";
  const creator1Address = creator1.address;
  const initNFTInput = [nftName, nftSymbol, erc20TokenAddress, creator1Address];

  // struct CreateVaultInput {
  //     string name;
  //     string symbol;
  //     IERC20 depositToken;
  //  }

  const vaultName = "TestVault2";
  const vaultSymbol = "TV2";
  const createVaultInput = [vaultName, vaultSymbol, erc20TokenAddress];
  const tx = await smartMintFactoryContract
    .connect(signer)
    .createSalusNFTPool(initNFTInput, createVaultInput);
  console.log("tx: ", tx);
  const event = await tx.wait();

  console.log("createSalusNFTPool tx: ", event);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
