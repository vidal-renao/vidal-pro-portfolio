import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const web3Config = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  ssr: true,
  transports: {
    [sepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof web3Config;
  }
}
