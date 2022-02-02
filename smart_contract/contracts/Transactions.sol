//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Transactions {
  uint256 private transactionCount;

  event Transfer(
    address from,
    address receiver,
    uint256 amount,
    uint256 timestamp,
    string action,
    string contractImage
  );

  struct TransferStructure {
    address sender;
    address receiver;
    uint256 amount;
    uint256 timestamp;
    string action;
    string contractImage;
  }

  TransferStructure[] private transactions;

  function unshiftTransactions(TransferStructure memory newTransfer) private {
    if (transactions.length == 0) {
      transactions.push(newTransfer);
      return;
    }

    transactions.push(transactions[transactions.length - 1]);
    for (uint256 i = transactions.length - 1; i > 0; i--) {
      transactions[i] = transactions[i - 1];
    }
    transactions[0] = newTransfer;

    if (transactions.length > 9) {
      transactions.pop();
    }
  }

  function addToBlockchain(
    address payable receiver,
    uint256 amount,
    string memory action,
    string memory contractImage
  ) public {
    transactionCount += 1;

    TransferStructure memory newTransfer = TransferStructure(
      msg.sender,
      receiver,
      amount,
      block.timestamp,
      action,
      contractImage
    );

    unshiftTransactions(newTransfer);
    emit Transfer(msg.sender, receiver, amount, block.timestamp, action, contractImage);
  }

  function getLatestTransactions() public view returns (TransferStructure[] memory) {
    return transactions;
  }

  function getTransactionCount() public view returns (uint256) {
    return transactionCount;
  }
}
