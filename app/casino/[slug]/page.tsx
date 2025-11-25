// app/casino/[slug]/page.tsx

import { notFound } from "next/navigation";
import casinoData from "@/data/casinos.json";
import {
  FaDice,
  FaMoneyBillWave,
  FaCoins,
  FaGem,
  FaTicketAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { JSX } from "react";

type Casino = {
  name: string;
  year: number;
  rank?: number;
  icon?: string;
  image?: string;
  amlPolicy?: boolean;
  wagerRequirements?: boolean;
  idOnSignup?: boolean;
  detailsOnSignup?: boolean;
  jurisdictionDisclosure?: boolean;
  geoBlockingEnforcement?: boolean;
};

const casinos = casinoData as Casino[];

// Map icon keys to React Icons
const iconMap: Record<string, JSX.Element> = {
  dice: <FaDice size={32} className="text-indigo-400" />,
  money: <FaMoneyBillWave size={32} className="text-emerald-400" />,
  coin: <FaCoins size={32} className="text-yellow-400" />,
  gem: <FaGem size={32} className="text-sky-400" />,
  ticket: <FaTicketAlt size={32} className="text-purple-400" />,
};

// Generate static params
export async function generateStaticParams() {
  return casinos.map((c) => ({
    slug: c.name.toLowerCase().replace(/ /g, ""),
  }));
}

// params is a Promise in new Next.js
type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CasinoPage({ params }: PageProps) {
  const { slug } = await params;

  const casino = casinos.find(
    (c) => c.name.toLowerCase().replace(/ /g, "") === slug
  );

  if (!casino) {
    notFound();
  }

  const icon = casino.icon ? iconMap[casino.icon] : null;

  return (
    <main className="min-h-screen bg-[#0C0F1A] text-white pt-16 pb-20">
      <section className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8 space-y-8">
        {/* HERO CARD */}
        <div className="relative h-56 sm:h-64 rounded-3xl overflow-hidden border border-[#1f2238] bg-[#101322]">
          {/* background image with low opacity */}
          {casino.image && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: `url(${casino.image})` }}
            />
          )}

          {/* dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#040615]/70 via-[#050814]/80 to-[#050815]/95" />

          {/* content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-6">
            {/* icon at top */}
            {icon && (
              <div className="flex items-center">
                <div className="inline-flex items-center justify-center rounded-2xl bg-black/30 border border-white/10 p-3">
                  {icon}
                </div>
              </div>
            )}

            {/* name + year at bottom, smaller */}
            <div className="flex items-end justify-between gap-3 mt-auto">
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-semibold truncate">
                  {casino.name}
                </h1>
                {typeof casino.rank === "number" && (
                  <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                    Ranked #{casino.rank} by deposit volume
                  </p>
                )}
              </div>
              <span className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full border border-[#262a43] text-gray-200 whitespace-nowrap">
                Founded {casino.year}
              </span>
            </div>
          </div>
        </div>

        {/* DETAILS CARD */}
        <div className="bg-[#101322] rounded-2xl border border-[#1f2238] p-5 sm:p-6 space-y-5">
          <div>
            <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-300 mb-2 flex items-center gap-2">
              Overview
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              {casino.name} is a crypto casino listed on Streax&apos;s
              transparency radar. Below is a summary of key compliance and
              transparency indicators tracked by Streax.
            </p>
          </div>

          {/* key numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <DetailPill label="Founded" value={String(casino.year)} />
            {typeof casino.rank === "number" && (
              <DetailPill label="Current Rank" value={`#${casino.rank}`} />
            )}
            <DetailPill label="Listing" value={`${casino.name} Casino`} />
          </div>

          {/* compliance grid */}
          <div className="mt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
              Compliance Snapshot
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
              <ComplianceRow label="AML Policy" value={casino.amlPolicy} />
              <ComplianceRow
                label="Wager Requirements"
                value={casino.wagerRequirements}
              />
              <ComplianceRow
                label="ID Required on Sign-up"
                value={casino.idOnSignup}
              />
              <ComplianceRow
                label="Deal Details on Sign-up"
                value={casino.detailsOnSignup}
              />
              <ComplianceRow
                label="Jurisdiction Disclosure"
                value={casino.jurisdictionDisclosure}
              />
              <ComplianceRow
                label="Geo-blocking Enforcement"
                value={casino.geoBlockingEnforcement}
              />
            </div>
          </div>

          {/* External link */}
          <div className="pt-3 border-t border-[#1f2238] flex justify-between items-center gap-3">
            <p className="text-[11px] text-gray-500">
              View the live casino page and verification details on Tanzanite.
            </p>
            <a
              href={`https://tanzanite.xyz/casinos/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs rounded-full bg-indigo-600 hover:bg-indigo-700 transition font-medium"
            >
              View on Tanzanite
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* small helpers */

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#14172a] border border-[#202543] px-3 py-2">
      <p className="text-[11px] text-gray-500 mb-0.5">{label}</p>
      <p className="text-[13px] font-medium text-gray-100">{value}</p>
    </div>
  );
}

function ComplianceRow({ label, value }: { label: string; value?: boolean }) {
  const isTrue = value === true;
  const isFalse = value === false;

  return (
    <div className="flex items-center justify-between rounded-lg bg-[#14172a] border border-[#202543] px-3 py-2">
      <span className="text-gray-300">{label}</span>
      <span className="ml-3 flex items-center justify-center w-6 h-6 rounded-full bg-black/30 border border-[#262a43]">
        {isTrue && <FaCheck className="text-[11px] text-emerald-400" />}
        {isFalse && !isTrue && <FaTimes className="text-[11px] text-red-400" />}
        {!isTrue && !isFalse && (
          <span className="text-[9px] text-gray-500">—</span>
        )}
      </span>
    </div>
  );
}
