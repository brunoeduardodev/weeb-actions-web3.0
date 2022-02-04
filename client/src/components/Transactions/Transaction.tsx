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
    <div className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 flex flex-col my-2 rounded px-2 text-white">
      <div className="w-full bg-stone-800 p-2">
        <p>
          <strong>[{from}]</strong> send a <strong>{action}</strong> to{" "}
          <strong>[{to}]</strong>
        </p>
        <p className="mb-2">-and also {amount} ETH</p>
        <img
          className="rounded object-cover h-64 w-full"
          src={contractImage || "https://i.waifu.pics/CJRHy2-.gif"}
          alt="transaction"
        />
      </div>
    </div>
  );
};

export default Transaction;
