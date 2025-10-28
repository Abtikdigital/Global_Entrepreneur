import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { MapPin, Star, Clock, Users, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useDialog } from '../../contexts/DialogContext';

export function DestinationsPage() {
  const { openDialog } = useDialog();
  const destinations = [
    {
      name: 'Dubai',
      country: 'United Arab Emirates',
      image: '/images/DubaiImage.jpg',
      rating: 4.8,
      description: 'Discover the perfect blend of modern luxury and traditional Arabian culture. From towering skyscrapers to golden deserts.',
      highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall', 'Palm Jumeirah'],
    },
    {
      name: 'Vietnam',
      country: 'Southeast Asia',
      image: '/images/Vietnama.jpg',
      rating: 4.7,
      description: 'Explore stunning landscapes, rich history, and delicious cuisine in this beautiful Southeast Asian destination.',
      highlights: ['Ha Long Bay', 'Ho Chi Minh City', 'Hoi An Old Town', 'Mekong Delta'],
    },
    {
      name: 'Thailand',
      country: 'Southeast Asia',
      image: '/images/ThailandImage.jpg',
      rating: 4.7,
      description: 'Tropical paradise with stunning beaches, vibrant nightlife, and rich culture. Perfect blend of relaxation and adventure.',
      highlights: ['Phi Phi Islands', 'Bangkok Temples', 'Street Food', 'Island Hopping'],
    },
    {
      name: 'Europe',
      country: 'Multi-Country',
      image: '/images/EuropeImage.jpg',
      rating: 4.9,
      description: 'Explore multiple European countries in one incredible journey. From Paris to Rome, experience the best of European culture and architecture.',
      highlights: ['Eiffel Tower', 'Swiss Alps', 'Venice Canals', 'Historic Cities'],
    },
    {
      name: 'Maldives',
      country: 'Indian Ocean',
      image: '/images/MaldivsImage.jpg',
      rating: 4.9,
      description: 'Experience luxury at its finest in the crystal-clear waters and pristine beaches of Maldives. Perfect for honeymooners and luxury seekers.',
      highlights: ['Overwater Villas', 'Snorkeling & Diving', 'Private Beach Access', 'Spa & Wellness'],
    },
    {
      name: 'Religious Tour',
      country: 'India',
      image: '/images/ReligiousTempalImage.jpg',
      rating: 4.9,
      description: 'Spiritual journey to India\'s most sacred sites. Experience Ganga Aarti, temple visits, and spiritual enlightenment.',
      highlights: ['Ganga Aarti', 'Ancient Temples', 'Yoga & Meditation', 'Holy Ghats'],
    },
    {
      name: 'Goa',
      country: 'India - West Coast',
      image: '/images/GoaImage.jpg',
      rating: 4.8,
      description: 'Beautiful beaches, vibrant nightlife, and Portuguese colonial architecture make Goa a perfect holiday destination.',
      highlights: ['Beautiful Beaches', 'Water Sports', 'Spice Plantations', 'Historic Churches'],
    },
    {
      name: 'Kerala',
      country: 'India - South',
      image: '/images/KeralaImage.jpg',
      rating: 4.9,
      description: 'God\'s Own Country - serene backwaters, lush green landscapes, and rich cultural heritage await you.',
      highlights: ['Backwaters', 'Tea Plantations', 'Wildlife Sanctuaries', 'Ayurvedic Spas'],
    },
    {
      name: 'Manali',
      country: 'India - Himachal Pradesh',
      image: '/images/ManaliImage.jpg',
      rating: 4.7,
      description: 'Majestic mountains, adventure sports, and stunning landscapes make Manali a perfect hill station getaway.',
      highlights: ['Snowy Peaks', 'Adventure Sports', 'Hot Springs', 'Temples & Monasteries'],
    },
    {
      name: 'Rajasthan',
      country: 'India - Desert State',
      image: '/images/RajasthanImage.jpg',
      rating: 4.8,
      description: 'Royal heritage, magnificent palaces, and vibrant culture in the land of kings and queens.',
      highlights: ['Royal Palaces', 'Desert Safari', 'Folk Culture', 'Heritage Hotels'],
    },
  ];

  return (
    <div className="min-h-screen pt-18 pb-12 sm:pb-16">
      {/* Hero Section */}
      <section className="relative ">
        <div className="relative h-72 sm:h-96 md:h-[450px] lg:h-[500px] mb-8 sm:mb-12 md:mb-16 overflow-hidden rounded-b-lg sm:rounded-b-xl md:rounded-b-2xl">
          <ImageWithFallback
            src="/images/HeroImage1.jpg"
            alt="Destinations"
            className="w-full h-full object-cover object-center scale-110 hover:scale-100 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-3xl px-4 sm:px-6">
              <h1 className="text-white mb-3 sm:mb-4" style={{fontSize: '2.5rem', fontWeight: 700, lineHeight: '1.2'}}>
                Explore Amazing Destinations
              </h1>
              <p className="text-white/90 text-base sm:text-lg md:text-xl">
                Discover handpicked destinations from around the world, each offering unique experiences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="px-2 md:px-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {destinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-2/5 relative">
                    <ImageWithFallback
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{destination.rating}</span>
                    </div>
                  </div>
                  <div className="md:w-3/5 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="mb-1" style={{fontSize: '1.5rem', fontWeight: 600, lineHeight: '1.4', background: 'linear-gradient(to right, #385678, #17947F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>{destination.name}</h3>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <MapPin size={14} />
                          <span>{destination.country}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {destination.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-sm mb-2">Highlights:</p>
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.slice(0, 4).map((highlight, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 rounded-full text-white" style={{background: 'linear-gradient(to right, #385678, #17947F)'}}>
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-end pt-4 border-t border-border">
                      <Button 
                        onClick={() => openDialog({
                          name: destination.name,
                          image: destination.image,
                          rating: destination.rating,
                          highlights: destination.highlights?.join(', '),
                          includes: destination.highlights
                        })}
                        className="text-white hover:opacity-90"
                        style={{background: 'linear-gradient(to right, #385678, #17947F)'}}
                      >
                        View Details
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
