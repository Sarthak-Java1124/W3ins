"use client";

import { WalletProvider } from "@/context/WagmiContext";
import { wagmiConfig } from "@/lib/wagmiConfig";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { WagmiProvider } from "wagmi";

function App({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    
      <WagmiProvider config={wagmiConfig} reconnectOnMount={false} >
        <QueryClientProvider client={queryClient}>
          <WalletProvider>{children}</WalletProvider>
        </QueryClientProvider>
      </WagmiProvider>
   
  );
}

export default App;
