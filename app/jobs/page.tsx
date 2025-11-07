'use client';
import SectionTitle from '@/components/SectionTitle';
import { useEffect, useMemo, useState } from 'react';
import { KEYS, load, save } from '@/lib/storage';

export default function JobsPage(){
  const [jobs, setJobs] = useState(()=>load(KEYS.jobs, [] as any[]));
  const [title, setTitle] = useState('');
  const [loc, setLoc] = useState('Remote');
  const [type, setType] = useState('Full-time');
  const [desc, setDesc] = useState('');

  useEffect(()=>save(KEYS.jobs, jobs),[jobs]);
  const ordered = useMemo(()=>[...jobs].sort((a,b)=>new Date(b.postedAt).getTime()-new Date(a.postedAt).getTime()),[jobs]);

  function addJob(){
    if(!title.trim() || !desc.trim()) return;
    setJobs([{ id: crypto.randomUUID(), title, location: loc, type, description: desc, postedAt: new Date().toISOString() }, ...jobs]);
    setTitle(''); setDesc('');
  }

  return (
    <section>
      <SectionTitle eyebrow='Jobs' title='Open roles' subtitle='Local-only demo. Jobs are saved to your browser.' />
      <div className='card p-6'>
        <h3 className='text-white font-medium'>Post a job (local)</h3>
        <div className='mt-3 grid md:grid-cols-2 gap-3'>
          <input className='w-full rounded-lg bg-zinc-900/60 border border-white/10 px-3 py-2' placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)}/>
          <input className='w-full rounded-lg bg-zinc-900/60 border border-white/10 px-3 py-2' placeholder='Location' value={loc} onChange={e=>setLoc(e.target.value)}/>
          <input className='w-full rounded-lg bg-zinc-900/60 border border-white/10 px-3 py-2' placeholder='Type' value={type} onChange={e=>setType(e.target.value)}/>
          <textarea rows={4} className='md:col-span-2 w-full rounded-lg bg-zinc-900/60 border border-white/10 px-3 py-2' placeholder='Description' value={desc} onChange={e=>setDesc(e.target.value)} />
        </div>
        <button onClick={addJob} className='btn btn-primary mt-3'>Post Job</button>
      </div>

      <ul className='mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {ordered.length===0 && <p className='text-zinc-400'>No jobs posted yet.</p>}
        {ordered.map(j=>(
          <li key={j.id} className='card p-5'>
            <h4 className='text-lg font-medium'>{j.title}</h4>
            <p className='text-xs text-zinc-400 mt-1'>{j.location} • {j.type}</p>
            <p className='text-sm text-zinc-300 mt-2'>{j.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
