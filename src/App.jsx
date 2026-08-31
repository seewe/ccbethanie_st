import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import VisitPlannerModal from './components/VisitPlannerModal.jsx';
import DonationModal from './components/DonationModal.jsx';
import PrayerModal from './components/PrayerModal.jsx';
import SermonPlayerModal from './components/SermonPlayerModal.jsx';

// Pages
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import MinistriesPage from './pages/MinistriesPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import PrayerWallPage from './pages/PrayerWallPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [activeSermon, setActiveSermon] = useState(null);

  const handleOpenVisitModal = () => setIsVisitModalOpen(true);
  const handleCloseVisitModal = () => setIsVisitModalOpen(false);

  const handleOpenDonationModal = () => setIsDonationModalOpen(true);
  const handleCloseDonationModal = () => setIsDonationModalOpen(false);

  const handleOpenPrayerModal = () => setIsPrayerModalOpen(true);
  const handleClosePrayerModal = () => setIsPrayerModalOpen(false);

  const handlePlaySermon = (sermon) => setActiveSermon(sermon);
  const handleCloseSermonPlayer = () => setActiveSermon(null);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white text-gray-900 selection:bg-[#F2B852] selection:text-black">
          
          {/* Navigation Bar */}
          <Navbar
            onOpenVisitModal={handleOpenVisitModal}
            onOpenDonationModal={handleOpenDonationModal}
          />

          {/* Dynamic Main Routing */}
          <main className="flex-grow">
            <Routes>
              <Route 
                path="/" 
                element={
                  <HomePage
                    onOpenVisitModal={handleOpenVisitModal}
                    onOpenDonationModal={handleOpenDonationModal}
                    onOpenPrayerModal={handleOpenPrayerModal}
                    onPlaySermon={handlePlaySermon}
                  />
                } 
              />
              <Route 
                path="/notre-eglise" 
                element={<AboutPage onOpenVisitModal={handleOpenVisitModal} />} 
              />
              <Route 
                path="/ministeres" 
                element={<MinistriesPage />} 
              />
              <Route 
                path="/evenements" 
                element={<EventsPage onOpenVisitModal={handleOpenVisitModal} />} 
              />
              <Route 
                path="/priere" 
                element={<PrayerWallPage onOpenPrayerModal={handleOpenPrayerModal} />} 
              />
              <Route 
                path="/contact" 
                element={<ContactPage onOpenVisitModal={handleOpenVisitModal} />} 
              />
              <Route 
                path="/admin" 
                element={<AdminPage />} 
              />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer 
            onOpenVisitModal={handleOpenVisitModal}
            onOpenDonationModal={handleOpenDonationModal}
            onOpenPrayerModal={handleOpenPrayerModal}
          />

          {/* Global Modals */}
          <VisitPlannerModal
            isOpen={isVisitModalOpen}
            onClose={handleCloseVisitModal}
          />

          <DonationModal
            isOpen={isDonationModalOpen}
            onClose={handleCloseDonationModal}
          />

          <PrayerModal
            isOpen={isPrayerModalOpen}
            onClose={handleClosePrayerModal}
          />

          <SermonPlayerModal
            sermon={activeSermon}
            isOpen={!!activeSermon}
            onClose={handleCloseSermonPlayer}
          />

        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
