// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract LPToken is ERC20 {
    constructor() ERC20("Liquidity Provider Token", "LPT") {}

    // Function to mint LP tokens (can be called by the liquidity pool contract)
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    // Function to burn LP tokens (can be called by the liquidity pool contract)
    function burn(address from, uint256 amount) external {
        _burn(from, amount);
    }
}