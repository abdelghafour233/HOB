
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, ChevronLeft, Zap, TrendingUp, Sparkles } from 'lucide-react';
import { storage } from '../services/storage';
import { Post } from '../types';
import AdSlot from '../components/AdSlot';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    setPosts(storage.getPosts().filter(p => p.isPublished));
  }, []);

  return (
    <div className="py-12 md:py-24 space-y-24">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4">
        <div className="absolute top-0 -left-10 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 -right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        
        <div className="relative text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/10 text-primary border border-emerald-500/20 text-sm font-black tracking-wide uppercase animate-bounce">
            <Sparkles size={16} /> مدونة المستقبل وصلت
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            عبو <span className="text-gradient">ويب</span>
          </h1>
          <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
            الوجهة المفضلة للمغاربة لاكتشاف التقنية، مراجعات المنتجات، وطرق الربح من الإنترنت بأسلوب احترافي.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <button className="px-10 py-4 bg-primary text-dark-900 font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-emerald-500/30 flex items-center gap-2">
              ابدأ الاستكشاف <ChevronLeft size={20}/>
            </button>
            <button className="px-10 py-4 bg-dark-800 border border-emerald-500/30 text-white font-black rounded-2xl hover:bg-emerald-500/10 transition-all">
              آخر الأخبار
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12 border-r-8 border-primary pr-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-primary" size={32} />
            <h2 className="text-3xl md:text-4xl font-black">أحدث التدوينات</h2>
          </div>
        </div>

        <AdSlot label="إعلان ممول" className="mb-16 border-emerald-900/30 bg-emerald-900/5" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article key={post.id} className="group relative bg-dark-800 rounded-[2rem] overflow-hidden border border-emerald-900/20 hover:border-primary/50 transition-all duration-500 hover:-translate-y-3 glow-on-hover">
              <Link to={`/post/${post.slug}`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-primary text-dark-900 text-xs px-4 py-1.5 rounded-xl font-black uppercase shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="p-8 space-y-5">
                <div className="flex items-center text-slate-500 text-xs font-bold space-x-reverse space-x-4">
                  <div className="flex items-center gap-1.5"><Clock size={14} className="text-primary"/> {post.date}</div>
                  <span className="opacity-30">/</span>
                  <div className="uppercase tracking-widest">{post.author}</div>
                </div>
                <Link to={`/post/${post.slug}`}>
                  <h2 className="text-2xl font-black leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed font-medium">
                  {post.excerpt}
                </p>
                <div className="pt-4 border-t border-emerald-900/10">
                  <Link to={`/post/${post.slug}`} className="inline-flex items-center gap-2 text-primary font-black text-sm hover:gap-4 transition-all">
                    إقرأ التفاصيل <ChevronLeft size={18} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-24 bg-emerald-950/10 rounded-[3rem] border border-dashed border-emerald-500/20">
            <Zap size={48} className="mx-auto text-primary mb-4 opacity-30" />
            <p className="text-slate-500 text-xl font-bold">لا يوجد محتوى في هذا القسم حالياً.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
