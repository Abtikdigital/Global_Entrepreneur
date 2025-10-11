import { useState } from 'react';
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
      <TravelNavigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <TravelFooter onNavigate={setCurrentPage} />
    </div>
  );
}
