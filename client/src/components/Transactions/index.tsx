import { ethers } from "ethers";
import React, { useContext, useMemo } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";
import { shortenAddress } from "../../utils/shortenAddress";
import Transaction from "./Transaction";

const Transactions: React.FC = () => {
  const { transactions, currentAccount, hasEthereum } =
    useContext(TransactionContext);

  const message = useMemo(() => {
    if (hasEthereum) {
      if (currentAccount) {
        return "People who got Memed";
      } else {
        return "Connect your account to see the people getting memed";
      }
    }
    return "Install metamask to see the people getting memed";
  }, [currentAccount, hasEthereum]);

  return (
    <div className="w-full flex flex-col items-center mb-12">
      <h5
        className={`text-white text-${
          currentAccount ? "4" : ""
        }xl font-bold mb-4`}
      >
        {message}
      </h5>

      <div className="flex flex-wrap justify-center">
        {transactions.map((transaction, index) => (
          <Transaction
            key={index}
            from={shortenAddress(transaction.sender)}
            to={shortenAddress(transaction.receiver)}
            amount={ethers.utils.formatEther(transaction.amount._hex)}
            action={transaction.action}
            contractImage={transaction.contractImage}
          />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
