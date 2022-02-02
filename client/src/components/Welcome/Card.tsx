import React, { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { TransactionContext } from "../../contexts/TransactionContext";
import { shortenAddress } from "../../utils/shortenAddress";
// import { Container } from './styles';

const Card: React.FC = () => {
  const { currentAccount } = useContext(TransactionContext);

  return (
    <div className="card w-full md:w-8/12 rounded-xl p-4 mx-auto flex flex-col bg-blue-600	text-white">
      <div className="flex justify-between items-center mb-12">
        <div className="p-2 border-[2px] border-white rounded-full ">
          <SiEthereum fontSize={24} />
        </div>
      </div>

      <div>
        <p className="text-gray mb-1">
          {currentAccount ? shortenAddress(currentAccount) : "Address"}
        </p>
        <p className="text-gray text-xl font-bold">Ethereum</p>
      </div>
    </div>
  );
};

export default Card;
