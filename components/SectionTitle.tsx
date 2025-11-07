export default function SectionTitle({eyebrow, title, subtitle}:{eyebrow?:string; title:string; subtitle?:string;}) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-10">
      {eyebrow && <p className="uppercase tracking-widest text-xs text-indigo-400 mb-2">{eyebrow}</p>}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">{title}</h2>
      {subtitle && <p className="mt-3 text-zinc-400">{subtitle}</p>}
    </div>
  );
}
