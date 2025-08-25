"use client";
import React from "react";
import { useConnect } from "wagmi";
import { ButtonColorful } from "./ui/button-colorful";
import { useWallet } from "@/context/WagmiContext";
import { LoaderThree } from "./ui/loader";

export default function Navbar() {
  const { isPending, isSuccess } = useConnect();
  const { address, handleConnect, handleDisconnect } = useWallet();

  return (
    <nav
      className="w-full flex items-center justify-between px-4 sm:px-8 py-4 backdrop-blur-md shadow-md"
      style={{ backgroundImage: "url('/bg-img.png')" }}
    >
      {/* Logo on the left */}
      <div className="flex items-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#9945FF] via-[#43E7AD] to-[#2AF598] bg-clip-text text-transparent select-none font-poppins">
          W3ins
        </h1>
        {/* Show loader only on desktop */}
        <div className="hidden lg:flex">
          <LoaderThree />
        </div>
      </div>

      {/* Nav Links (hidden on mobile) */}
      <div className="hidden lg:flex gap-6 font-poppins">
        <a
          href="#about"
          className="text-white font-medium hover:text-blue-200 transition-colors"
        >
          About
        </a>
        <a
          href="#home"
          className="text-white font-medium hover:text-blue-200 transition-colors"
        >
          Home
        </a>
        <a
          href="#faq"
          className="text-white font-medium hover:text-blue-200 transition-colors"
        >
          FAQ
        </a>
      </div>

      {/* Connect Button on the right */}
      <div className="flex items-center">
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
