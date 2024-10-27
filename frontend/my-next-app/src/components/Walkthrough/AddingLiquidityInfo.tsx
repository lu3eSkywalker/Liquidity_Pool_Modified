import { useRouter } from "next/router";
import React from "react";

const AddingLiquidityInfo = () => {
  const router = useRouter();
  return (
    <div>
      <div>
        <button
          className="btn text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-lg rounded-lg px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => document.getElementById("my_modal_4").showModal()}
        >
          Show Info About Adding Liquidity
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-96 overflow-y-auto">
            <h3 className="font-bold text-lg">Hello!</h3>
            <div className="py-4 text-xl">
              <p>
                In this, We would be adding Liquidity to the Liquidity Pools
              </p>
              <br />
              <p>
                For Adding the liquidity. We first must've approved the token
                for the spender and the spender here, would be the liquidity
                pool's contract address.
              </p>
              <br />
              <p>
                In this, we would have to Fill three values, Liquidity Pool
                Address ( You can find it here by user address{" "}
                <button
                  className="font-semibold bg-red-400"
                  onClick={() => router.push("/liquiditypoolbyuser")}
                >
                  Click here
                </button>
                ) Token 0 Quantity and Token 1 Quantity. After we have added the
                liquidity, your account would also be credited with LP tokens
              </p>
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default AddingLiquidityInfo;
