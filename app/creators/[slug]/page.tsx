// app/creators/[slug]/page.tsx

import { notFound } from "next/navigation";
import creatorsData from "@/data/creators.json";
import {
  ExternalLink,
  User,
  Gamepad2,
  Users,
  CheckCircle,
  PlayCircle,
  Calendar,
  DollarSign,
  Info,
  Globe2,
  Twitter,
  Twitch,
  Youtube,
} from "lucide-react";

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
  twitter?: string;
  twitch?: string;
  youtube?: string;
  website?: string;
};

const creators = creatorsData as Creator[];

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "");

export async function generateStaticParams() {
  return creators.map((c) => ({
    slug: slugify(c.name),
  }));
}

// 🔧 Next.js dynamic APIs: params is a Promise, so we await it
type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CreatorProfilePage({ params }: PageProps) {
  const { slug } = await params;

  const creator = creators.find((c) => slugify(c.name) === slug);

  if (!creator) {
    notFound();
  }

  const socialLinks = [
    creator.twitter && {
      label: "Twitter",
      href: `https://twitter.com/${creator.twitter}`,
      icon: Twitter,
    },
    creator.twitch && {
      label: "Twitch",
      href: `https://twitch.tv/${creator.twitch}`,
      icon: Twitch,
    },
    creator.youtube && {
      label: "YouTube",
      href: `https://youtube.com/${creator.youtube}`,
      icon: Youtube,
    },
    creator.website && {
      label: "Website",
      href: creator.website,
      icon: Globe2,
    },
  ].filter(Boolean) as { label: string; href: string; icon: typeof Globe2 }[];

  return (
    <main className="min-h-screen bg-[#0C0F1A] text-white pt-20 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <header className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
            Creator Transparency
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {creator.name}
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Verified {creator.isCreator && "creator"}
            {creator.isCreator && creator.isStreamer && " & "}
            {creator.isStreamer && "streamer"} on{" "}
            <span className="text-gray-200 font-medium">{creator.casino}</span>.
          </p>
        </header>

        {/* 2-column layout */}
        <section className="grid grid-cols-1 md:grid-cols-[260px,minmax(0,1fr)] gap-6 md:gap-8 items-start">
          {/* LEFT: Profile card */}
          <aside className="bg-[#101322] border border-[#1f2238] rounded-2xl p-6 flex flex-col items-center md:items-start gap-4">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden border border-[#262a43]">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name + verification */}
            <div className="w-full">
              <h2 className="text-xl font-semibold">{creator.name}</h2>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#16192a] border border-[#262a43] text-gray-200">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  {creator.verification}
                </span>
                {creator.isCreator && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#16192a] border border-[#262a43] text-gray-300">
                    <User className="w-3 h-3" />
                    Creator
                  </span>
                )}
                {creator.isStreamer && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#16192a] border border-[#262a43] text-gray-300">
                    <PlayCircle className="w-3 h-3" />
                    Streamer
                  </span>
                )}
              </div>
            </div>

            {/* Casino + followers */}
            <div className="w-full space-y-2 text-sm mt-2">
              <div className="flex items-center justify-between text-gray-300">
                <span className="inline-flex items-center gap-1">
                  <Gamepad2 className="w-4 h-4 text-indigo-400" />
                  Casino
                </span>
                <span className="font-medium text-gray-100">
                  {creator.casino}
                </span>
              </div>

              <div className="flex items-center justify-between text-gray-300">
                <span className="inline-flex items-center gap-1">
                  <Users className="w-4 h-4 text-pink-400" />
                  Followers
                </span>
                <span className="font-medium text-gray-100">
                  {creator.followers}
                </span>
              </div>

              {creator.live && (
                <div className="flex items-center justify-between text-gray-300">
                  <span className="inline-flex items-center gap-1">
                    <PlayCircle className="w-4 h-4 text-red-400" />
                    Live on
                  </span>
                  <span className="font-medium text-gray-100">
                    {creator.livePlatform}
                  </span>
                </div>
              )}
            </div>

            {/* Socials row */}
            {socialLinks.length > 0 && (
              <div className="w-full mt-3 pt-3 border-t border-[#1f2238]">
                <p className="text-xs text-gray-500 mb-2">Socials</p>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] 
                                 bg-[#16192a] border border-[#262a43] text-gray-200 hover:bg-[#1b1f32] transition"
                    >
                      <Icon className="w-3 h-3" />
                      {label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* RIGHT: info cards */}
          <div className="space-y-4">
            {/* About creator */}
            <div className="bg-[#101322] border border-[#1f2238] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-semibold tracking-wide text-gray-100 uppercase">
                  About {creator.name}
                </h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {creator.name} is a {creator.isCreator && "content creator"}
                {creator.isCreator && creator.isStreamer && " and "}
                {creator.isStreamer && "streamer"} partnered with{" "}
                <span className="text-gray-200 font-medium">
                  {creator.casino}
                </span>
                . They participate in Tanzanite&apos;s transparency program to
                disclose deal terms, casino relationships, and key metrics to
                their audience.
              </p>
            </div>

            {/* Current details */}
            <div className="bg-[#101322] border border-[#1f2238] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold tracking-wide text-gray-100 uppercase">
                  Current Details
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <DetailItem label="Verification" value={creator.verification} />
                <DetailItem label="Primary Casino" value={creator.casino} />
                <DetailItem label="Followers" value={creator.followers} />
                <DetailItem
                  label="Role"
                  value={[
                    creator.isCreator && "Creator",
                    creator.isStreamer && "Streamer",
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                />
                <DetailItem
                  label="Live Status"
                  value={creator.live ? "Currently Live" : "Offline"}
                  tone={creator.live ? "positive" : "muted"}
                />
                {creator.livePlatform && (
                  <DetailItem
                    label="Streaming On"
                    value={creator.livePlatform}
                  />
                )}
              </div>
            </div>

            {/* Deal history */}
            <div className="bg-[#101322] border border-[#1f2238] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-4 h-4 text-pink-400" />
                <h3 className="text-sm font-semibold tracking-wide text-gray-100 uppercase">
                  Deal History
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <DealRow
                  date="2024-01-10"
                  title={`Updated deal with ${creator.casino}`}
                  level={creator.verification}
                  status="Active"
                />
                <DealRow
                  date="2023-09-02"
                  title="Deal terms reviewed by Tanzanite"
                  level="Level 2"
                  status="Verified"
                />
                <DealRow
                  date="2023-05-18"
                  title={`Initial partnership with ${creator.casino}`}
                  level="Level 1"
                  status="Historical"
                />
              </div>
            </div>

            {/* Streams card */}
            <div className="bg-[#101322] border border-[#1f2238] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <PlayCircle className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-semibold tracking-wide text-gray-100 uppercase">
                  Streams
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                {creator.live && (
                  <StreamRow
                    label="Live now"
                    platform={creator.livePlatform ?? "Unknown"}
                    viewers={creator.liveViewers ?? "—"}
                    badge="LIVE"
                  />
                )}

                <StreamRow
                  label="Recent sponsored stream"
                  platform={creator.casino}
                  viewers="12,340"
                  date="2 days ago"
                />
                <StreamRow
                  label="Community stream"
                  platform={creator.casino}
                  viewers="5,120"
                  date="1 week ago"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* Small helper components */

function DetailItem({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "positive" | "muted";
}) {
  const toneClass =
    tone === "positive"
      ? "text-emerald-400"
      : tone === "muted"
      ? "text-gray-500"
      : "text-gray-100";

  return (
    <div className="rounded-xl bg-[#14172a] border border-[#202543] px-3 py-2">
      <p className="text-[11px] text-gray-500 mb-0.5">{label}</p>
      <p className={`text-[13px] font-medium ${toneClass}`}>{value}</p>
    </div>
  );
}

function DealRow({
  date,
  title,
  level,
  status,
}: {
  date: string;
  title: string;
  level: string;
  status: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
      <div className="flex items-center gap-2">
        <Calendar className="w-3.5 h-3.5 text-gray-500" />
        <span className="text-[11px] text-gray-500">{date}</span>
      </div>
      <div className="flex-1 sm:px-3">
        <p className="text-[13px] text-gray-200">{title}</p>
        <p className="text-[11px] text-gray-500">Verification: {level}</p>
      </div>
      <span className="inline-flex items-center justify-center px-2 py-1 rounded-full text-[10px] bg-[#16192a] border border-[#262a43] text-gray-200">
        {status}
      </span>
    </div>
  );
}

function StreamRow({
  label,
  platform,
  viewers,
  date,
  badge,
}: {
  label: string;
  platform: string;
  viewers: string;
  date?: string;
  badge?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 rounded-xl bg-[#14172a] border border-[#202543] px-3 py-2">
      <div>
        <p className="text-[13px] text-gray-100">{label}</p>
        <p className="text-[11px] text-gray-500">
          {platform} · {viewers} viewers{date ? ` · ${date}` : ""}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] bg-red-500/10 text-red-400 border border-red-500/40">
            {badge}
          </span>
        )}
        <button className="inline-flex items-center gap-1 text-[11px] text-gray-200 hover:text-white">
          Open stream <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
