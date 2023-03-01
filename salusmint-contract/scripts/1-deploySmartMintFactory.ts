import { ethers } from "hardhat";
import fs from 'fs';

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
  

  

  const data = { erc20TokenConract: erc20TokenConract.address, smartMintFactoryContract: smartMintFactoryContract.address };
  const json = JSON.stringify(data);
  const filePath = 'data.json';
  
  fs.writeFileSync(filePath, json);
   
} 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
