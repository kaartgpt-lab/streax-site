import SectionTitle from '@/components/SectionTitle';

export default function CasinoPage(){
  const features = [
    { h: 'Operator Playbooks', p: 'Acquisition, retention & VIP systems tuned to on-chain behavior.' },
    { h: 'Fairness & Compliance', p: 'Transparent odds, provably fair workflows, and KYC guardrails.' },
    { h: 'Payments & Chains', p: 'ETH / SOL / BSC / TRX integrations with fallbacks.' },
  ];
  return (
    <section>
      <SectionTitle eyebrow='Casino' title='Operational excellence for crypto casinos' subtitle='Grow volume with reliable funnels and clear analytics.' />
      <div className='grid md:grid-cols-3 gap-4'>
        {features.map((f,i)=>(
          <div key={i} className='card p-6'>
            <h3 className='text-white font-medium'>{f.h}</h3>
            <p className='text-sm text-zinc-400 mt-1'>{f.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
