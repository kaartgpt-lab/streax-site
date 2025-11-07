'use client';
import SectionTitle from '@/components/SectionTitle';
import { useEffect, useState } from 'react';
import { KEYS, load, save } from '@/lib/storage';

type Msg = { id:string; name:string; email:string; message:string; createdAt:string };

export default function ContactPage(){
  const [items, setItems] = useState<Msg[]>(()=>load<Msg[]>(KEYS.contacts, []));
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [msg,setMsg] = useState('');

  useEffect(()=>save(KEYS.contacts, items),[items]);

  function submit(e: React.FormEvent){
    e.preventDefault();
    if(!name.trim() || !email.trim() || !msg.trim()) return;
    setItems([{ id: crypto.randomUUID(), name, email, message: msg, createdAt: new Date().toISOString() }, ...items]);
    setName(''); setEmail(''); setMsg('');
  }

  return (
    <section>
      <SectionTitle eyebrow='Contact' title='Tell us about your goals' subtitle='Local-only demo. Submissions are saved in your browser.'/>
      <form onSubmit={submit} className='card p-6'>
        <div className='grid sm:grid-cols-2 gap-3'>
          <input className='w-full rounded-lg bg-zinc-900/60 border border-white/10 px-3 py-2' placeholder='Your name' value={name} onChange={e=>setName(e.target.value)} />
          <input className='w-full rounded-lg bg-zinc-900/60 border border-white/10 px-3 py-2' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
          <textarea rows={5} className='sm:col-span-2 w-full rounded-lg bg-zinc-900/60 border border-white/10 px-3 py-2' placeholder='Message' value={msg} onChange={e=>setMsg(e.target.value)} />
        </div>
        <button className='btn btn-primary mt-3' type='submit'>Send</button>
      </form>

      {items.length>0 && (
        <div className='mt-8'>
          <h3 className='text-lg font-medium mb-3'>Submissions (local)</h3>
          <ul className='space-y-3'>
            {items.map(i=> (
              <li key={i.id} className='card p-4'>
                <div className='text-sm text-zinc-400'>{new Date(i.createdAt).toLocaleString()}</div>
                <div className='font-medium'>{i.name} · {i.email}</div>
                <div className='text-zinc-200 mt-2 whitespace-pre-wrap'>{i.message}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
