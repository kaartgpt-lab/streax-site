"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function NewsSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null); // ✅ Typed ref
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1);

  const newsItems = [
    {
      title: "iGaming Weekly",
      subtitle: "iGaming Weekly",
      date: "03 Nov 2025",
      description:
        "Dive into this week’s iGaming recap, with new partnerships, games, and more.",
    },
    {
      title: "Blockchain Updates",
      subtitle: "Crypto Insights",
      date: "01 Nov 2025",
      description:
        "Latest updates in blockchain gaming and crypto integration for casinos.",
    },
    {
      title: "Game Releases",
      subtitle: "New Launches",
      date: "30 Oct 2025",
      description:
        "Explore the newest iGaming titles and exciting gameplay features this month.",
    },
    {
      title: "Market Trends",
      subtitle: "Industry Analysis",
      date: "28 Oct 2025",
      description:
        "Data-driven insights into iGaming player behavior and revenue growth trends.",
    },
    {
      title: "Security Insights",
      subtitle: "Crypto Security",
      date: "25 Oct 2025",
      description:
        "Best practices for secure transactions and fraud prevention in crypto gaming.",
    },
    {
      title: "Events & Webinars",
      subtitle: "Upcoming Events",
      date: "20 Oct 2025",
      description:
        "Join upcoming webinars and events focused on iGaming innovations.",
    },
  ];

  // ✅ Update active index on scroll
  const handleScroll = () => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const card = scrollRef.current.children[0] as HTMLElement;
      const cardWidth = card.offsetWidth + 16; // card + gap
      const newIndex = Math.round(scrollRef.current.scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    }
  };

  // ✅ Update container width for indicator bar
  useEffect(() => {
    if (scrollRef.current) {
      setContainerWidth(
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      );
    }
  }, []);

  // ✅ Calculate progress for sliding bar
  const progress = containerWidth
    ? ((scrollRef.current?.scrollLeft ?? 0) / containerWidth) * 100
    : 0;

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="py-16 px-4 max-w-4xl mx-auto scroll-mt-24"
    >
      <h2 className="text-4xl font-extrabold uppercase mb-4">News</h2>
      <p className="text-gray-400 mb-6 text-sm">
        Gain access to exclusive data-driven insights.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <input
          type="email"
          placeholder="Your email address"
          className="px-3 py-2 rounded-lg bg-[#16192a] border border-gray-700 w-64 focus:outline-none text-sm"
        />
        <button className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg font-semibold text-sm transition">
          Subscribe
        </button>
      </div>

      {/* ✅ Scrollable News Cards */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto no-scrollbar gap-4 scroll-smooth pb-4"
        >
          {newsItems.map((news, idx) => (
            <motion.div
              key={idx}
              className="bg-[#101322] rounded-2xl shadow-lg min-w-[280px] max-w-[280px] flex-shrink-0 p-4"
            >
              <div className="bg-[#16192a] h-24 rounded-xl mb-3 flex items-center justify-center text-pink-400 font-bold text-lg">
                {news.title}
              </div>
              <p className="text-gray-300 font-semibold mb-1 text-sm">
                {news.subtitle.includes("Weekly") ? (
                  <>
                    iGaming <span className="text-pink-500">Weekly</span>
                  </>
                ) : (
                  news.subtitle
                )}
              </p>
              <p className="text-gray-500 text-xs mb-2">{news.date}</p>
              <p className="text-gray-400 text-xs">{news.description}</p>
            </motion.div>
          ))}
        </div>

        {/* ✅ Single Sliding Indicator */}
        <div className="h-1 bg-gray-700 rounded-full mt-2 w-full relative">
          <motion.div
            className="h-1 bg-pink-600 rounded-full absolute left-0 top-0"
            style={{
              width: `${100 / newsItems.length}%`,
              translateX: `${progress}%`,
            }}
          />
        </div>
      </div>
    </motion.section>
  );
}
