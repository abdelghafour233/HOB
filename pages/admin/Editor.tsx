
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowRight, Eye, Image as ImageIcon, Link as LinkIcon, FileEdit } from 'lucide-react';
import { storage } from '../../services/storage';
import { Post, Category } from '../../types';
import { CATEGORIES } from '../../constants';

const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isPreview, setIsPreview] = useState(false);
  const [formData, setFormData] = useState<Omit<Post, 'id' | 'date' | 'author'>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: 'التقنية',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    isPublished: true,
    affiliateLink: ''
  });

  useEffect(() => {
    if (id) {
      const posts = storage.getPosts();
      const found = posts.find(p => p.id === id);
      if (found) {
        setFormData({
          title: found.title,
          slug: found.slug,
          content: found.content,
          excerpt: found.excerpt,
          category: found.category,
          imageUrl: found.imageUrl,
          isPublished: found.isPublished,
          affiliateLink: found.affiliateLink || ''
        });
      }
    }
  }, [id]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const posts = storage.getPosts();
    if (id) {
      const updated = posts.map(p => p.id === id ? { ...p, ...formData } : p);
      storage.savePosts(updated);
    } else {
      const newPost: Post = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        date: new Date().toLocaleDateString('ar-MA'),
        author: 'عبدالرحمن'
      };
      storage.savePosts([newPost, ...posts]);
    }
    navigate('/admin');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-5">
          <button onClick={() => navigate('/admin')} className="p-3 bg-dark-800 hover:bg-dark-700 text-primary rounded-2xl border border-emerald-900/30 transition-all">
            <ArrowRight size={24} />
          </button>
          <h1 className="text-3xl font-black text-white">{id ? 'تحرير المقال' : 'مقال جديد'}</h1>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            type="button" 
            onClick={() => setIsPreview(!isPreview)}
            className={`flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-black transition-all ${isPreview ? 'bg-primary text-dark-900' : 'bg-dark-800 text-slate-400 border border-emerald-900/30'}`}
          >
            <Eye size={20} /> {isPreview ? 'المحرر' : 'معاينة'}
          </button>
          <button 
            type="submit" 
            form="post-form"
            className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 bg-primary text-dark-900 px-10 py-3 rounded-2xl font-black btn-glow transition-all"
          >
            <Save size={20} /> حفظ
          </button>
        </div>
      </div>

      {isPreview ? (
        <div className="bg-dark-800 rounded-[2.5rem] p-10 max-w-4xl mx-auto border border-emerald-500/20 shadow-2xl">
          <h1 className="text-5xl font-black mb-8 text-white">{formData.title || 'بدون عنوان'}</h1>
          <img src={formData.imageUrl} className="w-full rounded-3xl aspect-video object-cover mb-10 border border-emerald-900/20" />
          <div className="prose prose-invert prose-emerald prose-xl max-w-none text-slate-300">
            {formData.content.split('\n').map((p, i) => <p key={i} className="mb-6">{p}</p>)}
          </div>
        </div>
      ) : (
        <form id="post-form" onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-dark-800 p-8 rounded-[2.5rem] border border-emerald-900/20 shadow-xl space-y-6">
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-6 text-3xl font-black rounded-2xl border-none bg-dark-700 text-white outline-none focus:ring-2 focus:ring-primary placeholder:text-slate-600"
                placeholder="اكتب العنوان هنا..."
                required
              />
              <textarea 
                rows={18}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full p-6 rounded-2xl border-none bg-dark-700 text-white outline-none focus:ring-2 focus:ring-primary font-medium leading-relaxed placeholder:text-slate-600"
                placeholder="ابدأ في كتابة القصة..."
                required
              ></textarea>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-dark-800 p-8 rounded-[2.5rem] border border-emerald-900/20 shadow-xl space-y-6">
              <h3 className="font-black text-emerald-500 text-sm uppercase tracking-widest flex items-center gap-2">
                <FileEdit size={16}/> إعدادات النشر
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-2">التصنيف</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                    className="w-full p-4 rounded-xl bg-dark-700 text-white border-none outline-none focus:ring-2 focus:ring-primary font-bold"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 mb-2">رابط الصورة</label>
                  <input 
                    type="text" 
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full p-4 rounded-xl bg-dark-700 text-white border-none outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 mb-2">رابط الأفلييت</label>
                  <input 
                    type="url" 
                    value={formData.affiliateLink}
                    onChange={(e) => setFormData({...formData, affiliateLink: e.target.value})}
                    placeholder="https://..."
                    className="w-full p-4 rounded-xl bg-dark-700 text-white border-none outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
                  />
                </div>
              </div>

              <label className="flex items-center gap-4 cursor-pointer p-4 rounded-2xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
                <input 
                  type="checkbox" 
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                  className="w-5 h-5 rounded border-none bg-dark-700 text-primary focus:ring-offset-dark-900"
                />
                <span className="text-sm font-black text-primary uppercase">نشر للعموم</span>
              </label>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Editor;
