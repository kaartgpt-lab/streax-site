"use client";
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import {
  ExternalLink,
  User,
  Star,
  Heart,
  Activity,
  CheckCircle,
  Users,
  Gamepad2,
} from "lucide-react";

export default function CreatorsPage() {
  const [activeTab, setActiveTab] = useState("creators");
  const [searchTerm, setSearchTerm] = useState("");

  const liveCreators = [
    { name: "NSBrooklyn", viewers: "58", platform: "BlockBet", icon: User },
    { name: "Trainwreckstv", viewers: "22,714", platform: "Stake", icon: Star },
    { name: "zEkO", viewers: "2,330", platform: "Stake", icon: Heart },
    { name: "Xposed", viewers: "1,919", platform: "Roobet", icon: Activity },
    { name: "GrayGray", viewers: "386", platform: "Shuffle", icon: Star },
    { name: "bennymac", viewers: "271", platform: "Stake", icon: User },
  ];

  const creatorsList = [
    {
      id: 1,
      name: "szymool",
      level: "Level 2",
      casino: "Stake",
      followers: "171,443",
    },
    {
      id: 2,
      name: "Syztmz",
      level: "Level 2",
      casino: "Stake",
      followers: "92,206",
    },
    {
      id: 3,
      name: "WatchGamesTV",
      level: "Level 2",
      casino: "Gamdom",
      followers: "53,221",
    },
    {
      id: 4,
      name: "BlondeRabbit",
      level: "Level 2",
      casino: "Stake",
      followers: "34,274",
    },
  ];

  const streamersList = [
    {
      id: 1,
      name: "Trainwreckstv",
      level: "Pro Streamer",
      casino: "Stake",
      followers: "22,714",
    },
    {
      id: 2,
      name: "Xposed",
      level: "Verified Streamer",
      casino: "Roobet",
      followers: "1,919",
    },
    {
      id: 3,
      name: "GrayGray",
      level: "Partner Streamer",
      casino: "Shuffle",
      followers: "386",
    },
  ];

  const activeList = activeTab === "creators" ? creatorsList : streamersList;

  return (
    <main className="text-white min-h-screen flex flex-col items-center">
      {/* Transparency Section */}
      <section className="pt-10 text-center">
        <SectionTitle
          title="Creator Transparency"
          subtitle="A list of creators who have enrolled in Tanzanite’s transparency program"
        />
      </section>

      {/* Live Now Section */}
      <section className="mt-16 w-full max-w-4xl px-6 relative">
        <div className="flex justify-center items-center gap-2 mb-6">
          <h2 className="text-2xl font-semibold text-white">LIVE NOW</h2>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar">
            {liveCreators.map((creator, index) => {
              const Icon = creator.icon;
              return (
                <div
                  key={index}
                  className="bg-[#141627] rounded-2xl p-5 min-w-[16.666%] flex-shrink-0 shadow-md hover:shadow-lg transition flex flex-col items-center"
                >
                  <div className="flex justify-center mb-4 text-gray-400">
                    <Icon size={60} />
                  </div>
                  <p className="text-xs text-gray-400 mb-1">
                    🔴 {creator.viewers} viewers
                  </p>
                  <h3 className="text-sm font-semibold">{creator.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-400">
                      {creator.platform}
                    </span>
                  </div>
                  <button className="mt-4 w-full bg-[#1c1f35] hover:bg-[#242947] text-xs font-medium py-2 rounded-lg flex items-center justify-center gap-1">
                    View Profile <ExternalLink size={12} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#0b0c1a]"></div>
        </div>

        <div className="h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-transparent mt-6"></div>
      </section>

      {/* CREATORS / STREAMERS TABLE SECTION */}
      <section className="mt-20 w-full max-w-4xl px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Overview</h2>

        {/* Toggle + Search Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          {/* Sliding Toggle */}
          <div className="relative">
            <div className="bg-[#1c1f35] rounded-full p-1 flex w-56 relative">
              <div
                className={`absolute top-0 left-1 h-7 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-pink-500 to-purple-600 transition-transform duration-300 ${
                  activeTab === "streamers"
                    ? "translate-x-[100%]"
                    : "translate-x-0"
                }`}
              ></div>
              <button
                onClick={() => setActiveTab("creators")}
                className={`z-10 flex-1 text-sm font-medium rounded-full transition-colors ${
                  activeTab === "creators" ? "text-white" : "text-gray-400"
                }`}
              >
                Creators
              </button>
              <button
                onClick={() => setActiveTab("streamers")}
                className={`z-10 flex-1 text-sm font-medium rounded-full transition-colors ${
                  activeTab === "streamers" ? "text-white" : "text-gray-400"
                }`}
              >
                Streamers
              </button>
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300 text-sm border-collapse">
            <thead className="border border-gray-700 text-gray-400 text-xs uppercase">
              <tr>
                <th className="py-3 px-4 font-medium">#</th>
                <th className="py-3 px-4 font-medium">
                  <span className="inline-flex items-center gap-1">
                    <User size={14} /> Creator
                  </span>
                </th>
                <th className="py-3 px-4 font-medium">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle size={14} /> Verification
                  </span>
                </th>
                <th className="py-3 px-4 font-medium">
                  <span className="inline-flex items-center gap-1">
                    <Gamepad2 size={14} /> Casino
                  </span>
                </th>
                <th className="py-3 px-4 font-medium">
                  <span className="inline-flex items-center gap-1">
                    <Users size={14} /> Followers
                  </span>
                </th>
                <th className="py-3 px-4 font-medium">
                  <span className="inline-flex items-center gap-1">
                    <ExternalLink size={14} /> Profile
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {activeList
                .filter((creator) =>
                  creator.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((creator) => (
                  <tr
                    key={creator.id}
                    className="border border-gray-800 hover:bg-[#141627] transition"
                  >
                    <td className="py-2 px-4 text-xs">{creator.id}</td>
                    <td className="py-2 px-4 font-medium text-xs">
                      {creator.name}
                    </td>
                    <td className="py-2 px-4 text-xs text-gray-400">
                      {creator.level}
                    </td>
                    <td className="py-2 px-4 text-xs text-gray-400">
                      {creator.casino}
                    </td>
                    <td className="py-2 px-4 text-xs text-gray-400">
                      {creator.followers}
                    </td>
                    <td className="py-2 px-4">
                      <button className="text-xs bg-[#1c1f35] hover:bg-[#242947] py-1 px-3 rounded-lg flex items-center gap-1">
                        View <ExternalLink size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* THE TANZANITE STANDARD SECTION */}
      <section className="mt-32 w-full max-w-4xl mx-auto px-6 py-16 border border-gray-800 rounded-2xl bg-[#101422] flex flex-col md:flex-row items-center gap-10">
        {/* Left content */}
        <div className="flex-1 text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            THE STREAX STANDARD
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-md">
            Are you an influencer and do you value transparency for your
            viewers? Apply today and become a part of the Tanzanite Standard.
          </p>
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-white hover:opacity-90 transition">
            JOIN
          </button>
        </div>

        {/* Right icon / image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-pink-500/30 to-purple-600/30 rounded-full"></div>
            <div className="relative bg-[#141627] p-8 rounded-full shadow-lg border border-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3l2.25 6.75H21l-5.25 3.75 2.25 6.75L12 16.5 6.75 20.25l2.25-6.75L3 9.75h6.75L12 3z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="mt-32 w-full max-w-2xl px-6 text-white border border-gray-800 rounded-2xl bg-[#0C0F1A] mx-auto py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center tracking-wide">
          Frequently Asked Questions
        </h2>

        <div className="divide-y divide-gray-800">
          {[
            {
              q: "How are deals verified?",
              a: (
                <>
                  <p className="text-sm text-gray-400 mb-4">
                    Tanzanite verifies deals to ensure that the system is
                    accurate and transparent without exposing confidential
                    details. Each verification level includes the criteria from
                    the level below it.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Level 0:</span>{" "}
                      The deal has not been verified by Tanzanite.
                    </li>
                    <li>
                      <span className="font-semibold text-green-400">
                        Level 1:
                      </span>{" "}
                      Deal details confirmed by the creator and the casino.
                    </li>
                    <li>
                      <span className="font-semibold text-yellow-400">
                        Level 2:
                      </span>{" "}
                      Tanzanite has verified the terms of the deal.
                    </li>
                    <li>
                      <span className="font-semibold text-purple-400">
                        Level 3:
                      </span>{" "}
                      Advanced verification (coming soon).
                    </li>
                  </ul>
                </>
              ),
            },
            {
              q: "What type of insight is given within a deal?",
              a: "Creators may share insights like deal value, terms, and verification level — allowing transparent understanding of creator partnerships.",
            },
            {
              q: "How can I trust the information is legit?",
              a: "All verified data is submitted directly by creators and confirmed through Tanzanite’s multi-step verification.",
            },
            {
              q: "How can I get verified?",
              a: "Sign in to Tanzanite, complete your creator profile, and apply for verification. Our team assigns levels after reviewing your submission.",
            },
            {
              q: "How can I dispute a creator’s deal terms?",
              a: "Disputes can be raised through Tanzanite’s verification support portal. Reports are manually reviewed to ensure fairness and accuracy.",
            },
          ].map((item, index) => (
            <details key={index} className="group py-6 transition-all">
              <summary className="flex justify-between items-center cursor-pointer text-base md:text-lg font-medium text-gray-200">
                {item.q}
                <span className="transition-transform duration-300 group-open:rotate-45 text-gray-400">
                  +
                </span>
              </summary>
              <div className="mt-3 text-gray-400 leading-relaxed text-sm">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
