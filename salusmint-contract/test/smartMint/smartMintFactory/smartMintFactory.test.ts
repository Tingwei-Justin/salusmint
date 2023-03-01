import { time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, upgrades, artifacts } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, Contract } from "ethers";


describe("SmartMint factory contract", async function () {
  let smartMintFactoryContract: Contract;
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

  
    //--------------------- Deploy SmartMintFactory contract ----------------- 
    
    
    const SmartMintFactory = await ethers.getContractFactory(
      "SmartMintFactory",
    );
   
   smartMintFactoryContract = await SmartMintFactory.deploy();
   
  });

  //   tokenContract = await Token.deploy(owner.address);
  it("it SHOULD create new ERC721 contract succeesful", async function () {

  
    const nftName = "TestNFT";
    const nftSymbol = "tNFT";
    const ercTokenAddress = tokenContract.address;
    const initNFTInput = [nftName, nftSymbol, ercTokenAddress];

    const vaultName = "TestVault";
    const vaultSymbol = "TV";
    const createVaultInput = [vaultName, vaultSymbol, ercTokenAddress];
    const tx = await smartMintFactoryContract.connect(owner).createSalusNFTPool(initNFTInpu, createVaultInput);
    const receipt = await tx.wait();

    console.log("tx: ", receipt);

});

});
