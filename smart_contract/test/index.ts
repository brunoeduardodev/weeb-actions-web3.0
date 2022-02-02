import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Transactions } from "../typechain";

type Sut = {
  transactionsContract: Transactions;
  owner: SignerWithAddress;
  randomSigner: SignerWithAddress;
};

const makeSut = async (): Promise<Sut> => {
  const [owner, randomSigner] = await ethers.getSigners();
  const TransactionsContract = await ethers.getContractFactory("Transactions");
  const transactionsContract = await TransactionsContract.deploy();
  await transactionsContract.deployed();

  return { transactionsContract, owner, randomSigner };
};

const makeTransfer = async (sut: Sut, action = "kick") => {
  const { transactionsContract, randomSigner } = sut;
  const transferTnx = await transactionsContract.addToBlockchain(
    randomSigner.address,
    ethers.utils.parseEther("0.001"),
    action,
    `${action}-image`
  );

  return transferTnx;
};

describe("Transactions", function () {
  it("Should be able to add to blockchain", async () => {
    const sut = await makeSut();
    const { transactionsContract } = sut;
    await makeTransfer(sut);
    const transactions = await transactionsContract.getLatestTransactions();
    expect(transactions.length).to.be.equal(1);
  });

  it("Should be able to list last transactions sorted by newest", async () => {
    const sut = await makeSut();
    const { transactionsContract } = sut;

    const actions = ["kick", "punch", "kick", "punch"];
    await Promise.all(actions.map((action) => makeTransfer(sut, action)));

    const transactions = await transactionsContract.getLatestTransactions();
    const transactionActions = transactions.map((transaction) => transaction.action);

    expect(transactionActions).to.deep.equal(actions.reverse());
  });

  it("Should be able to list only 9 latests transactions", async () => {
    const sut = await makeSut();
    const { transactionsContract } = sut;
    const actions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    await Promise.all(actions.map((action) => makeTransfer(sut, action)));

    const transactions = await transactionsContract.getLatestTransactions();
    const transactionActions = transactions.map((transaction) => transaction.action);

    expect(transactions.length).to.be.equal(9);
    expect(transactionActions).to.deep.equal(actions.slice(3).reverse());
  });

  it("Should be able to retrieve transactions count", async () => {
    const sut = await makeSut();
    const { transactionsContract } = sut;

    const actions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    await Promise.all(actions.map((action) => makeTransfer(sut, action)));

    const transactionCount = await transactionsContract.getTransactionCount();
    expect(transactionCount).to.equal(12);
  });
});
