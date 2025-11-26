"use client";
import { motion } from "framer-motion";

export default function ConsultancySection() {
  const deposits = [
    { icon: " ₿ ", amount: "$10,598.38" },
    { icon: "⚡", amount: "$2,862.27" },
    { icon: "🪙", amount: "$3,379.63" },
    { icon: "💎", amount: "$15,037.04" },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-2xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center scroll-mt-24"
    >
      {/* Left Card */}
      <div className="bg-[#101322] rounded-lg p-4 shadow-lg space-y-3 border border-[#1e2236]">
        <h3 className="text-lg font-semibold text-gray-300">
          Average live deposits
        </h3>

        <div className="space-y-2">
          {deposits.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center bg-[#16192a] px-3 py-2 rounded-xl space-x-2 border border-[#1f2335]"
            >
              <span className="text-base">{item.icon}</span>
              <span className="font-medium text-gray-200 text-sm">
                {item.amount}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-[#16192a] px-3 py-2 rounded-md flex items-center space-x-2 border border-[#1f2335]">
          <span className="text-gray-400 text-xs">🌐</span>
          <span className="font-medium text-gray-200 text-sm">$31,877.31</span>
        </div>

        <p className="text-[10px] text-gray-500 mt-3 leading-snug">
          Figures are based on average deposit volume from the top 10 crypto
          casinos in the past month.
        </p>
      </div>

      {/* Right Text */}
      <div className="max-w-sm">
        <h2 className="text-4xl md:text-5xl font-extrabold uppercase leading-[1.05] tracking-tight">
          Innovative
          <br /> Value Driven
          <br /> Consultancy
        </h2>

        <p className="mt-5 text-gray-400 text-sm leading-snug tracking-tight">
          We offer consultancy services in the crypto iGaming industry to set
          the Steax standard for all crypto casinos and ensure the best
          experience for users.
        </p>

        <button className="mt-8 bg-linear-to-r from-pink-600 to-pink-400 hover:from-pink-700 hover:to-pink-500 text-white px-6 py-3 rounded-full font-semibold transition">
          Get in touch
        </button>
      </div>
    </motion.section>
  );
}
