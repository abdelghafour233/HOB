
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Share2, ExternalLink, ChevronRight, Bookmark } from 'lucide-react';
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
        <h2 className="text-4xl font-black mb-4">404</h2>
        <p className="text-slate-500 mb-8">عذراً، المقال الذي تبحث عنه غير متوفر حالياً.</p>
        <Link to="/" className="px-8 py-3 bg-primary text-dark-900 font-black rounded-xl">العودة للرئيسية</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm font-bold text-slate-400 mb-10 space-x-reverse space-x-2">
        <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
        <ChevronRight size={14} />
        <Link to={`/category/${post.category}`} className="text-primary">{post.category}</Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <header className="mb-10 space-y-6">
            <h1 className="text-4xl md:text-6xl font-black leading-[1.2] tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm font-bold border-y border-emerald-500/10 py-4">
              <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"><User size={16}/></div> {post.author}</div>
              <div className="flex items-center gap-2"><Clock size={18} className="text-primary" /> {post.date}</div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"><Share2 size={18} /> مشاركة</div>
              <div className="mr-auto"><Bookmark size={20} className="hover:text-primary cursor-pointer transition-colors" /></div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/10">
              <img src={post.imageUrl} alt={post.title} className="w-full aspect-video object-cover" />
            </div>
          </header>

          <AdSlot label="إعلان بداية المقال" className="border-emerald-500/10" />
          
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none leading-[1.8] font-medium text-slate-700 dark:text-slate-300">
            {post.content.split('\n').map((para, i) => (
              <p key={i} className="mb-8">{para}</p>
            ))}
          </div>

          {post.affiliateLink && (
            <div className="my-16 p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-24 h-24 bg-primary/10 blur-3xl rounded-full"></div>
              <h3 className="text-2xl font-black mb-4 relative z-10">عرض خاص لمتابعي عبو ويب</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto relative z-10">لقد اخترنا لك هذا المنتج بعناية. اضغط على الزر أدناه لمعاينة السعر الحالي.</p>
              <a 
                href={post.affiliateLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-primary text-dark-900 font-black py-4 px-12 rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all relative z-10"
              >
                شراء الآن <ExternalLink size={20} className="mr-3" />
              </a>
            </div>
          )}

          <AdSlot label="إعلان نهاية المقال" className="border-emerald-500/10" />
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="sticky top-28 space-y-8">
            <div className="bg-slate-50 dark:bg-dark-800 p-8 rounded-[2rem] border border-emerald-500/10">
              <h4 className="font-black text-xl mb-6 flex items-center gap-2 border-r-4 border-primary pr-3">
                عن الكاتب
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                فريق عبو ويب يضم نخبة من التقنيين والمحررين المغاربة المهتمين بنشر الوعي الرقمي وتطوير الذات في العالم العربي.
              </p>
            </div>
            
            <AdSlot label="إعلان جانبي" className="min-h-[400px] border-emerald-500/10" />
            
            <div className="bg-primary text-dark-900 p-8 rounded-[2rem] shadow-xl shadow-emerald-500/20">
              <h4 className="font-black text-xl mb-4">اشترك في القائمة</h4>
              <p className="text-sm font-bold mb-6 opacity-80">كن أول من يتوصل بأخبار التقنية والأفلييت.</p>
              <div className="space-y-3">
                <input type="email" placeholder="بريدك الإلكتروني" className="w-full p-3 rounded-xl bg-dark-900/10 border border-dark-900/20 placeholder:text-dark-900/40 outline-none" />
                <button className="w-full py-3 bg-dark-900 text-primary font-black rounded-xl">اشترك الآن</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PostDetail;
