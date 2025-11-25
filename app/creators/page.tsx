"use client";
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { ExternalLink, User } from "lucide-react";
import CreatorsFaq from "@/components/CreatorsFAQ";
import creatorsData from "@/data/creators.json";
import Link from "next/link";

type Creator = {
  id: number;
  name: string;
  avatar: string;
  casino: string;
  followers: string;
  verification: string;
  isCreator: boolean;
  isStreamer: boolean;
  live?: boolean;
  liveViewers?: string;
  livePlatform?: string;
};

const creators: Creator[] = creatorsData as Creator[];

export default function CreatorsPage() {
  const [activeTab, setActiveTab] = useState<"creators" | "streamers">(
    "creators"
  );
  const [searchTerm, setSearchTerm] = useState("");

  // pulled from JSON instead of hardcoded arrays
  const liveCreators = creators.filter((c) => c.live);
  const creatorsList = creators.filter((c) => c.isCreator);
  const streamersList = creators.filter((c) => c.isStreamer);

  const activeList = activeTab === "creators" ? creatorsList : streamersList;

  return (
    <main className="pt-12 text-white min-h-screen flex flex-col items-center">
      {/* Transparency Section */}
      <section className="pt-12 text-center">
        <SectionTitle
          title="Creator Transparency"
          subtitle="A list of creators who have enrolled in Tanzanite’s transparency program"
        />
      </section>

      {/* Live Now Section */}
      <section className="mt-10 w-full max-w-4xl px-6 relative">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-3xl font-semibold text-white">LIVE NOW</h2>
          <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar">
            {liveCreators.map((creator) => (
              <div
                key={creator.id}
                className="bg-[#141627] rounded-2xl p-5 min-w-[16.666%] flex-shrink-0 shadow-md hover:shadow-lg transition flex flex-col items-center"
              >
                {/* avatar instead of icon */}
                <div className="flex justify-center mb-4">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="h-14 w-14 rounded-full object-cover border border-[#262a43]"
                  />
                </div>
                <p className="text-xs px-2 py-1 mb-4 rounded-full bg-gray-700 text-gray-200 mb-1">
                  🔴 {creator.liveViewers} viewers
                </p>
                <p className="text-xs font-semibold">{creator.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">
                    {creator.livePlatform}
                  </span>
                </div>
                <div className="flex justify-center">
                  <Link
                    href={`/creators/${creator.name
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "")}`}
                    className="h-6 px-2 text-[9px] rounded-lg border border-[#262a43] 
               hover:bg-[#1c1f35] flex items-center gap-1 text-gray-300"
                  >
                    View <ExternalLink size={9} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#0b0c1a]"></div>
        </div>

        <div className="h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-transparent mt-6"></div>
      </section>

      {/* Table Section – Casino-style grid rows */}
      <section className="mt-20 w-full max-w-4xl px-6">
        <h2 className="text-3xl font-bold mb-6">Overview</h2>

        {/* Toggle + Search Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          {/* Toggle – Casino Style */}
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div
              onClick={() =>
                setActiveTab(
                  activeTab === "creators" ? "streamers" : "creators"
                )
              }
              className="relative w-40 h-9 bg-[#101322] rounded-full cursor-pointer flex items-center border border-[#262a43] transition"
            >
              {/* slider */}
              <div
                className={`absolute w-1/2 h-[calc(100%-6px)] top-[3px] bg-[#16192a] 
                  rounded-full border border-[#363b5c] transition-all duration-300 
        ${activeTab === "creators" ? "left-[3px]" : "left-[calc(50%+3px)]"}`}
              />

              {/* labels */}
              <span
                className={`w-1/2 text-xs font-medium text-center z-10 ${
                  activeTab === "creators" ? "text-white" : "text-gray-500"
                }`}
              >
                Creators
              </span>

              <span
                className={`w-1/2 text-xs font-medium text-center z-10 ${
                  activeTab === "streamers" ? "text-white" : "text-gray-500"
                }`}
              >
                Streamers
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1c1f35] text-gray-300 text-sm py-2 pl-10 pr-3 rounded-full placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-2.5 h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
              />
            </svg>
          </div>
        </div>

        {/* Compact Grid Table */}
        <div className="mt-6 space-y-1.5">
          {/* Header */}
          <div className="grid grid-cols-5 items-center text-[10px] uppercase tracking-wide text-gray-500 px-2">
            <span className="text-left flex items-center gap-1">
              <span className="mr-3">#</span>
              <User size={12} /> Creator
            </span>
            <span className="text-center">Verification</span>
            <span className="text-center">Casino</span>
            <span className="text-center">Followers</span>
            <span className="text-center">Profile</span>
          </div>

          {/* Rows */}
          {activeList
            .filter((c) =>
              c.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((creator, index) => (
              <div
                key={creator.id ?? creator.name}
                className="bg-[#101322] border border-[#1f2238] rounded-xl px-3 py-1 
                   grid grid-cols-5 items-center gap-0 hover:bg-[#171a2e] 
                   transition-all duration-150"
              >
                {/* Index + Creator + Avatar in one cell */}
                <div className="flex items-center gap-1 truncate">
                  <span className="text-[9px] mr-3 text-gray-500">
                    {index + 1}
                  </span>
                  <img
                    src={creator.avatar}
                    className="h-4 w-4 rounded-full object-cover shrink-0"
                    alt={creator.name}
                  />
                  <span className="text-[9px] text-white font-semibold truncate">
                    {creator.name}
                  </span>
                </div>

                {/* Verification */}
                <span className="text-[9px] text-gray-400 text-center">
                  {creator.verification}
                </span>

                {/* Casino */}
                <span className="text-[9px] text-gray-400 text-center">
                  {creator.casino}
                </span>

                {/* Followers */}
                <span className="text-[9px] text-gray-400 text-center">
                  {creator.followers}
                </span>

                {/* Profile Button */}
                <div className="flex justify-center">
                  <Link
                    href={`/creators/${creator.name
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "")}`}
                    className="h-6 px-2 text-[9px] rounded-lg border border-[#262a43] 
                       hover:bg-[#1c1f35] flex items-center gap-1 text-gray-300"
                  >
                    View <ExternalLink size={9} />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* THE STREAX STANDARD SECTION */}
      <section
        className="mt-20 w-full max-w-3xl mx-auto px-6 py-12 border border-gray-800 rounded-2xl bg-[#101422] 
                    flex flex-col md:flex-row items-center justify-center gap-6"
      >
        {/* Left content */}
        <div className="flex-1 text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            THE STREAX STANDARD
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-sm">
            Are you an influencer and do you value transparency for your
            viewers? Apply today and become a part of the Tanzanite Standard.
          </p>
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-white hover:opacity-90 transition">
            JOIN
          </button>
        </div>

        {/* Right icon / image */}
        <div className="flex-1 flex justify-center md:justify-center">
          <div className="relative flex items-center justify-center">
            {/* soft glow only */}
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full" />
            {/* globe, no border/shadow */}
            <img
              src="/globe.svg"
              alt="Streax"
              className="relative w-58 h-58 opacity-95"
            />
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <CreatorsFaq />
    </main>
  );
}
