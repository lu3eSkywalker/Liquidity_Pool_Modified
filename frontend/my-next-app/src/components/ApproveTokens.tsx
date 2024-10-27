import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const ApproveTokens = () => {
  const [token0, setToken0] = useState<string>(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  );
  const [token1, setToken1] = useState<string>(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  );
  const [liquidityPoolAddress, setLiquidityPoolAddress] = useState<string>(
    "0x2E983A1Ba5e8b38AAAeC4B440B9dDcFBf72E15d1"
  );

  const [value0, setValue0] = useState<number>(0);
  const [value1, setValue1] = useState<number>(0);
  const [token0Approved, setToken0Approved] = useState<boolean>(false);
  const [token1Approved, setToken1Approved] = useState<boolean>(false);

  const ABI = ["function approve(address, uint256) public returns (bool)"];

  async function approveToken0() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(token0, ABI, signer);

        const correctedLiquidityPoolAddress =
          ethers.getAddress(liquidityPoolAddress);

        const approveToken = await contract.approve(
          correctedLiquidityPoolAddress,
          value0
        );
        console.log(approveToken);

        const response = await approveToken.wait();
        if (response.status == 1) {
          setToken0Approved(true);
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

  async function approveToken1() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(token1, ABI, signer);

        const correctedLiquidityPoolAddress =
          ethers.getAddress(liquidityPoolAddress);

        const approveToken = await contract.approve(
          correctedLiquidityPoolAddress,
          value1
        );
        const response = await approveToken.wait();
        if (response.status == 1) {
          setToken1Approved(true);
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
      <div
        className="flex flex-col justify-center items-center h-screen bg-gray-100"
        style={{ height: "70vh" }}
      >
        <div className="bg-white shadow-md rounded-lg p-8 w-[450px] mb-6">
          <div>
            <input
              type="text"
              placeholder="Liquidity Pool address"
              onChange={(e) => setLiquidityPoolAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Token 0 address"
              onChange={(e) => setToken0(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2 w-[150px]"
            />
            <input
              type="number"
              placeholder="Token 0 value"
              onChange={(e) => setValue0(parseInt(e.target.value))}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2 w-[100px]"
            />
            <button
              onClick={() => approveToken0()}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mx-2"
            >
              Approve
            </button>

            {token0Approved ? (
              <div>
                {" "}
                <div className="p-2">
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox checkbox-success"
                      />
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Token 1 address"
              onChange={(e) => setToken1(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2 w-[150px]"
            />
            <input
              type="number"
              placeholder="Token 1 value"
              onChange={(e) => setValue1(parseInt(e.target.value))}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2 w-[100px]"
            />
            <button
              onClick={() => approveToken1()}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mx-2"
            >
              Approve
            </button>

            {token1Approved ? (
              <div>
                {" "}
                <div className="p-2">
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox checkbox-success"
                      />
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default ApproveTokens;
