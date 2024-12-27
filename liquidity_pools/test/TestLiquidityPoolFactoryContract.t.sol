// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Test, console} from "forge-std/Test.sol";
import {LiquidityPoolFactory} from "../src/LiquidityPoolFactoryContract.sol";
import { ERC20 } from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {LPToken} from "../src/LPToken.sol";

contract CustomERC20 is ERC20 {
    constructor(string memory name_, string memory symbol_, uint256 totalSupply_) ERC20(name_, symbol_, totalSupply_) {
        _mint(msg.sender, totalSupply_);
    }

    function approveTokens(address spender, uint256 value) public {
        approve(spender, value);
    }
}

contract LiquidityPoolFactoryTest is Test {
    LiquidityPoolFactory liquidityPoolFactory;
    CustomERC20 erc20Token0;
    CustomERC20 erc20Token1;

    uint ethToWei = 10 ** 18;

    function setUp() public {
        erc20Token0 = new CustomERC20("Token1", "TOKEN1", 1000 * ethToWei);
        erc20Token1 = new CustomERC20("Token2", "TOKEN2", 2000 * ethToWei);
        liquidityPoolFactory = new LiquidityPoolFactory();
    }

    function test_createPool() public {
        LiquidityPoolFactory.PoolData[] memory poolData = liquidityPoolFactory.getPoolsByUser(address(this));
        assertEq(poolData.length, 0, "OK");
        liquidityPoolFactory.createPool(address(erc20Token0), address(erc20Token1));

        LiquidityPoolFactory.PoolData[] memory updatedPoolData = liquidityPoolFactory.getPoolsByUser(address(this));
        assertEq(updatedPoolData.length, 1, "OK");
    }

    function test_getPoolsByUser() public {
        address liquidityPoolAddress = liquidityPoolFactory.createPool(address(erc20Token0), address(erc20Token1));
        LiquidityPoolFactory.PoolData[] memory getUserPoolData = liquidityPoolFactory.getPoolsByUser(address(this));
        assertEq(getUserPoolData.length, 1, "OK");

        LiquidityPoolFactory.PoolData memory poolData = getUserPoolData[0];
        assertEq(poolData.token0, address(erc20Token0), "OK");
        assertEq(poolData.token1, address(erc20Token1), "OK");
        assertEq(poolData.poolAddress, liquidityPoolAddress, "OK");
        assertEq(poolData.lpToken, 0x4f81992FCe2E1846dD528eC0102e6eE1f61ed3e2, "OK");
        assertEq(poolData.reserve0, 0, "OK");
        assertEq(poolData.reserve1, 0, "OK");
    }

    function test_getAllPools() public {
        address liquidityPooladdress = liquidityPoolFactory.createPool(address(erc20Token0), address(erc20Token1));
        address[] memory allLiquidityPools = liquidityPoolFactory.getAllPools();
        assertEq(allLiquidityPools[0], liquidityPooladdress, "OK");
    }
}