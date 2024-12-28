import React, { useState } from "react";
import { ethers } from "ethers";
import LiquidityPoolByUserInfo from "./Walkthrough/LiquidityPoolByUserInfo";
import TokenInfo from "./TokenInfo";
import Image from "next/image";
import asset1 from "../assets/asset1.png";
import asset2 from "../assets/asset2.jpeg";
import asset4 from "../assets/asset4.jpg";
import pattern_randomized from "../assets/pattern-randomized.svg";
import ethereum3 from "../assets/ethereum3.png"

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

  const [loadingBar, setLoadingBar] = useState<boolean>(false);

  const liquidityPoolFactoryContract =
    "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

  const ABI = [
    "function getPoolsByUser(address user) external view returns (address[] memory)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(
    liquidityPoolFactoryContract ||
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    ABI,
    provider
  );

  async function getAllLiquidityPools() {
    try {
      setError(null);
      const tx = await contract.getPoolsByUser(userAddress);
      setLoadingBar(true);
      console.log(tx);
      console.log(tx.toString());
      setLoadingBar(false);
      setAddress(tx);
    } catch (err: any) {
      console.error("Error fetching liquidity pools:", err);
      setError("Failed to fetch liquidity pools. Please try again.");
    }
  }

  return (
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
              <Image src={asset2} alt="Description of the image" width={290} />
            </div>

            <div className="flex justify-center flex-grow ml-[200px]">
              <LiquidityPoolByUserInfo />
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
            <Image src={asset4} alt="Ethereum Logo" width={400} height={200} />
          </div>

          <div
            className="absolute right-0 rounded-full mx-[80px]"
            style={{ marginTop: "35px" }}
          >
            <Image
              src={ethereum3}
              alt="ethereum"
              width={320}
              height={150}
            />
          </div>

          <div
            className="flex flex-col justify-center items-center"
            style={{ height: "40vh" }}
          >
            <div className="absolute w-[600px] h-[350px] bg-blue-500 rounded-lg transform -rotate-6 opacity-50 my-[550px] top-[-80px]"></div>

            <div className="relative bg-white shadow-md rounded-lg p-8 w-[450px] mb-6">
              <div>
                <label className="input input-bordered flex items-center gap-2 font-black text-xl my-2 border-4">
                  Address:
                  <input
                    className="grow"
                    type="text"
                    placeholder="Enter User Address"
                    onChange={(e) => setUserAddress(e.target.value)}
                  />
                </label>
              </div>

              <br />

              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
                onClick={getAllLiquidityPools}
              >
                Get Info
              </button>

              {error && (
                <div className="text-red-500 text-center mt-4">{error}</div>
              )}

              <div className="mt-4">
                {address.map((data, index) => (
                  <div
                    key={index}
                    className="text-gray-700 mb-2 break-words font-bold text-xl"
                  >
                    <br />
                    {data}
                    <br />
                    <br />
                    <button
                      className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 text-xl"
                      onClick={() => setSelectedAddress(data)}
                    >
                      More Info
                    </button>
                    <br />
                  </div>
                ))}
              </div>

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
              {
                <div className="text-xl">
                  {selectedAddress && (
                    <TokenInfo addressOfContract={selectedAddress} />
                  )}
                </div>
              }
            </div>

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
      </div>
    </div>
  );
};

export default GetLiquidityPoolCreatedByUser;
