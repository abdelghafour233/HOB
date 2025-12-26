
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Share2, ArrowRight, Bookmark, Tag } from 'lucide-react';
import { storage } from '../services/storage';
import { Post } from '../types';

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const allPosts = storage.getPosts();
    const found = allPosts.find(p => p.slug === slug);
    if (found) setPost(found);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return (
    <div className="max-w-7xl mx-auto px-6 py-40 text-center">
      <h2 className="text-9xl font-black text-neon italic">404</h2>
      <Link to="/" className="text-xs font-black uppercase tracking-[0.5em] hover:text-neon mt-10 block">Go Home</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <header className="space-y-10 text-center md:text-right">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-10">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-neon">
            <Tag size={12} /> {post.category}
          </div>
          <div className="flex items-center gap-6 text-slate-500 text-[10px] font-black uppercase tracking-widest">
            <span className="flex items-center gap-1"><Clock size={12}/> {post.date}</span>
            <span className="flex items-center gap-1"><User size={12}/> {post.author}</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-7xl font-black leading-tight tracking-tighter uppercase italic">
          {post.title}
        </h1>
        
        <div className="relative aspect-video rounded-sm overflow-hidden bg-dark-card neon-border">
          <img src={post.imageUrl} className="w-full h-full object-cover opacity-80" alt={post.title} />
        </div>
      </header>

      <div className="mt-20">
        <article className="prose prose-invert prose-emerald prose-lg max-w-none">
          <div className="text-slate-300 text-xl leading-[2.2] font-medium space-y-10">
            {post.content.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </article>

        {post.affiliateLink && (
          <div className="mt-20 p-12 bg-neon rounded-sm text-black text-center space-y-8">
            <h3 className="text-3xl font-black italic uppercase leading-none">Special Offer</h3>
            <p className="text-black/70 font-bold max-w-lg mx-auto">هذا المنتج تمت مراجعته بعناية وننصح به لمتابعي عبو ويب المتميزين.</p>
            <a 
              href={post.affiliateLink} 
              target="_blank" 
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-black text-sm uppercase tracking-widest hover:opacity-80 transition-all"
            >
              Get It Now <ArrowRight size={20} />
            </a>
          </div>
        )}
      </div>

      <div className="mt-32 border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <button className="p-4 rounded-full border border-white/10 hover:border-neon hover:text-neon transition-all"><Share2 size={20}/></button>
          <button className="p-4 rounded-full border border-white/10 hover:border-neon hover:text-neon transition-all"><Bookmark size={20}/></button>
        </div>
        <Link to="/" className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 hover:text-neon flex items-center gap-2 transition-all">
          <ArrowRight size={16}/> Back to Feed
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;
