
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Settings, LogOut, Cpu } from 'lucide-react';
import { storage } from '../services/storage';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const settings = storage.getSettings();
  const isAdmin = storage.isLoggedIn();
  const navigate = useNavigate();

  const handleLogout = () => {
    storage.logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      <nav className="glass-effect border-b border-primary/10 sticky top-0 z-50 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-dark-950 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.8)] transition-all">
              <Cpu size={24} />
            </div>
            <span className="text-2xl font-black text-white group-hover:text-primary transition-colors">
              {settings.logo}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-bold hover:text-primary transition-colors">الرئيسية</Link>
            <Link to="/category/التقنية" className="text-sm font-bold hover:text-primary transition-colors">التقنية</Link>
            <Link to="/category/الأفلييت" className="text-sm font-bold hover:text-primary transition-colors">الأفلييت</Link>
            
            <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
            
            {isAdmin ? (
              <div className="flex items-center gap-3">
                <Link to="/admin" className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-dark-950 transition-all">
                  <Settings size={20} />
                </Link>
                <button onClick={handleLogout} className="p-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-primary text-dark-950 px-6 py-2.5 rounded-xl font-black text-sm hover:scale-105 transition-all shadow-lg shadow-primary/20">
                تسجيل الدخول
              </Link>
            )}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-primary">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-dark-900 border-b border-primary/20 p-6 flex flex-col gap-4 md:hidden">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">الرئيسية</Link>
            <Link to="/category/التقنية" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-primary">التقنية</Link>
            {isAdmin ? (
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">لوحة التحكم</Link>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">دخول</Link>
            )}
          </div>
        )}
      </nav>

      <main className="flex-grow">{children}</main>

      <footer className="bg-dark-900 border-t border-primary/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-primary mb-4">{settings.logo}</h2>
          <p className="text-slate-500 max-w-md mx-auto mb-8">{settings.description}</p>
          <div className="text-xs text-slate-600 border-t border-white/5 pt-8">
            {settings.footerText}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
