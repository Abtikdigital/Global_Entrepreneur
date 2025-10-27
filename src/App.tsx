import React, { useState } from 'react';
import { TravelNavigation } from './components/travel/TravelNavigation';
import { TravelHero } from './components/travel/TravelHero';
import { TravelServices } from './components/travel/TravelServices';
import { FeaturedDestinations } from './components/travel/FeaturedDestinations';
import { Testimonials } from './components/travel/Testimonials';
import { ContactSection } from './components/travel/ContactSection';
import { TravelFooter } from './components/travel/TravelFooter';
import { DestinationsPage } from './components/pages/DestinationsPage';
import { PackagesPage } from './components/pages/PackagesPage';
import { AboutPage } from './components/pages/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const renderPage = () => {
    switch (currentPage) {
      case 'destinations':
        return (
          <>
            <DestinationsPage />
            <ContactSection />
          </>
        );
      case 'packages':
        return (
          <>
            <PackagesPage />
            <ContactSection />
          </>
        );
      case 'about':
        return (
          <>
            <AboutPage />
            <ContactSection />
          </>
        );
      default:
        return (
          <>
            <TravelHero />
            <TravelServices />
            <FeaturedDestinations onNavigate={setCurrentPage} />
            <Testimonials />
            <ContactSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* DaisyUI Modal */}
      <dialog className={`modal ${isDialogOpen ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Welcome to Global Pioneers!</h3>
          <p className="py-4">Your journey to amazing destinations starts here. Explore our travel packages and discover the world.</p>
          <div className="modal-action">
            <button className="btn" onClick={() => setIsDialogOpen(false)}>Get Started</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setIsDialogOpen(false)}>close</button>
        </form>
      </dialog>

      <TravelNavigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <TravelFooter onNavigate={setCurrentPage} />
    </div>
  );
}
