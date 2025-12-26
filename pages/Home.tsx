
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, ChevronLeft } from 'lucide-react';
import { storage } from '../services/storage';
import { Post } from '../types';
import AdSlot from '../components/AdSlot';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    setPosts(storage.getPosts().filter(p => p.isPublished));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          مرحباً بك في عبو ويب
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          مصدرك الأول للأخبار التقنية، مراجعات المنتجات، وأفضل نصائح تطوير الذات في المغرب والعالم العربي.
        </p>
      </div>

      <AdSlot label="إعلان رئيسي" className="mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800">
            <Link to={`/post/${post.slug}`}>
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>
            </Link>
            <div className="p-6">
              <div className="flex items-center text-slate-400 text-xs mb-3 space-x-reverse space-x-3">
                <div className="flex items-center"><Clock size={14} className="ml-1"/> {post.date}</div>
                <div>•</div>
                <div>بواسطة {post.author}</div>
              </div>
              <Link to={`/post/${post.slug}`}>
                <h2 className="text-xl font-bold mb-3 hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
              </Link>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
              <Link to={`/post/${post.slug}`} className="inline-flex items-center text-primary font-bold hover:underline text-sm">
                اقرأ المزيد <ChevronLeft size={16} className="mr-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
          <p className="text-slate-400 italic">لا توجد مقالات منشورة حالياً.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
