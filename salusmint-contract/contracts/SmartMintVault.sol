// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SmartMintVault is ERC4626, Ownable {

IERC20 public tokenAddress;

// constructor init https://forum.openzeppelin.com/t/openzeppelin-erc4626-implementation/31589
constructor(IERC20 _address, string memory _name, string memory _symbol) ERC4626(_address) ERC20(_name, _symbol) {
    tokenAddress = _address;

}

}

