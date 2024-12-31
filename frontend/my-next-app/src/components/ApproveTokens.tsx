import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import ApproveTokensInfo from "./Walkthrough/ApproveTokensInfo";
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

const ApproveTokens = () => {
  const [token0, setToken0] = useState<string>(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  );
  const [token1, setToken1] = useState<string>(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  );
  const [liquidityPoolAddress, setLiquidityPoolAddress] = useState<string>(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  const [value0, setValue0] = useState<string>("");
  const [value1, setValue1] = useState<string>("");
  const [token0Approved, setToken0Approved] = useState<boolean>(false);
  const [token1Approved, setToken1Approved] = useState<boolean>(false);

  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);
  const [transactionLoading2, setTransactionLoading2] =
    useState<boolean>(false);

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

        const ethToWeiValue0 = ethers.parseUnits(value0, 18);

        const approveToken = await contract.approve(
          correctedLiquidityPoolAddress,
          ethToWeiValue0
        );
        console.log(approveToken);

        setTransactionLoading(true);
        const response = await approveToken.wait();
        setTransactionLoading(false);

        if (response.status == 1) {
          setToken0Approved(true);
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

  async function approveToken1() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(token1, ABI, signer);

        const correctedLiquidityPoolAddress =
          ethers.getAddress(liquidityPoolAddress);

        const ethToWeiValue1 = ethers.parseUnits(value1, 18);

        const approveToken = await contract.approve(
          correctedLiquidityPoolAddress,
          ethToWeiValue1
        );
        setTransactionLoading2(true);
        const response = await approveToken.wait();
        setTransactionLoading2(false);

        if (response.status == 1) {
          setToken1Approved(true);
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
                  <ApproveTokensInfo />
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
                <div className="absolute w-[1000px] h-[350px] bg-blue-500 rounded-lg transform -rotate-2 opacity-50 my-[540px] top-[-80px]"></div>

                <div className="relative bg-white shadow-md rounded-lg p-8 w-[950px] mb-6">
                  <div>
                    <label className="input input-bordered flex items-center gap-2 font-black text-xl">
                      Address:
                      <input
                        type="text"
                        className="grow"
                        placeholder="Liquidity Pool Address"
                        onChange={(e) =>
                          setLiquidityPoolAddress(e.target.value)
                        }
                      />
                    </label>
                  </div>

                  <div className="flex items-center mb-4">
                    <label className="input input-bordered flex items-center gap-2 my-4 font-black text-xl">
                      Address:
                      <input
                        type="text"
                        className="grow"
                        placeholder="Token 0 address"
                        onChange={(e) => setToken0(e.target.value)}
                      />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 mx-2 font-black text-xl">
                      Value
                      <input
                        type="number"
                        className="grow"
                        placeholder="Token 0 value"
                        onChange={(e) => setValue0(e.target.value)}
                      />
                    </label>

                    <button
                      onClick={() => approveToken0()}
                      className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mx-2 font-bold text-xl"
                    >
                      Approve
                    </button>

                    {transactionLoading ? (
                      <div>
                        <span className="loading loading-spinner text-primary"></span>
                      </div>
                    ) : (
                      ""
                    )}

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
                    <label className="input input-bordered flex items-center gap-2 font-black text-xl">
                      Address:
                      <input
                        type="text"
                        className="grow"
                        placeholder="Token 1 address"
                        onChange={(e) => setToken1(e.target.value)}
                      />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 mx-2 font-black text-xl">
                      Value
                      <input
                        type="number"
                        className="grow"
                        placeholder="Token 1 value"
                        onChange={(e) => setValue1(e.target.value)}
                      />
                    </label>

                    <br />
                    <br />

                    <button
                      onClick={() => approveToken1()}
                      className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mx-2 font-bold text-xl"
                    >
                      Approve
                    </button>

                    {transactionLoading2 ? (
                      <div>
                        <span className="loading loading-spinner text-primary"></span>
                      </div>
                    ) : (
                      ""
                    )}

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
                  <li className="step step-primary">
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

export default ApproveTokens;
