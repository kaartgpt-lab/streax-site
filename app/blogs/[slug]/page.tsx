'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { KEYS, load } from '@/lib/storage';

type Post = { slug:string; title:string; excerpt?:string; body:string; publishedAt:string };

export default function BlogPostPage(){
  const params = useParams<{ slug: string }>();
  const posts = load<Post[]>(KEYS.posts, []);
  const post = posts.find(p=>p.slug === params.slug);

  if(!post) return <div><Link href='/blogs' className='text-zinc-400 hover:text-white'>← Back</Link><p className='mt-6'>Post not found.</p></div>;

  return (
    <article className='prose prose-invert max-w-none'>
      <Link href='/blogs' className='text-zinc-400 hover:text-white'>← Back</Link>
      <h1>{post.title}</h1>
      <p className='text-sm text-zinc-400'>{new Date(post.publishedAt).toLocaleString()}</p>
      <div className='mt-4 whitespace-pre-wrap'>{post.body}</div>
    </article>
  );
}
