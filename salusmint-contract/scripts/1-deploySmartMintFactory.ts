import { ethers } from "hardhat";

async function main() {

  const [signer] = await ethers.getSigners();
  // console.log(signer.address);

  //--------------------- Deploy erc20Token contract ----------------- 
  const ERC20Token = await ethers.getContractFactory("Token");
  const erc20TokenConract = await ERC20Token.deploy(signer.address);
  await erc20TokenConract.deployed();
  console.log("erc20TokenConract address: ", erc20TokenConract.address);

  

  //--------------------- Deploy SmartMintFactory contract ----------------- 
    
    const SmartMintFactory = await ethers.getContractFactory(
      "SmartMintFactory",
    );
   
   const smartMintFactoryContract = await SmartMintFactory.deploy();
   
   await smartMintFactoryContract.deployed();
   console.log("smartMintFactoryContract address", smartMintFactoryContract.address);

   
} 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
