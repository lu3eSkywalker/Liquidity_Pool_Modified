import React from "react";

const Walkthrough = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-200 to-blue-300 min-h-screen flex flex-col">
      <div className="my-8">
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          <li>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-start mb-10 md:text-end">
              <time className="font-mono italic text-2xl">Step 1</time>
              <div className="text-2xl font-black">
                <a href="./createliquiditypool">Creating a Liquidity Pool</a>
              </div>
              <p className="text-xl">
                For creating a Liquidity Pool, we need the addresses of two
                tokens. These tokens should be on the Ethereum network, and we
                need to own them to create a liquidity pool of our own. We also
                need the contract address of the Liquidity Pool Factory
                contract, but we have hardcoded that address in the frontend.
                So, for now, there's no need to add it manually.
              </p>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end mb-10">
              <time className="font-mono italic text-2xl">Step 2</time>
              <div className="text-2xl font-black">
                <a href="./liquiditypoolbyuser">
                  Getting the Address of the Liquidity Pool Created
                </a>
              </div>
              <p className="text-xl">
                To get the address of the liquidity pool, we can use the user
                public address, to see the liquidity pool created by the user.
                We can also see all the liquidity pools created by in our
                network.
              </p>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-start mb-10 md:text-end">
              <time className="font-mono italic text-2xl">Step 3</time>
              <div className="text-2xl font-black">
                <a href="./approvetokens">Approve The Tokens</a>
              </div>
              <p className="text-xl">
                In this step, we will approve our tokens for use by the
                liquidity pool, a necessary action for enabling liquidity
                provisioning. Token approval is a fundamental process in
                decentralized finance (DeFi), where an asset holder grants
                another entity (in this case, the liquidity pool) permission to
                spend a specified amount of tokens on the holders behalf. This
                is done by setting a spending allowance for the liquidity pool.
              </p>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end mb-10">
              <time className="font-mono italic text-2xl">Step 4</time>
              <div className="text-2xl font-black">
                <a href="./addliquidity">Adding Liquidity</a>
              </div>
              <p className="text-xl">
                In this, we would add liquidity to our liquidity pool by adding
                both the token 0 and token 1 and would get the respective
                LPtoken back to our account.
              </p>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-start mb-10 md:text-end">
              <time className="font-mono italic text-2xl">Step 5</time>
              <div className="text-2xl font-black">
                <a href="/removeliquidity">Removing Liquidity</a>
              </div>
              <p className="text-xl">
                For removing the liquidity, we would have to provide the LP
                tokens that we got during adding the liquidity to the pool.
                After providing the LP token, we would get our respective
                tokens, back in our account.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Walkthrough;
