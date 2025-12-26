
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Settings, FileText, Layout, Eye, Save } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          <button 
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'posts' ? 'bg-primary text-white shadow-lg' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <FileText size={20} /> المقالات
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-primary text-white shadow-lg' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Settings size={20} /> الإعدادات العامة
          </button>
          <Link 
            to="/"
            className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-400"
          >
            <Eye size={20} /> معاينة الموقع
          </Link>
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          {activeTab === 'posts' ? (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">إدارة المقالات</h2>
                <Link to="/admin/new" className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-all">
                  <Plus size={20} /> مقال جديد
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="pb-4 font-bold text-slate-400 text-sm">العنوان</th>
                      <th className="pb-4 font-bold text-slate-400 text-sm">التصنيف</th>
                      <th className="pb-4 font-bold text-slate-400 text-sm">الحالة</th>
                      <th className="pb-4 font-bold text-slate-400 text-sm text-center">العمليات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {posts.map(post => (
                      <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-4 font-medium truncate max-w-xs">{post.title}</td>
                        <td className="py-4 text-sm text-slate-500">{post.category}</td>
                        <td className="py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${post.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {post.isPublished ? 'منشور' : 'مسودة'}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center justify-center gap-3">
                            <Link to={`/admin/edit/${post.id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18}/></Link>
                            <button onClick={() => handleDelete(post.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {posts.length === 0 && (
                      <tr><td colSpan={4} className="py-8 text-center text-slate-400 italic">لا توجد مقالات مضافة بعد.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-8">إعدادات الموقع</h2>
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">اسم الموقع</label>
                    <input 
                      type="text" 
                      value={settings.title}
                      onChange={(e) => setSettings({...settings, title: e.target.value})}
                      className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">النص في الشعار (Logo)</label>
                    <input 
                      type="text" 
                      value={settings.logo}
                      onChange={(e) => setSettings({...settings, logo: e.target.value})}
                      className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">وصف الموقع (SEO)</label>
                  <textarea 
                    rows={3}
                    value={settings.description}
                    onChange={(e) => setSettings({...settings, description: e.target.value})}
                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">معرف Google AdSense</label>
                  <input 
                    type="text" 
                    value={settings.adsenseId}
                    onChange={(e) => setSettings({...settings, adsenseId: e.target.value})}
                    placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">كلمة مرور الإدارة</label>
                  <input 
                    type="password" 
                    value={settings.adminPassword}
                    onChange={(e) => setSettings({...settings, adminPassword: e.target.value})}
                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                  />
                </div>
                
                {message && <p className="text-green-500 font-bold text-center">{message}</p>}
                
                <button type="submit" className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-xl flex items-center gap-2 mx-auto transition-all">
                  <Save size={20} /> حفظ التغييرات
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
