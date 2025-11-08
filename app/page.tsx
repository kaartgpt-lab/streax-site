"use client";

import React, { JSX } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaDiscord } from "react-icons/fa";

interface Deposit {
  icon: string;
  amount: string;
}

interface Testimonial {
  text: string;
  author: string;
  role: string;
}

export default function Page(): JSX.Element {
  const deposits: Deposit[] = [
    { icon: "₿", amount: "$10,598.38" },
    { icon: "⚡", amount: "$2,862.27" },
    { icon: "🪙", amount: "$3,379.63" },
    { icon: "💎", amount: "$15,037.04" },
  ];

  const testimonials: Testimonial[] = [
    {
      text: "Steax has raised the standards in iGaming space, bringing more transparency to users.",
      author: "Tim Heath",
      role: "Founder of yolo.com",
    },
    {
      text: "Big shoutout to Steax, analysing & comparing global platforms by metrics and responsibility.",
      author: "Eddie",
      role: "Co-founder of Stake",
    },
    {
      text: "This team stands out with creativity and innovation, proving great people create great products.",
      author: "Jolie",
      role: "Marketing Lead at BC Game",
    },
  ];

  // Reusable animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <main className="bg-[#0a0d1a] text-white font-sans overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 py-24 bg-gradient-to-b from-indigo-900/10 via-purple-800/5 to-[#0C0F1A]"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase leading-tight">
          Creating the
          <br />
          <span className="text-white">Streax Standard</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl">
          Brought to you with over{" "}
          <span className="font-semibold text-white">10 years</span> of
          experience in the crypto iGaming industry.
        </p>
      </motion.section>

      {/* 2nd section */}
      <section className="bg-[#0C0F1A] text-white py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Header */}
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            OUR PLATFORM TOOLS
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Explore Tanzanite&apos;s expanding suite of tools designed for the
            entire crypto casino ecosystem.
          </p>

          {/* Tabs */}
          <div className="flex justify-center gap-6 mb-16">
            {["Audits", "Creators", "Analytics"].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 rounded-full font-semibold text-base ${
                  tab === "Creators"
                    ? "bg-[#2A2D3A] text-white"
                    : "bg-[#171A23] text-gray-400 hover:text-white"
                } transition`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Streamer transparency card */}
          <div className="flex flex-col md:flex-row bg-[#131624] rounded-2xl overflow-hidden shadow-lg">
            {/* Left text content */}
            <div className="w-full md:w-1/2 p-10 text-left flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-4">
                STREAMER DEAL TRANSPARENCY
              </h3>
              <p className="text-gray-400 mb-8">
                Check out creators who&apos;ve verified the details of their
                casino deals through Tanzanite and easily compare their latest
                Kick stream analytics.
              </p>
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full w-fit transition">
                View more
              </button>
            </div>

            {/* Right image or preview */}
            <div className="w-full md:w-1/2 relative h-96">
              <Image
                src="/vercel.svg"
                alt="Streamer dashboard preview"
                fill
                className="object-cover rounded-r-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Consultancy Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center scroll-mt-24"
      >
        <div className="bg-[#101322] rounded-2xl p-8 shadow-lg space-y-4">
          <h3 className="text-xl font-semibold text-gray-300">
            Average live deposits
          </h3>
          <div className="space-y-3">
            {deposits.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-[#16192a] px-4 py-3 rounded-lg"
              >
                <span>{item.icon}</span>
                <span className="font-semibold">{item.amount}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#16192a] px-4 py-3 rounded-lg flex justify-between items-center">
            <span className="text-gray-400">All networks</span>
            <span className="font-semibold">$31,877.31</span>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Figures are based on average deposit volume from the top 10 crypto
            casinos in the past month.
          </p>
        </div>

        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight">
            Innovative
            <br /> Value Driven
            <br /> Consultancy
          </h2>
          <p className="mt-6 text-gray-400 max-w-md">
            We offer consultancy services in the crypto iGaming industry to set
            the Steax standard for all crypto casinos and ensure the best
            experience for users.
          </p>
          <button className="mt-8 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold transition">
            Get in touch
          </button>
        </div>
      </motion.section>

      {/* Trusted Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="bg-[#0c0f1d] py-20 text-center px-6 scroll-mt-24"
      >
        <p className="text-gray-400 max-w-3xl mx-auto mb-12">
          We started Steax to establish a new standard for the casino industry
          by conducting thorough audits and ensuring compliance, security,
          support and safe gambling practices.
        </p>
        <h3 className="text-4xl font-extrabold uppercase mb-12">Trusted By</h3>

        {/* Brand Logos */}
        <div className="flex justify-center gap-8 mb-16 flex-wrap opacity-90">
          {["Stake", "BC", "Block", "Rollbit", "Yolo"].map((name) => (
            <div
              key={name}
              className="w-16 h-16 rounded-full bg-[#1a1e2f] flex items-center justify-center text-gray-400 font-semibold"
            >
              {name[0]}
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className={`rounded-2xl p-6 bg-[#131624] border ${
                idx === 1
                  ? "border-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.4)]"
                  : "border-transparent"
              }`}
            >
              <p className="text-gray-300 mb-4">{item.text}</p>
              <p className="font-semibold">{item.author}</p>
              <p className="text-gray-500 text-sm">{item.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* News Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24"
      >
        <h2 className="text-5xl font-extrabold uppercase mb-6">News</h2>
        <p className="text-gray-400 mb-8">
          Gain access to exclusive data-driven insights.
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-10">
          <input
            type="email"
            placeholder="Your email address"
            className="px-4 py-3 rounded-lg bg-[#16192a] border border-gray-700 w-72 focus:outline-none"
          />
          <button className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg font-semibold transition">
            Subscribe
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-[#101322] rounded-2xl overflow-hidden shadow-lg p-6"
            >
              <div className="bg-[#16192a] h-32 rounded-xl mb-4 flex items-center justify-center text-pink-400 font-bold text-xl">
                iGaming Weekly
              </div>
              <p className="text-gray-300 font-semibold mb-2">
                iGaming <span className="text-pink-500">Weekly</span>
              </p>
              <p className="text-gray-500 text-sm mb-4">03 Nov 2025</p>
              <p className="text-gray-400 text-sm">
                Dive into this week’s iGaming recap, with new partnerships,
                games, and more.
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA + Supporters */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="py-20 px-6 bg-[#0c0f1d] text-center scroll-mt-24"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold uppercase mb-6">
          Your Edge in iGaming Starts Here
        </h2>
        <p className="text-gray-400 mb-8">
          Gain access to exclusive data-driven insights.
        </p>
        <button className="flex items-center justify-center gap-2 mx-auto bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-full font-semibold text-white mb-16 transition">
          <FaDiscord size={20} /> Join our Discord
        </button>

        <h3 className="text-3xl font-extrabold uppercase mb-4">Supporters</h3>
        <p className="text-gray-500 max-w-2xl mx-auto mb-8">
          We remain an independent authority — our supporters do not influence
          our scoring or verification process.
        </p>
        <div className="flex justify-center gap-6 opacity-90">
          {["Stake", "Yolo"].map((name) => (
            <div
              key={name}
              className="bg-[#16192a] rounded-xl px-6 py-4 font-bold text-lg text-gray-200"
            >
              {name}
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
