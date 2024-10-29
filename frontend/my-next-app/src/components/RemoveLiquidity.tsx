import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import RemovingLiquidityInfo from "./Walkthrough/RemovingLiquidityInfo";

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
    <div className="bg-gray-100">
      <br />
      <br />
      <br />
      <div className="flex justify-center bg-gray-100">
        <RemovingLiquidityInfo />
      </div>
      <div
        className="flex flex-col justify-center items-center h-screen bg-gray-100"
        style={{ height: "70vh" }}
      >
        <div className="bg-white shadow-md rounded-lg p-8 w-[500px] mb-6">
          <div>
            <label className="input input-bordered flex items-center gap-2 font-black text-xl">
              Address:
              <input
                type="text"
                className="grow"
                placeholder="Deployed Liquidity Pool Address"
                onChange={(e) => setContractAddress(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 my-4 font-black text-xl">
              Address:
              <input
                type="number"
                className="grow"
                placeholder="Liquidity"
                onChange={(e) => setLiquidityToRemove(parseInt(e.target.value))}
              />
            </label>
          </div>

          <br />

          <button
            onClick={() => removeLiquidity()}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
          >
            Initialize the contract
          </button>

          <br />
          <br />

          <div className="font-bold">{liquidityRemoved}</div>
        </div>

        <br />
        <br />
        <br />
        <br />


        <div className="text-center text-gray-700 font-medium">
          <div className="text-center text-gray-700 font-medium">
            <ul className="steps text-xl">
              <li className="step step-primary">
                <a href="./createliquiditypool">Create Liquidity Pool</a>
              </li>
              <li className="step step-primary">
                <a href="./liquiditypoolbyuser">
                  Get Our Liquidity Pool Contract Address
                </a>
              </li>
              <li className="step step-primary">
                <a href="./approvetokens">Approve the Tokens</a>
              </li>
              <li className="step step-primary">
                <a href="./addliquidity">Add Liquidity</a>
              </li>
              <li className="step step-primary">
                <a href="./removeliquidity">Remove Liquidity</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveLiquidity;
