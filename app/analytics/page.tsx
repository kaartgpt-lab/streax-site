"use client";

import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { ChevronDown } from "lucide-react";

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("Year");

  // Mock monthly casino data
  const data = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        month: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ][i],
        Stake: 1500 - i * 50 + Math.random() * 80,
        Roobet: 500 + i * 20 + Math.random() * 50,
        Shuffle: 200 + Math.random() * 50,
        Gamdom: 150 + Math.random() * 30,
        Rollbit: 100 + Math.random() * 20,
        "Yolo.com": 120 + Math.random() * 25,
        "Whale.io": 90 + Math.random() * 15,
      })),
    []
  );

  // NEW: Mock market breakdown of casinos
  const casinoMarket = [
    {
      casino: "Stake",
      marketShare: "34.2%",
      depositVolume: "$1.42B",
      deposits: "2.4M",
      newDepositors: "84,120",
    },
    {
      casino: "Roobet",
      marketShare: "19.5%",
      depositVolume: "$810M",
      deposits: "1.3M",
      newDepositors: "52,340",
    },
    {
      casino: "Shuffle",
      marketShare: "11.3%",
      depositVolume: "$470M",
      deposits: "720K",
      newDepositors: "31,220",
    },
    {
      casino: "Gamdom",
      marketShare: "9.8%",
      depositVolume: "$390M",
      deposits: "610K",
      newDepositors: "24,980",
    },
    {
      casino: "Rollbit",
      marketShare: "8.1%",
      depositVolume: "$320M",
      deposits: "520K",
      newDepositors: "20,410",
    },
    {
      casino: "Yolo.com",
      marketShare: "9.0%",
      depositVolume: "$350M",
      deposits: "540K",
      newDepositors: "22,030",
    },
    {
      casino: "Whale.io",
      marketShare: "8.1%",
      depositVolume: "$310M",
      deposits: "500K",
      newDepositors: "19,870",
    },
  ];

  // Mock crypto-based data
  const cryptoDeposits = [
    { currency: "BTC", deposits: "$1.25B", change: "+3.2%" },
    { currency: "ETH", deposits: "$870M", change: "+1.7%" },
    { currency: "USDT", deposits: "$540M", change: "-0.6%" },
    { currency: "SOL", deposits: "$410M", change: "+5.4%" },
    { currency: "TRX", deposits: "$230M", change: "+2.3%" },
  ];

  const cryptoUsers = [
    { currency: "BTC", users: "132,000", txs: "1.4M", growth: "+2.1%" },
    { currency: "ETH", users: "98,500", txs: "1.1M", growth: "+1.5%" },
    { currency: "USDT", users: "72,400", txs: "890K", growth: "-0.8%" },
    { currency: "SOL", users: "64,900", txs: "765K", growth: "+4.0%" },
    { currency: "TRX", users: "51,200", txs: "650K", growth: "+3.2%" },
  ];

  return (
    <main className="min-h-screen bg-[#0b0d17] text-white px-6 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide mb-4">
          ANALYTICS
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          A public analytics dashboard for comparing casinos across networks
        </p>
        <p className="text-xs text-gray-600 mt-1">
          Last updated: <span className="text-gray-400">29m ago</span>
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
        <button className="bg-[#141627] border border-gray-800 rounded-full px-5 py-2 flex items-center gap-2 text-sm text-gray-300 hover:bg-[#1b1e31] transition">
          Casino <span className="text-gray-500 text-xs">7 selected</span>{" "}
          <ChevronDown size={14} />
        </button>
        <button className="bg-[#141627] border border-gray-800 rounded-full px-5 py-2 flex items-center gap-2 text-sm text-gray-300 hover:bg-[#1b1e31] transition">
          Chain{" "}
          <span className="text-gray-500 text-xs">ETH, SOL, BSC, TRX</span>{" "}
          <ChevronDown size={14} />
        </button>

        <div className="flex items-center bg-[#141627] border border-gray-800 rounded-full overflow-hidden">
          {["Week", "Month", "Year"].map((label) => (
            <button
              key={label}
              onClick={() => setTimeframe(label)}
              className={`px-4 py-2 text-sm transition ${
                timeframe === label
                  ? "bg-[#1b1e31] text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-[#111422] border border-gray-800 rounded-2xl p-6 md:p-10 max-w-4xl mx-auto relative mb-16">
        <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
          <span>Deposit Volume</span>
          <span className="text-gray-500 text-xs">1 Year</span>
        </h3>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2235" />
            <XAxis dataKey="month" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#141627",
                border: "1px solid #1E2235",
                color: "#fff",
              }}
            />
            <Legend wrapperStyle={{ color: "#999" }} />
            {[
              { key: "Stake", color: "#3B82F6" },
              { key: "Roobet", color: "#FACC15" },
              { key: "Shuffle", color: "#A855F7" },
              { key: "Gamdom", color: "#22C55E" },
              { key: "Rollbit", color: "#EF4444" },
              { key: "Yolo.com", color: "#E879F9" },
              { key: "Whale.io", color: "#38BDF8" },
            ].map(({ key, color }) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>

        {/* Tanzanite logo */}
        <div className="absolute top-4 right-6 flex items-center gap-1 text-gray-400 text-xs uppercase tracking-wider">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-purple-400"
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
          TANZANITE
        </div>
      </div>

      {/* NEW: Market Breakdown of Casinos – compact grid table */}
      <section className="max-w-4xl mx-auto mb-12 border border-gray-800 rounded-2xl bg-[#111422] p-6">
        <h3 className="text-sm font-semibold mb-4 text-gray-200 uppercase tracking-wide">
          Market Breakdown of Casinos
        </h3>

        <div className="mt-2 space-y-1.5">
          {/* Header row */}
          <div className="grid grid-cols-6 items-center text-[10px] uppercase tracking-wide text-gray-500 px-2">
            <span className="text-left">#</span>
            <span className="text-left">Casino</span>
            <span className="text-center">Market Share</span>
            <span className="text-center">Deposit Volume</span>
            <span className="text-center">Deposits</span>
            <span className="text-center">New Depositors</span>
          </div>

          {/* Rows */}
          {casinoMarket.map((c, index) => (
            <div
              key={c.casino}
              className="bg-[#101322] border border-[#1f2238] rounded-xl px-3 py-1 
                         grid grid-cols-6 items-center gap-0 hover:bg-[#171a2e] 
                         transition-all duration-150"
            >
              {/* # + name stacked tight */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[9px] text-gray-500 w-4">
                  {index + 1}
                </span>
                <span className="text-[10px] text-white font-semibold truncate">
                  {c.casino}
                </span>
              </div>

              {/* (Empty cell because we merged # + Casino in first col? No: we already have both; so keep this as placeholder removed?) */}
              {/* Actually, we already have Casino in first col, so second col is unused.
                  But we defined 6 columns, so first is "#", second is casino.
                  To keep layout matching header, split them: */}
            </div>
          ))}
        </div>
      </section>
      {/* TOKEN BREAKDOWN TABLE */}
      <section className="max-w-4xl mx-auto mb-12 border border-gray-800 rounded-2xl bg-[#111422] p-6">
        <h3 className="text-sm font-semibold mb-4 text-gray-200 uppercase tracking-wide">
          Token Breakdown
        </h3>

        <div className="mt-2 space-y-1.5">
          {/* Header */}
          <div className="grid grid-cols-6 items-center text-[10px] uppercase tracking-wide text-gray-500 px-2">
            <span>#</span>
            <span>Currency</span>
            <span className="text-center">Token Share</span>
            <span className="text-center">Deposit Volume</span>
            <span className="text-center">Deposits</span>
            <span className="text-center">Avg Deposit</span>
          </div>

          {/* Data Array */}
          {[
            {
              icon: "/icons/usdt.svg",
              name: "USDT",
              share: "61.59%",
              volume: "$16.6B",
              deposits: "10.5M",
              avg: "$1.6K",
            },
            {
              icon: "/icons/eth.svg",
              name: "ETH",
              share: "14.39%",
              volume: "$3.9B",
              deposits: "3.8M",
              avg: "$1.0K",
            },
            {
              icon: "/icons/sol.svg",
              name: "SOL",
              share: "10.09%",
              volume: "$2.7B",
              deposits: "5.2M",
              avg: "$520.2",
            },
            {
              icon: "/icons/usdc.svg",
              name: "USDC",
              share: "9.78%",
              volume: "$2.6B",
              deposits: "859.4K",
              avg: "$3.1K",
            },
            {
              icon: "/icons/trx.svg",
              name: "TRX",
              share: "3.24%",
              volume: "$874.3M",
              deposits: "4.0M",
              avg: "$216.5",
            },
            {
              icon: "/icons/bnb.svg",
              name: "BNB",
              share: "0.46%",
              volume: "$123.6M",
              deposits: "5.8M",
              avg: "$21.2",
            },
            {
              icon: "/icons/dai.svg",
              name: "DAI",
              share: "0.29%",
              volume: "$78.9M",
              deposits: "6.6K",
              avg: "$12.0K",
            },
            {
              icon: "/icons/other.svg",
              name: "OTHER",
              share: "0.07%",
              volume: "$18.5M",
              deposits: "44.7K",
              avg: "$413.3",
            },
            {
              icon: "/icons/shib.svg",
              name: "SHIB",
              share: "0.06%",
              volume: "$15.4M",
              deposits: "51.8K",
              avg: "$297.6",
            },
            {
              icon: "/icons/link.svg",
              name: "LINK",
              share: "0.04%",
              volume: "$10.4M",
              deposits: "8.3K",
              avg: "$1.3K",
            },
          ].map((t, index) => (
            <div
              key={index}
              className="bg-[#101322] border border-[#1f2238] rounded-xl px-3 py-1 
        grid grid-cols-6 items-center gap-0 hover:bg-[#171a2e] 
        transition-all duration-150"
            >
              {/* # */}
              <span className="text-[9px] text-gray-500">{index + 1}</span>

              {/* Currency + Icon */}
              <div className="flex items-center gap-2 truncate">
                {t.icon ? (
                  <img
                    src={t.icon}
                    alt={t.name}
                    className="h-4 w-4 rounded-full object-contain"
                  />
                ) : (
                  <div className="h-4 w-4 rounded-full bg-gray-600" />
                )}
                <span className="text-[10px] text-white font-semibold truncate">
                  {t.name}
                </span>
              </div>

              {/* Token Share */}
              <span className="text-[9px] text-gray-400 text-center">
                {t.share}
              </span>

              {/* Deposit Volume */}
              <span className="text-[9px] text-gray-400 text-center">
                {t.volume}
              </span>

              {/* Deposits */}
              <span className="text-[9px] text-gray-400 text-center">
                {t.deposits}
              </span>

              {/* Avg Deposit */}
              <span className="text-[9px] text-gray-400 text-center">
                {t.avg}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
