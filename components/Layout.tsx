
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, LogIn, Settings, LogOut, Terminal } from 'lucide-react';
import { storage } from '../services/storage';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const settings = storage.getSettings();
  const isAdmin = storage.isLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    // Force dark mode for this design aesthetic
    document.documentElement.classList.add('dark');
  }, []);

  const handleLogout = () => {
    storage.logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 selection:bg-primary selection:text-dark-900">
      <nav className="bg-glass border-b border-emerald-900/30 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-3 group">
                <div className="bg-primary text-dark-900 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                  <Terminal size={24} />
                </div>
                <span className="text-white group-hover:text-primary transition-colors">{settings.logo}</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-reverse space-x-8">
              <Link to="/" className="text-sm font-bold hover:text-primary transition-colors">الرئيسية</Link>
              <Link to="/category/أخبار المغرب" className="text-sm font-bold hover:text-primary transition-colors">أخبار المغرب</Link>
              <Link to="/category/التقنية" className="text-sm font-bold hover:text-primary transition-colors">التقنية</Link>
              <div className="flex items-center border-r border-emerald-900/30 pr-6 mr-6 space-x-reverse space-x-4">
                {isAdmin ? (
                  <div className="flex items-center gap-3">
                    <Link to="/admin" className="px-4 py-2 rounded-xl bg-emerald-500/10 text-primary border border-emerald-500/20 hover:bg-primary hover:text-dark-900 transition-all font-bold text-sm">لوحة التحكم</Link>
                    <button onClick={handleLogout} className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><LogOut size={20} /></button>
                  </div>
                ) : (
                  <Link to="/login" className="px-6 py-2.5 rounded-xl bg-primary text-dark-900 font-black text-sm hover:bg-primary-light transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                    دخول
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-primary">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-dark-800 border-b border-emerald-900/30 px-4 pt-4 pb-8 space-y-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-3 font-bold border-b border-emerald-900/10">الرئيسية</Link>
            <Link to="/category/أخبار المغرب" onClick={() => setIsMenuOpen(false)} className="block py-3 font-bold border-b border-emerald-900/10">أخبار المغرب</Link>
            <Link to="/category/التقنية" onClick={() => setIsMenuOpen(false)} className="block py-3 font-bold border-b border-emerald-900/10">التقنية</Link>
            {isAdmin ? (
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block py-3 font-black text-primary">لوحة التحكم</Link>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block py-3 font-bold text-primary">تسجيل الدخول</Link>
            )}
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-dark-800 border-t border-emerald-900/20 py-16 transition-colors mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2 space-y-6">
              <h3 className="text-3xl font-black text-primary">{settings.logo}</h3>
              <p className="text-slate-400 max-w-sm leading-relaxed">{settings.description}</p>
            </div>
            <div>
              <h4 className="font-black text-white mb-6 uppercase tracking-widest text-sm">الموقع</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link to="/" className="hover:text-primary transition-colors">عن المدونة</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">اتصل بنا</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white mb-6 uppercase tracking-widest text-sm">تابعنا</h4>
              <div className="flex gap-4">
                {['FB', 'TW', 'IG', 'YT'].map(social => (
                  <a key={social} href="#" className="w-12 h-12 rounded-2xl bg-dark-700 border border-emerald-900/30 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all font-bold">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-emerald-900/10 text-center text-slate-500 text-sm">
            <p>{settings.footerText}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
