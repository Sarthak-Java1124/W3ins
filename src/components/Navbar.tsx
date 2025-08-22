"use client"
import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { GradientButton } from './ui/gradient-button';
import { ButtonColorful } from './ui/button-colorful';
import { Address } from 'viem';
import { useWallet } from '@/context/WagmiContext';
import { LoaderThree } from './ui/loader';

export default function Navbar( ) {
  // const {address } = useAccount();
  // const {disconnect} = useDisconnect();
   const { isPending , isSuccess } = useConnect();
  const {address , isConnected , handleConnect , handleDisconnect } = useWallet();
  //  const handleSubmit = async () => {
  //    try {
  //      const connectorWallet = connectors.find((c) => c.id == "injected");
  //      if (connectorWallet != null) {
  //        await connectAsync({ connector: connectorWallet });
  //      }else{
  //       alert("Please Connect a Wallet")
  //      }
  //    } catch (error) {
  //      console.error("Error connecting wallet:", error);
       
  //    }
  //  };
  //  const handleDisConnect = async () => {
  //   try {
       
  //   }catch (error){

  //   }
  //  }
  return (
    <nav
      className="w-full flex items-center justify-between px-8 py-4 backdrop-blur-md shadow-md"
      style={{ backgroundImage: "url('/bg-img.png')" }}
    >
      {/* Left: Nav Links */}
      <div className="flex gap-6 font-poppins">
        <a
          href="#about"
          className="text-white font-medium hover:text-blue-200 transition-colors font-poppins"
        >
          About
        </a>
        <a
          href="#home"
          className="text-white font-medium hover:text-blue-200 transition-colors font-poppins"
        >
          Home
        </a>
        <a
          href="#faq"
          className="text-white font-medium hover:text-blue-200 transition-colors font-poppins"
        >
          FAQ
        </a>
      </div>
      {/* Center: Heading */}
      <div className="flex items-center  absolute left-1/2 transform -translate-x-1/2 font-poppins">
        <h1 className="text-5xl bg-gradient-to-r from-[#9945FF] via-[#43E7AD] to-[#2AF598] bg-clip-text text-transparent  select-none font-poppins">
          W3ins
        </h1>
        <LoaderThree />
      </div>
      {/* Right: Connect Button */}
      <div className="font-poppins">
        {!address ? (
          <>
            {!isPending && !isSuccess && (
              <ButtonColorful label="Connect" onClick={handleConnect} />
            )}
            {isPending && !isSuccess && <ButtonColorful label="Connecting" />}
          </>
        ) : (
          <ButtonColorful label="Disconnect" onClick={handleDisconnect} />
        )}
      </div>
    </nav>
  );
}
