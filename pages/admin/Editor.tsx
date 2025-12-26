
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowRight, Eye, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
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
    imageUrl: 'https://picsum.photos/seed/post/800/400',
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
      // Edit mode
      const updated = posts.map(p => p.id === id ? {
        ...p,
        ...formData,
        date: p.date // Keep original date or update? Let's keep for now.
      } : p);
      storage.savePosts(updated);
    } else {
      // New post
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

  const generateSlug = () => {
    const slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    setFormData({ ...formData, slug });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <ArrowRight size={24} />
          </button>
          <h1 className="text-2xl font-bold">{id ? 'تعديل مقال' : 'إضافة مقال جديد'}</h1>
        </div>
        <div className="flex gap-4">
          <button 
            type="button" 
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-2 px-6 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Eye size={20} /> {isPreview ? 'العودة للمحرر' : 'معاينة المقال'}
          </button>
          <button 
            type="submit" 
            form="post-form"
            className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-bold shadow-lg transition-all"
          >
            <Save size={20} /> حفظ المقال
          </button>
        </div>
      </div>

      {isPreview ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-4xl mx-auto shadow-sm border border-slate-100 dark:border-slate-800">
          <h1 className="text-4xl font-extrabold mb-6">{formData.title}</h1>
          <img src={formData.imageUrl} className="w-full rounded-xl aspect-video object-cover mb-8" />
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
            {formData.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      ) : (
        <form id="post-form" onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">عنوان المقال</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  onBlur={generateSlug}
                  className="w-full p-4 text-xl font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                  placeholder="أدخل عنواناً جذاباً..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">محتوى المقال</label>
                <textarea 
                  rows={20}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none font-sans leading-relaxed"
                  placeholder="ابدأ في كتابة محتوى المقال هنا..."
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold border-r-4 border-primary pr-2">خصائص المقال</h3>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">الرابط الدائم (Slug)</label>
                <input 
                  type="text" 
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full p-2 text-sm rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">التصنيف</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                  className="w-full p-2 text-sm rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">رابط الصورة البارزة</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="flex-grow p-2 text-sm rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                  />
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded"><ImageIcon size={18}/></div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">وصف مختصر (Excerpt)</label>
                <textarea 
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  className="w-full p-2 text-sm rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                  placeholder="ملخص للمقال يظهر في الصفحة الرئيسية..."
                ></textarea>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span className="text-sm font-bold">نشر المقال فوراً</span>
                </label>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900 shadow-sm space-y-4">
              <h3 className="font-bold flex items-center gap-2 text-blue-700 dark:text-blue-400">
                <LinkIcon size={18}/> خيارات الأفلييت
              </h3>
              <p className="text-xs text-blue-600 dark:text-blue-300">أضف رابط التسويق بالعمولة ليظهر كزر "شراء الآن" في نهاية المقال.</p>
              <input 
                type="url" 
                value={formData.affiliateLink}
                onChange={(e) => setFormData({...formData, affiliateLink: e.target.value})}
                placeholder="https://amazon.com/..."
                className="w-full p-2 text-sm rounded border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 outline-none"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Editor;
