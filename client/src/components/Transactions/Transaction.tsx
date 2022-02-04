/* eslint-disable @next/next/no-img-element */
import React from "react";

// import { Container } from './styles';

type Props = {
  from: string;
  to: string;
  amount: string;
  action: string;
  contractImage?: string;
};

const Transaction: React.FC<Props> = ({
  to,
  from,
  amount,
  action,
  contractImage,
}) => {
  return (
    <div className="w-96 flex flex-col mx-3 my-2 rounded bg-stone-800 text-white p-3">
      <p>
        <strong>[{from}]</strong> send a <strong>{action}</strong> to{" "}
        <strong>[{to}]</strong>
      </p>
      <p className="mb-2">-and also {amount} ETH</p>
      <img
        className="rounded object-cover h-64"
        src={contractImage || "https://i.waifu.pics/CJRHy2-.gif"}
        alt="transaction"
      />
    </div>
  );
};

export default Transaction;
