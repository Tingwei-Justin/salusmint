import { time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, upgrades, artifacts } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, Contract } from "ethers";

describe("SmartMint NFT ", async function () {
  let smartMintNFTContract: Contract;
  let smartMintVaultContract: Contract;
  let tokenContract: Contract;
  let owner: SignerWithAddress;
  let purchaser1: SignerWithAddress;
  let creator1: SignerWithAddress;

  beforeEach(async function () {
    [owner, purchaser1, creator1] = await ethers.getSigners();

    //--------------------- Deploy Token -----------------
    const Token = await ethers.getContractFactory("Token");
    tokenContract = await Token.deploy(owner.address);
    // transfer erc20 tokens to wallets
    await tokenContract
      .connect(owner)
      .transfer(purchaser1.address, 500000000000);

    //--------------------- Deploy SmartMintVault -----------------
    const SmartMintVault = await ethers.getContractFactory("SmartMintVault");

    const vaultName = "TestVault";
    const vaultSymbol = "TV";
    // const createVaultInput = [ tokenContract.address, vaultName, vaultSymbol];

    smartMintVaultContract = await SmartMintVault.deploy(
      tokenContract.address,
      vaultName,
      vaultSymbol
    );

    // pre-approve erc20 tokens for the NFT contract
    await tokenContract
      .connect(purchaser1)
      .approve(smartMintVaultContract.address, "100000000000000000");

    await tokenContract
      .connect(owner)
      .approve(smartMintVaultContract.address, "100000000000000000");

     await tokenContract
      .connect(creator1)
      .approve(smartMintVaultContract.address, "100000000000000000");


    //--------------------- Deploy SmartMintNFT -----------------

    const nftName = "TestNFT";
    const nftSymbol = "tNFT";
    const ercTokenAddress = tokenContract.address;
    const creator1Address = creator1.address;
    // const initNFTInput = [nftName, nftSymbol, ercTokenAddress];

    const SmartMintNFT = await ethers.getContractFactory("SmartMintNFT");

    smartMintNFTContract = await SmartMintNFT.deploy(
      nftName,
      nftSymbol,
      ercTokenAddress,
      smartMintVaultContract.address,
      creator1Address
    );
  });

  //   tokenContract = await Token.deploy(owner.address);
  it("it SHOULD mint the token succeesful", async function () {
    
    //  function allowance(address owner, address spender)
    // sanity check
    const allowance = await tokenContract.connect(purchaser1).allowance(purchaser1.address, smartMintVaultContract.address);
    console.log("allowance for purchase1 to smartMintVaultContract: ", allowance);

    const payAmount = BigNumber.from(2 * 10 ** 6);
    console.log("payAmount: ", payAmount);
    
    const tx = await smartMintNFTContract
      .connect(purchaser1)
      .mint(purchaser1.address, payAmount);
    console.log("tx: ", await tx.wait());

    // check the shares

    const purchase1Share = await smartMintVaultContract.connect(purchaser1);
    

  });
});
