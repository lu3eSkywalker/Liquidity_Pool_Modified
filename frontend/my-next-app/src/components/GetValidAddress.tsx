import React, { useState } from "react";
import { ethers } from "ethers";

const GetValidAddress = () => {
  const [token0, setToken0] = useState<string>(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  );

  async function getCorrectedAddress() {
    try {
      // Use ethers.utils.getAddress to validate and checksum the address
      const validAddress = ethers.getAddress(token0);
      console.log("Corrected address:", validAddress);
    } catch (error) {
      console.error("Invalid address:", error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">
        <div>
          <input
            type="text"
            placeholder="token 0 address"
            value={token0}
            onChange={(e) => setToken0(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={getCorrectedAddress}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Create Liquidity Pool
        </button>
      </div>
    </div>
  );
};

export default GetValidAddress;
