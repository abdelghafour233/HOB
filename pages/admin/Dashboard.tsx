
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Settings, FileText, Eye, Save, LayoutDashboard, Database } from 'lucide-react';
import { storage } from '../../services/storage';
import { Post, SiteSettings } from '../../types';

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(storage.getSettings());
  const [activeTab, setActiveTab] = useState<'posts' | 'settings'>('posts');
  const [message, setMessage] = useState('');

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-72 space-y-3">
          <div className="bg-dark-800 border border-emerald-500/20 p-6 rounded-3xl mb-6 text-center">
            <LayoutDashboard size={40} className="mx-auto text-primary mb-3" />
            <h1 className="text-lg font-black text-white">إدارة عبو ويب</h1>
          </div>
          <button 
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl font-black transition-all ${activeTab === 'posts' ? 'bg-primary text-dark-900 shadow-xl' : 'bg-dark-800 text-slate-400 hover:text-primary border border-emerald-900/10'}`}
          >
            <FileText size={20} /> المقالات
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl font-black transition-all ${activeTab === 'settings' ? 'bg-primary text-dark-900 shadow-xl' : 'bg-dark-800 text-slate-400 hover:text-primary border border-emerald-900/10'}`}
          >
            <Settings size={20} /> الإعدادات
          </button>
          <div className="pt-6 border-t border-emerald-900/20 mt-6">
            <Link 
              to="/"
              className="w-full flex items-center gap-4 p-5 rounded-2xl font-black bg-dark-700 text-slate-500 hover:bg-dark-600 transition-all"
            >
              <Eye size={20} /> عرض الموقع
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-dark-800 p-8 rounded-[2.5rem] border border-emerald-900/20 shadow-2xl">
          {activeTab === 'posts' ? (
            <div>
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-white">قائمة المحتوى</h2>
                <Link to="/admin/new" className="bg-primary text-dark-900 font-black py-3 px-8 rounded-2xl flex items-center gap-2 btn-glow transition-all">
                  <Plus size={20} /> تدوينة جديدة
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="text-emerald-500/50 text-xs uppercase tracking-widest border-b border-emerald-900/20">
                      <th className="p-4 font-black">العنوان</th>
                      <th className="p-4 font-black">التصنيف</th>
                      <th className="p-4 font-black text-center">العمليات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-900/10">
                    {posts.map(post => (
                      <tr key={post.id} className="hover:bg-primary/5 transition-colors">
                        <td className="p-4 font-bold text-slate-200">{post.title}</td>
                        <td className="p-4"><span className="text-xs font-black bg-dark-700 px-3 py-1 rounded-lg text-primary">{post.category}</span></td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <Link to={`/admin/edit/${post.id}`} className="p-2 text-primary hover:bg-primary/20 rounded-lg"><Edit size={18}/></Link>
                            <button onClick={() => handleDelete(post.id)} className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg"><Trash2 size={18}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-black text-white mb-10">إعدادات المنصة</h2>
              <form onSubmit={handleSaveSettings} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-emerald-500/50 uppercase">اسم الموقع</label>
                    <input 
                      type="text" 
                      value={settings.title}
                      onChange={(e) => setSettings({...settings, title: e.target.value})}
                      className="w-full p-4 rounded-2xl border border-emerald-900/30 bg-dark-700 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-emerald-500/50 uppercase">نص الشعار</label>
                    <input 
                      type="text" 
                      value={settings.logo}
                      onChange={(e) => setSettings({...settings, logo: e.target.value})}
                      className="w-full p-4 rounded-2xl border border-emerald-900/30 bg-dark-700 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-emerald-500/50 uppercase">كلمة مرور الأمان</label>
                  <input 
                    type="password" 
                    value={settings.adminPassword}
                    onChange={(e) => setSettings({...settings, adminPassword: e.target.value})}
                    className="w-full p-4 rounded-2xl border border-emerald-900/30 bg-dark-700 text-white focus:ring-2 focus:ring-primary outline-none transition-all font-mono"
                  />
                </div>
                {message && <p className="text-primary font-black text-center animate-bounce">{message}</p>}
                <button type="submit" className="bg-primary text-dark-900 font-black py-4 px-12 rounded-2xl flex items-center gap-3 mx-auto btn-glow transition-all">
                  <Save size={22} /> تحديث البيانات
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
