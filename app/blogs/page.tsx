"use client";
import { useState } from "react";

const blogs = [
  {
    id: 1,
    title: "iGaming Weekly",
    date: "10 Nov 2025",
    desc: "Dive into this week's iGaming recap, with new partnerships, new games, lots of news and more!",
    tag: "iGaming Weekly",
  },
  {
    id: 2,
    title: "iGaming Weekly",
    date: "03 Nov 2025",
    desc: "Dive into this week's iGaming recap, with new partnerships, new games, lots of news and more!",
    tag: "iGaming Weekly",
  },
  {
    id: 3,
    title: "iGaming Weekly",
    date: "27 Oct 2025",
    desc: "Dive into this week's iGaming recap, with new partnerships, new games, lots of news and more!",
    tag: "iGaming Weekly",
  },
  {
    id: 4,
    title: "Players Report",
    date: "24 Oct 2025",
    desc: "Step into this week’s Players Report for player insights, leaderboard movements, and new bonuses!",
    tag: "Players Report",
  },
  {
    id: 5,
    title: "iGaming Weekly",
    date: "20 Oct 2025",
    desc: "Dive into this week's iGaming recap, with new partnerships, new games, lots of news and more!",
    tag: "iGaming Weekly",
  },
  {
    id: 6,
    title: "Players Report",
    date: "17 Oct 2025",
    desc: "Step into this week’s Players Report for player insights, leaderboard movements, and new bonuses!",
    tag: "Players Report",
  },
];

export default function BlogPage() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-[#0B0E19] text-white py-24 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <h1 className="text-6xl font-extrabold mb-4">BLOG</h1>
        <p className="text-gray-400 mb-8 text-lg">
          Gain access to exclusive data-driven insights.
        </p>

        {/* Subscribe */}
        <div className="flex justify-center items-center gap-3 mb-16 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-transparent border border-gray-600 focus:outline-none focus:border-pink-500 text-sm"
          />
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all">
            Subscribe
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#13172A] rounded-2xl p-5 border border-gray-800 hover:border-pink-500 transition-all duration-300"
            >
              {/* Fake image area with text */}
              <div className="h-40 rounded-xl mb-4 flex items-center justify-center text-center bg-gradient-to-r from-[#1B1E31] to-[#0F1222] border border-gray-700">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide">
                    {blog.tag.split(" ")[0]}{" "}
                    <span className="text-pink-500">
                      {blog.tag.split(" ")[1]}
                    </span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Crypto Casino Updates &amp; News
                  </p>
                  <div className="text-[10px] text-gray-500 mt-2 bg-[#1F2236] px-2 py-1 inline-block rounded-md">
                    {blog.date}
                  </div>
                </div>
              </div>

              {/* Blog content */}
              <h3 className="text-xl font-semibold mb-1">
                {blog.title}{" "}
                <span className="text-pink-500 font-semibold">
                  {blog.tag.includes("Weekly") ? "Weekly" : ""}
                </span>
              </h3>
              <p className="text-gray-400 text-sm mb-3">{blog.date}</p>
              <p className="text-gray-300 text-sm">{blog.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
