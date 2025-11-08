"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/casino", label: "Casinos" },
  { href: "/creators", label: "Creators" },
  { href: "/analytics", label: "Analytics" },
  { href: "/jobs", label: "Jobs" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        bg-transparent
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-8 h-8">
            <div className="absolute inset-0 rounded-md border-2 border-pink-500 rotate-45"></div>
            <div className="text-pink-500 font-bold text-lg z-10">S</div>
          </div>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center justify-center bg-white/5 rounded-full px-6 py-2 border border-white/10 backdrop-blur-md">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mx-3 text-sm font-semibold transition-colors ${
                pathname === link.href
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Button */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:opacity-90 transition text-white font-semibold px-6 py-2 rounded-full text-sm"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-300 hover:text-white"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0d1a]/95 backdrop-blur-md">
          <div className="flex flex-col items-center gap-2 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  pathname === link.href
                    ? "text-white bg-white/5"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:opacity-90 transition text-white font-semibold px-6 py-2 rounded-full text-sm"
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
