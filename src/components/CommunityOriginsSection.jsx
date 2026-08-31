import React from 'react';
import { Church, Globe, Heart, Shield, Sparkles, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

// Custom high-precision SVG Logos for EEC & EPC
export function EECLogo({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="eecGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
        <linearGradient id="goldGradEEC" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      {/* Outer Golden Ring */}
      <circle cx="50" cy="50" r="48" fill="url(#eecGrad)" stroke="url(#goldGradEEC)" strokeWidth="3" />
      <circle cx="50" cy="50" r="43" fill="none" stroke="#60A5FA" strokeWidth="0.75" strokeDasharray="2 2" />
      
      {/* Radiant Glow Behind Cross */}
      <circle cx="50" cy="42" r="16" fill="#FDE047" fillOpacity="0.25" />
      
      {/* Golden Latin Cross */}
      <path d="M48 22H52V38H62V42H52V62H48V42H38V38H48V22Z" fill="url(#goldGradEEC)" />
      
      {/* Open Bible Symbol */}
      <path d="M30 62C38 59 47 61 50 64C53 61 62 59 70 62V75C62 72 53 74 50 77C47 74 38 72 30 75V62Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M50 64V77" stroke="#94A3B8" strokeWidth="1" />
      
      {/* Letters EEC */}
      <text x="50" y="88" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="sans-serif" letterSpacing="2">
        E.E.C
      </text>
    </svg>
  );
}

export function EPCLogo({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="epcGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#991B1B" />
          <stop offset="100%" stopColor="#450A0A" />
        </radialGradient>
        <linearGradient id="goldGradEPC" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
        <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FEF08A" />
        </linearGradient>
      </defs>
      {/* Outer Ring */}
      <circle cx="50" cy="50" r="48" fill="url(#epcGrad)" stroke="url(#goldGradEPC)" strokeWidth="3" />
      <circle cx="50" cy="50" r="43" fill="none" stroke="#FCA5A5" strokeWidth="0.75" strokeDasharray="2 2" />
      
      {/* Burning Bush Symbol (Flaming branches) */}
      <path d="M50 20C46 26 44 32 46 38C43 35 41 33 39 36C37 39 38 44 42 47C38 46 35 48 35 52C35 57 41 61 50 63C59 61 65 57 65 52C65 48 62 46 58 47C62 44 63 39 61 36C59 33 57 35 54 38C56 32 54 26 50 20Z" fill="url(#fireGrad)" opacity="0.9" />
      
      {/* Center Latin Cross */}
      <path d="M48 26H52V38H60V42H52V62H48V42H40V38H48V26Z" fill="#FFFFFF" />
      
      {/* Open Scriptures Base */}
      <path d="M32 63C39 60 47 62 50 65C53 62 61 60 68 63V74C61 71 53 73 50 76C47 73 39 71 32 74V63Z" fill="#FFFBEB" stroke="url(#goldGradEPC)" strokeWidth="1" />
      <path d="M50 65V76" stroke="#D97706" strokeWidth="1" />
      
      {/* Letters EPC */}
      <text x="50" y="88" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="sans-serif" letterSpacing="2">
        E.P.C
      </text>
    </svg>
  );
}

export default function CommunityOriginsSection({ className = "" }) {
  const { t } = useLanguage();

  const churchEntities = [
    {
      id: "eec-1",
      shortName: "EEC",
      name: t('eecName'),
      subtitle: t('eecSubtitle1'),
      badge: t('eecBadge1'),
      type: "eec",
      borderAccent: "border-blue-200 hover:border-blue-400 group-hover:bg-blue-50/40",
      badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
    },
    {
      id: "epc-1",
      shortName: "EPC",
      name: t('epcName'),
      subtitle: t('epcSubtitle1'),
      badge: t('epcBadge1'),
      type: "epc",
      borderAccent: "border-amber-200 hover:border-amber-400 group-hover:bg-amber-50/40",
      badgeColor: "bg-amber-50 text-amber-900 border-amber-200",
    },
    {
      id: "eec-2",
      shortName: "EEC",
      name: t('eecName'),
      subtitle: t('eecSubtitle2'),
      badge: t('eecBadge2'),
      type: "eec",
      borderAccent: "border-blue-200 hover:border-blue-400 group-hover:bg-blue-50/40",
      badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
    },
    {
      id: "epc-2",
      shortName: "EPC",
      name: t('epcName'),
      subtitle: t('epcSubtitle2'),
      badge: t('epcBadge2'),
      type: "epc",
      borderAccent: "border-amber-200 hover:border-amber-400 group-hover:bg-amber-50/40",
      badgeColor: "bg-amber-50 text-amber-900 border-amber-200",
    }
  ];

  // Multiply list for continuous infinite seamless scrolling
  const duplicatedList = [
    ...churchEntities,
    ...churchEntities,
    ...churchEntities,
    ...churchEntities
  ];

  return (
    <section className={`py-14 sm:py-16 bg-gradient-to-b from-[#FAF7F2] to-white relative overflow-hidden border-b border-[#EFE5D5] ${className}`}>
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C9862C]/5 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8F4D12]/5 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0DD] border border-[#E4CEAB] text-[#8F4D12] text-xs font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 text-[#C9862C]" />
            <span>{t('originsBadge')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 tracking-tight">
            {t('originsTitle')}
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {t('originsDesc')}
          </p>
        </div>
      </div>

      {/* Single Marquee Container with soft side fades */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left Fade Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF7F2] sm:from-white via-[#FAF7F2]/80 to-transparent z-20 pointer-events-none" />
        {/* Right Fade Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        {/* Single Row: Continuous Scrolling */}
        <div className="overflow-hidden flex">
          <div className="animate-marquee flex items-center gap-5 py-2 cursor-grab active:cursor-grabbing">
            {duplicatedList.map((item, idx) => (
              <div
                key={`church-${item.id}-${idx}`}
                className={`group shrink-0 flex items-center gap-4 px-5 py-3.5 bg-white rounded-2xl border ${item.borderAccent} shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 min-w-[320px] sm:min-w-[360px]`}
              >
                {/* Church Logo Seal */}
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs shrink-0 flex items-center justify-center p-0.5 ring-1 ring-gray-100 group-hover:scale-105 transition-transform">
                  {item.type === 'eec' ? (
                    <EECLogo className="w-full h-full" />
                  ) : (
                    <EPCLogo className="w-full h-full" />
                  )}
                </div>

                {/* Church Details */}
                <div className="flex flex-col text-left flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#8F4D12] transition-colors leading-tight truncate">
                      {item.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 ${item.badgeColor}`}>
                      {item.shortName}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium mt-0.5 truncate">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sub-message banner */}
      <div className="max-w-4xl mx-auto px-4 mt-6 sm:mt-8 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs text-gray-600 bg-white/80 backdrop-blur-xs py-2 px-5 rounded-full border border-[#EAE0D0] shadow-xs">
          <Heart className="w-3.5 h-3.5 text-[#C9862C] fill-[#C9862C]" />
          <span>{t('galatiansVerse')}</span>
        </div>
      </div>

    </section>
  );
}
