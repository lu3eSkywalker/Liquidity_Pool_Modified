import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import AddingLiquidityInfo from "./Walkthrough/AddingLiquidityInfo";

declare global {
  interface Window {
    ethereum: any;
  }
}

const AddLiquidity = () => {
  const [contractAddress, setContractAddress] = useState<string>(
    "0xb7a5bd0345ef1cc5e66bf61bdec17d2461fbd968"
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
    <div className="bg-gray-100">
      <br />
      <br />
      <br />
      <div className="flex justify-center bg-gray-100">
        <AddingLiquidityInfo />
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

            <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
              Quantity:
              <input
                type="number"
                className="grow"
                placeholder="Token A Quantity"
                onChange={(e) => setTokenAQuantity(parseInt(e.target.value))}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
              Quantity:
              <input
                type="number"
                className="grow"
                placeholder="Token B Quantity"
                onChange={(e) => setTokenBQuantity(parseInt(e.target.value))}
              />
            </label>
          </div>

          <br />
          <button
            onClick={() => addLiquidity()}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
          >
            Initialize the contract
          </button>

          <br />
          <br />

          <div className="font-bold">{liquidityAdded}</div>
        </div>

        <br />
        <br />
        <br />
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
            <li className="step step-primary" step-primary>
              <a href="./approvetokens">Approve the Tokens</a>
            </li>
            <li className="step step-primary">
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

export default AddLiquidity;
