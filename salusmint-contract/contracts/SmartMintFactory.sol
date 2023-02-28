// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SmartMintNFT.sol";


/// IERC20
/// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC4626.sol
contract SmartMintFactory is Ownable {

    event NFTCreated(address indexed nftAddress, string name, string symbol);
    
    string public constant name = "SmartMint_ETHDenver2023";
    
    

    // constructor init https://forum.openzeppelin.com/t/openzeppelin-erc4626-implementation/31589
    constructor() {
        
    }


    // create ERC721 contract 
    function createNFT(string memory _name, string memory _symbol, IERC20 _stableCoinAddress) external returns (address nftAddress) {
        SmartMintNFT smartNFT = new SmartMintNFT(_name, _symbol, _stableCoinAddress);

        emit NFTCreated(address(smartNFT), _name, _symbol);
        return address(smartNFT);
        
    }
}