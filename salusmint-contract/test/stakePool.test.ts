import { time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, upgrades, artifacts } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, Contract } from "ethers";

describe("Stake Pool ", async function () {
  let stakePoolContract: Contract;
  let tokenContract: Contract;
  let owner: SignerWithAddress;
  let creator1: SignerWithAddress;

  beforeEach(async function () {
    [owner, creator1] = await ethers.getSigners();

    //--------------------- Deploy Token -----------------
    const token = await ethers.getContractFactory("Token");
    tokenContract = await token.deploy(owner.address);
    // transfer erc20 tokens to wallets
    await tokenContract
      .connect(owner)
      .transfer(creator1.address, 5000000000000000);

    //--------------------- Deploy stakePool -----------------
    const stakePool = await ethers.getContractFactory("StakePool");
    stakePoolContract = await stakePool.deploy(tokenContract.address);
    
    await tokenContract
      .connect(owner)
      .transfer(stakePoolContract.address, 5000000000000000);

   
    // pre-approve erc20 tokens for the NFT contract
    await tokenContract
      .connect(creator1)
      .approve(stakePoolContract.address, "100000000000000000");

    await tokenContract
      .connect(owner)
      .approve(stakePoolContract.address, "100000000000000000");

     await tokenContract
      .connect(creator1)
      .approve(stakePoolContract.address, "100000000000000000");
  });


  //   tokenContract = await Token.deploy(owner.address);
  it("it SHOULD stake the token succeesful", async function () {
    
    // function allowance(address owner, address spender)
    // sanity chec
    const stakeaAmount = BigNumber.from(10000*10**6);
    const stakeTx =  await stakePoolContract.connect(creator1).stake(stakeaAmount);
    console.log("stakeTx : ", await stakeTx.wait());
  });

  it("it should claimReward", async function() {

    const stakeaAmount = BigNumber.from(1000000*10**6);
    const stakeTx =  await stakePoolContract.connect(creator1).stake(stakeaAmount);

    console.log("stakeTx : ", await stakeTx.wait());

    const claimTx = await stakePoolContract.connect(creator1).claimReward();
    console.log("claim reward: ", await claimTx.wait());

  } )
});
