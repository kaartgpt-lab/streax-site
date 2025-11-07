'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/casino', label: 'Casino' },
  { href: '/creators', label: 'Creators' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-zinc-900/80 border-b border-white/10">
      <div className="container py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500" />
          <span className="font-semibold tracking-tight">Tanzanite</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map(l => (
            <Link key={l.href} href={l.href} className={pathname === l.href ? 'text-white' : 'text-zinc-300 hover:text-white'}>{l.label}</Link>
          ))}
        </nav>
        <button className="md:hidden p-2" onClick={()=>setOpen(o=>!o)}>{open ? <X/> : <Menu/>}</button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10">
          <div className="container py-2 flex flex-col gap-1">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={()=>setOpen(false)} className="px-2 py-2 rounded-lg text-zinc-200 hover:bg-white/5">{l.label}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
