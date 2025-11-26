"use client";
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { FaSearch, FaArrowRight, FaCheck, FaTimes } from "react-icons/fa";
import Link from "next/link";
import casinoData from "@/data/casinos.json";

type Casino = {
  name: string;
  year: number;
  rank: number;
  icon?: string;
  image: string;
  amlPolicy: boolean;
  wagerRequirements: boolean;
  idOnSignup: boolean;
  detailsOnSignup: boolean;
  jurisdictionDisclosure: boolean;
  geoBlockingEnforcement: boolean;
};

const casinos: Casino[] = casinoData as Casino[];

export default function CasinoPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"directory" | "table">("directory");
  const [sortDesc, setSortDesc] = useState(true);

  const filteredCasinos = casinos
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortDesc ? b.year - a.year : a.year - b.year));

  return (
    <main className="pt-10 bg-[#0b0d17] min-h-screen">
      <section className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8 py-12">
        <SectionTitle
          title="CASINOS"
          subtitle="Top crypto casinos by deposit volume."
        />

        {/* View Toggle */}
        <div className="flex items-center gap-3 mb-6 justify-center sm:justify-start">
          <div
            onClick={() =>
              setView(view === "directory" ? "table" : "directory")
            }
            className="relative w-40 h-9 bg-[#101322] rounded-full cursor-pointer flex items-center border border-[#262a43] transition"
          >
            {/* slider */}
            <div
              className={`absolute w-1/2 h-[calc(100%-6px)] top-[3px] bg-[#16192a] rounded-full border border-[#363b5c] transition-all duration-300 ${
                view === "directory" ? "left-[3px]" : "left-[calc(50%+3px)]"
              }`}
            />

            {/* labels */}
            <span
              className={`w-1/2 text-xs font-medium text-center z-10 ${
                view === "directory" ? "text-white" : "text-gray-500"
              }`}
            >
              Directory
            </span>

            <span
              className={`w-1/2 text-xs font-medium text-center z-10 ${
                view === "table" ? "text-white" : "text-gray-500"
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
              className="pl-9 pr-3 py-2 rounded-3xl bg-[#16192a] text-white text-sm w-full focus:outline-none focus:ring-1 focus:ring-pink-500 placeholder-gray-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="bg-[#16192a] text-white rounded-lg px-3 py-2 w-full md:w-1/4 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
            value={sortDesc ? "desc" : "asc"}
            onChange={(e) => setSortDesc(e.target.value === "desc")}
          >
            <option value="desc">Deposit Volume Desc</option>
            <option value="asc">Deposit Volume Asc</option>
          </select>
        </div>

        {/* Directory View (unchanged except your last tweaks) */}
        {view === "directory" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {filteredCasinos.map((casino) => (
              <Link
                key={casino.name}
                href={`/casino/${casino.name.toLowerCase()}`}
                className="bg-[#101322] border border-[#1e2138] rounded-2xl p-5 h-56 
                  flex flex-col justify-end relative shadow-lg hover:shadow-indigo-900/20 
                  transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-[0.12] bg-cover bg-center"
                  style={{ backgroundImage: `url(${casino.image})` }}
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#0c0f1a] opacity-60" />
                <div className="absolute top-4 left-4 z-10">
                  <img
                    src={casino.image}
                    alt={`${casino.name} logo`}
                    className="h-7 w-7 rounded-full object-contain"
                  />
                </div>

                <div className="relative z-10 mt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-white text-xs font-semibold truncate">
                      {casino.name}
                    </p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#262a43] text-gray-300 whitespace-nowrap">
                      {casino.year}
                    </span>
                  </div>

                  <div className="h-px bg-[#1e2138]" />

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-300">
                      Rank #{casino.rank}
                    </span>
                    <button className="h-8 w-8 flex items-center justify-center rounded-full border border-[#262a43] hover:bg-[#16192a] transition">
                      <FaArrowRight size={12} className="text-gray-200" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Table View – compact with no rank */}
        {view === "table" && (
          <div className="mt-6 space-y-1.5">
            {/* Header row */}
            <div className="grid grid-cols-7 items-center text-[9px] uppercase tracking-wide text-gray-500 px-2">
              <span className="text-left">Casino</span>
              <span className="text-center">AML Policy</span>
              <span className="text-center">Wager Req.</span>
              <span className="text-center">ID on Sign-up</span>
              <span className="text-center">Details on Sign-up</span>
              <span className="text-center">Jurisdiction</span>
              <span className="text-center">Geo-blocking</span>
            </div>

            {/* Rows */}
            {filteredCasinos.map((casino) => (
              <div
                key={casino.name}
                className="bg-[#101322] border border-[#1f2238] rounded-2xl px-2 py-1.5 grid grid-cols-7 items-center gap-1.5 hover:bg-[#171a2e] transition-all duration-150"
              >
                {/* Casino cell */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <img
                    src={casino.image}
                    alt={`${casino.name} logo`}
                    className="h-4 w-4 rounded-full object-contain shrink-0"
                  />
                  <p className="text-white text-[10px] font-semibold truncate">
                    {casino.name}
                  </p>
                </div>

                {/* Boolean cells */}
                <BooleanCell value={casino.amlPolicy} />
                <BooleanCell value={casino.wagerRequirements} />
                <BooleanCell value={casino.idOnSignup} />
                <BooleanCell value={casino.detailsOnSignup} />
                <BooleanCell value={casino.jurisdictionDisclosure} />
                <BooleanCell value={casino.geoBlockingEnforcement} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/** Small, centered yes/no cell with tick or cross */
function BooleanCell({ value }: { value: boolean }) {
  return (
    <div className="flex items-center justify-center">
      {value ? (
        <FaCheck className="text-[11px] text-emerald-400" />
      ) : (
        <FaTimes className="text-[11px] text-red-400" />
      )}
    </div>
  );
}
