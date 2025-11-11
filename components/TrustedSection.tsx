"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, UserCircle2 } from "lucide-react";

export default function ReviewsSection() {
  // ✅ Properly type the scroll ref
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Ava Thompson",
      role: "Founder, BitPlay",
      text: "Steax helped us redefine our user engagement strategy. Their consultancy has been game-changing for our crypto casino.",
    },
    {
      id: 2,
      name: "Liam Carter",
      role: "CTO, CoinBet",
      text: "Professional, data-driven, and creative. The team’s innovative mindset made our integration process smooth and efficient.",
    },
    {
      id: 3,
      name: "Sophia Lee",
      role: "Marketing Head, BlockSpin",
      text: "Their insights on player retention in blockchain gaming are unmatched. Highly recommend Steax for long-term growth.",
    },
    {
      id: 4,
      name: "Noah Patel",
      role: "CEO, CryptoFun",
      text: "Reliable and transparent. Their consultancy services have added immense value to our product roadmap.",
    },
    {
      id: 5,
      name: "Olivia Smith",
      role: "Operations Lead, GameVerse",
      text: "The strategic clarity they provided reshaped our marketing and user acquisition channels effectively.",
    },
    {
      id: 6,
      name: "Ethan Walker",
      role: "Product Lead, MetaWin",
      text: "Collaborating with Steax felt like adding an internal think tank. Excellent technical and business understanding.",
    },
    {
      id: 7,
      name: "Emma Johnson",
      role: "Community Manager, BetBlock",
      text: "They understand crypto gaming culture like no one else. Our players instantly noticed the quality uplift.",
    },
  ];

  const scrollToReview = (index: number) => {
    if (scrollRef.current) {
      const scrollAmount = index * scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const newIndex = Math.round(
        scrollRef.current.scrollLeft / scrollRef.current.clientWidth
      );
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="relative max-w-4xl mx-auto px-6 py-20 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-12">
        Client <span className="text-pink-600">Reviews</span>
      </h2>

      {/* Top Icon Navigator */}
      <div className="flex justify-center mb-8 gap-4">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToReview(idx)}
            className={`w-10 h-10 rounded-full transition flex items-center justify-center ${
              activeIndex === idx
                ? "bg-pink-600 text-white"
                : "bg-[#0a0d1a] text-gray-300 hover:bg-pink-600 hover:text-white"
            }`}
          >
            <UserCircle2 size={20} />
          </button>
        ))}
      </div>

      {/* Fade Edges */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#0a0d1a] via-[#0c0f1d]/80 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#0a0d1a] via-[#0c0f1d]/80 to-transparent pointer-events-none z-10" />

      {/* Scrollable Reviews */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth no-scrollbar space-x-6 relative"
      >
        {reviews.map((review, idx) => (
          <motion.div
            key={review.id}
            className={`snap-center shrink-0 rounded-2xl p-8 w-full md:w-[500px] flex flex-col justify-between text-left relative transition-all duration-300
              ${
                activeIndex === idx
                  ? "bg-[#15182a] border-2 border-pink-600 shadow-lg"
                  : "bg-[#101322] border border-transparent"
              }`}
            whileHover={{ scale: 1.03 }}
          >
            {/* Active Arrow */}
            {activeIndex === idx && (
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-pink-600" />
            )}

            <div className="flex gap-1 mb-3 text-pink-500">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
            </div>

            <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
              {review.text}
            </p>

            <div className="flex items-center gap-3">
              <UserCircle2
                className={`${
                  activeIndex === idx ? "text-pink-600" : "text-gray-400"
                }`}
                size={36}
              />
              <div>
                <h4 className="font-semibold text-gray-200">{review.name}</h4>
                <p className="text-gray-500 text-sm">{review.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
