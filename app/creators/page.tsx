import SectionTitle from '@/components/SectionTitle';

export default function CreatorsPage(){
  const cards = [
    { h:'Creator Programs', p:'Funnels, wager races, and loyalty systems that actually scale.'},
    { h:'Attribution', p:'Track creator-driven revenue with clean UTMs and signatures.'},
    { h:'Payouts', p:'Automated, transparent rev-share statements with on-chain proofs.'},
  ];
  return (
    <section>
      <SectionTitle eyebrow='Creators' title='Partner with top creators' subtitle='Clear comp, transparent tracking, zero drama.' />
      <div className='grid md:grid-cols-3 gap-4'>
        {cards.map((c,i)=>(
          <div key={i} className='card p-6'>
            <h3 className='text-white font-medium'>{c.h}</h3>
            <p className='text-sm text-zinc-400 mt-1'>{c.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
