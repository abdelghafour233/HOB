
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Settings, FileText, Eye, Save, LayoutDashboard, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { storage } from '../../services/storage';
import { Post, SiteSettings } from '../../types';

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(storage.getSettings());
  const [activeTab, setActiveTab] = useState<'posts' | 'settings'>('posts');
  const [message, setMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setPosts(storage.getPosts());
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      const updated = posts.filter(p => p.id !== id);
      storage.savePosts(updated);
      setPosts(updated);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storage.saveSettings(settings);
    setMessage('تم الحفظ بنجاح ✓');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm('سيتم الآن مسح "الكاش" القديم وإجبار الموقع على تحميل تصميم "Cyber Green" الجديد. سيتم تسجيل خروجك مؤقتاً. هل أنت مستعد؟')) {
      setIsUpdating(true);
      setTimeout(() => {
        // Fix: Changed storage.resetDatabase() to storage.hardReset() to match the exported storage interface defined in services/storage.ts
        storage.hardReset();
      }, 1500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {isUpdating && (
        <div className="fixed inset-0 bg-dark-950/90 backdrop-blur-xl z-[9999] flex items-center justify-center flex-col text-center">
          <RefreshCw size={60} className="text-primary animate-spin mb-6" />
          <h2 className="text-3xl font-black text-white mb-2">جاري تحديث النظام...</h2>
          <p className="text-primary/60 font-bold">يتم الآن تطبيق التصميم النيون الجديد ومسح البيانات القديمة</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-72 space-y-3">
          <div className="bg-dark-900 border border-primary/20 p-6 rounded-3xl mb-6 text-center shadow-[0_0_20px_rgba(16,185,129,0.05)]">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20 text-primary">
              <LayoutDashboard size={32} />
            </div>
            <h1 className="text-xl font-black text-white">لوحة التحكم</h1>
            <p className="text-[10px] text-primary/50 font-black uppercase mt-2 tracking-widest">Abdou Web Engine v2.0</p>
          </div>
          
          <button 
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl font-black transition-all duration-300 ${activeTab === 'posts' ? 'bg-primary text-dark-950 shadow-[0_0_20px_rgba(16,185,129,0.4)] translate-x-[-8px]' : 'bg-dark-900 text-slate-400 hover:text-primary border border-white/5'}`}
          >
            <FileText size={20} /> المقالات
          </button>
          
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl font-black transition-all duration-300 ${activeTab === 'settings' ? 'bg-primary text-dark-950 shadow-[0_0_20px_rgba(16,185,129,0.4)] translate-x-[-8px]' : 'bg-dark-900 text-slate-400 hover:text-primary border border-white/5'}`}
          >
            <Settings size={20} /> الإعدادات
          </button>

          <div className="pt-6 border-t border-white/5 mt-6">
            <Link 
              to="/"
              className="w-full flex items-center gap-4 p-5 rounded-2xl font-black bg-dark-800 text-slate-500 hover:bg-dark-700 hover:text-white transition-all border border-white/5"
            >
              <Eye size={20} /> معاينة الموقع
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-dark-900 p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -ml-32 -mt-32"></div>
          
          {activeTab === 'posts' ? (
            <div className="relative">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                  <h2 className="text-4xl font-black text-white">المحتوى</h2>
                  <p className="text-slate-500 mt-1 font-bold">إدارة وتعديل مقالات المدونة</p>
                </div>
                <Link to="/admin/new" className="bg-primary text-dark-950 font-black py-4 px-10 rounded-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                  <Plus size={20} /> تدوينة جديدة
                </Link>
              </div>

              <div className="grid gap-4">
                {posts.map(post => (
                  <div key={post.id} className="group bg-dark-800 border border-white/5 p-5 rounded-2xl flex items-center justify-between hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-4">
                      <img src={post.imageUrl} className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                      <div>
                        <h3 className="font-black text-white group-hover:text-primary transition-colors">{post.title}</h3>
                        <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded uppercase tracking-wider">{post.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link to={`/admin/edit/${post.id}`} className="p-3 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all"><Edit size={20}/></Link>
                      <button onClick={() => handleDelete(post.id)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={20}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative space-y-12">
              <div>
                <div className="mb-10">
                  <h2 className="text-4xl font-black text-white">الإعدادات العامة</h2>
                  <p className="text-slate-500 mt-1 font-bold">تخصيص هوية وأمان المدونة</p>
                </div>
                
                <form onSubmit={handleSaveSettings} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-primary uppercase tracking-[0.2em] mr-2">اسم المنصة</label>
                      <input 
                        type="text" 
                        value={settings.title}
                        onChange={(e) => setSettings({...settings, title: e.target.value})}
                        className="w-full p-5 rounded-2xl border border-white/10 bg-dark-800 text-white focus:border-primary outline-none transition-all focus:ring-4 focus:ring-primary/10 font-bold"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black text-primary uppercase tracking-[0.2em] mr-2">نص اللوجو</label>
                      <input 
                        type="text" 
                        value={settings.logo}
                        onChange={(e) => setSettings({...settings, logo: e.target.value})}
                        className="w-full p-5 rounded-2xl border border-white/10 bg-dark-800 text-white focus:border-primary outline-none transition-all focus:ring-4 focus:ring-primary/10 font-bold"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-xs font-black text-primary uppercase tracking-[0.2em] mr-2">كلمة مرور الإدارة</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        value={settings.adminPassword}
                        onChange={(e) => setSettings({...settings, adminPassword: e.target.value})}
                        className="w-full p-5 rounded-2xl border border-white/10 bg-dark-800 text-white focus:border-primary outline-none transition-all focus:ring-4 focus:ring-primary/10 font-mono"
                      />
                      <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30" />
                    </div>
                  </div>

                  {message && <p className="text-primary font-black text-center animate-pulse py-2 bg-primary/5 rounded-xl border border-primary/20">{message}</p>}
                  
                  <button type="submit" className="bg-primary text-dark-950 font-black py-5 px-16 rounded-2xl flex items-center gap-3 mx-auto hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-all active:scale-95">
                    <Save size={24} /> حفظ كافة التغييرات
                  </button>
                </form>
              </div>

              {/* Advanced Update Section */}
              <div className="pt-12 border-t border-white/10">
                <div className="bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-start gap-5">
                    <div className="p-4 bg-red-500/20 rounded-2xl text-red-500 animate-pulse">
                      <AlertTriangle size={36} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2">تحديث إجباري (Force Sync)</h3>
                      <p className="text-slate-400 text-sm max-w-md font-medium leading-relaxed">
                        إذا كنت لا تزال ترى التصميم القديم، هذا الزر سيقوم بمسح كافة ملفات الكاش والإعدادات المخزنة في متصفحك وتحميل النسخة النيون الجديدة فوراً.
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="group flex items-center gap-3 bg-red-500 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-lg shadow-red-500/20 hover:bg-red-600 hover:shadow-red-500/40 active:scale-95 whitespace-nowrap"
                  >
                    <RefreshCw size={24} className="group-hover:rotate-180 transition-transform duration-500" /> 
                    تحديث التصميم الآن
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
