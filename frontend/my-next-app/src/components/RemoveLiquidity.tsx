import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const RemoveLiquidity = () => {
  const [contractAddress, setContractAddress] = useState<string>(
    "0xa783cdc72e34a174cca57a6d9a74904d0bec05a9"
  );

  const [liquidityToRemove, setLiquidityToRemove] = useState<number>(0);
  const [liquidityRemoved, setLiquidityRemoved] = useState<string>("");

  const ABI = [
    "function removeLiquidity(uint256) external returns (uint256, uint256)",
  ];

  async function removeLiquidity() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress || "",
          ABI,
          signer
        );

        const removeLiquidityFromPool = await contract.removeLiquidity(
          liquidityToRemove
        );
        console.log(removeLiquidityFromPool);

        const res = await removeLiquidityFromPool.wait();

        if (res.status == 1) {
          setLiquidityRemoved("Transaction Successful");
        }
      } catch (error: any) {
        console.error("Error removing liquidity", error);
        alert(
          "An error occurred while removing the liquidity. Check console for details."
        );
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <div>
      <div
        className="flex flex-col justify-center items-center h-screen bg-gray-100"
        style={{ height: "85vh" }}
      >
        <div className="bg-white shadow-md rounded-lg p-8 w-80 mb-6">
          <div>
            <input
              type="text"
              placeholder="Deployed Liquidity Pool Address"
              onChange={(e) => setContractAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Liquidity"
              onChange={(e) => setLiquidityToRemove(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => removeLiquidity()}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Initialize the contract
          </button>

          <br />
          <br />

          <div className="font-bold">{liquidityRemoved}</div>
        </div>
      </div>
    </div>
  );
};

export default RemoveLiquidity;
