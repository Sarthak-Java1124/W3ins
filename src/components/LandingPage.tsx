"use client";
import React, { use, useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";



import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";




import CardComponent from "./ui/CardCaraousel";

import { useWallet } from "@/context/WagmiContext";


export default function LandingPage() {
  type CardType = {
    Headline: string;
    Description: string;
    Date: string;
    Hashtag: string;
    IpfsUrl: string;
  };
  const fontFamilies = [
    "Poppins, sans-serif",
    "Satoshi, sans-serif",
    "monospace",
    "cursive",
    "serif",
    "Poppins, sans-serif",
  ];
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  const { address, isConnected } = useWallet();
  const [fontIndex, setFontIndex] = useState(0);
  const [cardData, setCardData] = useState<CardType[]>([]);
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
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://go-w3insbackend.onrender.com/users/get-form-data/${address}`
        );
        if (response.data.success == true) {
          setCardData(response.data.cardData);

          console.log("The response data is ", response.data.cardData);
        }
      } catch (error) {
        console.log("The error in fetching the data is  :", error);
      }
    };
    getData();
  }, [address]);
  // Prepare images array from cardData

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: "url('/bg-img.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Hero Section */}
      <section className="w-full flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 pt-20">
        {/* Left Side Text */}
        <div className="text-white flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal leading-tight">
            Have a W ? <br />
            <span className="font-normal">
              let’s{" "}
              <motion.span
                className="italic"
                animate={{
                  color: [
                    "#facc15",
                    "#f472b6",
                    "#60a5fa",
                    "#34d399",
                    "#facc15",
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
            className="mt-6 sm:mt-8 rounded-xl border-2 border-white text-white text-lg sm:text-2xl font-normal px-3 py-3 sm:w-[180px] w-full max-w-[200px] shadow hover:bg-white hover:text-blue-700 transition-colors"
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

        {/* Right Side Image */}
        <img
          src="/nftMint.gif"
          alt="NFT gif"
          className="w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 object-contain mb-8 md:mb-0"
        />
      </section>

      {/* Section Heading */}
      <motion.h1 className="flex flex-col sm:flex-row items-center justify-center text-yellow-50 text-3xl sm:text-5xl md:text-7xl mt-20 px-4 text-center">
        {isConnected ? (
          <>
            Your{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className=" italic text-yellow-500 mx-5"
            >
              {"  "}Minted
            </motion.span>
            NFTs
          </>
        ) : (
          <>
            Please{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="mx-2 italic text-yellow-500"
            >
              Connect
            </motion.span>{" "}
            Wallet
          </>
        )}
      </motion.h1>

      {/* Carousel Section */}
      <div className="w-full max-w-[1200px] mx-auto mt-10 px-4">
        <Swiper
          className="mx-auto"
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 }, // mobile
            768: { slidesPerView: 2 }, // tablet
            1024: { slidesPerView: 3 }, // desktop
          }}
          spaceBetween={20}
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
          }}
        >
          {isConnected &&
            cardData?.map((items, idx) => (
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
