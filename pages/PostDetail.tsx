
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Share2, ExternalLink, ChevronRight } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">المقال غير موجود!</h2>
        <Link to="/" className="text-primary mt-4 inline-block">العودة للرئيسية</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-slate-400 mb-8 space-x-reverse space-x-2">
        <Link to="/" className="hover:text-primary">الرئيسية</Link>
        <ChevronRight size={14} />
        <Link to={`/category/${post.category}`} className="hover:text-primary">{post.category}</Link>
        <ChevronRight size={14} />
        <span className="text-slate-600 dark:text-slate-300 truncate">{post.title}</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-center"><User size={18} className="ml-2 text-primary" /> {post.author}</div>
          <div className="flex items-center"><Clock size={18} className="ml-2 text-primary" /> {post.date}</div>
          <div className="flex items-center"><Share2 size={18} className="ml-2 text-primary" /> مشاركة</div>
        </div>
        <img src={post.imageUrl} alt={post.title} className="w-full rounded-2xl shadow-xl aspect-video object-cover" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3">
          <AdSlot label="إعلان بداية المقال" />
          
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none leading-relaxed">
            {post.content.split('\n').map((para, i) => (
              <p key={i} className="mb-6">{para}</p>
            ))}
          </div>

          <AdSlot label="إعلان وسط المقال" />

          {post.affiliateLink && (
            <div className="my-10 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl text-center">
              <h3 className="text-xl font-bold mb-4">هل أعجبك هذا المنتج؟</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">يمكنك الحصول عليه الآن من خلال الرابط التالي والحصول على أفضل العروض.</p>
              <a 
                href={post.affiliateLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95"
              >
                شراء الآن <ExternalLink size={18} className="mr-2" />
              </a>
            </div>
          )}

          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-12 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">الوسوم:</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-bold">{post.category}</span>
            </div>
            <button className="flex items-center gap-2 text-primary hover:underline font-bold">
              <Share2 size={18} /> مشاركة المقال
            </button>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h4 className="font-bold border-r-4 border-primary pr-3 mb-4">عن الكاتب</h4>
              <p className="text-sm text-slate-500">محرر متخصص في عبو ويب، يحرص على تقديم أدق المعلومات التقنية والتحليلات الموضوعية.</p>
            </div>
            <AdSlot label="إعلان جانبي" className="min-h-[300px]" />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PostDetail;
