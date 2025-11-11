"use client";

import React from "react";
import HeroSection from "@/components/HeroSection";
import PlatformToolsSection from "@/components/PlatformToolsSection";
import ConsultancySection from "@/components/ConsultancySection";
import TrustedSection from "@/components/TrustedSection";
import NewsSection from "@/components/NewsSection";

export default function Page() {
  return (
    <main className="bg-[#0a0d1a] text-white font-sans overflow-hidden">
      <HeroSection />
      <PlatformToolsSection />
      <ConsultancySection />
      <TrustedSection />
      <NewsSection />
    </main>
  );
}
