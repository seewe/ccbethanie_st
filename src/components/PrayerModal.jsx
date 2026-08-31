import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Lock, Globe, AlertCircle, HeartHandshake } from 'lucide-react';
import { apiService } from '../services/api.js';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function PrayerModal({ isOpen, onClose, onPrayerAdded }) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    authorName: '',
    isAnonymous: false,
    category: t('prayerCatHealth'),
    requestText: '',
    isPublic: true // true = visible on community wall, false = confidential pastoral
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const categories = [
    t('prayerCatHealth'),
    t('prayerCatFamily'),
    t('prayerCatWork'),
    t('prayerCatSpiritual'),
    t('prayerCatThanks'),
    t('prayerCatOther')
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.requestText.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await apiService.submitPrayer({
        ...formData,
        authorName: formData.isAnonymous ? (language === 'en' ? 'Anonymous' : 'Anonyme') : formData.authorName
      });
      setSubmitted(true);
      if (onPrayerAdded) onPrayerAdded(res.data);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    } catch (err) {
      setError(language === 'en'
        ? "Error submitting your prayer request. Please retry."
        : "Erreur lors de l'envoi de votre requête. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      authorName: '',
      isAnonymous: false,
      category: t('prayerCatHealth'),
      requestText: '',
      isPublic: true
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-amber-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8F4D12] to-[#C9862C] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{t('prayerModalBadge')}</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">
            {t('prayerModalTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-white/90 mt-1">
            {t('prayerModalVerse')}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-amber-100 text-[#C9862C] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {t('prayerSuccessTitle')}
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                {t('prayerSuccessDesc')}
              </p>
              
              <div className="bg-[#FAF6EE] p-4 rounded-xl text-left text-xs space-y-2 border border-[#EAD5B2]">
                <p className="text-amber-900 font-medium">
                  {formData.isPublic 
                    ? t('prayerPublicNotice')
                    : t('prayerPrivateNotice')}
                </p>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 bg-[#C9862C] hover:bg-[#B37220] text-white font-bold rounded-xl transition-colors cursor-pointer"
              >
                {t('btnClose')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Confidentiality Toggle */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  {t('prayerVisibilityLabel')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isPublic: true })}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      formData.isPublic 
                        ? 'border-[#C9862C] bg-[#FAF4EA] text-[#8F4D12]' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Globe className="w-4 h-4 mt-0.5 shrink-0 text-[#C9862C]" />
                    <div>
                      <span className="text-xs font-bold block">{t('prayerPublicTabTitle')}</span>
                      <span className="text-[11px] text-gray-500">{t('prayerPublicTabDesc')}</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isPublic: false })}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      !formData.isPublic 
                        ? 'border-[#C9862C] bg-[#FAF4EA] text-[#8F4D12]' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Lock className="w-4 h-4 mt-0.5 shrink-0 text-[#C9862C]" />
                    <div>
                      <span className="text-xs font-bold block">{t('prayerPrivateTabTitle')}</span>
                      <span className="text-[11px] text-gray-500">{t('prayerPrivateTabDesc')}</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  {t('prayerCategoryLabel')}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#C9862C] outline-none bg-white"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Author info */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  {t('prayerAuthorLabel')}
                </label>
                <input
                  type="text"
                  required={!formData.isAnonymous}
                  disabled={formData.isAnonymous}
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  placeholder={t('prayerAuthorPlaceholder')}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#C9862C] outline-none disabled:bg-gray-100"
                />
                <div className="flex items-center gap-2 mt-1.5">
                  <input
                    type="checkbox"
                    id="anonPrayer"
                    checked={formData.isAnonymous}
                    onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                    className="rounded text-[#C9862C] focus:ring-[#C9862C] w-4 h-4"
                  />
                  <label htmlFor="anonPrayer" className="text-xs text-gray-600 cursor-pointer">
                    {t('prayerAnonymousCheckbox')}
                  </label>
                </div>
              </div>

              {/* Request text */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  {t('prayerTextLabel')}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.requestText}
                  onChange={(e) => setFormData({ ...formData, requestText: e.target.value })}
                  placeholder={t('prayerTextPlaceholder')}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#C9862C] outline-none resize-y"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-gradient-to-r from-[#D48E2E] to-[#A85C16] hover:from-[#E2A03C] hover:to-[#BD6B1E] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>{submitting ? t('formSubmitting') : t('prayerSubmitBtn')}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
