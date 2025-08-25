"use client";
import axios from "axios";

import React, {  useState } from "react";
import {  useForm } from "react-hook-form";
import {  Address } from "viem";

import {  useWriteContract } from "wagmi";
import { abi } from "../../abi.json";




import { useWallet, WalletProvider } from "@/context/WagmiContext";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { TextScramble } from "@/components/ui/text-scramble";
import { LoaderFour } from "@/components/ui/loader";
import { useRouter } from "next/navigation";

export default function CreateNFTForm() {

  

  type formData = {
    headline: string;
    description: string;
    date: string;
    hashtag: string;
    image: FileList | null;
  };
  const { writeContractAsync } = useWriteContract();
  let ipfsURL;
  const form = useForm({
    defaultValues: {
      headline: "",
      description: "",
      date: "",
      hashtag: "",
      image: null,
    },
  });
  const router = useRouter();
  const goBack = () => {
    router.back();
  };


  const [isLoading, setIsLoading] = useState(false);
  const { address, isConnected, handleConnect, handleDisconnect } = useWallet();

  const onSubmit = async (data: formData) => {
    setIsLoading(false);
    try {
      const formData = new FormData();
      formData.append("headline", data.headline);
      formData.append("description", data.description);
      formData.append("date", data.date);
      formData.append("hashtag", data.hashtag);
      formData.append("address", address as Address);
     if (data.image && data.image.length > 0) {
       formData.append("image", data.image[0]);
     }
      const response = await axios.post(
        "https://go-w3insbackend.onrender.com/users/form-submit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success == true && isConnected == true) {
        
        setIsLoading(true);
       
        ipfsURL = response.data.ipfsURL;
        console.log("The ipfsURL is : ", ipfsURL);
        await writeContractAsync({
          address: "0x50970cc23f066E31453090b24CaA14Cf8DC34AC0",
          abi: abi,
          functionName: "mintWinNFT",
          args: [ipfsURL],
        });
        form.reset()
      }
      setIsLoading(false);
    } catch (error) {
      console.log("The error in submitting nft form is : ", error);
    }
  };
  const [isTrigger, setIsTrigger] = useState(Boolean);

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 backdrop-blur-xl"
      style={{
        backgroundImage: "url('bg-img.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col w-full max-w-4xl items-center justify-center gap-6 md:gap-12">
        <TextScramble
          className="font-mono mt-5 text-2xl sm:text-4xl md:text-6xl text-yellow-400 uppercase text-center"
          trigger={isTrigger}
          onHoverStart={() => setIsTrigger((prev) => !prev)}
          onHoverEnd={() => setIsTrigger(false)}
          onTap={() => setIsTrigger((prev) => !prev)}
        >
          Create Your NFT
        </TextScramble>
        <ButtonColorful onClick={goBack} label="Back to Home" />
        <div className="w-full bg-black/40 mb-5 rounded-2xl border p-6 sm:p-8 md:p-10 font-poppins flex flex-col items-center shadow-xl border-white/10">
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <label className="font-medium" style={{ color: "#C0B8AD" }}>
              Headline
            </label>
            <input
              type="text"
              {...form.register("headline")}
              placeholder="Enter headline"
              className="w-full rounded-lg px-4 py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{
                background: "#2C2C2C",
                border: "1px solid #3A3A3A",
                color: "#F5F5F5",
              }}
            />
            <label className="font-medium" style={{ color: "#C0B8AD" }}>
              Description
            </label>
            <textarea
              placeholder="Enter description"
              {...form.register("description")}
              className="w-full rounded-lg px-4 py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              rows={3}
              style={{
                background: "#2C2C2C",
                border: "1px solid #3A3A3A",
                color: "#F5F5F5",
              }}
            />
            <label className="font-medium" style={{ color: "#C0B8AD" }}>
              Upload Image
            </label>
            <input
              type="file"
              {...form.register("image")}
              className="w-full rounded-lg px-4 py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{
                background: "#2C2C2C",
                border: "1px solid #3A3A3A",
                color: "#F5F5F5",
              }}
            />
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex-1 flex flex-col">
                <label
                  className="font-medium mb-2"
                  style={{ color: "#C0B8AD" }}
                >
                  Date
                </label>
                <input
                  type="date"
                  {...form.register("date")}
                  className="w-full rounded-lg px-4 py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  style={{
                    background: "#2C2C2C",
                    border: "1px solid #3A3A3A",
                    color: "#F5F5F5",
                  }}
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label
                  className="font-medium mb-2"
                  style={{ color: "#C0B8AD" }}
                >
                  Hashtags
                </label>
                <input
                  type="text"
                  {...form.register("hashtag")}
                  placeholder="#hashtag1 #hashtag2"
                  className="w-full rounded-lg px-4 py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  style={{
                    background: "#2C2C2C",
                    border: "1px solid #3A3A3A",
                    color: "#F5F5F5",
                  }}
                />
              </div>
            </div>

            {isConnected ? (
              <button
                type="submit"
                className="mt-4 w-full px-6 py-3 cursor-pointer rounded-lg text-lg font-normal shadow transition-colors"
                style={{ background: "#C86B27", color: "#FFFFFF" }}
              >
                {isLoading ? <LoaderFour /> : "Submit"}
              </button>
            ) : (
              <div className="flex items-center justify-center mt-4">
                {!address ? (
                  <ButtonColorful
                    label="Connect Your Wallet"
                    className="h-10 text-lg"
                    onClick={handleConnect}
                  />
                ) : (
                  <ButtonColorful
                    label="Disconnect"
                    onClick={handleDisconnect}
                  />
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
