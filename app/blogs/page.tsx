'use client';
import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import { useEffect, useMemo, useState } from 'react';
import { KEYS, load, save, slugify } from '@/lib/storage';

type Post = { slug:string; title:string; excerpt?:string; body:string; publishedAt:string };

export default function BlogsPage(){
  const [posts, setPosts] = useState(()=>load<Post[]>(KEYS.posts, []));
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');

  useEffect(()=>save(KEYS.posts, posts),[posts]);
  const ordered = useMemo(()=>[...posts].sort((a,b)=>new Date(b.publishedAt).getTime()-new Date(a.publishedAt).getTime()),[posts]);

  function addPost(){
    if(!title.trim() || !body.trim()) return;
    const base = slugify(title);
    let slug = base; let n = 1;
    while(posts.some(p=>p.slug===slug)) { slug = `${base}-${n++}`; }
    setPosts([{ slug, title, excerpt, body, publishedAt: new Date().toISOString() }, ...posts]);
    setTitle(''); setExcerpt(''); setBody('');
  }

  return (
    <section>
      <SectionTitle eyebrow='Blogs' title='Latest posts' subtitle='Local-only demo. Posts are saved to your browser.'/>
      <div className='card p-6'>
        <h3 className='text-white font-medium'>Write a post (local)</h3>
        <div className='mt-3 grid md:grid-cols-2 gap-3'>
          <input className='w-full rounded-lg bg-zinc-900/60 border border-white/10 px-3 py-2' placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)}/>
          <input className='w-full rounded-lg bg-zinc-900/60 border border-white/10 px-3 py-2' placeholder='Excerpt (optional)' value={excerpt} onChange={e=>setExcerpt(e.target.value)}/>
          <textarea rows={6} className='md:col-span-2 w-full rounded-lg bg-zinc-900/60 border border-white/10 px-3 py-2' placeholder='Body (plain/markdown)' value={body} onChange={e=>setBody(e.target.value)} />
        </div>
        <button onClick={addPost} className='btn btn-primary mt-3'>Publish</button>
      </div>

      <ul className='mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {ordered.length===0 && <p className='text-zinc-400'>No posts yet.</p>}
        {ordered.map(p=>(
          <li key={p.slug} className='card p-5'>
            <Link href={`/blogs/${p.slug}`} className='text-lg font-medium hover:underline'>{p.title}</Link>
            <p className='text-xs text-zinc-400 mt-1'>{new Date(p.publishedAt).toDateString()}</p>
            {p.excerpt && <p className='text-sm text-zinc-300 mt-2 line-clamp-3'>{p.excerpt}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
