// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/interfaces/IERC4626.sol";

interface SmartMintVaultInterface is IERC4626 {
    function deposit(
        address depositor,
        uint256 assets,
        address receiver
    ) external returns (uint256);
}
