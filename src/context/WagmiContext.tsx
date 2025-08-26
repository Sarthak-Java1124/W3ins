"use client"

import {createContext, ReactNode, useContext} from "react"
import { toast } from "sonner";
import { Address } from "viem";
import { useAccount, useConnect, useDisconnect } from "wagmi";

type WagmiContext = {
    address : Address | undefined,
    isConnected : boolean,
    handleConnect : ()=>void,
    handleDisconnect : ()=>void
}
const WalletContext = createContext<WagmiContext | undefined>(undefined);

export function WalletProvider ({children} : {children : ReactNode}){
   const {address , isConnected} = useAccount();
   const {connectAsync , connectors } = useConnect();
   const {disconnect} = useDisconnect();

   const handleConnect = async ()=>{
     try {
        const availableConnectors = connectors.find((c)=>c.id=="injected")
        if(availableConnectors != null ){
            await connectAsync({connector : availableConnectors})
        }else {
            alert("You don't have any wallet present")
        }
     }catch(error){
      
       toast.warning("No Wallet found in extension please add one")
      console.log("The error in connecting the wallet is : " , error)
     }
   }
   const handleDisconnect = ()=>disconnect();

    return (
      <WalletContext.Provider
        value={{ address, isConnected, handleConnect, handleDisconnect }}
      >
        {children}
      </WalletContext.Provider>
    );


    
} 

export function useWallet() {
    const context = useContext(WalletContext)
    if(!context ){
        throw new Error("No context found")
    }

    return context
}