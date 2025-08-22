"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideArrowBigRight, LucideArrowBigLeft } from "lucide-react";
import CardComponent from "./ui/CardCaraousel";

interface CardItem {
  IpfsUrl: string;
  Headline: string;
  Description: string;
  Date: string;
}

export default function CaraouselNFT({
  cardData,
  isConnected,
}: {
  cardData: CardItem[];
  isConnected: boolean;
}) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % cardData.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + cardData.length) % cardData.length);

  return (
    <div className="relative w-full max-w-3xl mx-auto flex items-center justify-center">
      {/* Left Arrow */}
      <button onClick={prev} className="absolute left-2 z-10">
        <LucideArrowBigLeft color="yellow" size={60} />
      </button>

      {/* Slides */}
      <div className="overflow-hidden w-full flex items-center justify-center">
        {isConnected && (
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="w-full flex items-center justify-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <CardComponent
                imgSrc={cardData[index].IpfsUrl}
                title={cardData[index].Headline}
                description={cardData[index].Description}
                date={cardData[index].Date}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Right Arrow */}
      <button onClick={next} className="absolute right-2 z-10">
        <LucideArrowBigRight color="yellow" size={60} />
      </button>
    </div>
  );
}
