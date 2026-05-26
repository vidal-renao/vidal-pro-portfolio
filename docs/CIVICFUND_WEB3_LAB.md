# CivicFund Web3 Lab

Interactive portfolio case study for a community-governed public-goods funding
interface. It is designed to demonstrate frontend Web3 integration skills
relevant to coordination and contribution platforms.

## What Is Real

- Injected EVM wallet connection through `wagmi`.
- Sepolia chain switching through the connected wallet.
- Live Sepolia balance and block reads through `wagmi` / `viem`.
- Non-financial EVM message signing tied to the selected initiative.

## What Is Demonstration Data

The proposal names, progress amounts and contributor counts are product design
fixtures. They represent an MVP experience and are explicitly labelled as demo
data in the interface.

## Safety Design

- No smart contract write operation is requested.
- No funds are transferred.
- The signing panel explains that the intention is non-financial before a user
  can confirm it in a wallet.
- Sepolia is used to keep blockchain interaction within a test network.

## Stack

- Next.js 16 App Router and TypeScript
- React 19
- `wagmi` for connection and wallet hooks
- `viem` for EVM-compatible data formatting and transport
- TanStack Query for asynchronous blockchain state
- Tailwind CSS 4 for responsive UI

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000/en/labs/community-fund`.

## Validation

```bash
npm run lint
npm run build
```
