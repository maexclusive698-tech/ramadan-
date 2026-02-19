
import React, { useEffect } from 'react';

const AdsterraGlobal: React.FC = () => {
  useEffect(() => {
    // 1. SOCIAL BAR SCRIPT
    // Replace 'YOUR_SOCIAL_BAR_KEY' with your actual key from Adsterra dashboard
    const socialBarScript = document.createElement('script');
    socialBarScript.type = 'text/javascript';
    socialBarScript.src = '//pl25946115.effectiveratecpm.com/a6/f1/8c/a6f18c21867c4e5123456789abcdef.js'; // Dummy URL
    socialBarScript.async = true;
    document.body.appendChild(socialBarScript);

    // 2. POP-UNDER SCRIPT
    // Replace 'YOUR_POPUNDER_KEY' with your actual key
    const popUnderScript = document.createElement('script');
    popUnderScript.type = 'text/javascript';
    popUnderScript.src = '//pl25946115.effectiveratecpm.com/b7/e2/9d/b7e29d32167c4e5123456789abcdef.js'; // Dummy URL
    popUnderScript.async = true;
    document.body.appendChild(popUnderScript);

    return () => {
      // Cleanup if needed
      if (document.body.contains(socialBarScript)) document.body.removeChild(socialBarScript);
      if (document.body.contains(popUnderScript)) document.body.removeChild(popUnderScript);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default AdsterraGlobal;
