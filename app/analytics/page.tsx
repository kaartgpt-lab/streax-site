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
    <main className="min-h-screen bg-[#0B0E18] text-white px-6 py-20">
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
      <div className="bg-[#111422] border border-gray-800 rounded-2xl p-6 md:p-10 max-w-4xl mx-auto relative mb-20">
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

      {/* Table 1: Deposit Volume by Crypto */}
      <section className="max-w-4xl mx-auto mb-12 border border-gray-800 rounded-2xl bg-[#111422] p-6">
        <h3 className="text-xl font-semibold mb-5 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Deposit Volume by Currency
        </h3>
        <div className="flex flex-col gap-2">
          {cryptoDeposits.map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-[#0C1024]/60 border border-gray-800 rounded-xl px-5 py-2.5 hover:bg-[#1b1e31]/70 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold text-gray-200">
                  {c.currency}
                </span>
              </div>
              <div className="flex items-center gap-6 text-right">
                <span className="text-[11px] text-gray-400">{c.deposits}</span>
                <span
                  className={`text-[11px] ${
                    c.change.startsWith("+") ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {c.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Table 2: User Activity by Crypto */}
      <section className="max-w-4xl mx-auto mb-12 border border-gray-800 rounded-2xl bg-[#111422] p-6">
        <h3 className="text-xl font-semibold mb-5 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          User Activity by Currency
        </h3>
        <div className="flex flex-col gap-2">
          {cryptoUsers.map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-[#0C1024]/60 border border-gray-800 rounded-xl px-5 py-2.5 hover:bg-[#1b1e31]/70 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold text-gray-200">
                  {c.currency}
                </span>
              </div>
              <div className="flex items-center gap-6 text-right">
                <span className="text-[11px] text-gray-400">{c.users}</span>
                <span className="text-[11px] text-gray-400">{c.txs}</span>
                <span
                  className={`text-[11px] ${
                    c.growth.startsWith("+") ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {c.growth}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
