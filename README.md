# SPL token faucet
This project aims at implementing an SPL token faucet in its simplest form using Anchor. Faucets are a must-have when developing dApps to test out token flows. A faucet allows you to receive an arbitrary amount of tokens; always coming from the same Mint. This program is deployoned on the eclipse testnet as `9XXyjMZtennyC1fRSLvUpiq9UuAfFpCS1a8RSzcg8rMH` and the mint is `6tyZgRJkMcqqKAVt26xc25tv5HK7ZGFNrYB3aGgpyEQA`

# Program
## Running the program on Localnet

Swith to localnet.

```bash
solana config set --url http://127.0.0.1:8899
```

Run
```bash
rm -rf test-ledger && solana-test-validator
```
This will spin up a local validator that our client interacts with. More info on setting up  a local validator can be found [here](https://docs.solana.com/developing/test-validator).

## Anchor program building and deployment
Follow [this tutorial](https://dev.to/dabit3/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291) for an in depth-explanation on how to build your anchor program and deploy it to the different clusters.



In order to build the program use following command.
```bash
anchor build
```

Now you can deploy it.
```bash
anchor deploy
```

```shell
ANCHOR_WALLET=~/.config/solana/id.json ANCHOR_PROVIDER_URL=https://staging-rpc.dev.eclipsenetwork.xyz  node setup/token_airdrop.js
```

## Running program tests
Before it's possible to run tests, all packages need to be installed and `mocha-ts` and `typescript` need to be globally installed.
```bash
npm install -g ts-mocha typescript
```

```bash
npm install
```

Run all tests by using following command.
```bash
anchor test
```

# Client
## Running the client locally
Go to the `app` directory and run following command.
```bash
npm start
```

## Running client tests
Before it's possible to run tests, all packages need to be installed. Make sure you are in the `app` directory.
```bash
npm install
```

Now it's possible to run UI tests.
```bash
npm test
```


