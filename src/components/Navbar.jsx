import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, MapPin, Mail, Clock, MessageSquare
} from 'lucide-react';
import Logo from './Logo.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      isScrolled ? 'shadow-md' : 'shadow-xs'
    }`}>
      {/* Top Contact & Information Ribbon - Always sticky with header */}
      <div className="bg-[#14181F] text-[#E2E8F0] text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#2D3748]/70 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto flex items-center">
          {/* Left contact info: worship hour, address, email */}
          <div className="flex items-center gap-3 sm:gap-6 text-[11px] sm:text-xs overflow-x-auto no-scrollbar py-0.5">
            <div className="flex items-center gap-1.5 text-[#F2B852] shrink-0 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{t('worshipNotice')}</span>
              <span className="text-white font-bold">{t('worshipHours')}</span>
            </div>
            
            <div className="hidden sm:flex items-center gap-1.5 text-gray-300 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-[#D48E2E]" />
              <span>{t('churchAddress')}</span>
            </div>

            <a 
              href="mailto:info@ccbethanie.ca" 
              className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors shrink-0"
              title="Courriel du secrétariat"
            >
              <Mail className="w-3.5 h-3.5 text-[#D48E2E]" />
              <span>info@ccbethanie.ca</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full bg-white/98 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'py-2 sm:py-2.5 border-b border-gray-200/80' : 'py-3 sm:py-3.5 border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo (Icon only, no text) */}
          <Link to="/" className="flex items-center group focus:outline-none">
            <Logo variant="icon" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-5">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-[#C9862C] font-semibold' 
                  : 'text-[#1E232A] hover:text-[#C9862C]'
              }`}
            >
              {t('navHome')}
            </Link>

            {/* Notre Église */}
            <Link
              to="/notre-eglise"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/notre-eglise')
                  ? 'text-[#C9862C] font-semibold' 
                  : 'text-[#1E232A] hover:text-[#C9862C]'
              }`}
            >
              {t('navAbout')}
            </Link>

            {/* Ministères */}
            <Link
              to="/ministeres"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/ministeres') 
                  ? 'text-[#C9862C] font-semibold' 
                  : 'text-[#1E232A] hover:text-[#C9862C]'
              }`}
            >
              {t('navMinistries')}
            </Link>

            {/* Événements */}
            <Link
              to="/evenements"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/evenements') 
                  ? 'text-[#C9862C] font-semibold' 
                  : 'text-[#1E232A] hover:text-[#C9862C]'
              }`}
            >
              {t('navEvents')}
            </Link>

            {/* Mur de Prière */}
            <Link
              to="/priere"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/priere') 
                  ? 'text-[#C9862C] font-semibold' 
                  : 'text-[#1E232A] hover:text-[#C9862C]'
              }`}
            >
              {t('navPrayer')}
            </Link>
          </div>

          {/* Right Action: Language Switch Button + Bouton Nous Contacter */}
          <div className="hidden sm:flex items-center gap-3.5">
            {/* Language Switcher Pill in Navbar */}
            <LanguageSwitcher size="md" />

            <Link
              to="/contact"
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#D48E2E] to-[#A85C16] hover:from-[#E2A03C] hover:to-[#BD6B1E] shadow-sm rounded-md transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t('btnContact')}</span>
            </Link>
          </div>

          {/* Mobile Menu & Switch Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher size="sm" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-[#C9862C] hover:bg-gray-100 focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <div className="py-2 border-b border-gray-100 text-xs text-amber-700 bg-amber-50 px-3 rounded flex items-center justify-between">
              <span>📅 {t('worshipHours')}</span>
              <span className="text-gray-500">{language === 'en' ? 'Montreal, QC' : 'Montréal, QC'}</span>
            </div>

            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') ? 'bg-amber-50 text-[#C9862C] font-bold' : 'text-gray-800'
              }`}
            >
              {t('navHome')}
            </Link>

            <Link
              to="/notre-eglise"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/notre-eglise') ? 'bg-amber-50 text-[#C9862C] font-bold' : 'text-gray-800'
              }`}
            >
              {t('navAbout')}
            </Link>

            <Link
              to="/ministeres"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/ministeres') ? 'bg-amber-50 text-[#C9862C] font-bold' : 'text-gray-800'
              }`}
            >
              {t('navMinistries')}
            </Link>

            <Link
              to="/evenements"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/evenements') ? 'bg-amber-50 text-[#C9862C] font-bold' : 'text-gray-800'
              }`}
            >
              {t('navEvents')}
            </Link>

            <Link
              to="/priere"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/priere') ? 'bg-amber-50 text-[#C9862C] font-bold' : 'text-gray-800'
              }`}
            >
              {t('navPrayer')}
            </Link>

            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/contact') ? 'bg-amber-50 text-[#C9862C] font-bold' : 'text-gray-800'
              }`}
            >
              {t('navContact')}
            </Link>

            <div className="pt-3 flex flex-col gap-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-xs font-semibold text-gray-700">
                  {language === 'fr' ? 'Langue / Language :' : 'Language / Langue :'}
                </span>
                <LanguageSwitcher size="md" />
              </div>

              <Link
                to="/contact"
                className="w-full py-2.5 px-4 text-center font-bold text-white bg-gradient-to-r from-[#D48E2E] to-[#A85C16] rounded-lg shadow flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('btnContact')}</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
