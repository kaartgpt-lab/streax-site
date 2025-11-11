"use client";
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import {
  FaSearch,
  FaDice,
  FaMoneyBillWave,
  FaCoins,
  FaGem,
  FaTicketAlt,
  FaArrowRight,
} from "react-icons/fa";

const casinos = [
  {
    name: "Stake",
    year: 2017,
    icon: <FaDice size={28} className="text-pink-500" />,
  },
  {
    name: "Roobet",
    year: 2019,
    icon: <FaMoneyBillWave size={28} className="text-green-500" />,
  },
  {
    name: "FortuneJack",
    year: 2018,
    icon: <FaCoins size={28} className="text-yellow-400" />,
  },
  {
    name: "BitStarz",
    year: 2016,
    icon: <FaGem size={28} className="text-blue-400" />,
  },
  {
    name: "BC.Game",
    year: 2018,
    icon: <FaTicketAlt size={28} className="text-purple-500" />,
  },
  {
    name: "Duel",
    year: 2020,
    icon: <FaDice size={28} className="text-red-500" />,
  },
  {
    name: "Shuffle",
    year: 2019,
    icon: <FaCoins size={28} className="text-pink-400" />,
  },
  {
    name: "Rainbet",
    year: 2021,
    icon: <FaMoneyBillWave size={28} className="text-teal-400" />,
  },
  {
    name: "Gamdom",
    year: 2017,
    icon: <FaGem size={28} className="text-orange-400" />,
  },
];

export default function CasinoPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("directory");
  const [sortDesc, setSortDesc] = useState(true);

  const filteredCasinos = casinos
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortDesc ? b.year - a.year : a.year - b.year));

  return (
    <main className="bg-[#0C0F1A] min-h-screen">
      <section className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8 py-12">
        <SectionTitle
          title="CASINOS"
          subtitle="Top crypto casinos by deposit volume."
        />

        {/* View Toggle (Slider Style) */}
        <div className="flex items-center gap-3 mb-6 justify-center sm:justify-start">
          <div
            onClick={() =>
              setView(view === "directory" ? "table" : "directory")
            }
            className="relative w-36 h-8 bg-[#16192a] rounded-full cursor-pointer flex items-center transition"
          >
            <div
              className={`absolute w-1/2 h-8 bg-pink-600 rounded-full transition-all duration-300 ease-in-out ${
                view === "directory" ? "left-0" : "left-1/2"
              }`}
            />
            <span
              className={`w-1/2 text-xs font-medium text-center z-10 ${
                view === "directory" ? "text-white" : "text-gray-400"
              }`}
            >
              Directory
            </span>
            <span
              className={`w-1/2 text-xs font-medium text-center z-10 ${
                view === "table" ? "text-white" : "text-gray-400"
              }`}
            >
              Table
            </span>
          </div>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-8">
          <div className="relative flex items-center w-full md:w-1/2">
            <FaSearch className="absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search casinos"
              className="pl-9 pr-3 py-2 rounded-lg bg-[#16192a] text-white text-sm w-full focus:outline-none focus:ring-1 focus:ring-pink-600 placeholder-gray-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="bg-[#16192a] text-white rounded-lg px-3 py-2 w-full md:w-1/4 text-sm focus:outline-none focus:ring-1 focus:ring-pink-600"
            value={sortDesc ? "desc" : "asc"}
            onChange={(e) => setSortDesc(e.target.value === "desc")}
          >
            <option value="desc">Deposit Volume Desc</option>
            <option value="asc">Deposit Volume Asc</option>
          </select>
        </div>

        {/* Directory View */}
        {view === "directory" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {filteredCasinos.map((casino, idx) => (
              <div
                key={idx}
                className="bg-[#101322] border border-[#1e2138] rounded-2xl p-6 h-48 flex flex-col justify-between relative shadow-lg hover:shadow-pink-900/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-5 left-5">{casino.icon}</div>
                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <h4 className="text-white text-base font-semibold">
                      {casino.name}
                    </h4>
                    <p className="text-gray-400 text-xs">
                      Founded {casino.year}
                    </p>
                  </div>
                  <button className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full transition">
                    <FaArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {view === "table" && (
          <div className="flex flex-col gap-3 mt-6">
            {filteredCasinos.map((casino, idx) => (
              <div
                key={idx}
                className="bg-[#101322] border border-[#1f2238] rounded-3xl px-4 py-2 flex items-center justify-between hover:bg-[#171a2e] transition-all duration-200 shadow-sm hover:shadow-pink-900/10"
              >
                {/* Left: Icon + Name */}
                <div className="flex items-center gap-2 min-w-0">
                  <div className="shrink-0">{casino.icon}</div>
                  <div className="truncate">
                    <h4 className="text-white text-[13px] font-semibold leading-tight truncate">
                      {casino.name}
                    </h4>
                    <p className="text-gray-500 text-[11px] leading-tight">
                      Founded {casino.year}
                    </p>
                  </div>
                </div>

                {/* Right: Stats */}
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  <span className="text-pink-400 font-semibold whitespace-nowrap">
                    Rank #{idx + 1}
                  </span>
                  <span className="hidden sm:inline-block whitespace-nowrap">
                    ✔ Verified
                  </span>
                  <span className="hidden md:inline-block whitespace-nowrap">
                    🎰 Games
                  </span>
                  <span className="hidden lg:inline-block whitespace-nowrap">
                    💰 Volume
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
