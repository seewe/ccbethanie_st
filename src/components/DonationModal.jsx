import React, { useState } from 'react';
import { X, Heart, ShieldCheck, CheckCircle2, DollarSign, CreditCard, Send, Sparkles, Building2, HelpCircle } from 'lucide-react';
import { apiService } from '../services/api.js';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function DonationModal({ isOpen, onClose }) {
  const { t, language } = useLanguage();
  const [amount, setAmount] = useState('100');
  const [customAmount, setCustomAmount] = useState('');
  const [fund, setFund] = useState(t('donateFund1'));
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const activeAmount = customAmount ? customAmount : amount;

  const funds = [
    t('donateFund1'),
    t('donateFund2'),
    t('donateFund3'),
    t('donateFund4')
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await apiService.submitDonation({
        donorName: isAnonymous ? (language === 'en' ? 'Anonymous Donor' : 'Donateur Anonyme') : donorName,
        email,
        amount: Number(activeAmount),
        fund,
        paymentMethod: paymentMethod === 'credit_card' ? 'Credit Card' : 'Interac e-Transfer',
        isAnonymous
      });
      setSubmitted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setDonorName('');
    setEmail('');
    setCustomAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-amber-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E2632] via-[#2A3546] to-[#1E2632] text-white p-6 relative border-b-2 border-[#C9862C]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-[#F2B852] text-xs font-bold uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-[#F2B852]" />
            <span>{t('donateModalBadge')}</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">
            {t('donateModalTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            {t('donateVerse')}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-amber-100 text-[#C9862C] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {t('donateSuccessTitle')}
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                {t('donateSuccessP1')} <strong>{activeAmount} $ CAD</strong> {t('donateSuccessP2')} <em>{fund}</em> {t('donateSuccessP3')}
              </p>
              
              <div className="bg-gray-50 p-4 rounded-xl text-left text-xs space-y-2 border border-gray-200">
                <div className="flex items-center gap-2 text-gray-800 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>{t('donateTaxNotice')}</span>
                </div>
                <p className="text-gray-500">
                  {t('donateEmailNotice')}
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
              
              {/* Fund Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {t('donateFundLabel')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {funds.map((f) => (
                    <button
                      type="button"
                      key={f}
                      onClick={() => setFund(f)}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border text-left transition-all cursor-pointer ${
                        fund === f 
                          ? 'border-[#C9862C] bg-[#FAF4EA] text-[#8F4D12] shadow-sm' 
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {t('donateAmountLabel')}
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {['25', '50', '100', '250'].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => {
                        setAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2 text-center text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        amount === amt && !customAmount
                          ? 'bg-[#C9862C] text-white border-[#C9862C] shadow-sm'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {amt} $
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder={t('donateCustomAmountPlaceholder')}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#C9862C] outline-none"
                />
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {t('donatePaymentMethodLabel')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === 'credit_card'
                        ? 'border-[#C9862C] bg-[#FAF4EA] text-[#8F4D12]'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#C9862C]" />
                    <div>
                      <h4 className="text-xs font-bold">{t('donateCardMethod')}</h4>
                      <p className="text-[10px] text-gray-500">{t('donateCardSecureDesc')}</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('interac')}
                    className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === 'interac'
                        ? 'border-[#C9862C] bg-[#FAF4EA] text-[#8F4D12]'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Send className="w-4 h-4 text-[#C9862C]" />
                    <div>
                      <h4 className="text-xs font-bold">{t('donateInteracMethod')}</h4>
                      <p className="text-[10px] text-gray-500">{t('donateInteracDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donor Information */}
              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      {t('donateNameLabel')}
                    </label>
                    <input
                      type="text"
                      required={!isAnonymous}
                      disabled={isAnonymous}
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder={t('donateNamePlaceholder')}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#C9862C] outline-none disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      {t('donateEmailLabel')}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('formEmailPlaceholder')}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#C9862C] outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anonDonation"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded text-[#C9862C] focus:ring-[#C9862C] w-4 h-4"
                  />
                  <label htmlFor="anonDonation" className="text-xs text-gray-700 font-medium cursor-pointer">
                    {t('donateAnonymousLabel')}
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting || (!activeAmount || Number(activeAmount) <= 0)}
                  className="w-full py-3.5 bg-gradient-to-r from-[#D48E2E] to-[#A85C16] hover:from-[#E2A03C] hover:to-[#BD6B1E] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>
                    {submitting 
                      ? t('formSubmitting')
                      : `${t('donateSubmitBtn')} ${activeAmount || '0'} $ CAD`}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
