import React from "react";

const CreatingLiquidityPoolInfo = () => {
  return (
    <div>
      <div>
        <button
          className="btn text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => document.getElementById("my_modal_4").showModal()}
        >
          Show Info About Creating Liquidity Pools
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-96 overflow-y-auto">
            <h3 className="font-bold text-lg">Hello!</h3>
            <div className="py-4 text-xl">
              <p>In this, we will be creating a Liquidity Pool.</p>
              <br />
              <p>
                For creating a Liquidity Pool, we need the addresses of two
                tokens. These tokens should be on the Ethereum network, and we
                need to own them to create a liquidity pool of our own.
              </p>
              <br />
              <p>
                We also need the contract address of the Liquidity Pool Factory
                contract, but we have hardcoded that address in the frontend.
                So, for now, there's no need to add it manually.
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

export default CreatingLiquidityPoolInfo;
