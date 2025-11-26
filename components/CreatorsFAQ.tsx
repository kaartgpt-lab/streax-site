"use client";

type FaqItem = {
  q: string;
  a: React.ReactNode;
};

const faqItems: FaqItem[] = [
  {
    q: "How are deals verified?",
    a: (
      <>
        <p className="text-sm text-gray-400 mb-4">
          Tanzanite verifies deals to ensure that the system is accurate and
          transparent without exposing confidential details. Each verification
          level includes the criteria from the level below it.
        </p>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>
            <span className="font-semibold text-white">Level 0:</span> The deal
            has not been verified by Tanzanite.
          </li>
          <li>
            <span className="font-semibold text-green-400">Level 1:</span> Deal
            details confirmed by the creator and the casino.
          </li>
          <li>
            <span className="font-semibold text-yellow-400">Level 2:</span>{" "}
            Tanzanite has verified the terms of the deal.
          </li>
          <li>
            <span className="font-semibold text-purple-400">Level 3:</span>{" "}
            Advanced verification (coming soon).
          </li>
        </ul>
      </>
    ),
  },
  {
    q: "What type of insight is given within a deal?",
    a: "Creators may share insights like deal value, terms, and verification level — allowing transparent understanding of creator partnerships.",
  },
  {
    q: "How can I trust the information is legit?",
    a: "All verified data is submitted directly by creators and confirmed through Tanzanite’s multi-step verification.",
  },
  {
    q: "How can I get verified?",
    a: "Sign in to Tanzanite, complete your creator profile, and apply for verification. Our team assigns levels after reviewing your submission.",
  },
  {
    q: "How can I dispute a creator’s deal terms?",
    a: "Disputes can be raised through Tanzanite’s verification support portal. Reports are manually reviewed to ensure fairness and accuracy.",
  },
];

export default function CreatorsFaq() {
  return (
    <section className="mt-32 w-full max-w-2xl px-6 text-white border border-gray-800 rounded-2xl bg-[#0b0d17] mx-auto py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center tracking-wide">
        Frequently Asked Questions
      </h2>

      <div className="divide-y divide-gray-800">
        {faqItems.map((item, index) => (
          <details key={index} className="group py-6 transition-all">
            <summary className="flex justify-between items-center cursor-pointer text-base md:text-lg font-medium text-gray-200">
              {item.q}
              <span className="transition-transform duration-300 group-open:rotate-45 text-gray-400">
                +
              </span>
            </summary>
            <div className="mt-3 text-gray-400 leading-relaxed text-sm">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
