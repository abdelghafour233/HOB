
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Settings, FileText, Eye, Save, LayoutDashboard } from 'lucide-react';
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
    setMessage('تم حفظ الإعدادات بنجاح');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <div className="w-full md:w-72 space-y-4">
          <div className="bg-emerald-500/10 p-6 rounded-3xl mb-6">
            <h1 className="text-xl font-black text-primary flex items-center gap-2">
              <LayoutDashboard size={24} /> نظام عبو ويب
            </h1>
          </div>
          <button 
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl font-bold transition-all ${activeTab === 'posts' ? 'bg-primary text-dark-900 shadow-xl shadow-emerald-500/30' : 'bg-slate-50 dark:bg-dark-800 text-slate-400 hover:text-primary border border-transparent hover:border-emerald-500/20'}`}
          >
            <FileText size={20} /> إدارة المقالات
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl font-bold transition-all ${activeTab === 'settings' ? 'bg-primary text-dark-900 shadow-xl shadow-emerald-500/30' : 'bg-slate-50 dark:bg-dark-800 text-slate-400 hover:text-primary border border-transparent hover:border-emerald-500/20'}`}
          >
            <Settings size={20} /> إعدادات الموقع
          </button>
          <Link 
            to="/"
            className="w-full flex items-center gap-4 p-5 rounded-2xl font-bold bg-slate-50 dark:bg-dark-800 text-slate-400 border border-transparent hover:border-emerald-500/20 transition-all"
          >
            <Eye size={20} /> زيارة المدونة
          </Link>
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-white dark:bg-dark-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-emerald-500/10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>
          
          <div className="relative z-10">
            {activeTab === 'posts' ? (
              <div>
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black">المقالات المنشورة</h2>
                  <Link to="/admin/new" className="bg-primary text-dark-900 font-black py-3 px-8 rounded-2xl flex items-center gap-2 hover:bg-primary-light transition-all shadow-lg shadow-emerald-500/20">
                    <Plus size={20} /> كتابة مقال
                  </Link>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-emerald-500/5">
                  <table className="w-full text-right">
                    <thead className="bg-slate-50 dark:bg-dark-700/50">
                      <tr>
                        <th className="p-5 font-black text-slate-400 text-sm">عنوان المقال</th>
                        <th className="p-5 font-black text-slate-400 text-sm">التصنيف</th>
                        <th className="p-5 font-black text-slate-400 text-sm text-center">العمليات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/10">
                      {posts.map(post => (
                        <tr key={post.id} className="hover:bg-emerald-500/5 transition-colors group">
                          <td className="p-5 font-bold truncate max-w-xs">{post.title}</td>
                          <td className="p-5 text-sm">
                            <span className="bg-emerald-500/10 text-primary px-3 py-1 rounded-lg font-bold">{post.category}</span>
                          </td>
                          <td className="p-5">
                            <div className="flex items-center justify-center gap-3">
                              <Link to={`/admin/edit/${post.id}`} className="p-2.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition-all"><Edit size={18}/></Link>
                              <button onClick={() => handleDelete(post.id)} className="p-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"><Trash2 size={18}/></button>
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
                <h2 className="text-3xl font-black mb-10">الخصائص العامة</h2>
                <form onSubmit={handleSaveSettings} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-black mr-2 text-slate-400">اسم المدونة</label>
                      <input 
                        type="text" 
                        value={settings.title}
                        onChange={(e) => setSettings({...settings, title: e.target.value})}
                        className="w-full p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/30 bg-slate-50 dark:bg-dark-700 outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black mr-2 text-slate-400">شعار الموقع (Text)</label>
                      <input 
                        type="text" 
                        value={settings.logo}
                        onChange={(e) => setSettings({...settings, logo: e.target.value})}
                        className="w-full p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/30 bg-slate-50 dark:bg-dark-700 outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black mr-2 text-slate-400">كلمة مرور الإدارة</label>
                    <input 
                      type="password" 
                      value={settings.adminPassword}
                      onChange={(e) => setSettings({...settings, adminPassword: e.target.value})}
                      className="w-full p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/30 bg-slate-50 dark:bg-dark-700 outline-none focus:ring-2 focus:ring-primary font-mono"
                    />
                  </div>
                  
                  {message && <div className="p-4 bg-emerald-500/20 text-primary border border-primary/30 rounded-2xl text-center font-black animate-pulse">{message}</div>}
                  
                  <button type="submit" className="bg-primary text-dark-900 font-black py-4 px-12 rounded-2xl flex items-center gap-3 mx-auto transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                    <Save size={22} /> تحديث الإعدادات
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
