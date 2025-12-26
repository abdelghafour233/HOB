
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogIn, ShieldAlert, RefreshCw } from 'lucide-react';
import { storage } from '../../services/storage';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (storage.login(password)) {
      navigate('/admin');
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-dark-card neon-border p-12 rounded-sm relative overflow-hidden">
          <div className="mb-12 text-center">
            <div className="w-12 h-12 bg-neon flex items-center justify-center mx-auto mb-6">
              <Lock className="text-black" size={24} />
            </div>
            <h2 className="font-tech text-3xl font-black tracking-tighter uppercase italic">Secure Login</h2>
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-2">Abdou Web Engine v3.0</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-neon uppercase tracking-[0.3em]">Access Code</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border-b border-white/10 p-4 focus:border-neon outline-none transition-all font-mono text-center"
                required
              />
            </div>
            {error && <p className="text-red-500 text-[10px] text-center font-black uppercase tracking-widest">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-neon text-black font-black py-4 rounded-sm flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all uppercase text-xs"
            >
              <LogIn size={18} /> Authenticate
            </button>
          </form>
        </div>

        {/* Debug / Hard Reset Section */}
        <div className="mt-12 p-6 border border-white/5 rounded-sm flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-slate-600">
            <ShieldAlert size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">System Issues?</span>
          </div>
          <button 
            onClick={() => {
              if(window.confirm('This will wipe all local data and fix design issues. Continue?')) {
                storage.hardReset();
              }
            }}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
          >
            <RefreshCw size={12} /> Force Hard Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
