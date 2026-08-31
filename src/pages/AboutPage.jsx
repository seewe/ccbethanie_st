import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Shield, BookOpen, Users, Award, 
  MapPin, CheckCircle2, Church, Calendar, Sparkles, Mail 
} from 'lucide-react';
import { apiService } from '../services/api.js';
import Logo from '../components/Logo.jsx';
import CommunityOriginsSection from '../components/CommunityOriginsSection.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function AboutPage({ onOpenVisitModal }) {
  const { t, language } = useLanguage();
  const [team, setTeam] = useState([]);
  const [churchInfo, setChurchInfo] = useState(null);

  useEffect(() => {
    async function loadData() {
      const [teamData, infoData] = await Promise.all([
        apiService.getTeam(),
        apiService.getChurchInfo()
      ]);
      setTeam(teamData);
      setChurchInfo(infoData);
    }
    loadData();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#121820] via-[#1E2632] to-[#251A10] text-white py-16 lg:py-20 border-b-4 border-[#C9862C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F2B852] text-xs font-semibold uppercase tracking-wider">
              <Church className="w-3.5 h-3.5" />
              <span>{t('aboutHeaderBadge')}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              {t('aboutHeaderTitle')}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {t('aboutHeaderDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Vision & Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9862C]">
                {t('aboutIdentityBadge')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 leading-tight">
                {t('aboutIdentityTitle')}
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t('aboutHistoryP1')}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t('aboutHistoryP2')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#FAF4EA] border border-[#E9D6BA]">
                  <h4 className="text-xs font-bold text-[#8F4D12] uppercase tracking-wider mb-1">
                    {t('aboutVisionTitle')}
                  </h4>
                  <p className="text-xs text-gray-700">
                    {t('aboutVisionDesc')}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF4EA] border border-[#E9D6BA]">
                  <h4 className="text-xs font-bold text-[#8F4D12] uppercase tracking-wider mb-1">
                    {t('aboutMissionTitle')}
                  </h4>
                  <p className="text-xs text-gray-700">
                    {t('aboutMissionDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Full Visual */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-[#FAF7F2] rounded-3xl border border-[#EAE0D0] text-center space-y-6">
              <Logo variant="full" size="lg" />
              <div className="border-t border-[#E0D3C1] w-full pt-4 space-y-1.5">
                <p className="font-extrabold text-sm sm:text-base text-[#8F4D12] uppercase tracking-wide">
                  {t('affiliation')}
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  ({t('affiliationEnShort')})
                </p>
                <p className="text-xs text-gray-600 pt-1">
                  {t('pccTraditionDesc')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Notre Pasteur Section (Direction spirituelle & Accompagnement) */}
      <section id="pasteur" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9862C]">
              {t('pastorSectionBadge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
              {t('pastorSectionTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              {t('pastorSectionSubtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-[#FAF8F5] rounded-3xl border border-[#EDE3D3] p-8 sm:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10">
              
              {/* Pastor Portrait & Contact info */}
              <div className="w-full md:w-1/3 flex flex-col items-center text-center shrink-0">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-2 ring-[#C9862C]/40">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
                    alt="Pasteur Jean Dupont"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="mt-4 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FAF0DD] text-[#8F4D12] border border-[#E4CEAB]">
                  {t('pastorRoleBadge')}
                </span>

                <div className="mt-4 pt-4 border-t border-[#E8DCC8] w-full text-xs text-gray-600 space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4 text-[#C9862C]" />
                    <a href="mailto:pasteur@ccbethanie.ca" className="hover:text-[#C9862C] font-medium">
                      pasteur@ccbethanie.ca
                    </a>
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {t('pastorAppointment')}
                  </div>
                </div>
              </div>

              {/* Pastor Descriptive Profile */}
              <div className="w-full md:w-2/3 space-y-5">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                    {language === 'en' ? 'Pastor Jean Dupont' : 'Pasteur Jean Dupont'}
                  </h3>
                  <p className="text-sm font-semibold text-[#C9862C] mt-1">
                    {t('pastorTitle')}
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
                  <p>
                    {t('pastorDetailedP1')}
                  </p>
                  <p>
                    {t('pastorDetailedP2')}
                  </p>
                </div>

                {/* Focus Areas */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2.5">
                    {t('pastorPillarsTitle')}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-700">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#EBE1D0]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9862C]"></span>
                      <span>{t('pastorPillar1')}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#EBE1D0]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9862C]"></span>
                      <span>{t('pastorPillar2')}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#EBE1D0]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9862C]"></span>
                      <span>{t('pastorPillar3')}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#EBE1D0]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9862C]"></span>
                      <span>{t('pastorPillar4')}</span>
                    </div>
                  </div>
                </div>

                {/* Pastoral Quote */}
                <div className="p-4 rounded-xl bg-white border-l-4 border-[#C9862C] shadow-xs">
                  <p className="text-xs sm:text-sm text-gray-700 italic">
                    {t('pastorQuote')}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#C9862C] hover:bg-[#B37220] transition-colors shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{t('btnContactPastor')}</span>
                  </Link>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Diversité & Unité en Christ (Nos membres viennent de...) */}
      <CommunityOriginsSection />
    </div>
  );
}
