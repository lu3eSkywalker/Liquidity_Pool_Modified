import React from "react";

const LiquidityPoolByUserInfo = () => {
  const handleClick = () => {
    const modal = document.getElementById("my_modal_4") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };
  
  return (
    <div>
      <div>
        <button
          className="btn text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleClick}
        >
          Getting Liquidity Pool Info Using User Address
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-96 overflow-y-auto">
            <h3 className="font-bold text-lg">Hello!</h3>
            <div className="py-4 text-xl">
              <p>In this, we will get the liquidity pool contract address</p>
              <br />
              <p>
                For getting the liquidity pool contract we can use the user
                address to get the liquidity pool contract address.
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

export default LiquidityPoolByUserInfo;
