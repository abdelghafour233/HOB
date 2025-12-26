
import React from 'react';
import { storage } from '../services/storage';

interface AdSlotProps {
  className?: string;
  label?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ className = '', label = 'إعلان' }) => {
  const settings = storage.getSettings();

  return (
    <div className={`my-8 bg-slate-100 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg flex items-center justify-center min-h-[100px] overflow-hidden ${className}`}>
      <div className="text-center p-4">
        <span className="text-xs text-slate-400 block mb-1 uppercase tracking-widest">{label}</span>
        {/* Real AdSense tag would go here using settings.adsenseId */}
        <p className="text-slate-500 text-sm font-medium italic">سيظهر إعلان Google AdSense هنا</p>
        <p className="text-[10px] text-slate-400 mt-1">{settings.adsenseId}</p>
      </div>
    </div>
  );
};

export default AdSlot;
