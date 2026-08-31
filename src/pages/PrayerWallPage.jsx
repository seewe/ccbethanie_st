import React, { useState, useEffect } from 'react';
import { 
  Sparkles, HeartHandshake, Lock, Globe, Heart, 
  MessageSquare, User, Clock, CheckCircle2 
} from 'lucide-react';
import { apiService } from '../services/api.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function PrayerWallPage({ onOpenPrayerModal }) {
  const { t, language } = useLanguage();
  const [prayers, setPrayers] = useState([]);
  const [prayedIds, setPrayedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await apiService.getPrayers();
      setPrayers(data);
      setLoading(false);
    }
    load();
  }, []);

  const handlePrayClick = async (id) => {
    if (prayedIds.has(id)) return;

    try {
      const res = await apiService.prayForRequest(id);
      setPrayers(prev => prev.map(p => {
        if (p.id === id) {
          return { ...p, prayerCount: res.prayerCount };
        }
        return p;
      }));
      setPrayedIds(prev => new Set(prev).add(id));
    } catch (err) {
      console.error(err);
    }
  };

  const getCategoryLabel = (cat) => {
    if (!cat) return t('prayerCatOther');
    if (cat.toLowerCase().includes('santé') || cat.toLowerCase().includes('health')) return t('prayerCatHealth');
    if (cat.toLowerCase().includes('famille') || cat.toLowerCase().includes('family')) return t('prayerCatFamily');
    if (cat.toLowerCase().includes('travail') || cat.toLowerCase().includes('work')) return t('prayerCatWork');
    if (cat.toLowerCase().includes('spirituelle') || cat.toLowerCase().includes('spiritual')) return t('prayerCatSpiritual');
    if (cat.toLowerCase().includes('grâce') || cat.toLowerCase().includes('thanks')) return t('prayerCatThanks');
    return cat;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#121820] via-[#1E2632] to-[#251A10] text-white py-16 lg:py-20 border-b-4 border-[#C9862C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F2B852] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('prayerHeaderBadge')}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              {t('prayerHeaderTitle')}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {t('prayerHeaderVerse')}
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenPrayerModal}
                className="px-6 py-3 bg-[#C9862C] hover:bg-[#B37220] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
              >
                {t('btnSubmitPrayerIntent')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Prayers Grid */}
      <section className="py-16 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-[#F0E5D4]">
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                {t('prayerSectionTitle')}
              </h2>
              <p className="text-xs text-gray-600">{t('prayerSectionSubtitle')}</p>
            </div>

            <button
              onClick={onOpenPrayerModal}
              className="px-4 py-2 bg-white hover:bg-amber-50 text-[#8F4D12] text-xs font-bold uppercase tracking-wider rounded-lg border border-[#E9D6BA] shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-[#C9862C]" />
              <span>{t('btnAddMyRequest')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prayers.map((prayer) => {
              const hasPrayed = prayedIds.has(prayer.id);

              return (
                <div
                  key={prayer.id}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-full font-bold bg-[#FAF4EA] text-[#8F4D12] border border-[#E8D4B8] text-[10px]">
                        {getCategoryLabel(prayer.category)}
                      </span>
                      <span className="text-gray-400 text-[11px]">
                        {new Date(prayer.createdAt).toLocaleDateString(language === 'en' ? 'en-CA' : 'fr-CA')}
                      </span>
                    </div>

                    <p className="text-sm text-gray-800 leading-relaxed font-sans italic">
                      « {prayer.requestText} »
                    </p>

                    <div className="text-xs font-semibold text-[#8F4D12] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span>{prayer.authorName}</span>
                    </div>
                  </div>

                  {/* Prayer Counter CTA */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => handlePrayClick(prayer.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        hasPrayed
                          ? 'bg-amber-100 text-[#8F4D12] border border-amber-300'
                          : 'bg-[#FAF4EA] hover:bg-[#F4E6D2] text-[#8F4D12] border border-[#E9D6BA]'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${hasPrayed ? 'fill-[#C9862C] text-[#C9862C]' : 'text-[#C9862C]'}`} />
                      <span>{hasPrayed ? t('btnIPrayed') : t('btnIPrayForThis')}</span>
                    </button>

                    <span className="text-xs text-gray-500 font-medium">
                      <strong>{prayer.prayerCount || 1}</strong> {t('prayersCountSuffix')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
