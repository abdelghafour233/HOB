
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Terminal, Settings, LogOut, Search } from 'lucide-react';
import { storage } from '../services/storage';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = storage.isLoggedIn();
  const settings = storage.getSettings();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-dark selection:bg-neon selection:text-black">
      {/* Top Navbar */}
      <nav className="glass sticky top-0 z-[100] h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-neon flex items-center justify-center rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500">
              <Terminal size={18} className="text-black -rotate-45 group-hover:-rotate-90 transition-transform duration-500" />
            </div>
            <span className="font-tech text-2xl font-black tracking-tighter group-hover:neon-text transition-all">
              {settings.logo}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link to="/" className="text-xs font-black uppercase tracking-widest hover:neon-text transition-colors">الرئيسية</Link>
            <Link to="/category/التقنية" className="text-xs font-black uppercase tracking-widest hover:neon-text transition-colors">التقنية</Link>
            <Link to="/category/الأفلييت" className="text-xs font-black uppercase tracking-widest hover:neon-text transition-colors">الأفلييت</Link>
            
            <div className="flex items-center gap-4 border-r border-white/10 pr-10">
              {isAdmin ? (
                <>
                  <Link to="/admin" className="p-2 hover:neon-text transition-all"><Settings size={20}/></Link>
                  <button onClick={() => storage.logout()} className="p-2 hover:text-red-500 transition-all"><LogOut size={20}/></button>
                </>
              ) : (
                <Link to="/login" className="bg-neon text-black px-6 py-2 rounded-sm text-xs font-black uppercase hover:opacity-90 transition-all">دخول</Link>
              )}
            </div>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-neon">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[90] bg-black pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-8 text-center">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-3xl font-black uppercase">الرئيسية</Link>
            <Link to="/category/التقنية" onClick={() => setIsOpen(false)} className="text-3xl font-black uppercase text-neon">التقنية</Link>
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-3xl font-black uppercase">دخول المشرف</Link>
          </div>
        </div>
      )}

      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-dark-card border-t border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <h3 className="font-tech text-2xl font-black text-neon">{settings.logo}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{settings.description}</p>
          </div>
          <div className="space-y-6">
            <h4 className="font-black text-xs uppercase tracking-[0.3em]">روابط سريعة</h4>
            <div className="flex flex-col gap-4 text-sm text-slate-500 font-bold">
              <Link to="/" className="hover:text-neon transition-colors">سياسة الخصوصية</Link>
              <Link to="/" className="hover:text-neon transition-colors">اتصل بنا</Link>
              <Link to="/login" className="hover:text-neon transition-colors">الإدارة</Link>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-black text-xs uppercase tracking-[0.3em]">اشترك في النشرة</h4>
            <div className="flex gap-2">
              <input placeholder="Email..." className="bg-dark border border-white/10 px-4 py-3 rounded-sm flex-grow outline-none focus:border-neon text-sm" />
              <button className="bg-white text-black px-6 font-black text-xs uppercase hover:bg-neon transition-colors">Go</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center text-[10px] text-slate-600 font-black tracking-widest uppercase">
          {settings.footerText}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
