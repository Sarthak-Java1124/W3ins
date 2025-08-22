"use client"
import React, { use, useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import { useAccount } from "wagmi";

import {Swiper , SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { cn } from "@/lib/utils";
import { lisk } from "viem/chains";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {EffectCoverflow , Pagination , Navigation} from "swiper/modules"

const Slider = dynamic(() => import("react-slick"), { ssr: false });

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CardCarousel } from "@/components/ui/card-carousel";
import CardComponent from "./ui/CardCaraousel";
import { it } from "node:test";
import { useWallet } from "@/context/WagmiContext";
import { LucideArrowBigLeft, LucideArrowBigRight } from "lucide-react";
import CaraouselNFT from "./Caraosusel";
import Modal from "./ShowModal";

export default function LandingPage() {
  type CardType = {
    Headline: string;
    Description: string;
    Date: string;
    Hashtag: string;
    IpfsUrl: string;
  }
  const fontFamilies = [
    "Poppins, sans-serif",
    "Satoshi, sans-serif",
    "monospace",
    "cursive",
    "serif",
    "Poppins, sans-serif"
  ];
  const [showModal , setShowModal] = useState(false)

  const handleShowModal = ()=>{
    setShowModal(!showModal)
  }
  const {address , isConnected} = useWallet();
  const [fontIndex, setFontIndex] = useState(0);
  const [cardData , setCardData] = useState<CardType[]>([])
   const settings = {
     dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: 1,
     slidesToScroll: 1,
   };
  React.useEffect(() => {
    const interval = setInterval(() => {
      setFontIndex((prev) => (prev + 1) % fontFamilies.length);
    }, 300);
    return () => clearInterval(interval);
  }, []);
  useEffect(()=>{
    const getData = async()=>{
      try {
        const response = await axios.get(`http://localhost:8080/users/get-form-data/${address}`);
        if(response.data.success==true){
         setCardData(response.data.cardData);


          console.log("The response data is " , response.data.cardData);
        }

      } catch (error) {
        console.log("The error in fetching the data is  :"  , error);

      }
    }
    getData()
    
  },[address] )
  // Prepare images array from cardData
   
    return (
      <div
        className="min-h-screen w-full"
        style={{
          backgroundImage: "url('/bg-img.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <section className="w-full h-full flex items-start justify-start pt-16 ">
          <div className="ml-10 font-poppins text-white flex flex-row items-center justify-between w-full">
            <div className="flex flex-col">
              <h2 className="text-8xl font-normal leading-tight">
                Have a W ?<br />
                <span className="font-normal">
                  let's{" "}
                  <motion.span
                    className="italic"
                    animate={{
                      color: [
                        "#facc15", // yellow-400
                        "#f472b6", // pink-400
                        "#60a5fa", // blue-400
                        "#34d399", // green-400
                        "#facc15", // yellow-400
                      ],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.3,
                      ease: "linear",
                    }}
                    style={{ fontFamily: fontFamilies[fontIndex] }}
                  >
                    monetize
                  </motion.span>{" "}
                  it
                </span>
              </h2>
              <a
                href="/create-nft-form"
                className="mt-8 rounded-xl bg-transparent border-2 border-white text-white font-poppins text-2xl font-normal shadow hover:bg-white hover:text-blue-700 transition-colors flex items-center justify-center"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  width: "180px",
                  height: "56px",
                  minWidth: "180px",
                  maxWidth: "180px",
                }}
              >
                Create{" "}
                <span
                  className="italic text-yellow-400"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  NFT
                </span>
              </a>
            </div>
            <img
              src="/nftMint.gif"
              alt="NFT gif"
              className="w-96 h-96 object-contain mr-8"
            />
          </div>
        </section>
        {isConnected ? (
          <motion.h1 className="flex items-center justify-center text-yellow-50 text-[80px] mt-40 mb-[-6]">
            Your{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="mx-6 italic text-yellow-500"
            >
              {" "}
              Minted{" "}
            </motion.span>{" "}
            NFTs
          </motion.h1>
        ) : (
          <motion.h1 className="flex items-center justify-center text-yellow-50 text-[80px] mt-40 mb-[-6]">
            Please{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="mx-6 italic text-yellow-500"
            >
              {" "}
              Connect{" "}
            </motion.span>{" "}
            Wallet
          </motion.h1>
        )}

        <div className=" flex items-center justify-between mt-10  h-[100%] w-[52%] mx-auto p-10   ">
          {/* <Slider
            {...settings}
            className=" flex items-center justify-center mx-4 my-2"
          >
            {isConnected &&
              cardData.map((items, idx) => (
                <div key={idx}>
                  <CardComponent
                    imgSrc={items.IpfsUrl}
                    title={items.Headline}
                    description={items.Description}
                    date={items.Date}
                  />
                </div>
              ))}
          </Slider> */}
          {/* <LucideArrowBigRight color="yellow" size={60}></LucideArrowBigRight>
          {isConnected &&
            cardData.map((items, idx) => (
              <div key={idx}>
                <CardComponent
                  imgSrc={items.IpfsUrl}
                  title={items.Headline}
                  description={items.Description}
                  date={items.Date}
                />
              </div>
            ))}
          <LucideArrowBigLeft color="yellow" size={60}></LucideArrowBigLeft> */}
          <Swiper
            className="mx-auto"
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={1}
            spaceBetween={20} // gap between slides
            // how many slides you want visible
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }} // number of slides visible at once (change for responsive)
          >
            
              
            
            
            {isConnected &&
              cardData.map((items, idx) => (
                <SwiperSlide key={idx}>
                  <CardComponent
                    imgSrc={items.IpfsUrl}
                    title={items.Headline}
                    description={items.Description}
                    date={items.Date}
                    hashtag={items.Hashtag}
                    
                    handleShowModal={handleShowModal}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    );
  
}
