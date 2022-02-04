# Weeb Actions Blockchain

My first Web3 connected project.

The project runs on Ropsten testing network.

![Project Picture](https://user-images.githubusercontent.com/50559336/152525240-401dd355-cd6e-4d30-8526-50d70d5a5ada.jpg)

This project was inspired by [this JavascriptMastery video](https://www.youtube.com/watch?v=Wn_Kb3MR_cU&ab_channel=JavaScriptMastery).

# Maybe you're wondering:

> What is weeb?

Weird otaku things

> Where all this gifs come from

The gifs are from [waifu.pics](https://waifu.pics/) api!

> Why this project even exists?

Only to sudy

#How to run

Before run, see the project is separed on two folders: `client` and `smart_contract`, at first, lest start configurating the `smart_contract` part.

## Smart Contract

Create a .env file and follow the .env.example with your data. (If you're new to Web3 i highly recommend to watch the [JavascriptMastery tutorial](https://www.youtube.com/watch?v=Wn_Kb3MR_cU&ab_channel=JavaScriptMastery)).

To run the smart contract locally you can run `npx hardhat run scripts/run.ts`. You can also run `npx hardhat test` to ensure everything is okay.

### Deploying to blockchain

To deploy the smart contract to blockchain you can run `npx hardhat run scripts/deploy.ts --network ropsten`.

Make sure to copy the portal address of your newly deployed contract!

After that we're done about the SmartContract configuration.

## Client

The client is a standard NextJS project, before running, you need to update the SmartContract connection configuration.

In order to do that, go to `src/utils/constants` and replace the contractAddress with the address you copied on the previous step.

Now, you need to update the contract ABI, a file where all your contract info and how to interact with it is stored.

To do that, go to `smart_contract/artifacts/Transaction.sol/` and copy Transactions.json and replace the `Transaction.json` file located on `src/utils/`.

After that you're done! Just need run `npm run dev` or `yarn dev`.
