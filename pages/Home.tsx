
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, ChevronLeft, Zap, TrendingUp } from 'lucide-react';
import { storage } from '../services/storage';
import { Post } from '../types';
import AdSlot from '../components/AdSlot';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    setPosts(storage.getPosts().filter(p => p.isPublished));
  }, []);

  return (
    <div className="py-8 md:py-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 mb-16">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="relative text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-primary border border-emerald-500/20 text-sm font-black mb-4 animate-bounce">
            <Zap size={16} /> جديدنا اليوم
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            عبو ويب <span className="text-gradient">Abdou Web</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            استكشف عالم التقنية، مراجعات المنتجات الحصرية، وأخبار المغرب بلمسة إبداعية متطورة.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button className="px-8 py-3 bg-primary text-dark-900 font-black rounded-xl hover:scale-105 transition-all shadow-lg shadow-emerald-500/30">
              تصفح المقالات
            </button>
            <button className="px-8 py-3 bg-white dark:bg-dark-800 border border-emerald-500/30 font-black rounded-xl hover:bg-emerald-500/10 transition-all">
              انضم إلينا
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="text-primary" />
          <h2 className="text-2xl font-black">آخر التدوينات</h2>
        </div>

        <AdSlot label="إعلان رئيسي" className="mb-12 border-emerald-500/20" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group relative bg-white dark:bg-dark-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-emerald-900/20 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 glow-on-hover">
              <Link to={`/post/${post.slug}`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-primary text-dark-900 text-xs px-3 py-1.5 rounded-lg font-black uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="p-6 space-y-4">
                <div className="flex items-center text-slate-400 text-xs space-x-reverse space-x-3">
                  <div className="flex items-center"><Clock size={14} className="ml-1 text-primary"/> {post.date}</div>
                  <span className="opacity-20">|</span>
                  <div>{post.author}</div>
                </div>
                <Link to={`/post/${post.slug}`}>
                  <h2 className="text-xl font-black group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link to={`/post/${post.slug}`} className="inline-flex items-center gap-1 text-primary font-black text-sm group-hover:gap-2 transition-all">
                  إقرأ المزيد <ChevronLeft size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 bg-emerald-500/5 rounded-3xl border border-dashed border-emerald-500/30">
            <p className="text-emerald-500 italic font-bold">لا توجد مقالات منشورة حالياً في عبو ويب.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
