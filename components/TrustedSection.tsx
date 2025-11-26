"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, UserCircle2, RotateCw } from "lucide-react";

export default function ReviewsSection() {
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
      role: "Head of Product, ChainPlay",
      text: "From risk to rewards, everything was mapped clearly. Our team finally had a roadmap we could trust and execute.",
    },
    {
      id: 7,
      name: "Ava Thompson",
      role: "Founder, BitPlay",
      text: "Steax helped us redefine our user engagement strategy. Their consultancy has been game-changing for our crypto casino.",
    },
    {
      id: 8,
      name: "Liam Carter",
      role: "CTO, CoinBet",
      text: "Professional, data-driven, and creative. The team’s innovative mindset made our integration process smooth and efficient.",
    },
    {
      id: 9,
      name: "Sophia Lee",
      role: "Marketing Head, BlockSpin",
      text: "Their insights on player retention in blockchain gaming are unmatched. Highly recommend Steax for long-term growth.",
    },
    {
      id: 10,
      name: "Noah Patel",
      role: "CEO, CryptoFun",
      text: "Reliable and transparent. Their consultancy services have added immense value to our product roadmap.",
    },
  ];

  const scrollToReview = (index: number) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const child = container.children[index] as HTMLDivElement | undefined;
    if (!child) return;

    const childCenter = child.offsetLeft + child.offsetWidth / 2;
    const scrollLeft = childCenter - container.clientWidth / 2;

    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    setActiveIndex(index);
  };

  const spinCards = () => {
    if (reviews.length <= 1) return;
    let randomIndex = activeIndex;
    while (randomIndex === activeIndex) {
      randomIndex = Math.floor(Math.random() * reviews.length);
    }
    scrollToReview(randomIndex);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const center = container.scrollLeft + container.clientWidth / 2;
    const children = Array.from(container.children) as HTMLDivElement[];

    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, idx) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  };

  return (
    <section className="relative max-w-4xl mx-auto px-6 py-20 text-center">
      {/* Bottom background image */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center z-0">
        <img
          src="/globe.svg"
          alt=""
          className="w-64 md:w-72 lg:w-86 opacity-40"
        />
      </div>
      <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base leading-relaxed mb-6">
        We started Tanzanite to establish a new standard for the casino industry
        by conducting thorough audits and ensuring compliance, security, support
        and safe gambling practices.
      </p>

      <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-10">
        Trusted by
      </h2>

      {/* Top Icons */}
      <div className="flex justify-center mb-5 gap-3">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToReview(idx)}
            className={`w-9 h-9 rounded-full transition flex items-center justify-center text-xs
              ${
                activeIndex === idx
                  ? "bg-pink-600 text-white"
                  : "bg-[#0a0d1a] text-gray-300 hover:bg-pink-600 hover:text-white"
              }`}
          >
            <UserCircle2 size={18} />
          </button>
        ))}
      </div>

      {/* Left Fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-48 bg-linear-to-r from-[#0a0d1a] via-[#0a0d1a]/60 to-transparent z-10" />

      {/* Right Fade */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-48 bg-linear-to-l from-[#0a0d1a] via-[#0a0d1a]/60 to-transparent z-10" />

      {/* Cards */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar space-x-5
            relative justify-start py-6"
      >
        {reviews.map((review, idx) => (
          <motion.div
            key={review.id}
            className={`snap-center shrink-0 rounded-3xl px-5 py-5 w-84 md:w-82 h-[210px]
              flex flex-col justify-between text-left relative transition-all duration-300 backdrop-blur-md bg-[#050816]/50
              ${
                activeIndex === idx
                  ? " border border-pink-500 scale-95 z-10"
                  : " border border-gray-800 opacity-70 scale-95"
              }`}
            whileHover={{
              scale: activeIndex === idx ? 1.0 : 1.0,
            }}
          >
            {/* Arrow under active card */}
            {activeIndex === idx && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#15182a] border border-pink-500" />
            )}

            <div className="flex gap-1 mb-2 text-pink-500">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
            </div>

            <p className="text-gray-300 leading-relaxed mb-4 text-xs md:text-sm">
              {review.text}
            </p>

            <div className="flex items-center gap-3">
              <UserCircle2
                className={`${
                  activeIndex === idx ? "text-pink-500" : "text-gray-400"
                }`}
                size={28}
              />
              <div>
                <h4 className="font-semibold text-gray-200 text-sm">
                  {review.name}
                </h4>
                <p className="text-gray-500 text-[11px]">{review.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SPIN BUTTON */}
      <div className="flex justify-center mt-8">
        <button
          onClick={spinCards}
          className="bg-[#141827] border border-gray-600 cursor-pointer
          text-gray-300 px-4 py-1 rounded-full flex items-center gap-2 transition font-semibold text-xs"
        >
          <RotateCw size={12} />
          Spin
        </button>
      </div>
    </section>
  );
}
