// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Test, console} from "forge-std/Test.sol";
import {LPToken} from "../src/LPToken.sol";

contract LPTokenTest is Test {
    LPToken lptoken;

    function setUp() public {
        lptoken = new LPToken();
    }

    function test_mintLPtoken() public {
        lptoken.mint(address(this), 1000);
        assertEq(lptoken.balanceOf(address(this)), 1000, "OK");
    }

    function test_burnLPToken() public {
        lptoken.mint(address(this), 1000);
        lptoken.burn(address(this), 500);
        assertEq(lptoken.balanceOf(address(this)), 500, "OK");
    }
}