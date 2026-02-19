
import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  id: string; // The Adsterra Key
  format: 'banner' | 'social-bar' | 'native';
}

const AdBanner: React.FC<AdBannerProps> = ({ id, format }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Clear previous ad to avoid duplicates on re-render
    adRef.current.innerHTML = '';

    const script = document.createElement('script');
    
    // Example logic for Adsterra Native/Banner injection
    // Note: In a real scenario, you'd paste your specific Adsterra script here
    // We wrap it in a function that targets the adRef
    try {
      if (format === 'banner' || format === 'native') {
        const confScript = document.createElement('script');
        confScript.type = 'text/javascript';
        confScript.innerHTML = `
          atOptions = {
            'key' : '${id}',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        `;
        adRef.current.appendChild(confScript);

        script.type = 'text/javascript';
        script.src = `//www.highperformanceformat.com/${id}/invoke.js`;
        adRef.current.appendChild(script);
      }
    } catch (e) {
      console.error("Adsterra failed to load", e);
    }

    return () => {
      if (adRef.current) adRef.current.innerHTML = '';
    };
  }, [id, format]);

  return (
    <div className="flex flex-col items-center my-6 space-y-2">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sponsor</span>
      <div 
        ref={adRef} 
        className="w-full flex justify-center min-h-[90px] bg-emerald-50/50 rounded-xl overflow-hidden"
      >
        {/* Adsterra script will inject content here */}
        <div className="text-xs text-slate-300 flex items-center justify-center italic">Loading advertisement...</div>
      </div>
    </div>
  );
};

export default AdBanner;
