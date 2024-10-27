// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {LiquidityPoolFactory} from "../src/LiquidityPoolFactoryContract.sol";

contract DeployLiquidityPoolFactory is Script {
    function run() external returns (LiquidityPoolFactory) {
        // Start the deployment process
        vm.startBroadcast();

        // Deploy the LiquidityPoolFactory contract
        LiquidityPoolFactory factory = new LiquidityPoolFactory();

        // Stop the deployment process
        vm.stopBroadcast();

        // Return the deployed LiquidityPoolFactory contract instance
        return factory;
    }
}
