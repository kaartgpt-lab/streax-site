import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';

export default function Page() {
  return (
    <section>
      <div className='relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-700/20 via-fuchsia-700/10 to-cyan-700/10 p-8'>
        <h1 className='text-4xl md:text-6xl font-semibold tracking-tight'>Your edge in iGaming & crypto</h1>
        <p className='mt-4 text-lg text-zinc-300 max-w-prose'>A clean, fast Next.js app with pages for Casino, Creators, Analytics, Jobs, Blogs and Contact—no backend required.</p>
        <div className='mt-6 flex flex-wrap gap-3'>
          <Link href='/analytics' className='btn btn-primary'>Explore Analytics</Link>
          <Link href='/blogs' className='btn btn-ghost'>Read the Blog</Link>
        </div>
      </div>
      <div className='mt-12'>
        <SectionTitle eyebrow='What you get' title='Pages included' subtitle='Focused defaults you can expand anytime.'/>
        <div className='grid md:grid-cols-3 gap-4'>
          {['Casino','Creators','Analytics','Jobs','Blogs','Contact'].map(x => (
            <Link href={`/${x.toLowerCase()}`} key={x} className='card p-6 hover:bg-white/10 transition'>
              <h3 className='text-white font-medium'>{x}</h3>
              <p className='text-sm text-zinc-400 mt-1'>Visit the {x} page</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
