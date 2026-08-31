import React, { useState } from 'react';
import { X, Calendar, Users, CheckCircle2, Clock, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { apiService } from '../services/api.js';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function VisitPlannerModal({ isOpen, onClose }) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visitDate: '2025-05-25',
    numberOfPeople: 1,
    childrenCount: 0,
    hasQuestions: '',
    needParkingInfo: true
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await apiService.planVisit(formData);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    } catch (err) {
      setError(language === 'en' 
        ? "An error occurred while saving your visit. Please retry or contact us directly."
        : "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer ou nous contacter par téléphone.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      visitDate: '2025-05-25',
      numberOfPeople: 1,
      childrenCount: 0,
      hasQuestions: '',
      needParkingInfo: true
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-amber-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#D48E2E] to-[#A85C16] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{t('visitModalBadge')}</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">
            {t('visitModalTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-white/90 mt-1">
            {t('visitModalSubtitle')}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {t('visitSuccessTitle')}
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                {t('visitSuccessDesc1')} <strong>{formData.name}</strong> {t('visitSuccessDesc2')}
              </p>

              <div className="bg-[#FAF6EE] p-4 rounded-xl text-left text-xs space-y-2 border border-[#EAD5B2]">
                <div className="flex items-center gap-2 text-[#8F4D12] font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>{t('visitArrivalLabel')}</span>
                </div>
                <div className="flex items-center gap-2 text-[#8F4D12] font-semibold">
                  <MapPin className="w-4 h-4" />
                  <span>{t('visitAddressLabel')}</span>
                </div>
                {Number(formData.childrenCount) > 0 && (
                  <p className="text-gray-700">
                    {t('visitKidsNote')}
                  </p>
                )}
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 bg-[#C9862C] hover:bg-[#B37220] text-white font-bold rounded-xl transition-colors cursor-pointer"
              >
                {t('visitBtnDone')}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {t('formNameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('formNamePlaceholder')}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#C9862C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {t('formEmailLabel')}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('formEmailPlaceholder')}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#C9862C] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {t('formPhoneLabel')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t('formPhonePlaceholder')}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#C9862C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {t('visitDateLabel')}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#C9862C] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {t('visitPeopleCountLabel')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    required
                    value={formData.numberOfPeople}
                    onChange={(e) => setFormData({ ...formData, numberOfPeople: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#C9862C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {t('visitChildrenCountLabel')}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.childrenCount}
                    onChange={(e) => setFormData({ ...formData, childrenCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#C9862C] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  {t('visitQuestionsLabel')}
                </label>
                <textarea
                  rows={2}
                  value={formData.hasQuestions}
                  onChange={(e) => setFormData({ ...formData, hasQuestions: e.target.value })}
                  placeholder={t('visitQuestionsPlaceholder')}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#C9862C] outline-none resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="parkingInfo"
                  checked={formData.needParkingInfo}
                  onChange={(e) => setFormData({ ...formData, needParkingInfo: e.target.checked })}
                  className="rounded text-[#C9862C] focus:ring-[#C9862C] w-4 h-4"
                />
                <label htmlFor="parkingInfo" className="text-xs text-gray-700 font-medium">
                  {t('visitParkingCheckbox')}
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-gradient-to-r from-[#D48E2E] to-[#A85C16] hover:from-[#E2A03C] hover:to-[#BD6B1E] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? t('formSubmitting') : t('btnPlanVisit')}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
