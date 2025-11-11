"use client";
import { motion } from "framer-motion";
import { FaDiscord } from "react-icons/fa";

export default function FooterSection() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-[#0a0d1a] text-center scroll-mt-24"
    >
      {/* CTA Section */}
      <div className="py-20 px-6 max-w-3xl mx-auto">
        <div className="bg-[#1a1d2d] py-12 px-6 rounded-2xl mb-12 flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-4 leading-tight text-center">
            Your Edge in iGaming Starts Here
          </h2>
          <p className="text-gray-400 mb-8 text-sm md:text-base text-center max-w-md">
            Gain access to exclusive data-driven insights.
          </p>
          <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-full font-semibold text-white text-sm md:text-base transition">
            <FaDiscord size={20} /> Join our Discord
          </button>
        </div>

        {/* Supporters Section */}
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold uppercase mb-3">
            Supporters
          </h3>
          <p className="text-gray-500 max-w-xl mx-auto mb-8 text-sm md:text-base">
            We remain an independent authority — our supporters do not influence
            our scoring or verification process.
          </p>

          <div className="flex justify-center flex-wrap gap-5 opacity-90">
            {["Stake", "Yolo", "Rollbit", "Gamdom"].map((name) => (
              <div
                key={name}
                className="bg-[#16192a] rounded-xl px-6 py-3 font-bold text-lg text-gray-200 transition hover:bg-[#1f2233] shadow-md"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10 py-6 mt-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-zinc-400 gap-3 text-center md:text-left">
          <span>© {new Date().getFullYear()} Tanzanite – Next App</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
