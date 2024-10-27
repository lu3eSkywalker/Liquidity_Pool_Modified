import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const AddLiquidity = () => {
  const [contractAddress, setContractAddress] = useState<string>(
    "0xa783cdc72e34a174cca57a6d9a74904d0bec05a9"
  );

  const [tokenAQuantity, setTokenAQuantity] = useState<number>(0);
  const [tokenBQuantity, setTokenBQuantity] = useState<number>(0);

  const [liquidityAdded, setLiquidityAdded] = useState<string>("");

  const ABI = [
    "function addLiquidity(uint256, uint256) external returns (uint256)",
  ];

  async function addLiquidity() {
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

        const sendTokens = await contract.addLiquidity(
          tokenAQuantity,
          tokenBQuantity
        );
        console.log(sendTokens);

        const res = await sendTokens.wait();

        if (res.status == 1) {
          setLiquidityAdded("Transaction Successful");
        }
      } catch (error: any) {
        console.error("Error Adding liquidity", error);
        alert(
          "An error occurred while adding liquidity. Check console for details."
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
              placeholder="Token A Quantity"
              onChange={(e) => setTokenAQuantity(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Token B Quantity"
              onChange={(e) => setTokenBQuantity(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => addLiquidity()}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Initialize the contract
          </button>

          <br />
          <br />

          <div className="font-bold">{liquidityAdded}</div>
        </div>

        <br />
      </div>
    </div>
  );
};

export default AddLiquidity;
