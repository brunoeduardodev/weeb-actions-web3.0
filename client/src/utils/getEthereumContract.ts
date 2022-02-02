import { ethers } from "ethers";
import { contractABI, contractAddress } from "./constants";

export const getEthereumContract = () => {
  if (!window.ethereum) return null;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};
