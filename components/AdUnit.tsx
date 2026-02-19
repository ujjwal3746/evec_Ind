
import React, { useEffect } from 'react';
import { AdProps } from '../types';

const AdUnit: React.FC<AdProps> = ({ slot, format = 'auto', className = '', style }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense Error:', e);
    }
  }, []);

  return (
    <div className={`my-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center min-h-[100px] overflow-hidden ${className}`} style={style}>
      {/* 
        This is the actual Google AdSense tag. 
        In development, it will look like an empty box or a labeled placeholder.
      */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '300px', ...style }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your Publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      
      {/* Visual indicator for the user to see where ads would be placed */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Sponsored Advertisement</span>
      </div>
    </div>
  );
};

export default AdUnit;
