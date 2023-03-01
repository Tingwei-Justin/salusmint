import { ethers } from "hardhat";

async function main() {
  const SmartMintNFT = await ethers.getContractFactory("SmartMintNFT")
  console.log("Deploying SmartMintNFT...")

  const [signer] = await ethers.getSigners();
  // console.log(signer.address);

  const name = "testNFT"
  const symbol = "tNFT"
  const tokenContractAddress = "0x37766f6B66B5e17320B06b8c84480d1C4020caCd";

  const creatorAddr = "0x66c07c21831af91a47F3447338Dd9D95c97eb9c5";
  const smartMintNFTContract = await SmartMintNFT.deploy(name, symbol, tokenContractAddress, creatorAddr);

  await smartMintNFTContract.deployed();
  console.log(smartMintNFTContract.address, "smartMintNFTContract address");

} 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
