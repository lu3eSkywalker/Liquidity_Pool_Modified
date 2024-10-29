import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import CreatingLiquidityPoolInfo from "./Walkthrough/CreatingLiquidityPoolInfo";

declare global {
  interface Window {
    ethereum: any;
  }
}

const CreateLiquidityPool = () => {
  const [token0, setToken0] = useState<string>(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  );

  const [token1, setToken1] = useState<string>(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  );

  const [tokenCreationSuccessfull, setTokenCreationSuccessfull] =
    useState<string>("");

  const liquidityPoolFactoryContract =
    "0x2E983A1Ba5e8b38AAAeC4B440B9dDcFBf72E15d1";

  const ABI = [
    "function createPool(address, address) external returns (address)",
  ];

  async function createPool() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
          liquidityPoolFactoryContract,
          ABI,
          signer
        );

        const correctedToken0Address = ethers.getAddress(token0);
        const correctedToken1Address = ethers.getAddress(token1);

        const createLiquidityPool = await contract.createPool(
          correctedToken0Address,
          correctedToken1Address
        );
        const receipt = await createLiquidityPool.wait();

        console.log(receipt);

        if (receipt.status == 1) {
          setTokenCreationSuccessfull("Liquidity Pool Created Successfully");
        } else {
          setTokenCreationSuccessfull("Error creating Liquidity Pool");
        }
      } catch (error: any) {
        console.error("Error Creating Pool", error);
        alert(
          "An error occurred while creating the liquidity pool. Check console for details."
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
        <CreatingLiquidityPoolInfo />
      </div>
      <div>
        <div
          className="flex flex-col justify-center items-center bg-gray-100"
          style={{ height: "70vh" }}
        >
          <div className="bg-white shadow-md rounded-lg p-8 w-80 mb-6">
            <div>
              <input
                type="text"
                placeholder="token 0 address"
                onChange={(e) => setToken0(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="token 1 address"
                onChange={(e) => setToken1(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => createPool()}
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Create Liquidity Pool
            </button>

            <br />
            <br />

            {<div>{tokenCreationSuccessfull}</div>}

            <br />
            <br />
            <br />
            <br />

            <div className="text-center text-gray-700 font-medium">
              <ul className="steps">
                <li className="step step-primary">
                  <a href="./createliquiditypool">Create Liquidity Pool</a>
                </li>
                <li className="step">
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
      </div>
    </div>
  );
};

export default CreateLiquidityPool;
