import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

const GetAllLiquidityPools = () => {
  const [address, setAddress] = useState<string[]>([]);

  const liquidityPoolFactoryContract =
    "0x663F3ad617193148711d28f5334eE4Ed07016602";

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

  const ABI = [
    "function getAllPools() external view returns (address[] memory)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(
    liquidityPoolFactoryContract ||
      "0x663F3ad617193148711d28f5334eE4Ed07016602",
    ABI,
    provider
  );

  async function getAllPoolAddresses() {
    const getPoolAdd = await contract.getAllPools();
    // const response = await getPoolAdd.wait();
    console.log(getPoolAdd);
    setAddress(getPoolAdd);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">
        <button onClick={() => getAllPoolAddresses()}>
          Create Liquidity Pool
        </button>

        <br />
        <br />

        <div>
          {address.map((data, index) => (
            <div key={index}>{data}</div>
          ))}
        </div>

        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default GetAllLiquidityPools;
