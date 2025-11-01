import React, { useEffect, useState, useMemo } from 'react';
import { Button } from '../ui/button';
import { ArrowRight, Search, MapPin, Calendar, Plane } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Input } from '../ui/input';
import { useDialog } from '../../contexts/DialogContext';

export function TravelHero() {
  const { openDialog } = useDialog();
  const [flightType, setFlightType] = useState<'domestic' | 'international'>('domestic');
  const [flightCountry, setFlightCountry] = useState('');
  const [flightFrom, setFlightFrom] = useState('');
  const [flightTo, setFlightTo] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [countriesData, setCountriesData] = useState<any>(null);
  const [allCountries, setAllCountries] = useState<string[]>([]);

  useEffect(() => {
    // Fetch countries data
    fetch('/data/countries.json')
      .then((r) => r.json())
      .then((data) => {
        setCountriesData(data);
        if (data?.countries?.length) {
          const countryNames = data.countries.map((c: any) => c.name);
          setAllCountries(countryNames);
        }
      })
      .catch(() => {
        // ignore fetch errors
      });
  }, []);

  // Get states for selected country (domestic flights)
  const statesForCountry = useMemo(() => {
    if (!countriesData || !flightCountry || flightType !== 'domestic') return [];
    const country = countriesData.countries.find((c: any) => c.name === flightCountry);
    if (!country || !country.states) return [];
    return country.states.map((s: any) => s.name);
  }, [countriesData, flightCountry, flightType]);

  // Get locations for From/To fields based on flight type
  const locationOptions = useMemo(() => {
    if (!countriesData) return [];
    const opts: string[] = [];

    if (flightType === 'domestic') {
      // For domestic: show states and cities of selected country
      if (flightCountry) {
        const country = countriesData.countries.find((c: any) => c.name === flightCountry);
        if (country && country.states) {
          for (const state of country.states) {
            opts.push(state.name);
            if (Array.isArray(state.cities)) {
              for (const city of state.cities) {
                if (city) opts.push(`${city}, ${state.name}`);
              }
            }
          }
        }
      } else {
        // If no country selected, show all states from all countries
        for (const country of countriesData.countries) {
          if (Array.isArray(country.states)) {
            for (const state of country.states) {
              opts.push(`${state.name}, ${country.name}`);
              if (Array.isArray(state.cities)) {
                for (const city of state.cities) {
                  if (city) opts.push(`${city}, ${state.name}, ${country.name}`);
                }
              }
            }
          }
        }
      }
    } else {
      // For international: show all countries and their major cities
      for (const country of countriesData.countries) {
        opts.push(country.name);
        if (Array.isArray(country.states)) {
          for (const state of country.states) {
            if (Array.isArray(state.cities)) {
              for (const city of state.cities) {
                if (city) opts.push(`${city}, ${country.name}`);
              }
            }
          }
        }
      }
    }

    return Array.from(new Set(opts));
  }, [countriesData, flightType, flightCountry]);

  const handleSearch = () => {
    openDialog({
      flightType: flightType,
      flightCountry: flightCountry,
      flightFrom: flightFrom,
      flightTo: flightTo,
      flightDate: flightDate
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
      <section className="relative px-2 md:px-6 h-[600px] sm:h-[700px] md:h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="/images/HeroImage1.jpg"
          alt="Luxury Travel Destination"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/40 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx:auto px-4 sm:px-6 lg:px-20 py-20 sm:py-32 md:py-40 text-center">
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 bg:white/10 backdrop-blur-sm border border-white/20">
            <Plane size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
            <span className="text-white text-sm sm:text-base">Your Journey Begins Here</span>
          </div>
          
          <h1 className="text-white mb-4 sm:mb-6 px-4 sm:px-0" style={{fontSize: '2.5rem', fontWeight: 700, lineHeight: '1.2'}}>
            Explore the World with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(to right, #385678, #17947F)'}}>
              Global Pioneers
            </span>
          </h1>
          
          <p className="text-white/90 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 px-4 sm:px-0">
            Customized luxury travel, adventure tours, corporate trips, religious pilgrimages, 
            student travel, cruise vacations, and destination weddings
          </p>
        </div>

        {/* Flight Search Box */}
        <div className="max-w-5xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6">
            {/* Flight Type Selection */}
            <div className="mb-4 flex gap-3 justify-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="flightType"
                  value="domestic"
                  checked={flightType === 'domestic'}
                  onChange={(e) => {
                    setFlightType('domestic');
                    setFlightFrom('');
                    setFlightTo('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Domestic</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="flightType"
                  value="international"
                  checked={flightType === 'international'}
                  onChange={(e) => {
                    setFlightType('international');
                    setFlightCountry('');
                    setFlightFrom('');
                    setFlightTo('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">International</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              {/* Country field for domestic flights */}
              {flightType === 'domestic' && (
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-input-background">
                  <MapPin size={20} className="text-muted-foreground shrink-0" />
                  <Input
                    placeholder="Country"
                    value={flightCountry}
                    onChange={(e) => {
                      setFlightCountry(e.target.value);
                      setFlightFrom('');
                      setFlightTo('');
                    }}
                    list="hero-countries"
                    className="border-0 bg-transparent p-0 focus-visible:ring-0 flex-1"
                  />
                </div>
              )}

              <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-input-background">
                <MapPin size={20} className="text-muted-foreground shrink-0" />
                <Input
                  placeholder={flightType === 'domestic' ? 'From (State/City)' : 'From (Country/City)'}
                  value={flightFrom}
                  onChange={(e) => setFlightFrom(e.target.value)}
                  list="hero-from-locations"
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 flex-1"
                />
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-input-background">
                <MapPin size={20} className="text-muted-foreground shrink-0" />
                <Input
                  placeholder={flightType === 'domestic' ? 'To (State/City)' : 'To (Country/City)'}
                  value={flightTo}
                  onChange={(e) => setFlightTo(e.target.value)}
                  list="hero-to-locations"
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 flex-1"
                />
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-input-background date-input-wrapper">
                <Calendar size={20} className="text-muted-foreground shrink-0" />
                <Input
                  type="date"
                  value={flightDate}
                  onChange={(e) => setFlightDate(e.target.value)}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 flex-1"
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="bg-gradient-to-r text-white hover:opacity-90 h-full text-sm sm:text-base whitespace-nowrap col-span-1 sm:col-span-2 lg:col-span-1"
                style={{background: 'linear-gradient(to right, #385678, #17947F)'}}
              >
                <Search size={18} className="mr-2" />
                Search Flights
              </Button>
            </div>
            
            {/* Datalists */}
            <datalist id="hero-countries">
              {allCountries.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>
            <datalist id="hero-from-locations">
              {locationOptions.map((opt) => (
                <option key={opt} value={opt} />
              ))}
            </datalist>
            <datalist id="hero-to-locations">
              {locationOptions.map((opt) => (
                <option key={opt} value={opt} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            onClick={() => scrollToSection('services-section')}
            className="text-white hover:opacity-90"
            style={{background: 'linear-gradient(to right, #385678, #17947F)'}}
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
