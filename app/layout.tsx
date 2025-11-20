import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Streax",
  description: "No-server Next.js app with localStorage persistence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="bg-[#0b0c1a] container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
