import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const LiquidityPoolTokensDetails = () => {
  const [liquidityPoolContractAddress, setLiquidityPoolContractAddress] =
    useState<string>("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");

  const [address, setAddress] = useState<string[]>([]);
  const [dataAvailable, setDataAvailable] = useState<boolean>(false);

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

  const ABI = [
    "function getTokenInfo() external view returns (address, address, address)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(
    liquidityPoolContractAddress || "",
    ABI,
    provider
  );

  async function getContractDetails() {
    const getTokensInfo = await contract.getTokenInfo();

    console.log(getTokensInfo);
    console.log(getTokensInfo.toString());
    setAddress(getTokensInfo);
    setDataAvailable(true);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">
        <div>
          <input
            type="text"
            placeholder="Liquidity Pool Contract Address"
            onChange={(e) => setLiquidityPoolContractAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <button onClick={() => getContractDetails()}>Get Details</button>
        </div>

        <br />
        <br />

        {dataAvailable ? (
          <div>
            <div>Token 0: {address[0]}</div>
            <div>Token 1: {address[1]}</div>
            <div>LP Token: {address[2]}</div>
          </div>
        ) : (
          <div></div>
        )}

        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default LiquidityPoolTokensDetails;
