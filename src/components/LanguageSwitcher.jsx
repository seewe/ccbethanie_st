import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function LanguageSwitcher({ size = 'md', className = '' }) {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  const isFrench = language === 'fr';

  if (size === 'sm') {
    return (
      <button
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider transition-all duration-200 border ${
          isFrench 
            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20' 
            : 'bg-blue-500/10 text-blue-300 border-blue-500/30 hover:bg-blue-500/20'
        } ${className}`}
        title={isFrench ? "Passer en anglais (Switch to English)" : "Passer en français (Switch to French)"}
        aria-label="Changer la langue"
      >
        <Globe className="w-3 h-3 text-amber-400" />
        <span className={isFrench ? 'text-[#F5C05F] font-black' : 'text-gray-400'}>FR</span>
        <span className="text-gray-500 text-[10px]">|</span>
        <span className={!isFrench ? 'text-[#F5C05F] font-black' : 'text-gray-400'}>EN</span>
      </button>
    );
  }

  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      <div 
        className="flex items-center bg-gray-100/90 hover:bg-gray-200/80 p-0.5 rounded-full border border-gray-200 shadow-xs transition-colors"
        role="group"
        aria-label="Sélection de la langue"
      >
        {/* Globe icon */}
        <div className="pl-2 pr-1 text-gray-500 flex items-center justify-center">
          <Globe className="w-3.5 h-3.5 text-[#C9862C]" />
        </div>

        {/* French Option Button */}
        <button
          type="button"
          onClick={() => setLanguage('fr')}
          className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
            isFrench
              ? 'bg-gradient-to-r from-[#D48E2E] to-[#A85C16] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          aria-pressed={isFrench}
        >
          FR
        </button>

        {/* English Option Button */}
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
            !isFrench
              ? 'bg-gradient-to-r from-[#D48E2E] to-[#A85C16] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          aria-pressed={!isFrench}
        >
          EN
        </button>
      </div>
    </div>
  );
}
