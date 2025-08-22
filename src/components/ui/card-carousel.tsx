"use client";
import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardCarouselProps {
  images: { src: string; alt?: string; headline?: string; description?: string; hashtags?: string; date?: string }[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({
  images,
  autoplayDelay = 0,
  showPagination = true,
  showNavigation = true,
}) => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoplayDelay > 0) {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, autoplayDelay);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [current, autoplayDelay, images.length]);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setCurrent((prev) => (prev + 1) % images.length);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="w-full flex items-center justify-center overflow-hidden rounded-xl">
        {showNavigation && (
          <button
            className="absolute left-2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-2"
            onClick={prev}
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
        )}
        <div className="relative w-full flex flex-col items-center justify-center rounded-3xl shadow-2xl border-4 border-transparent bg-gradient-to-br from-white/10 via-yellow-200/10 to-yellow-400/10 backdrop-blur-lg p-1 group/card transition-all duration-500 hover:scale-105 hover:shadow-yellow-400/40 hover:border-yellow-400/80">
          {/* Animated border gradient */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none z-0 animate-border-glow" style={{background: 'linear-gradient(120deg, #facc15 0%, #f472b6 50%, #60a5fa 100%)', opacity: 0.25}} />
          {/* Card content */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl shadow-xl z-10">
            <img
              src={images[current].src}
              alt={images[current].alt || `Image ${current + 1}`}
              className="w-full max-h-72 object-cover rounded-2xl shadow-lg drop-shadow-xl transition-all duration-500 group-hover/card:scale-105"
              style={{boxShadow: '0 8px 32px 0 rgba(250,204,21,0.25), 0 1.5px 8px 0 rgba(96,165,250,0.10)'}}
            />
            {(images[current].headline || images[current].description) && (
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-start bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-2xl z-20">
                {images[current].headline && (
                  <h3 className="text-2xl font-extrabold mb-1 text-yellow-300 drop-shadow-lg tracking-tight animate-fade-in-up">
                    {images[current].headline}
                  </h3>
                )}
                {images[current].description && (
                  <p className="text-base mb-2 text-white/90 font-medium animate-fade-in-up delay-100">
                    {images[current].description}
                  </p>
                )}
                <div className="flex flex-row flex-wrap gap-2 mt-1">
                  {images[current].hashtags && (
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-400/80 text-black font-semibold shadow-md animate-fade-in-up delay-200">
                      {images[current].hashtags}
                    </span>
                  )}
                  {images[current].date && (
                    <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-yellow-200 font-semibold animate-fade-in-up delay-300">
                      {images[current].date}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {showNavigation && (
          <button
            className="absolute right-2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-2"
            onClick={next}
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>
      {showPagination && (
        <div className="flex justify-center mt-4 gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === current ? "bg-yellow-400" : "bg-gray-400/40"}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
