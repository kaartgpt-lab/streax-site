"use client";
import SectionTitle from "@/components/SectionTitle";
import { useEffect, useState } from "react";
import { KEYS, load, save } from "@/lib/storage";
import {
  Mail,
  Twitter,
  Linkedin,
  Globe,
  Instagram,
  MessageCircle,
} from "lucide-react";

type Msg = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function ContactPage() {
  const [items, setItems] = useState<Msg[]>(() =>
    load<Msg[]>(KEYS.contacts, [])
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => save(KEYS.contacts, items), [items]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !msg.trim()) return;
    setItems([
      {
        id: crypto.randomUUID(),
        name,
        email,
        message: msg,
        createdAt: new Date().toISOString(),
      },
      ...items,
    ]);
    setName("");
    setEmail("");
    setMsg("");
  }

  return (
    <section className="max-w-4xl mx-auto py-20 px-6">
      <SectionTitle
        eyebrow="Contact"
        title="Tell us about your goals"
        subtitle="Reach out to us directly or connect via socials below."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
        {/* LEFT: Contact Form */}
        <form
          onSubmit={submit}
          className="bg-[#101322] border border-white/10 rounded-2xl shadow-xl p-8"
        >
          <h3 className="text-xl font-semibold mb-5 text-white">
            Send a Message
          </h3>
          <div className="grid gap-4">
            <input
              className="w-full rounded-xl bg-[#16192a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full rounded-xl bg-[#16192a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              rows={5}
              className="w-full rounded-xl bg-[#16192a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition resize-none"
              placeholder="Your message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </div>
          <button
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl px-6 py-3 mt-5 text-sm transition w-full sm:w-auto"
            type="submit"
          >
            Send Message
          </button>
        </form>

        {/* RIGHT: Social Links */}
        <div className="bg-[#101322] border border-white/10 rounded-2xl shadow-xl p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-5 text-white">
              Connect With Us
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              You can also reach us through our social channels. We’re always
              open to collaborations, partnerships, or just a friendly chat.
            </p>

            <ul className="space-y-4">
              {[
                {
                  name: "Email",
                  icon: <Mail size={18} />,
                  href: "mailto:hello@steax.io",
                },
                {
                  name: "Twitter",
                  icon: <Twitter size={18} />,
                  href: "https://twitter.com",
                },
                {
                  name: "LinkedIn",
                  icon: <Linkedin size={18} />,
                  href: "https://linkedin.com",
                },
                {
                  name: "Instagram",
                  icon: <Instagram size={18} />,
                  href: "https://instagram.com",
                },
                {
                  name: "Website",
                  icon: <Globe size={18} />,
                  href: "https://steax.io",
                },
                {
                  name: "Telegram",
                  icon: <MessageCircle size={18} />,
                  href: "https://t.me/",
                },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-pink-500 transition text-sm"
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-[#16192a] rounded-lg">
                      {link.icon}
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {items.length > 0 && (
            <div className="mt-10 border-t border-white/10 pt-5">
              <h4 className="text-sm text-gray-400 mb-2">
                Recent Messages (Local)
              </h4>
              <ul className="space-y-3 max-h-40 overflow-y-auto no-scrollbar">
                {items.map((i) => (
                  <li
                    key={i.id}
                    className="bg-[#16192a] border border-white/10 rounded-xl p-3 text-xs text-gray-300"
                  >
                    <div className="text-[11px] text-gray-500 mb-1">
                      {new Date(i.createdAt).toLocaleString()}
                    </div>
                    <div className="font-medium text-white">
                      {i.name} ·{" "}
                      <span className="text-gray-400">{i.email}</span>
                    </div>
                    <div className="text-gray-400 mt-1 whitespace-pre-wrap">
                      {i.message}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
