'use client';
import SectionTitle from '@/components/SectionTitle';
import { useMemo } from 'react';

export default function AnalyticsPage(){
  const data = useMemo(()=>Array.from({length:12},(_,i)=>20+((i*7)%70)),[]);
  return (
    <section>
      <SectionTitle eyebrow='Analytics' title='Compare casinos across chains' subtitle='Synthetic demo charts (client-side only).'/>
      <div className='grid lg:grid-cols-3 gap-4'>
        {['Volume','Active Users','Retention'].map((k,i)=>(
          <div key={k} className='card p-6'>
            <div className='flex items-center justify-between'>
              <h4 className='text-white font-medium'>{k}</h4>
              <span className='text-xs text-zinc-400'>demo</span>
            </div>
            <div className='mt-4 h-32 bg-zinc-800/60 rounded-xl overflow-hidden grid grid-cols-12'>
              {data.map((h,idx)=>(
                <div key={idx} className='flex items-end p-0.5'>
                  <div className='w-full rounded-t bg-fuchsia-400/70' style={{height:`${(Math.sin((idx+i)*0.5)+1)*40+10}%`}}/>
                </div>
              ))}
            </div>
            <p className='mt-3 text-xs text-zinc-400'>Synthetic data for demo</p>
          </div>
        ))}
      </div>
    </section>
  );
}
