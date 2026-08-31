import React from 'react';
import { 
  MapPin, Mail, Church, 
  Car, Bus, Compass, ExternalLink, Navigation 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ContactPage({ onOpenVisitModal }) {
  const { t, language } = useLanguage();

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=1234+Rue+de+la+Foi+Montr%C3%A9al+QC+H1A+1A1";

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#121820] via-[#1E2632] to-[#251A10] text-white py-16 lg:py-20 border-b-4 border-[#C9862C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F2B852] text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t('contactHeaderBadge')}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              {t('contactHeaderTitle')}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {t('contactHeaderDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Identity & Subtitle Header */}
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="inline-block px-3 py-1 rounded-lg bg-[#FAF0DD] border border-[#E4CEAB]">
              <p className="text-xs sm:text-sm font-extrabold text-[#8F4D12] uppercase tracking-wider">
                {t('affiliation')}
              </p>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900">
              {language === 'en' ? 'Bethany Christian Community' : 'Communauté Chrétienne Béthanie'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              {t('churchDescSubtitle')}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* 1. Adresse postale (Placée en premier) */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-[#E4CEAB] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF0DD] text-[#8F4D12] border border-[#E4CEAB] flex items-center justify-center shrink-0 shadow-sm">
                    <Mail className="w-6 h-6 text-[#C9862C]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F4D12]">
                      {language === 'en' ? 'Postal Mail & Secretariat' : 'Courrier & Correspondance'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                      {t('contactPostalAddressLabel')}
                    </h3>
                  </div>
                </div>

                <div className="p-4 sm:p-5 bg-[#FCFAF6] rounded-2xl border border-[#EFE5D5] space-y-2">
                  <p className="text-base sm:text-lg font-bold text-gray-900">
                    {t('contactPostalAddressValue')}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {t('contactPostalAddressNote')}
                  </p>
                </div>
              </div>

              <div className="pt-2 text-xs text-gray-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C9862C]"></span>
                <span>{language === 'en' ? 'Official church mailing address' : 'Boîte postale officielle de l\'église'}</span>
              </div>
            </div>

            {/* 2. Adresse du lieu du culte */}
            <div className="md:col-span-2 lg:col-span-2 bg-white p-7 sm:p-8 rounded-3xl border border-[#E9D6BA] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FAF0DD] to-transparent rounded-bl-full -mr-8 -mt-8 pointer-events-none opacity-60"></div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF0DD] text-[#8F4D12] border border-[#E4CEAB] flex items-center justify-center shrink-0 shadow-sm">
                    <Church className="w-6 h-6 text-[#C9862C]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F4D12]">
                      {language === 'en' ? 'Worship & Celebrations' : 'Lieu de Rassemblement'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                      {t('contactWorshipAddressLabel')}
                    </h3>
                  </div>
                </div>

                <div className="p-4 sm:p-5 bg-[#FCFAF6] rounded-2xl border border-[#EFE5D5] space-y-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C9862C] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-base sm:text-lg font-bold text-gray-900">
                        {t('contactWorshipAddressValue')}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                        {t('contactWorshipScheduleNote')}
                      </p>
                      <p className="text-xs font-semibold text-[#8F4D12] mt-2 flex items-center gap-1.5">
                        {t('contactParkingNote')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#C9862C] hover:bg-[#B37220] transition-colors shadow-sm cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{t('contactGetDirections')}</span>
                </a>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                  <span>{t('contactOpenMapsBtn')}</span>
                </a>
              </div>
            </div>

            {/* 3. Courriel & Secrétariat */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-800 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-[#C9862C]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      {language === 'en' ? 'Electronic Mail' : 'Courrier Électronique'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900">
                      {t('contactEmailLabel')}
                    </h3>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                  <a
                    href="mailto:info@ccbethanie.ca"
                    className="text-base sm:text-lg font-bold text-[#8F4D12] hover:text-[#C9862C] transition-colors block break-all"
                  >
                    info@ccbethanie.ca
                  </a>
                  <p className="text-xs text-gray-500 leading-relaxed pt-1">
                    {t('contactEmailHours')}
                  </p>
                </div>
              </div>

              <div>
                <a
                  href="mailto:info@ccbethanie.ca"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C9862C]" />
                  <span>{language === 'en' ? 'Send an Email' : 'Écrire un courriel'}</span>
                </a>
              </div>
            </div>

            {/* 4. Plan d'accès & Transports */}
            <div className="md:col-span-2 bg-[#FCFAF6] p-7 sm:p-8 rounded-3xl border border-[#EFE5D5] space-y-5">
              <div className="flex items-center gap-3 pb-2 border-b border-[#E8D9C0]">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0DD] flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-[#C9862C]" />
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-gray-900">
                  {t('howToComeTitle')}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-gray-900">
                    <Car className="w-4 h-4 text-[#C9862C]" />
                    <span>{t('byCarTitle')}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {t('byCarDesc')}
                  </p>
                  <p className="text-[11px] text-[#8F4D12] font-semibold">
                    {t('contactParkingNote')}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-gray-900">
                    <Bus className="w-4 h-4 text-[#C9862C]" />
                    <span>{t('byTransitTitle')}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {t('byTransitDesc')}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {language === 'en' 
                      ? 'Drop-off station right at the church main entrance.'
                      : 'Arrêt de bus directement devant l\'entrée principale de l\'église.'}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Map Visual Presentation */}
          <div className="mt-10 bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="p-6 bg-gradient-to-r from-gray-900 to-[#1E2632] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F2B852] block mb-1">
                  {language === 'en' ? 'Interactive Map' : 'Carte Interactive & Localisation'}
                </span>
                <h4 className="text-lg font-serif font-bold text-white">
                  1234 Rue de la Foi, Montréal, QC H1A 1A1
                </h4>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#C9862C] hover:bg-[#B37220] transition-colors shadow"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t('contactOpenMapsBtn')}</span>
              </a>
            </div>

            {/* Styled Map Container */}
            <div className="relative h-72 sm:h-96 w-full bg-[#E5E3DF] overflow-hidden flex items-center justify-center">
              <iframe
                title="Localisation Église Béthanie"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?q=Montreal+Quebec+Canada&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full filter grayscale contrast-125 opacity-90 hover:filter-none hover:opacity-100 transition-all duration-500"
              ></iframe>
              <div className="absolute top-4 left-4 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 pointer-events-none max-w-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
                  <MapPin className="w-4 h-4 text-[#C9862C]" />
                  <span>Communauté Chrétienne Béthanie</span>
                </div>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  1234 Rue de la Foi, Montréal, QC
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
