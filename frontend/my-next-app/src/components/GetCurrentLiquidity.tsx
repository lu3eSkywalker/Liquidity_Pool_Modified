import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
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

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

  const ABI = [
    "function getCurrentLiquidity() external view returns (uint256, uint256, uint256)",
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

      setTokenAReserve(parseInt(getLiquidity[0]));
      setTokenBReserve(parseInt(getLiquidity[1]));
      setRemainingTotalLiquidity(parseInt(getLiquidity[2]));
    } catch (error: any) {
      console.error("Error Adding liquidity", error);
    }
  }

  return (
    <div>
      <div
        className="flex flex-col justify-center items-center h-screen bg-gray-100"
        style={{ height: "80vh" }}
      >
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-8 w-80">
            <button
              className="btn text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-lg rounded-lg px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => getLiquidityInfo()}
            >
              get info
            </button>

            {tokenAReserve ? (
              <div>Token A in reserve: {tokenAReserve}</div>
            ) : (
              <p></p>
            )}

            <br />

            {tokenBReserve ? (
              <div> Token B in reserve: {tokenBReserve}</div>
            ) : (
              <p></p>
            )}

            <br />

            {remainingTotalLiquidity ? (
              <div>
                Remaining Liquidity in the liquidity pool:{" "}
                {remainingTotalLiquidity}
              </div>
            ) : (
              <p></p>
            )}

            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetCurrentLiquidity;
