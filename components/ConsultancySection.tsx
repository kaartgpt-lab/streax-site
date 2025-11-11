"use client";
import { motion } from "framer-motion";

export default function ConsultancySection() {
  const deposits = [
    { icon: "₿", amount: "$10,598.38" },
    { icon: "⚡", amount: "$2,862.27" },
    { icon: "🪙", amount: "$3,379.63" },
    { icon: "💎", amount: "$15,037.04" },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-3xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center scroll-mt-24"
    >
      {/* Left Card */}
      <div className="bg-[#101322] rounded-2xl p-8 shadow-lg space-y-4">
        <h3 className="text-xl font-semibold text-gray-300">
          Average live deposits
        </h3>

        <div className="space-y-3">
          {deposits.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center bg-[#16192a] px-4 py-3 rounded-lg space-x-3"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-semibold text-gray-200">{item.amount}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-[#16192a] px-4 py-3 rounded-lg flex items-center space-x-3">
          <span className="text-gray-400 text-sm">🌐</span>
          <span className="font-semibold text-gray-200">$31,877.31</span>
        </div>

        <p className="text-xs text-gray-500 mt-4 leading-snug">
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

        <button className="mt-8 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold transition">
          Get in touch
        </button>
      </div>
    </motion.section>
  );
}
