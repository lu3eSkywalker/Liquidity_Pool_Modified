import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const TokenInfo = ({ addressOfContract }: any) => {
  const [address, setAddress] = useState<string[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

  const ABI = [
    "function getTokenInfo() external view returns (address, address, address)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(
    addressOfContract || "",
    ABI,
    provider
  );

  async function getContractDetails() {
    try {
      const getTokensInfo = await contract.getTokenInfo();
      setAddress(getTokensInfo);
    } catch (error) {
      console.error("Error fetching token info:", error);
    }
  }

  useEffect(() => {
    if (addressOfContract) {
      getContractDetails();
      showModal();
    }
  }, [addressOfContract]);

  const showModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <div>
      <dialog ref={dialogRef} id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl h-100 overflow-y-auto">
          <h3 className="font-bold text-lg">Token Information</h3>
          <div className="py-4 text-xl">
            <p>Token 0: {address[0]}</p>
            <p>Token 1: {address[1]}</p>
            <p>LP Token: {address[2]}</p>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TokenInfo;
