
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Share2, ExternalLink, ChevronRight, Bookmark, LayoutGrid } from 'lucide-react';
import { storage } from '../services/storage';
import { Post } from '../types';
import AdSlot from '../components/AdSlot';

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const allPosts = storage.getPosts();
    const found = allPosts.find(p => p.slug === slug);
    if (found) setPost(found);
  }, [slug]);

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-7xl font-black text-primary mb-6">404</h2>
        <p className="text-slate-400 text-xl mb-10">المقال تبخر في فضاء الإنترنت!</p>
        <Link to="/" className="px-10 py-4 bg-primary text-dark-900 font-black rounded-2xl">العودة للرئيسية</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm font-black text-slate-500 mb-12 space-x-reverse space-x-3">
        <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
        <ChevronRight size={14} />
        <Link to={`/category/${post.category}`} className="text-primary uppercase tracking-widest">{post.category}</Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
          <header className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-white">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-8 py-6 border-y border-emerald-900/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black">
                  {post.author[0]}
                </div>
                <span className="font-bold text-slate-300">{post.author}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 font-bold">
                <Clock size={18} className="text-primary" /> {post.date}
              </div>
              <div className="mr-auto flex items-center gap-4">
                <button className="p-3 rounded-xl bg-dark-800 border border-emerald-900/30 text-slate-400 hover:text-primary transition-all">
                  <Share2 size={20} />
                </button>
                <button className="p-3 rounded-xl bg-dark-800 border border-emerald-900/30 text-slate-400 hover:text-primary transition-all">
                  <Bookmark size={20} />
                </button>
              </div>
            </div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-emerald-900/20 group">
              <img src={post.imageUrl} alt={post.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[3rem]"></div>
            </div>
          </header>

          <AdSlot label="إعلان بداية المقال" className="bg-emerald-950/5 border-emerald-900/20" />
          
          <article className="prose prose-invert prose-emerald prose-lg max-w-none leading-[2] font-medium text-slate-300">
            {post.content.split('\n').map((para, i) => (
              <p key={i} className="mb-10 text-xl">{para}</p>
            ))}
          </article>

          {post.affiliateLink && (
            <div className="my-20 p-10 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/30 rounded-[3rem] text-center relative overflow-hidden group">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
              <h3 className="text-3xl font-black mb-6 relative z-10 text-white">اغتنم هذه الفرصة الحصرية!</h3>
              <p className="text-slate-400 mb-10 max-w-lg mx-auto relative z-10 font-bold text-lg">هذا المنتج تمت مراجعته بدقة من طرف فريق عبو ويب وننصح به بشدة.</p>
              <a 
                href={post.affiliateLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-primary text-dark-900 font-black py-5 px-16 rounded-2xl shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-all relative z-10 text-xl"
              >
                معاينة المنتج الآن <ExternalLink size={24} className="mr-3" />
              </a>
            </div>
          )}

          <AdSlot label="إعلان نهاية المقال" className="bg-emerald-950/5 border-emerald-900/20" />
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-12">
            <div className="bg-dark-800 p-10 rounded-[3rem] border border-emerald-900/30 shadow-xl">
              <h4 className="font-black text-2xl mb-8 flex items-center gap-3 border-r-4 border-primary pr-4">
                الناشر
              </h4>
              <p className="text-slate-400 font-medium leading-loose">
                عبو ويب هي منصة رقمية رائدة، تهدف لتقديم محتوى تقني ومعرفي عالي الجودة للجمهور المغربي والعربي، مع التركيز على الابتكار والمصداقية.
              </p>
            </div>
            
            <AdSlot label="إعلان جانبي" className="min-h-[500px] border-emerald-900/20" />
            
            <div className="bg-primary p-10 rounded-[3rem] shadow-2xl shadow-emerald-500/20 group hover:-rotate-2 transition-transform">
              <h4 className="font-black text-dark-900 text-2xl mb-4">النشرة الإخبارية</h4>
              <p className="text-dark-900/70 font-bold mb-8">كن أول من يحصل على أسرار الأفلييت والتقنية.</p>
              <div className="space-y-4">
                <input type="email" placeholder="بريدك الإلكتروني" className="w-full p-4 rounded-2xl bg-dark-900 text-white border-none outline-none placeholder:text-slate-600 focus:ring-2 focus:ring-dark-900 transition-all" />
                <button className="w-full py-4 bg-dark-900 text-primary font-black rounded-2xl hover:bg-black transition-colors">اشترك الآن</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PostDetail;
