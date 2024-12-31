import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import Image from "next/image";
import asset1 from "../assets/asset1.png";
import asset4 from "../assets/asset4.jpg";
import cryptoPunks from "../assets/cryptoPunks.png";
import pattern_randomized from "../assets/pattern-randomized.svg";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const GetCurrentLiquidity = () => {
  const [contractAddress, setContractAddress] = useState<string>(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  );

  const [tokenAReserve, setTokenAReserve] = useState<number>(0);
  const [tokenBReserve, setTokenBReserve] = useState<number>(0);
  const [remainingTotalLiquidity, setRemainingTotalLiquidity] =
    useState<number>(0);

  const weiToEth = 10 ** 18;

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

  const ABI = [
    "function getCurrentLiquidity() external view returns (uint256, uint256, uint256)",
    "function getPoolsByUser(address user) external view returns (address[] memory)"
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(contractAddress || "", ABI, provider);

  async function getLiquidityInfo() {
    try {
      const getLiquidity = await contract.getCurrentLiquidity();
      console.log(getLiquidity);
      console.log(getLiquidity[0]);
      console.log(getLiquidity[1]);
      console.log(getLiquidity[2]);

      setTokenAReserve(parseInt(getLiquidity[0]) / weiToEth);
      setTokenBReserve(parseInt(getLiquidity[1]) / weiToEth);
      setRemainingTotalLiquidity(parseInt(getLiquidity[2]) / weiToEth);
    } catch (error) {
      console.error("Error Adding liquidity", error);
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

            <div className="flex justify-center font-bold text-[50px] mx-[300px]">
              Get the Current Reserves in the pool
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
                    placeholder="liquidity pool contract address"
                    onChange={(e) => setContractAddress(e.target.value)}
                  />
                </label>
              </div>

              <br />

              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
                onClick={() => getLiquidityInfo()}
              >
                Get Info
              </button>

              <br />
              {tokenAReserve ? (
                <div className="text-xl">
                  Token A in reserve: {tokenAReserve}
                </div>
              ) : (
                <p></p>
              )}

              <br />

              {tokenBReserve ? (
                <div className="text-xl">
                  {" "}
                  Token B in reserve: {tokenBReserve}
                </div>
              ) : (
                <p></p>
              )}

              <br />

              {remainingTotalLiquidity ? (
                <div className="text-xl">
                  Total Liquidity in the liquidity pool:{" "}
                  {remainingTotalLiquidity}
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetCurrentLiquidity;
