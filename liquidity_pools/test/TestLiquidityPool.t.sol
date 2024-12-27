// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Test, console} from "forge-std/Test.sol";
import {LiquidityPool} from "../src/Liquidity_Pool.sol";
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

contract LiquidityPoolTest is Test, ERC20, LPToken {
    LiquidityPool liquidityPool;
    CustomERC20 erc20Token1;
    CustomERC20 erc20Token2;
    LPToken lpToken;

    uint ethToWei = 10 ** 18;

    function setUp() public {
        erc20Token1 = new CustomERC20("Token1", "TOKEN1", 1000 * ethToWei);
        erc20Token2 = new CustomERC20("Token2", "TOKEN2", 1000 * ethToWei);
        lpToken = new LPToken();

        liquidityPool = new LiquidityPool(address(erc20Token1), address(erc20Token2), address(lpToken));
    }

    function test_addLiquidity() public {
        erc20Token1.approveTokens(address(liquidityPool), 100 * ethToWei);
        erc20Token2.approveTokens(address(liquidityPool), 200 * ethToWei);
        liquidityPool.addLiquidity(100 * ethToWei, 200 * ethToWei);

        (uint256 currentReserve0, uint256 currentReserve1, uint256 currentTotalLiquidity) = liquidityPool.getCurrentLiquidity();

        assertEq(currentReserve0, 100 * ethToWei, "OK");
        assertEq(currentReserve1, 200 * ethToWei, "OK");
        assertEq(currentTotalLiquidity, 141421356237309504880, "OK");

        uint256 reserve0 = liquidityPool.reserve0();
        uint256 reserve1 = liquidityPool.reserve1();
        uint256 totalLiquidity = liquidityPool.totalLiquidity();
        assertEq(reserve0, 100 * ethToWei, "OK");
        assertEq(reserve1, 200 * ethToWei, "OK");
        assertEq(totalLiquidity, 141421356237309504880, "OK");
    }

    function test_removeLiquidity() public {
        erc20Token1.approveTokens(address(liquidityPool), 100 * ethToWei);
        erc20Token2.approveTokens(address(liquidityPool), 200 * ethToWei);
        liquidityPool.addLiquidity(100 * ethToWei, 200 * ethToWei);

        assertEq(liquidityPool.reserve0(), 100 * ethToWei, "OK");
        assertEq(liquidityPool.reserve1(), 200 * ethToWei, "OK");
        assertEq(liquidityPool.totalLiquidity(), 141421356237309504880, "OK");

        liquidityPool.removeLiquidity(100 * ethToWei);
        assertEq(liquidityPool.reserve0(), 29289321881345247560, "OK");
        assertEq(liquidityPool.reserve1(), 58578643762690495120, "OK");
        assertEq(liquidityPool.totalLiquidity(), 41421356237309504880, "OK");
    }

    // Negative Test

    function testFail_addLiquidity() public {
        liquidityPool.addLiquidity(100 * ethToWei, 200 * ethToWei);

        assertEq(liquidityPool.reserve0(), 100 * ethToWei, "OK");
        assertEq(liquidityPool.reserve1(), 200 * ethToWei, "OK");
        assertEq(liquidityPool.totalLiquidity(), 141421356237309504880, "OK");
    }

    function testFail_removeLiquidity() public {
        erc20Token1.approveTokens(address(liquidityPool), 100 * ethToWei);
        erc20Token2.approveTokens(address(liquidityPool), 200 * ethToWei);
        liquidityPool.addLiquidity(100 * ethToWei, 200 * ethToWei);

        liquidityPool.removeLiquidity(500 * ethToWei);
        assertEq(liquidityPool.totalLiquidity(), 500 * ethToWei, "OK");
    }
} 