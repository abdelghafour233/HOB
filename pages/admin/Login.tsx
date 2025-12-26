
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogIn, ShieldCheck } from 'lucide-react';
import { storage } from '../../services/storage';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (storage.login(password)) {
      navigate('/admin');
      window.location.reload();
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-white dark:bg-dark-900">
      <div className="max-w-md w-full bg-white dark:bg-dark-800 p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-emerald-500/20 transition-all relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16"></div>
        
        <div className="relative z-10 text-center mb-10">
          <div className="bg-emerald-500/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
            <ShieldCheck className="text-primary" size={40} />
          </div>
          <h2 className="text-3xl font-black">منطقة المحررين</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-bold">تحتاج إلى إذونات للوصول للوحة التحكم</p>
        </div>

        <form onSubmit={handleLogin} className="relative z-10 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-black mr-2">كلمة المرور</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-4 pr-12 rounded-2xl border border-slate-200 dark:border-emerald-900/30 bg-slate-50 dark:bg-dark-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-mono"
                required
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center font-black animate-shake">{error}</p>}
          <button 
            type="submit"
            className="w-full bg-primary text-dark-900 font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary-light transition-all shadow-lg shadow-emerald-500/30 active:scale-95"
          >
            <LogIn size={22} /> تأكيد الهوية
          </button>
        </form>
        <div className="relative z-10 mt-8 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">تلميح النظام: admin</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
