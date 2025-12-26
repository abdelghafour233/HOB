
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogIn, Cpu } from 'lucide-react';
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
      setError('كلمة المرor غير صحيحة');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-dark-900 p-10 rounded-[2rem] border border-primary/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
        
        <div className="relative text-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 text-dark-950 shadow-lg shadow-primary/20">
            <Cpu size={32} />
          </div>
          <h2 className="text-3xl font-black text-white">تسجيل الدخول</h2>
          <p className="text-slate-500 mt-2 font-bold">لوحة إدارة عبو ويب</p>
        </div>

        <form onSubmit={handleLogin} className="relative space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-primary uppercase tracking-widest mr-2">كلمة المرور</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-dark-800 border border-white/10 rounded-xl p-4 pr-12 focus:border-primary outline-none transition-all text-white font-mono"
                required
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center font-bold animate-pulse">{error}</p>}
          <button 
            type="submit"
            className="w-full bg-primary text-dark-950 font-black py-4 rounded-xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
          >
            <LogIn size={20} /> دخول آمن
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
