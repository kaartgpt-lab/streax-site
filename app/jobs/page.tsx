"use client";
import { useState } from "react";
import {
  Search,
  Briefcase,
  Globe,
  Building2,
  LogIn,
  Link,
  ArrowRight,
} from "lucide-react";

const jobs = [
  {
    id: 1,
    company: "Whale",
    role: "Product Owner",
    type: "Full-time",
    mode: "Hybrid",
    email: "careers@whale.io",
    site: "whale.io",
    desc: `Lead product development for next-generation Web3 gaming infrastructure and coordinate cross-functional teams across design, engineering, and marketing. You’ll work closely with senior leadership to define product vision, prioritize roadmaps, and translate user feedback into actionable improvements.

As a Product Owner, you’ll also oversee product analytics, identify growth opportunities, and align launches with strategic milestones. Experience with agile methodologies, DeFi systems, and gaming ecosystems is a strong plus.`,
  },
  {
    id: 2,
    company: "Magic Eden",
    role: "Affiliate & Creator Manager",
    type: "Full-time",
    mode: "Remote",
    email: "careers@magiceden.io",
    site: "magiceden.io",
    desc: `Manage and grow the Magic Eden creator affiliate ecosystem by forming long-term partnerships with streamers, influencers, and community leaders. You’ll develop transparent systems for affiliate tracking and incentive management.

This role requires strong communication, negotiation, and organizational skills, with a deep understanding of Web3 culture and NFT marketplaces. Your mission is to bridge creators and brands while maintaining fairness and authenticity.`,
  },
  {
    id: 3,
    company: "Solflare",
    role: "UI/UX Designer",
    type: "Contract",
    mode: "Remote",
    email: "design@solflare.com",
    site: "solflare.com",
    desc: `Design clean, functional, and delightful user experiences for millions of users on the Solana blockchain. Collaborate with developers to prototype wallet interfaces, new DeFi integrations, and user onboarding flows.

We’re looking for someone with a strong portfolio in web or mobile UX and an eye for detail. Familiarity with Figma, design systems, and crypto user behavior is highly desirable.`,
  },
  {
    id: 4,
    company: "Ape Games",
    role: "Marketing Lead",
    type: "Full-time",
    mode: "Hybrid",
    email: "hr@apegames.gg",
    site: "apegames.gg",
    desc: `Own and execute marketing strategy for one of the fastest-growing Web3 gaming studios. This includes managing ad campaigns, influencer partnerships, community engagement, and analytics tracking.

You’ll collaborate with internal creative teams and partners to position Ape Games as the leader in blockchain entertainment. Proven experience in brand storytelling and data-driven marketing is key.`,
  },
  {
    id: 5,
    company: "Degen Labs",
    role: "Smart Contract Engineer",
    type: "Full-time",
    mode: "Remote",
    email: "dev@degenlabs.io",
    site: "degenlabs.io",
    desc: `Design, implement, and audit smart contracts powering casino and gaming systems. You’ll be responsible for maintaining high-security standards, gas efficiency, and modular contract architecture.

Applicants should be fluent in Solidity and familiar with Layer-2 scaling, on-chain randomness, and testing frameworks like Hardhat or Foundry. Experience auditing or contributing to open-source DeFi projects is a huge advantage.`,
  },
  {
    id: 6,
    company: "Metaplay",
    role: "Community Manager",
    type: "Part-time",
    mode: "Remote",
    email: "join@metaplay.gg",
    site: "metaplay.gg",
    desc: `Engage, grow, and empower our online community across Discord, Twitter, and emerging Web3 social channels. You’ll lead content planning, moderate discussions, and create incentives that strengthen user loyalty.

If you love connecting with players and understanding their needs, this is your chance to make a real impact. Familiarity with Web3 lingo, NFT drops, and DAO culture will help you thrive.`,
  },
  {
    id: 7,
    company: "TokenHouse",
    role: "Operations Associate",
    type: "Full-time",
    mode: "Onsite",
    email: "ops@tokenhouse.xyz",
    site: "tokenhouse.xyz",
    desc: `Assist the operations and partnerships team in managing token listings, coordinating with exchanges, and handling compliance documentation. You’ll streamline internal workflows and ensure smooth project execution.

The ideal candidate is detail-oriented, proactive, and comfortable working in fast-paced crypto environments. Familiarity with CRM tools and treasury management systems is preferred.`,
  },
  {
    id: 8,
    company: "ChainPixel",
    role: "Frontend Developer",
    type: "Full-time",
    mode: "Hybrid",
    email: "dev@chainpixel.io",
    site: "chainpixel.io",
    desc: `Develop performant and responsive dashboards for blockchain analytics. Work closely with backend engineers to display complex on-chain data in intuitive, visually appealing ways.

A strong command of React, TailwindCSS, and charting libraries (like Recharts or D3) is essential. Knowledge of wallet integrations and real-time data streaming is a big plus.`,
  },
  {
    id: 9,
    company: "LunaBet",
    role: "Affiliate Manager",
    type: "Full-time",
    mode: "Remote",
    email: "hr@lunabet.gg",
    site: "lunabet.gg",
    desc: `Drive affiliate marketing growth for LunaBet’s crypto-powered betting platform. You’ll identify high-value partners, negotiate deals, and optimize performance through analytics dashboards.

This role requires data-driven decision-making, relationship management, and familiarity with compliance across multiple jurisdictions. Previous iGaming or fintech experience preferred.`,
  },
  {
    id: 10,
    company: "OrbitX",
    role: "Backend Engineer",
    type: "Full-time",
    mode: "Remote",
    email: "backend@orbitx.io",
    site: "orbitx.io",
    desc: `Maintain scalable APIs, databases, and microservices that power our suite of Web3 tools. You’ll collaborate with front-end engineers and DevOps teams to deliver fast, reliable systems.

We value experience with Node.js, PostgreSQL, Redis, and cloud infrastructure (AWS, GCP, or similar). Bonus points if you’ve deployed or maintained blockchain indexers.`,
  },
];

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  return (
    <section className="max-w-4xl mx-auto text-white py-16 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight">JOBS</h1>
        <p className="text-gray-400 mt-2">
          The latest crypto iGaming jobs from leading projects.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <div className="flex items-center gap-2 bg-[#111422] px-4 py-2 rounded-full w-64">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs"
            className="bg-transparent text-sm w-full outline-none placeholder-gray-500"
          />
        </div>
        <select className="bg-[#111422] text-sm rounded-full px-4 py-2 outline-none">
          <option>Role</option>
        </select>
        <select className="bg-[#111422] text-sm rounded-full px-4 py-2 outline-none">
          <option>Work Setting</option>
        </select>
        <select className="bg-[#111422] text-sm rounded-full px-4 py-2 outline-none">
          <option>Country</option>
        </select>
        <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-sm font-semibold px-5 py-2 rounded-full">
          Operator Login
        </button>
      </div>

      {/* 2 Columns Layout */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Job List */}
        <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2 no-scrollbar scrollbar-thumb-[#22263a] scrollbar-track-transparent">
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={`cursor-pointer border border-gray-800 rounded-2xl p-4 transition-all ${
                selectedJob.id === job.id
                  ? "bg-[#1b1f33]/80 border-pink-500"
                  : "bg-[#111422]/80 hover:bg-[#181c2e]"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold">{job.company}</h3>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-base font-bold">{job.role}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-[11px] bg-[#1f243a] px-2 py-1 rounded-full">
                  {job.mode}
                </span>
                <span className="text-[11px] bg-[#1f243a] px-2 py-1 rounded-full">
                  {job.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Job Detail */}
        <div className="sticky top-20 self-start border border-gray-800 rounded-2xl bg-[#111422]/80 p-6 h-fit">
          <h3 className="text-lg font-semibold mb-3">
            {selectedJob.company} - {selectedJob.role}
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-[11px] bg-[#1f243a] px-2 py-1 rounded-full">
              {selectedJob.mode}
            </span>
            <span className="text-[11px] bg-[#1f243a] px-2 py-1 rounded-full">
              {selectedJob.type}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4 text-[12px] text-gray-400">
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" /> {selectedJob.site}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" /> {selectedJob.email}
            </span>
          </div>
          <p className="text-sm text-gray-300">{selectedJob.desc}</p>
        </div>
      </div>
    </section>
  );
}
