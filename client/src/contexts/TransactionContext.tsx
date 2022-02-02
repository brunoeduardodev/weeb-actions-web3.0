import { BigNumber, ethers } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTransactionImage } from "../services/getContractImage";
import { getEthereumContract } from "../utils/getEthereumContract";

type NewTransactionData = {
  address: string;
  amount: string;
  action: string;
};

type Transaction = {
  sender: string;
  receiver: string;
  amount: {
    _hex: string;
  };
  timestamp: string;
  action: string;
  contractImage: string;
};

type TransactionContextData = {
  connectWallet: () => Promise<void>;
  currentAccount: string | undefined;
  transactionCount: number;
  sendTransaction: (data: NewTransactionData) => Promise<void>;

  loading: boolean;
  transactions: Transaction[];
  hasEthereum: boolean;
};

const getEthereum = () => {
  if (!window.ethereum) {
    toast("Please install Metamask or other provider", { type: "error" });
    return null;
  }

  return window.ethereum;
};

export const TransactionContext = React.createContext<TransactionContextData>(
  {} as TransactionContextData
);

export const TransactionProvider: React.FC = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hasEthereum, setHasEthereum] = useState(false);

  const getLatestTransactions = useCallback(async () => {
    try {
      const contract = getEthereumContract();
      console.log("before");

      if (!contract) return;
      const transactions = await contract.getLatestTransactions();
      console.log("before1");

      const transactionCount = await contract.getTransactionCount();
      console.log("before2");

      console.log({ transactions });
      setTransactions(transactions);
      setTransactionCount(transactionCount.toNumber());
    } catch (error: any) {
      console.error(error);
      console.log("THIS");
      toast("Something went wrong", { type: "error" });
    }
  }, [setTransactions]);

  const checkIfWalletIsConnected = useCallback(async () => {
    const ethereum = getEthereum();
    if (!ethereum) return;

    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
      getLatestTransactions();
    }
  }, [getLatestTransactions]);

  const connectWallet = useCallback(async () => {
    const ethereum = getEthereum();
    if (!ethereum) return;

    try {
      const [account] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(account);
      getLatestTransactions();
    } catch (error: any) {
      if (error.code === 4001) {
        toast("You need to accept the connection request!", {
          type: "warning",
        });
      } else {
        toast("Something went wrong", { type: "error" });
      }
    }
  }, []);

  const sendTransaction = useCallback(
    async ({ action, amount, address }: NewTransactionData) => {
      const ethereum = getEthereum();
      if (!ethereum) return;

      if (address === currentAccount) {
        toast("You cannot send a transfer yourself!", {
          type: "warning",
        });
        return;
      }

      setLoading(true);
      try {
        const parsedAmount = ethers.utils.parseEther(amount);
        const contract = getEthereumContract();
        if (!contract) return;
        const contractImage = await getTransactionImage(action);
        const transactionParameters = [
          {
            from: currentAccount,
            to: address,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ];

        await ethereum.request({
          method: "eth_sendTransaction",
          params: transactionParameters,
        });

        const transactionHash = await contract.addToBlockchain(
          address,
          parsedAmount,
          action,
          contractImage
        );

        await transactionHash.wait();
        toast("Transaction sent!", { type: "success" });
        getLatestTransactions();
      } catch (error: any) {
        console.error(error);
        toast(`${error.message}`);
      } finally {
        setLoading(false);
      }
    },
    [currentAccount, getLatestTransactions]
  );

  useEffect(() => {
    checkIfWalletIsConnected();
    if (!window.ethereum) {
      return;
    }
    setHasEthereum(true);

    const accountListener = window.ethereum.on(
      "accountsChanged",
      (accounts: any[]) => {
        setCurrentAccount(accounts[0]);
        toast("Your account has been changed", { type: "success" });
      }
    );
  }, [checkIfWalletIsConnected, getLatestTransactions]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransaction,
        transactionCount,
        loading,
        transactions,
        hasEthereum,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
