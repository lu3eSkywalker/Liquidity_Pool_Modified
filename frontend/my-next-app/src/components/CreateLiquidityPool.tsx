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
    "0x663F3ad617193148711d28f5334eE4Ed07016602";

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
              <label className="input input-bordered flex items-center gap-2 font-black">
                Address:
                <input
                  type="text"
                  className="grow"
                  placeholder="token 0 address"
                  onChange={(e) => setToken0(e.target.value)}
                />
              </label>

              <label className="input input-bordered flex items-center gap-2 my-2 font-black">
                Address:
                <input
                  type="text"
                  className="grow"
                  placeholder="token 1 address"
                  onChange={(e) => setToken1(e.target.value)}
                />
              </label>
            </div>

            <br />

            <button
              onClick={() => createPool()}
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold"
            >
              Create Liquidity Pool
            </button>

            <br />
            {<div>{tokenCreationSuccessfull}</div>}
          </div>

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
  );
};

export default CreateLiquidityPool;
