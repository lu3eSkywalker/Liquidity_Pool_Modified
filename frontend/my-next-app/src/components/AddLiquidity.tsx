import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import AddingLiquidityInfo from "./Walkthrough/AddingLiquidityInfo";
import Image from "next/image";
import asset1 from "../assets/asset1.png";
import asset2 from "../assets/asset2.jpeg";
import asset4 from "../assets/asset4.jpg";
import pattern_randomized from "../assets/pattern-randomized.svg";
import ethereum from "../assets/ethereum4.png";

declare global {
  interface Window {
    ethereum: any;
  }
}

const AddLiquidity = () => {
  const [contractAddress, setContractAddress] = useState<string>(
    "0xb7a5bd0345ef1cc5e66bf61bdec17d2461fbd968"
  );

  const [tokenAQuantity, setTokenAQuantity] = useState<number>(0);
  const [tokenBQuantity, setTokenBQuantity] = useState<number>(0);

  const [liquidityAdded, setLiquidityAdded] = useState<string>("");

  const [loadingBar, setLoadingBar] = useState<boolean>(false);

  const ABI = [
    "function addLiquidity(uint256, uint256) external returns (uint256)",
  ];

  async function addLiquidity() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress || "",
          ABI,
          signer
        );

        const sendTokens = await contract.addLiquidity(
          tokenAQuantity,
          tokenBQuantity
        );
        console.log(sendTokens);

        setLoadingBar(true);
        const res = await sendTokens.wait();
        setLoadingBar(true);

        if (res.status == 1) {
          setLiquidityAdded("Transaction Successful");
        }
      } catch (error: any) {
        console.error("Error Adding liquidity", error);
        alert(
          "An error occurred while adding liquidity. Check console for details."
        );
      }
    } else {
      alert("Please install MetaMask to use this feature.");
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
              <AddingLiquidityInfo />
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
            className="absolute right-0 rounded-full mx-[60px]"
            style={{ marginTop: "35px" }}
          >
            <Image
              src={ethereum}
              alt="cryptoPunks"
              width={350}
              height={150}
            />
          </div>

          <div
            className="flex flex-col justify-center items-center"
            style={{ height: "40vh" }}
          >
            <div className="absolute w-[600px] h-[400px] bg-blue-500 rounded-lg transform -rotate-6 opacity-50 my-[530px] top-[-80px]"></div>

            <div className="relative bg-white shadow-md rounded-lg p-8 w-[450px] mb-6">
              <div>
                <label className="input input-bordered flex items-center gap-2 font-black text-xl my-2 border-4">
                  Address:
                  <input
                    className="grow"
                    type="text"
                    placeholder="Deployed Liquidity Pool Address"
                    onChange={(e) => setContractAddress(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 font-black text-xl my-2 border-4">
                  Quantity:
                  <input
                    className="grow"
                    type="number"
                    placeholder="Token A Quantity"
                    onChange={(e) => setTokenAQuantity(parseInt(e.target.value))}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 font-black text-xl border-4">
                  Quantity:
                  <input
                    className="grow"
                    type="number"
                    placeholder="Token B Quantity"
                    onChange={(e) => setTokenBQuantity(parseInt(e.target.value))}
                  />
                </label>
              </div>

              <br />

              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
                onClick={() => addLiquidity()}
              >
                Add Liquidity
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
              {<div className="text-xl">{liquidityAdded}</div>}
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
                <li className="step step-primary" step-primary>
                  <a href="./approvetokens">Approve the Tokens</a>
                </li>
                <li className="step step-primary">
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

export default AddLiquidity;
