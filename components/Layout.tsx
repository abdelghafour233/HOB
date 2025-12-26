
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, LogIn, Settings, LogOut } from 'lucide-react';
import { storage } from '../services/storage';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark for better aesthetic
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const settings = storage.getSettings();
  const isAdmin = storage.isLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    storage.logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col font-cairo">
      <nav className="bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-b border-slate-200 dark:border-emerald-900/30 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-2">
                <span className="bg-primary text-dark-900 px-2 rounded-md">W</span>
                <span className="text-slate-900 dark:text-white">{settings.logo}</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-reverse space-x-6">
              <Link to="/" className="text-sm font-bold hover:text-primary transition-colors">الرئيسية</Link>
              <Link to="/category/أخبار المغرب" className="text-sm font-bold hover:text-primary transition-colors">أخبار المغرب</Link>
              <Link to="/category/التقنية" className="text-sm font-bold hover:text-primary transition-colors">التقنية</Link>
              <div className="flex items-center border-r border-slate-200 dark:border-emerald-900/30 pr-4 mr-4 space-x-reverse space-x-3">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-primary transition-all">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                {isAdmin ? (
                  <div className="flex items-center gap-2">
                    <Link to="/admin" className="p-2 rounded-lg bg-emerald-500/10 text-primary hover:bg-primary hover:text-white transition-all"><Settings size={20} /></Link>
                    <button onClick={handleLogout} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><LogOut size={20} /></button>
                  </div>
                ) : (
                  <Link to="/login" className="px-4 py-2 rounded-lg bg-primary text-dark-900 font-bold text-sm hover:bg-primary-light transition-all shadow-lg shadow-emerald-500/20">
                    دخول
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleTheme} className="p-2 text-primary">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-primary">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-dark-800 border-b border-emerald-900/30 px-4 pt-2 pb-4 space-y-2">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 font-bold">الرئيسية</Link>
            <Link to="/category/أخبار المغرب" onClick={() => setIsMenuOpen(false)} className="block py-2 font-bold">أخبار المغرب</Link>
            <Link to="/category/التقنية" onClick={() => setIsMenuOpen(false)} className="block py-2 font-bold">التقنية</Link>
            {isAdmin && <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block py-2 font-black text-primary">لوحة التحكم</Link>}
            {!isAdmin && <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block py-2 font-bold">تسجيل الدخول</Link>}
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-50 dark:bg-dark-800 border-t border-emerald-900/20 py-12 transition-colors mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-black text-primary">{settings.logo}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{settings.description}</p>
            </div>
            <div>
              <h4 className="font-black mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link to="/" className="hover:text-primary transition-colors">عن الموقع</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">اتصل بنا</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-4">تابعنا</h4>
              <div className="flex space-x-reverse space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">FB</a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">TW</a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">IG</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-emerald-900/10 text-center text-slate-500 dark:text-slate-400 text-sm">
            <p>{settings.footerText}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
