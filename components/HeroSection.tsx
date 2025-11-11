"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 py-24 bg-gradient-to-b from-indigo-900/10 via-purple-800/5 to-[#0C0F1A]"
    >
      <h1 className="text-3xl md:text-5xl font-extrabold uppercase leading-tight">
        Creating the
        <br />
        <span className="text-white">Streax Standard</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl">
        Brought to you with over{" "}
        <span className="font-semibold text-white">10 years</span> of experience
        in the crypto iGaming industry.
      </p>
    </motion.section>
  );
}
