
import React from 'react';
import { storage } from '../services/storage';

interface AdSlotProps {
  className?: string;
  label?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ className = '', label = 'إعلان' }) => {
  const settings = storage.getSettings();

  return (
    <div className={`my-8 bg-dark-800 border border-dashed border-emerald-900/30 rounded-2xl flex items-center justify-center min-h-[120px] overflow-hidden group hover:border-primary/40 transition-colors ${className}`}>
      <div className="text-center p-6">
        <span className="text-[10px] text-emerald-500/50 block mb-2 uppercase tracking-[0.2em] font-black">{label}</span>
        <p className="text-slate-400 text-sm font-bold">Google AdSense Space</p>
        <p className="text-[10px] text-slate-600 mt-2 font-mono">{settings.adsenseId}</p>
      </div>
    </div>
  );
};

export default AdSlot;
