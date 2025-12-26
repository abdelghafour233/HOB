
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Zap, TrendingUp } from 'lucide-react';
import { storage } from '../services/storage';
import { Post } from '../types';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    setPosts(storage.getPosts().filter(p => p.isPublished));
  }, []);

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon/30 text-neon text-[10px] font-black uppercase tracking-[0.3em]">
              <Zap size={12} fill="currentColor" /> الإصدار 3.0 جاهز
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none italic uppercase">
              Abdou <span className="neon-text">Web</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-sm md:text-base font-bold leading-relaxed">
              بوابتك الحصرية إلى عالم التكنولوجيا، الربح من الإنترنت، وتطوير الذات بأسلوب عصري ومحتوى مغربي رائد.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Bento Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Featured */}
          {featuredPost && (
            <Link 
              to={`/post/${featuredPost.slug}`}
              className="lg:col-span-8 group relative bg-dark-card neon-border rounded-sm overflow-hidden aspect-[16/9] lg:aspect-auto h-[400px] lg:h-[600px] bento-item"
            >
              <img src={featuredPost.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 p-10 space-y-4">
                <span className="bg-neon text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest">{featuredPost.category}</span>
                <h2 className="text-3xl md:text-5xl font-black leading-tight group-hover:neon-text transition-colors">{featuredPost.title}</h2>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-1"><Clock size={12}/> {featuredPost.date}</span>
                  <span className="w-1 h-1 bg-neon rounded-full"></span>
                  <span>{featuredPost.author}</span>
                </div>
              </div>
            </Link>
          )}

          {/* Side Column */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6 h-full">
            <div className="bg-neon p-8 flex flex-col justify-between rounded-sm bento-item">
              <TrendingUp size={32} className="text-black" />
              <div>
                <h3 className="text-black text-2xl font-black italic uppercase leading-none mb-2">Join Our Tech Community</h3>
                <p className="text-black/70 text-xs font-bold uppercase tracking-wider">الأول في المغرب تقنياً</p>
              </div>
            </div>
            <div className="bg-dark-card neon-border p-8 flex flex-col justify-center rounded-sm bento-item">
              <h3 className="text-neon text-xl font-black uppercase tracking-tighter mb-4">Newsletter</h3>
              <input placeholder="Enter Email" className="bg-black border-b border-white/20 py-2 outline-none text-sm mb-4 focus:border-neon" />
              <button className="text-right text-xs font-black uppercase tracking-widest hover:neon-text flex items-center gap-2">Subscribe <ArrowLeft size={14}/></button>
            </div>
          </div>
        </div>

        {/* Other Posts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {otherPosts.map(post => (
            <article key={post.id} className="group flex flex-col space-y-6 bento-item">
              <Link to={`/post/${post.slug}`} className="relative aspect-video overflow-hidden rounded-sm bg-dark-card neon-border block">
                <img src={post.imageUrl} className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute top-4 right-4 bg-black/80 text-neon px-2 py-1 text-[8px] font-black uppercase tracking-widest">{post.category}</div>
              </Link>
              <div className="space-y-3">
                <Link to={`/post/${post.slug}`}>
                  <h3 className="text-xl font-black leading-snug group-hover:neon-text transition-all">{post.title}</h3>
                </Link>
                <p className="text-slate-500 text-xs font-bold leading-relaxed line-clamp-2">{post.excerpt}</p>
                <Link to={`/post/${post.slug}`} className="inline-flex items-center gap-2 text-neon text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                  Read Article <ArrowLeft size={12}/>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
