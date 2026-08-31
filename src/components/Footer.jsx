import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Mail, Globe, Clock, 
  Shield, Youtube, Facebook, Instagram 
} from 'lucide-react';
import Logo from './Logo.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#121820] text-gray-300 pt-12 pb-8 border-t-4 border-[#C9862C]">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Col 1: Identity & About */}
          <div className="space-y-4">
            <div className="bg-white/95 p-3 rounded-xl inline-block shadow">
              <Logo variant="horizontal" size="sm" />
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {t('footerAbout')}
            </p>
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold block mb-2">
                {t('footerFollow')}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#C9862C] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#C9862C] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#C9862C] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Horaires des célébrations */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C9862C]" />
              {language === 'en' ? 'Service Schedule' : 'Horaires des Rencontres'}
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-800">
                <span className="font-bold text-[#F2B852] block text-xs uppercase tracking-wide">
                  {language === 'en' ? 'Sunday 10:30 AM' : 'Dimanche 10h30'}
                </span>
                <span className="text-white font-medium">
                  {language === 'en' ? 'Main Celebration & Worship' : 'Culte Principal de Célébration'}
                </span>
              </div>

              <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-800">
                <span className="font-bold text-gray-300 block text-xs uppercase tracking-wide">
                  {language === 'en' ? 'Wednesday 7:00 PM' : 'Mercredi 19h00'}
                </span>
                <span className="text-white font-medium">
                  {language === 'en' ? 'Bible Study & Discussion' : 'Étude Biblique & Partage'}
                </span>
              </div>

              <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-800">
                <span className="font-bold text-gray-300 block text-xs uppercase tracking-wide">
                  {language === 'en' ? 'Friday 7:30 PM' : 'Vendredi 19h30'}
                </span>
                <span className="text-white font-medium">
                  {language === 'en' ? 'Prayer & Intercession Night' : 'Soirée de Prière & Intercession'}
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C9862C]" />
              {t('footerContact')}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D48E2E] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-gray-400 block font-semibold">{language === 'en' ? 'Mailing Address' : 'Adresse postale'}</span>
                  <span>9999 rue du test, Québec, QC, G1G1G0</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D48E2E] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-gray-400 block font-semibold">{language === 'en' ? 'Worship Location' : 'Lieu de culte'}</span>
                  <span>1234 Rue de la Foi, Montréal, QC H1A 1A1</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1 border-t border-gray-800/80">
                <Mail className="w-4 h-4 text-[#D48E2E] shrink-0" />
                <span>info@ccbethanie.ca</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#D48E2E] shrink-0" />
                <span>www.ccbethanie.ca</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal / Copyright & Affiliation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-gray-800/80 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p>© {new Date().getFullYear()} {language === 'en' ? 'Bethany Christian Community' : 'Communauté Chrétienne Béthanie'}. {t('footerRights')}</p>
          <p className="text-xs text-gray-400 mt-1 font-medium">
            {t('footerPresbyterianAffiliation')}.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/contact" className="hover:text-gray-300 transition-colors">
            {language === 'en' ? 'Privacy Policy' : 'Politique de confidentialité'}
          </Link>
          <Link to="/contact" className="hover:text-gray-300 transition-colors">
            {language === 'en' ? 'Terms & Conditions' : 'Termes & Conditions'}
          </Link>
          <Link to="/admin" className="text-gray-600 hover:text-amber-400 transition-colors flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>{t('adminTitle')}</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
