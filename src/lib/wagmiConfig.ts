import { createConfig, createStorage, http } from "wagmi";
import { base, mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask, safe } from "@wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [mainnet, base, sepolia],
ssr : true,

  connectors: [injected(), metaMask(), safe()],
  transports: {
    
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },

});
