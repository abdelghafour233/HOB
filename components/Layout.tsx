
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, LogIn, Settings, LogOut } from 'lucide-react';
import { storage } from '../services/storage';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const settings = storage.getSettings();
  const isAdmin = storage.isLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
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
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary dark:text-blue-400">
                {settings.logo}
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-reverse space-x-6">
              <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
              <Link to="/category/أخبار المغرب" className="hover:text-primary transition-colors">أخبار المغرب</Link>
              <Link to="/category/التقنية" className="hover:text-primary transition-colors">التقنية</Link>
              <Link to="/category/تطوير الذات" className="hover:text-primary transition-colors">تطوير الذات</Link>
              <div className="flex items-center border-r border-slate-200 dark:border-slate-700 pr-4 mr-4 space-x-reverse space-x-3">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                {isAdmin ? (
                  <div className="flex items-center gap-3">
                    <Link to="/admin" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"><Settings size={20} /></Link>
                    <button onClick={handleLogout} className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"><LogOut size={20} /></button>
                  </div>
                ) : (
                  <Link to="/login" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                    <LogIn size={20} />
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleTheme} className="p-2">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-2">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2">الرئيسية</Link>
            <Link to="/category/أخبار المغرب" onClick={() => setIsMenuOpen(false)} className="block py-2">أخبار المغرب</Link>
            <Link to="/category/التقنية" onClick={() => setIsMenuOpen(false)} className="block py-2">التقنية</Link>
            <Link to="/category/تطوير الذات" onClick={() => setIsMenuOpen(false)} className="block py-2">تطوير الذات</Link>
            {isAdmin && <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block py-2 font-bold text-primary">لوحة التحكم</Link>}
            {!isAdmin && <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block py-2">تسجيل الدخول</Link>}
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500">
          <p className="mb-2">{settings.footerText}</p>
          <div className="flex justify-center space-x-reverse space-x-4">
            <a href="#" className="hover:text-primary">فيسبوك</a>
            <a href="#" className="hover:text-primary">تويتر</a>
            <a href="#" className="hover:text-primary">إنستغرام</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
