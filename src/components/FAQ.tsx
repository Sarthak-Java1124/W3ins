"use client";
import React, { useState } from "react";

const faqs = [
	{
		question: "What is W3ins?",
		answer:
			"W3ins is a platform where you can mint your personal wins—big or small—as NFTs, creating a permanent, shareable record of your achievements on the blockchain.",
	},
	{
		question: "How do I mint my win as an NFT?",
		answer:
			"Simply click the 'Create NFT' button, fill out the form with your win's details, and submit. Your win will be immortalized as a unique NFT!",
	},
	{
		question: "What kind of wins can I mint?",
		answer:
			"Any win that matters to you! From acing an exam to landing a job, or even personal milestones—if it’s a W in your life, it deserves to be celebrated.",
	},
	{
		question: "Can I monetize my win?",
		answer:
			"Yes! You can choose to keep your NFT as a personal collectible or list it for sale to inspire and connect with others.",
	},
	{
		question: "Is my data secure?",
		answer:
			"Absolutely. Your win is minted on the blockchain, ensuring transparency, security, and true ownership.",
	},
];

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<section
			id="faq"
			className="w-full flex justify-center items-center py-24 px-4 bg-black/70 backdrop-blur-xl"
			style={{
				backgroundImage: "url('/bg-img.png')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="w-full max-w-4xl mx-auto font-poppins">
				<h2
					className="text-6xl md:text-7xl font-normal mb-8 text-center"
					style={{ color: "#F5F5F5", letterSpacing: "0.02em" }}
				>
					Frequently Asked{" "}
					<span className="italic text-yellow-400">Questions</span>
				</h2>
				<div className="divide-y divide-[#3A3A3A]">
					{faqs.map((faq, idx) => (
						<div key={idx}>
							<button
								className="w-full flex justify-between items-center py-5 text-left focus:outline-none"
								onClick={() =>
									setOpenIndex(openIndex === idx ? null : idx)
								}
							>
								<span
									className="text-lg md:text-xl font-medium"
									style={{ color: "#C0B8AD" }}
								>
									{faq.question}
								</span>
								<span className="ml-4 text-yellow-400 text-2xl font-bold select-none">
									{openIndex === idx ? "-" : "+"}
								</span>
							</button>
							{openIndex === idx && (
								<div className="py-2 px-2 text-[#F5F5F5] text-base md:text-lg animate-fade-in">
									{faq.answer}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
