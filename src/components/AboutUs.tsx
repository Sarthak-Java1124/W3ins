"use client";
import React from "react";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="w-full flex justify-center items-center py-24 px-4 bg-black/70 backdrop-blur-xl"
      style={{ backgroundImage: "url('/bg-img.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="w-full max-w-6xl mx-auto font-poppins" style={{}}>
        <h2 className="text-6xl md:text-7xl font-normal mb-6 text-center" style={{ color: '#F5F5F5', letterSpacing: '0.02em' }}>
          About <span className="italic text-yellow-400">W3ins</span>
        </h2>
        <p className="text-lg md:text-xl text-[#C0B8AD] text-center mb-8 leading-relaxed">
          <span className="text-[#FF8C42] font-semibold">W3ins</span> is a unique platform that lets you <span className="text-yellow-400 italic">mint your life’s wins as NFTs</span>—from the smallest victories to the biggest milestones. We believe every achievement deserves to be celebrated, remembered, and shared. Whether you aced an exam, landed your dream job, or simply conquered a personal challenge, W3ins gives you a way to immortalize your <span className="text-yellow-400">W</span> on the blockchain.
        </p>
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-2 text-[#F5F5F5]">Why Mint Your Win?</h3>
            <ul className="list-disc list-inside text-[#C0B8AD] text-base md:text-lg space-y-2">
              <li><span className="text-yellow-400">Celebrate</span> your achievements in a new, digital way.</li>
              <li><span className="text-yellow-400">Share</span> your story and inspire others in the community.</li>
              <li><span className="text-yellow-400">Own</span> a permanent, verifiable record of your success.</li>
              <li><span className="text-yellow-400">Monetize</span> your journey—turn your wins into collectibles or rewards.</li>
            </ul>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-yellow-400 via-[#FF8C42] to-pink-400 flex items-center justify-center mb-4 shadow-lg animate-pulse">
              <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="30" stroke="#fff" strokeWidth="4" fill="#1A1A1A" />
                <text x="50%" y="54%" textAnchor="middle" fill="#FF8C42" fontSize="2.5rem" fontWeight="bold" fontFamily="Poppins, sans-serif">W</text>
              </svg>
            </div>
            <span className="text-[#C0B8AD] text-base md:text-lg text-center">Your win, your NFT. Forever on-chain.</span>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-[#C0B8AD] text-base md:text-lg">
            <span className="text-yellow-400">Ready to celebrate your next win?</span> Mint your story, inspire the world, and join a movement where every <span className="text-yellow-400">W</span> matters.
          </p>
        </div>
      </div>
    </section>
  );
}
