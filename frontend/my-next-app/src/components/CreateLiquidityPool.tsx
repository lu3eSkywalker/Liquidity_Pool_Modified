import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import CreatingLiquidityPoolInfo from "./Walkthrough/CreatingLiquidityPoolInfo";
import Image from "next/image";
import asset1 from "../assets/asset1.png";
import asset2 from "../assets/asset2.jpeg";
import asset4 from "../assets/asset4.jpg";
import cryptoPunks from "../assets/cryptoPunks.png";
import pattern_randomized from "../assets/pattern-randomized.svg";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
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

  const [loadingBar, setLoadingBar] = useState<boolean>(false);

  const liquidityPoolFactoryContract = process.env.NEXT_PUBLIC_LIQUIDITY_POOL_CONTRACT_ADDRESS;

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
          liquidityPoolFactoryContract || '',
          ABI,
          signer
        );

        const correctedToken0Address = ethers.getAddress(token0);
        const correctedToken1Address = ethers.getAddress(token1);

        const createLiquidityPool = await contract.createPool(
          correctedToken0Address,
          correctedToken1Address
        );
        setLoadingBar(true);
        const receipt = await createLiquidityPool.wait();
        setLoadingBar(false);

        console.log(receipt);

        if (receipt.status == 1) {
          setTokenCreationSuccessfull("Liquidity Pool Created Successfully");
        } else {
          setTokenCreationSuccessfull("Error creating Liquidity Pool");
        }
      } catch (error) {
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
    <div>
      <div>
        <div
          className="bg-container"
          style={{
            backgroundImage: `url(${pattern_randomized.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minHeight: "90vh",
          }}
        >
          <div>
            <div>
              <div className="flex justify-between items-center">
                <div className="flex justify-end">
                  <Image
                    src={asset2}
                    alt="Description of the image"
                    width={290}
                  />
                </div>

                <div className="flex justify-center flex-grow ml-[200px]">
                  <CreatingLiquidityPoolInfo />
                </div>

                <div className="flex justify-start">
                  <Image
                    src={asset1}
                    alt="Description of the image"
                    width={500}
                    height={300}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="absolute left-0" style={{ marginTop: "1px" }}>
                <Image
                  src={asset4}
                  alt="Ethereum Logo"
                  width={400}
                  height={200}
                />
              </div>

              <div
                className="absolute right-0 rounded-full mx-[80px]"
                style={{ marginTop: "35px" }}
              >
                <Image
                  src={cryptoPunks}
                  alt="cryptoPunks"
                  width={300}
                  height={150}
                />
              </div>

              <div
                className="flex flex-col justify-center items-center"
                style={{ height: "20vh" }}
              >
                <div className="absolute w-[600px] h-[350px] bg-blue-500 rounded-lg transform -rotate-6 opacity-50 my-[550px] top-[-80px]"></div>

                <div className="relative bg-white shadow-md rounded-lg p-8 w-[450px] mb-6">
                  <div>
                    <label className="input input-bordered flex items-center gap-2 font-black text-xl my-2 border-4">
                      Address:
                      <input
                        className="grow"
                        type="text"
                        placeholder="token 0 address"
                        onChange={(e) => setToken0(e.target.value)}
                      />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 font-black text-xl border-4">
                      Address:
                      <input
                        className="grow"
                        type="text"
                        placeholder="token 1 address"
                        onChange={(e) => setToken1(e.target.value)}
                      />
                    </label>
                  </div>

                  <br />

                  <button
                    className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
                    onClick={() => createPool()}
                  >
                    Create Liquidity Pool
                  </button>

                  <br />

                  {loadingBar ? (
                    <div>
                      <div className="font-bold mx-[90px]">
                        Transaction Processing...
                      </div>
                      <div className="mx-[85px]">
                        <progress className="progress w-56"></progress>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {<div className="text-xl">{tokenCreationSuccessfull}</div>}
                </div>
              </div>

              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />


              <div className="text-center text-gray-700 font-medium">
                <ul className="steps text-xl">
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
    </div>
  );
};

export default CreateLiquidityPool;
