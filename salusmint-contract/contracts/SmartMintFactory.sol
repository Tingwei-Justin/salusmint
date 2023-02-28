// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/interfaces/IERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SmartMintNFT.sol";
import "./SmartMintVault.sol";


/// IERC20
/// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC4626.sol
contract SmartMintFactory is Ownable {

    event NFTCreated(address indexed nftAddress, string name, string symbol);
    event VaultCreated(address indexed smartMintVault, string name, string symbol);
    
    string public constant name = "SmartMint_ETHDenver2023";
    
    struct CreateNFTInput {
        string name;
        string symbol;
        IERC20 depositToken;
        IERC4626 vaultAddress;
    }

    struct CreateVaultInput{
        IERC20 tokenAddress;
        string name;
        string symbol; 
    }
    
    /// constructor init https://forum.openzeppelin.com/t/openzeppelin-erc4626-implementation/31589
    constructor() {
        
    }

    function createSalusNFTPool(CreateNFTInput memory reateNFTInput) returns(address) {
        
    }

    /// create ERC721 contract 
    function createNFT(string memory _name, string memory _symbol, IERC20 _stableCoinAddress, IERC4626 _vaultAddress) internal returns (address) {
        SmartMintNFT smartNFT = new SmartMintNFT(_name, _symbol, _stableCoinAddress, _vaultAddress);

        emit NFTCreated(address(smartNFT), _name, _symbol);
        return address(smartNFT);
        
    }

    /// create ERC4626 contract
    function createVault(IERC20 _stableCoinAddress, string memory _name,  string memory _symbol) internal returns (address) {
        // IERC20 _address, string memory _name, string memory _symbol
        SmartMintVault smartMintVault = new SmartMintVault(_stableCoinAddress, _name, _symbol);

        emit VaultCreated(address(smartMintVault), _name, _symbol);
        return address(smartMintVault);

    }
}