
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronLeft, Zap, Sparkles } from 'lucide-react';
import { storage } from '../services/storage';
import { Post } from '../types';
import AdSlot from '../components/AdSlot';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    setPosts(storage.getPosts().filter(p => p.isPublished));
  }, []);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-8 animate-pulse">
            <Zap size={14} /> مرحباً بك في عبو ويب
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tighter">
            عالم <span className="text-primary text-neon">التقنية</span> <br className="hidden md:block"/> بين يديك
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
            نقدم لك آخر أخبار التكنولوجيا، مراجعات حصرية، وأفضل استراتيجيات الربح من الإنترنت في المغرب.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <AdSlot label="إعلان رئيسي" className="mb-16 border-primary/10 bg-dark-900" />

        <div className="flex items-center gap-3 mb-12 border-r-4 border-primary pr-4">
          <Sparkles className="text-primary" />
          <h2 className="text-3xl font-black text-white">آخر المقالات</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group bg-dark-900 rounded-3xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500 neon-glow flex flex-col h-full">
              <Link to={`/post/${post.slug}`} className="relative aspect-video overflow-hidden block">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-dark-950 text-[10px] px-3 py-1 rounded-lg font-black uppercase">
                    {post.category}
                  </span>
                </div>
              </Link>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold mb-4 uppercase tracking-wider">
                  <div className="flex items-center gap-1"><Clock size={12} className="text-primary"/> {post.date}</div>
                  <span>/</span>
                  <div className="text-white/60">{post.author}</div>
                </div>
                <Link to={`/post/${post.slug}`}>
                  <h3 className="text-xl font-black mb-4 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5">
                  <Link to={`/post/${post.slug}`} className="inline-flex items-center gap-2 text-primary font-black text-xs hover:gap-4 transition-all">
                    قراءة المقال <ChevronLeft size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
