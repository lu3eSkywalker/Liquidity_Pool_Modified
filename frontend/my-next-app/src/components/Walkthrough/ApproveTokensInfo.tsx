import React from "react";

const ApproveTokensInfo = () => {
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
          Show Info About Approving Tokens
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-100 overflow-y-auto">
            <h3 className="font-bold text-lg">Hello!</h3>
            <div className="py-4 text-xl">
              <p>
                In this step, we will approve our tokens for use by the
                liquidity pool, a necessary action for enabling liquidity
                provisioning. Token approval is a fundamental process in
                decentralized finance (DeFi), where an asset holder grants
                another entity (in this case, the liquidity pool) permission to
                spend a specified amount of tokens on the holders behalf. This
                is done by setting a spending allowance for the liquidity pool.
              </p>
              <br />
              <p>
                To allow the liquidity pool to execute transactions involving
                these tokens, we need to set the pool as an approved spender of
                our tokens. This step uses the `approve` function available in
                most token standards, such as ERC-20 or SPL tokens. By calling
                `approve`, we specify the pools address as the spender and
                define the maximum amount it is allowed to transfer. Once
                approved, the pool can manage these tokens within the bounds of
                this allowance, enabling it to facilitate trades or liquidity
                management actions as required.
              </p>
              <br />
              <p>
                After we successfully grant this allowance to the liquidity
                pool, the pool can interact with our tokens for actions like
                adding liquidity.
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

export default ApproveTokensInfo;
