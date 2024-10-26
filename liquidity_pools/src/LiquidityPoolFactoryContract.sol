// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Liquidity_Pool.sol";
import "./LPToken.sol";

contract LiquidityPoolFactory {
    address[] public allPools; // Store all created pools
    mapping(address => mapping(address => address)) public getPool; // Mapping of token pairs to pool address
    mapping(address => PoolData[]) public userPools; // Mapping to store pools created by each user
    mapping(address => PoolData) public poolData; // New mapping for direct access to pool data


    struct PoolData {
        address poolAddress;
        address token0;
        address token1;
        address lpToken;
        uint256 reserve0;
        uint256 reserve1;
    }
    
    event PoolCreated(
        address indexed token0,
        address indexed token1,
        address pool,
        address lpToken
    );

    // Function to create a new liquidity pool
    function createPool(
        address token0,
        address token1
    ) external returns (address pool) {
        require(token0 != token1, "Tokens must be different");
        require(token0 != address(0) && token1 != address(0), "Invalid token addresses");
        require(getPool[token0][token1] == address(0), "Pool already exists");

        // Deploy a new LPToken for the pool
        LPToken lpToken = new LPToken();

        // Deploy a new LiquidityPool contract
        LiquidityPool newPool = new LiquidityPool(
            token0,
            token1,
            address(lpToken)
        );

        // Store the pool address in the mapping
        getPool[token0][token1] = address(newPool);
        getPool[token1][token0] = address(newPool); // For reverse lookup

        // Save the pool to the array
        allPools.push(address(newPool));

        // Emit an event when a new pool is created
        emit PoolCreated(token0, token1, address(newPool), address(lpToken));

        // Retrieve reserves from the newly created pool (initially will be 0)
        (uint256 reserve0, uint256 reserve1) = newPool.getReserves();

        // Store the pool data in userPools
        userPools[msg.sender].push(
            PoolData({
                poolAddress: address(newPool),
                token0: token0,
                token1: token1,
                lpToken: address(lpToken),
                reserve0: reserve0,
                reserve1: reserve1
            })
        );

        return address(newPool);
    }
    
    // Function to retrieve all pools
    function getAllPools() external view returns (address[] memory) {
        return allPools;
    }
}