import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TravelHero } from '../travel/TravelHero';
import { TravelServices } from '../travel/TravelServices';
import { FeaturedDestinations } from '../travel/FeaturedDestinations';
import { Testimonials } from '../travel/Testimonials';
import { ContactSection } from '../travel/ContactSection';

export function HomePage() {
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    
      <TravelHero />
      <TravelServices />
      <FeaturedDestinations onNavigate={handleNavigate} />
      <Testimonials />
      <ContactSection />
    </>
  );
}

