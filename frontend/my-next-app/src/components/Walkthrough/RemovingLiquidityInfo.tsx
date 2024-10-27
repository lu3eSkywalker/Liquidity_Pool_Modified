import React from 'react'

const RemovingLiquidityInfo = () => {
  return (
    <div>
      <div>
        <button
          className="btn text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => document.getElementById("my_modal_4").showModal()}
        >
          Show Info About Removing Liquidity
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-100 overflow-y-auto">
            <h3 className="font-bold text-lg">Hello!</h3>
            <div className="py-4 text-xl">
              <p>In this, We would be removing liquidity from the Liquidity Pools</p>
              <br />
              <p>
                For removing the liquidity. We first must've added the liquidity to the pool.
                When We add liquidity to a pool, we get some of the LP tokens which we are minted
                in our account.
              </p>
              <br />
              <p>
                To Remove the liquidity, we would have to transfer those LP tokens and we would get 
                back our Token 0 and Token 1.
              </p>

              <p>
                So, for removing liquidity, we would have to provide
                Deployed liquidity pool address and liqiuidity (as in LP tokens)
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
  )
}

export default RemovingLiquidityInfo