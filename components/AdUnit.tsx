import React, { useEffect } from 'react';
import { AdProps } from '../types.ts';

const AdUnit: React.FC<AdProps> = ({ slot, format = 'auto', className = '', style }) => {
  useEffect(() => {
    // Check if adsbygoogle script is actually present and not blocked
    const loadAd = () => {
      try {
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        }
      } catch (e) {
        console.warn('AdSense notice: Ad was not loaded (this is normal if ad-blockers are present or script is still loading).', e);
      }
    };

    // Small delay to ensure script has had a chance to execute
    const timer = setTimeout(loadAd, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`my-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center min-h-[100px] overflow-hidden relative ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '300px', width: '100%', height: '100%', ...style }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Evec.in Ad Partner</span>
      </div>
    </div>
  );
};

export default AdUnit;