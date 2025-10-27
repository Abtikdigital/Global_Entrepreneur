import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ArrowRight, Search, MapPin, Calendar, Plane } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Input } from '../ui/input';
import { useDialog } from '../../contexts/DialogContext';

export function TravelHero() {
  const { openDialog } = useDialog();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    openDialog({
      destination: location,
      date: date
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        .date-input-wrapper input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
          position: absolute;
          right: 0;
          left: 0;
        }
        
        .date-input-wrapper input[type="date"]::-webkit-inner-spin-button,
        .date-input-wrapper input[type="date"]::-webkit-clear-button {
          display: none;
        }
        
        .date-input-wrapper {
          position: relative;
          cursor: pointer;
        }
      `}</style>
      <section className="relative min-h-[600px] sm:min-h-[700px] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="/images/luxury-travel-hero.jpg"
          alt="Luxury Travel Destination"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 md:py-40 text-center">
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 bg-white/10 backdrop-blur-sm border border-white/20">
            <Plane size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
            <span className="text-white text-sm sm:text-base">Your Journey Begins Here</span>
          </div>
          
          <h1 className="text-white mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-tight sm:leading-[1.1] px-4 sm:px-0">
            Explore the World with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Global Pioneers
            </span>
          </h1>
          
          <p className="text-white/90 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 px-4 sm:px-0">
            Customized luxury travel, adventure tours, corporate trips, religious pilgrimages, 
            student travel, cruise vacations, and destination weddings
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-input-background">
                <MapPin size={20} className="text-muted-foreground" />
                <Input
                  placeholder="Where to?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-input-background date-input-wrapper">
                <Calendar size={20} className="text-muted-foreground flex-shrink-0" />
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 flex-1"
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 h-full text-sm sm:text-base whitespace-nowrap"
              >
                <Search size={18} className="mr-2" />
                Search Packages
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            onClick={() => scrollToSection('services-section')}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
          >
            Explore Our Services
            <ArrowRight className="ml-2" size={20} />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => openDialog({})}
            className="border-2 border-white text-black hover:text-white cursor-pointer hover:bg-white/10"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
    </>
  );
}
