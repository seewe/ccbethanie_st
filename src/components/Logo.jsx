import React from 'react';

/**
 * Communauté Chrétienne Béthanie Official Logo Component
 * Utilise le fichier .png officiel "ccb-logo.png" (CCB logo transparent.png)
 */
export default function Logo({ 
  variant = 'horizontal', // 'horizontal' | 'full' | 'icon' | 'badge'
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  className = '' 
}) {
  const sizeMap = {
    sm: { h: 42, px: 'h-10' },
    md: { h: 56, px: 'h-14' },
    lg: { h: 84, px: 'h-20' },
    xl: { h: 120, px: 'h-28' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Icon only
  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <img 
          src="/ccb-logo.png" 
          alt="Communauté Chrétienne Béthanie" 
          className="object-contain"
          style={{ height: currentSize.h, width: 'auto' }}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Horizontal Header/Navbar Logo
  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <img 
          src="/ccb-logo.png" 
          alt="Logo Communauté Chrétienne Béthanie - Église Presbytérienne au Canada" 
          className="object-contain"
          style={{ height: currentSize.h, width: 'auto', maxHeight: '68px' }}
          referrerPolicy="no-referrer"
        />
        <div className="hidden sm:flex flex-col">
          <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-[#8F4D12] uppercase font-sans leading-none">
            Église Presbytérienne au Canada
          </span>
          <span className="text-xs sm:text-[14px] font-medium tracking-tight text-[#1E232A] leading-tight font-sans mt-0.5">
            Communauté Chrétienne <strong className="font-extrabold text-[#1E232A]">BÉTHANIE</strong>
          </span>
        </div>
      </div>
    );
  }

  // Full / Default Stacked Brand Logo
  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      <img 
        src="/ccb-logo.png" 
        alt="Logo Communauté Chrétienne Béthanie - Église Presbytérienne au Canada" 
        className="w-auto object-contain drop-shadow-xs"
        style={{ 
          height: currentSize.h * 1.8, 
          maxWidth: '100%' 
        }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
