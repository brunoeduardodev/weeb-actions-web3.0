import React, { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";
import Card from "./Card";
import Form from "./Form";

const Welcome: React.FC = () => {
  const { connectWallet, currentAccount, transactionCount } =
    useContext(TransactionContext);

  return (
    <div className="flex max-w-screen-2xl	 w-10/12 md:w-11/12 m-auto mt-8 md:mt-32  flex-col md:flex-row mb-24">
      <div className="w-full md:w-1/2 flex flex-col text-center md:text-left items-center md:items-start text-white">
        <h2 className="text-5xl font-bold mb-4">
          Make your friends get <strong>MEMED</strong>
        </h2>
        <p className="text-2xl w-8/12 mb-6">
          Make your friends get memed by sending them ethereum with low fees
        </p>

        {transactionCount > 0 && (
          <p className="text-2xl mb-6">
            {transactionCount} peoples got memed so far
          </p>
        )}

        {!currentAccount && (
          <button
            className="w-72 p-2 rounded-full font-bold bg-blue-600 mb-12"
            type="button"
            onClick={() => connectWallet()}
          >
            Connect Wallet
          </button>
        )}
      </div>

      <div className="md:w-1/2 w-full flex flex-col ">
        <Card />

        <Form />
      </div>
    </div>
  );
};

export default Welcome;
