// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/interfaces/SmartMintVaultInterface.sol";

import {SmartMintVaultInterface} from "./interfaces/SmartMintVaultInterface.sol";




contract SmartMintNFT is ERC721, ERC721Burnable, Ownable {
    uint256 public constant DECIMALS = 10**6;

    address public manager;
    address public creator;

    SmartMintVaultInterface public vaultAddress;
    IERC20 stableCoinAddress;

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public mintPrice;

    constructor(
        string memory _name,
        string memory _symbol,
        IERC20 _stableCoinAddress,
        SmartMintVaultInterface _vaultAddress,
        address _creator
    ) ERC721(_name, _symbol) {
        manager = msg.sender;
        stableCoinAddress = _stableCoinAddress;
        vaultAddress = _vaultAddress;
        creator = _creator;

        mintPrice = 1 * DECIMALS;
    }

    function mint(address to, uint256 payAmount) public {
        require(msg.sender == to && msg.sender == tx.origin, "NOT MINTER");

        require(
            payAmount >= mintPrice &&
                IERC20(stableCoinAddress).balanceOf(to) >= mintPrice &&
                IERC20(stableCoinAddress).allowance(to, address(vaultAddress)) >=
                mintPrice,
            "NOT SUFFICIENT BAL"
        );

        // calculate creator fee
        uint256 creatorFee = _computeCreaterFee(payAmount);

        // deposit the creator fee into the vault

        // SmartMintVaultInterface(vaultAddress).deposit(
        //     creatorFee,
        //     creator
        // );

        // IERC20(stableCoinAddress).transferFrom(msg.sender, address(this), mintPrice);
        //   function deposit(uint256 assets, address receiver) public virtual override returns (uint256) 

        SmartMintVaultInterface(vaultAddress).deposit(
            msg.sender,
            payAmount,
            address(this)
        );

        safeMint(msg.sender);
    }

    function safeMint(address to) internal {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function _computeCreaterFee(uint256 payment)
        internal
        pure
        returns (uint256)
    {
        uint256 basisFee = 30;

        return (payment * basisFee) / 1000;
    }
}
