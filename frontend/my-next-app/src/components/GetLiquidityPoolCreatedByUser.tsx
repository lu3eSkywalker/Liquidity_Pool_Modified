import React, { useState } from "react";
import { ethers } from "ethers";
import LiquidityPoolByUserInfo from "./Walkthrough/LiquidityPoolByUserInfo";
import TokenInfo from "./TokenInfo";

declare global {
  interface Window {
    ethereum: any;
  }
}

const GetLiquidityPoolCreatedByUser = () => {
  const [userAddress, setUserAddress] = useState<string>("");
  const [address, setAddress] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const liquidityPoolFactoryContract =
    "0x663F3ad617193148711d28f5334eE4Ed07016602";
  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

  const ABI = [
    "function getPoolsByUser(address user) external view returns (address[] memory)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(
    liquidityPoolFactoryContract ||
      "0x663F3ad617193148711d28f5334eE4Ed07016602",
    ABI,
    provider
  );

  async function getAllLiquidityPools() {
    try {
      setError(null);
      const tx = await contract.getPoolsByUser(userAddress);
      console.log(tx);
      console.log(tx.toString());
      setAddress(tx);
    } catch (err: any) {
      console.error("Error fetching liquidity pools:", err);
      setError("Failed to fetch liquidity pools. Please try again.");
    }
  }

  return (
    <div className="bg-gray-100">
      <br />
      <br />
      <br />
      <div className="flex justify-center bg-gray-100">
        <LiquidityPoolByUserInfo />
      </div>

      <div
        className="flex flex-col justify-center items-center h-screen bg-gray-100"
        style={{ height: "70vh" }}
      >
        <div className="bg-white shadow-md rounded-lg p-8 w-[380px] mb-6">
          <div>
            <label className="input input-bordered flex items-center gap-2 font-black">
              Address:
              <input
                type="text"
                className="grow"
                placeholder="Enter User Address"
                onChange={(e) => setUserAddress(e.target.value)}
              />
            </label>
          </div>

          <br />

          <div>
            <button
              onClick={getAllLiquidityPools}
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold"
            >
              Get the addresses
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}

          <div className="mt-4">
            {address.map((data, index) => (
              <div
                key={index}
                className="text-gray-700 mb-2 break-words font-bold"
              >
                <br />
                {data}
                <br />
                <button
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() => setSelectedAddress(data)}
                >
                  More Info
                </button>
                <br />
              </div>
            ))}
          </div>
        </div>

        {selectedAddress && <TokenInfo addressOfContract={selectedAddress} />}

        <br />
        <br />
        <br />
        <br />
        <div className="text-center text-gray-700 font-medium">
          <ul className="steps">
            <li className="step step-primary">
              <a href="./createliquiditypool">Create Liquidity Pool</a>
            </li>
            <li className="step step-primary">
              <a href="./liquiditypoolbyuser">
                Get Our Liquidity Pool Contract Address
              </a>
            </li>
            <li className="step">
              <a href="./approvetokens">Approve the Tokens</a>
            </li>
            <li className="step">
              <a href="./addliquidity">Add Liquidity</a>
            </li>
            <li className="step">
              <a href="./removeliquidity">Remove Liquidity</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GetLiquidityPoolCreatedByUser;
