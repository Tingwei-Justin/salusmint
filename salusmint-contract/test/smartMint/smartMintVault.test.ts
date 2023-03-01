import { time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, upgrades, artifacts } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, Contract } from "ethers";

describe("SmartMint Vault ", async function () {
  let smartMintVaultContract: Contract;
  let tokenContract: Contract;
  let owner: SignerWithAddress;
  let purchaser1: SignerWithAddress;

  beforeEach(async function () {
    
    [owner, purchaser1] = await ethers.getSigners();
    
    //--------------------- Deploy Token -----------------
    const Token = await ethers.getContractFactory("Token");
    tokenContract = await Token.deploy(owner.address);
    // transfer erc20 tokens to wallets
    await tokenContract.connect(owner).transfer(purchaser1.address, 50000000000);

       
    const SmartMintNFT = await ethers.getContractFactory(
      "SmartMintNFT",
    );

   const name = "testNFT"
   const symbol = "tNFT"
   
   smartMintNFTContract = await SmartMintNFT.deploy(name, symbol,tokenContract.address);


    // pre-approve erc20 tokens for the ip3 contract
    await tokenContract
    .connect(purchaser1)
    .approve(smartMintNFTContract.address, "100000000000000000");

  });

  //   tokenContract = await Token.deploy(owner.address);
  it("it SHOULD mint the token succeesful", async function () {
    const payAmount = BigNumber.from(10**6);
    const tx = await smartMintNFTContract.connect(purchaser1).mint(purchaser1.address,payAmount );
    console.log("tx: ", await tx.wait());

});

});
