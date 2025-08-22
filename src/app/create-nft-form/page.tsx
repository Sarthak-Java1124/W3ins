"use client";
import axios, { AxiosResponse } from "axios";
import { image } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Abi, Address } from "viem";
import { writeContract } from "viem/actions";
import { useAccount, useConnect, useReconnect, useWriteContract } from "wagmi";
import {abi} from "../../abi.json"
import { config } from "process";
import { wagmiConfig } from "@/lib/wagmiConfig";
import Providers from "../providers";
import { MorphingText } from "@/components/ui/morphing-text";
import { useWallet, WalletProvider } from "@/context/WagmiContext";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { TextScramble } from "@/components/ui/text-scramble";
import { LoaderFour } from "@/components/ui/loader";
import { useRouter } from "next/navigation";

export default function CreateNFTForm() {
  const texts = [
    "Create NFT",
    "Celebrate Wins",
    "Showcase Wins"
  ]
  const [response , setResponse] = useState([{}]);

    

    type formData = {
        headline: string;
        description: string;
        date: string;
        hashtag: string;
        image  : FileList;
        

    }
    const {writeContractAsync } = useWriteContract();
let ipfsURL ;
    const form = useForm({
        defaultValues : {
            headline : "",
            description : "",
            date : "",
            hashtag : "",
            image : undefined as any,
            

        }

    });
    const router = useRouter()
    const goBack = ()=>{
       router.back()
    }
    
    const { isPending , isSuccess } = useConnect();
    const [isLoading , setIsLoading] = useState(false)
      const {address , isConnected , handleConnect , handleDisconnect } = useWallet();

    const onSubmit = async(data : formData)=>{
      setIsLoading(false);
        try {
          const formData = new FormData();
          formData.append("headline" , data.headline);
          formData.append("description", data.description);
          formData.append("date" , data.date);
          formData.append("hashtag", data.hashtag);
          formData.append("address" , address as Address)
formData.append("image", data.image[0]);

            const response = await axios.post("http://localhost:8080/users/form-submit" , formData , {
              headers : {
                "Content-Type" : "multipart/form-data"
              }
            });
          
            if(response.data.success==true && isConnected==true){
              setResponse(response.data)
              setIsLoading(true)
                alert("Form is submitted succesfully");
                            ipfsURL = response.data.ipfsURL;
                            console.log("The ipfsURL is : " , ipfsURL);
                           await writeContractAsync( {
                            
                             address:
                               "0x50970cc23f066E31453090b24CaA14Cf8DC34AC0",
                             abi: abi,
                             functionName: "mintWinNFT",
                             args: [ipfsURL],
                           });

                
            }
            setIsLoading(false)




        }catch (error){
         console.log("The error in submitting nft form is : " , error);
        }
    }
    const [isTrigger , setIsTrigger]  = useState(Boolean)
      
     
  return (
    <>
      <section
        className="min-h-screen w-full flex items-center justify-center backdrop-blur-xl "
        style={{
          backgroundImage: "url('bg-img.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col w-full max-w-4xl items-center justify-center gap-0 md:gap-12">
          {/* Left: Create NFT Text */}
          {/* <div className="flex-1 flex-col items-center md:items-start justify-center">
            <h2
              className="text-5xl md:text-6xl font-bold font-poppins text-white select-none mb-4 text-left"
              style={{
                letterSpacing: "0.04em",
              }}
            >
              Create <span className="italic text-yellow-400">NFT</span>
            </h2>
          </div> */}
          {/* <MorphingText texts={texts} className="mt-5 mb-[-60] " />; */}
          <TextScramble
            className="font-mono mt-5 text-7xl text-yellow-400 uppercase"
            trigger={isTrigger}
            onHoverStart={() => setIsTrigger((prev) => !prev)} // toggle instead of always true
            onHoverEnd={() => setIsTrigger(false)}
            onTap={() => setIsTrigger((prev) => !prev)}
          >
            Create Your NFT
          </TextScramble>
          {/* <div className="font-poppins">
            {!address ? (
              <>
                {!isPending && !isSuccess && (
                  <ButtonColorful
                    label="Connect"
                    className="h-10 text-xl"
                    onClick={handleConnect}
                  />
                )}
                {isPending && !isSuccess && (
                  <ButtonColorful label="Connecting" />
                )}
              </>
            ) : (
              <ButtonColorful label="Disconnect" onClick={handleDisconnect} />
            )}
          </div> */}
          {/* Right: NFT Form */}
          <ButtonColorful onClick={goBack} label="Back to Home"/>
          <div
            className="  bg-black/40 rounded-3xl border p-8 md:p-10 font-poppins relative flex flex-col items-center justify-between background-blur-md shadow-xl mt-[-20] border-white/10 "
            style={{}}
          >
            <form
              className="w-full flex flex-col gap-4 "
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <label className="font-medium" style={{ color: "#C0B8AD" }}>
                Headline
              </label>
              <input
                type="text"
                {...form.register("headline")}
                placeholder="Enter headline"
                className="rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
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
                placeholder="Enter headline"
                className="rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{
                  background: "#2C2C2C",
                  border: "1px solid #3A3A3A",
                  color: "#F5F5F5",
                }}
              />

              <div className="flex justify-between items-center">
                <div className="flex flex-col mr-3">
                  <label
                    className="font-medium m-2"
                    style={{ color: "#C0B8AD" }}
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    {...form.register("date")}
                    className="rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    style={{
                      background: "#2C2C2C",
                      border: "1px solid #3A3A3A",
                      color: "#F5F5F5",
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="font-medium m-2"
                    style={{ color: "#C0B8AD" }}
                  >
                    Hashtags
                  </label>
                  <input
                    type="text"
                    {...form.register("hashtag")}
                    placeholder="#hashtag1 #hashtag2"
                    className="rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                  className="mt-4 px-6 py-3 rounded-lg text-lg font-normal shadow transition-colors"
                  style={{ background: "#C86B27", color: "#FFFFFF" }}
                >
                  {isLoading ? (<LoaderFour />
) : "Submit"}
                </button>
              ) : (
                <div className="font-poppins flex items-center justify-center mt-2">
                  {!address ? (
                    <>
                      {!isPending && !isSuccess && (
                        <ButtonColorful
                          label="Connect Your Wallet "
                          className="h-10 text-xl"
                          onClick={handleConnect}
                        />
                      )}
                      {isPending && !isSuccess && (
                        <ButtonColorful label="Connecting" />
                      )}
                    </>
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
    </>
  );
}
