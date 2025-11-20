"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function PlatformToolsSection() {
  const [activeTab, setActiveTab] = useState("Creators");

  const tabs = [
    {
      name: "Audits",
      title: "CASINO AUDIT VERIFICATION",
      desc: "Discover the integrity of crypto casinos through transparent audits conducted by Tanzanite, ensuring fair play and trust across the iGaming ecosystem.",
      button: "View Audits",
      image: "/globe.svg",
    },
    {
      name: "Creators",
      title: "STREAMER DEAL TRANSPARENCY",
      desc: "Check out creators who’ve verified the details of their casino deals through Tanzanite and compare their latest Kick stream analytics easily.",
      button: "View Creators",
      image: "/window.svg",
    },
    {
      name: "Analytics",
      title: "CASINO PERFORMANCE ANALYTICS",
      desc: "Access in-depth casino performance metrics and gain insights into market trends to make better data-driven decisions.",
      button: "View Analytics",
      image: "/next.svg",
    },
  ];

  const current = tabs.find((t) => t.name === activeTab)!;

  return (
    <section className="bg-[#0a0d1a] text-white py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
          OUR PLATFORM TOOLS
        </h2>
        <p className="text-gray-400 mb-8 text-sm md:text-base">
          Explore Tanzanite&apos;s expanding suite of tools designed for the
          entire crypto casino ecosystem.
        </p>

        {/* Tabs */}
        <div className="relative flex justify-center mb-12">
          <div className="relative bg-[#171A23] border border-gray-700 rounded-full flex space-x-2 p-1">
            <motion.div
              layout
              className="absolute inset-y-0 my-1 border border-gray-600 bg-[#2A2D3A] rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                width:
                  activeTab === "Audits"
                    ? "33%"
                    : activeTab === "Creators"
                    ? "33%"
                    : "33%",
                translateX:
                  activeTab === "Audits"
                    ? "0%"
                    : activeTab === "Creators"
                    ? "100%"
                    : "200%",
              }}
            />

            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`relative z-10 px-5 py-2 rounded-full font-medium text-xs flex text-center justify-center transition ${
                  activeTab === tab.name ? "text-white" : "text-gray-400"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row bg-[#131624] rounded-2xl overflow-hidden shadow-lg">
          <div className="w-full md:w-1/2 p-8 text-left flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-3">{current.title}</h3>
                <p className="text-gray-400 mb-6 text-sm md:text-base">
                  {current.desc}
                </p>
                <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded-full w-fit transition text-sm">
                  {current.button}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full md:w-1/2 relative h-80 md:h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover rounded-r-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
