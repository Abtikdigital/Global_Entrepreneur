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
      name: 'Maldives',
      country: 'Indian Ocean',
      image: '/images/maldives-resort.jpg',
      rating: 4.9,
      duration: '5-7 Days',
      groupSize: '2-6 People',
      description: 'Experience luxury at its finest in the crystal-clear waters and pristine beaches of Maldives. Perfect for honeymooners and luxury seekers.',
      highlights: ['Overwater Villas', 'Snorkeling & Diving', 'Private Beach Access', 'Spa & Wellness'],
      price: '₹89,999'
    },
    {
      name: 'Dubai',
      country: 'United Arab Emirates',
      image: '/images/dubai-skylines.jpg',
      rating: 4.8,
      duration: '4-6 Days',
      groupSize: '2-10 People',
      description: 'Discover the perfect blend of modern luxury and traditional Arabian culture. From towering skyscrapers to golden deserts.',
      highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall', 'Palm Jumeirah'],
      price: '₹54,999'
    },
    {
      name: 'Golden Triangle',
      country: 'India (Delhi-Agra-Jaipur)',
      image: '/images/taj-mahal.jpg',
      rating: 5.0,
      duration: '5-7 Days',
      groupSize: '4-15 People',
      description: 'Experience India\'s most iconic monuments and rich cultural heritage. Visit the Taj Mahal, explore royal palaces, and immerse in history.',
      highlights: ['Taj Mahal', 'Amber Fort', 'Red Fort', 'Hawa Mahal'],
      price: '₹18,999'
    },
    {
      name: 'Europe Tour',
      country: 'Multi-Country',
      image: '/images/europe-architecture.jpg',
      rating: 4.9,
      duration: '10-15 Days',
      groupSize: '6-20 People',
      description: 'Explore multiple European countries in one incredible journey. From Paris to Rome, experience the best of European culture and architecture.',
      highlights: ['Eiffel Tower', 'Swiss Alps', 'Venice Canals', 'Historic Cities'],
      price: '₹1,49,999'
    },
    {
      name: 'Thailand',
      country: 'Southeast Asia',
      image: '/images/tropical-beach.jpg',
      rating: 4.7,
      duration: '5-7 Days',
      groupSize: '2-12 People',
      description: 'Tropical paradise with stunning beaches, vibrant nightlife, and rich culture. Perfect blend of relaxation and adventure.',
      highlights: ['Phi Phi Islands', 'Bangkok Temples', 'Street Food', 'Island Hopping'],
      price: '₹42,999'
    },
    {
      name: 'Religious India',
      country: 'India (Varanasi-Haridwar-Rishikesh)',
      image: '/images/temple-pilgrimage.jpg',
      rating: 4.9,
      duration: '6-8 Days',
      groupSize: '4-20 People',
      description: 'Spiritual journey to India\'s most sacred sites. Experience Ganga Aarti, temple visits, and spiritual enlightenment.',
      highlights: ['Ganga Aarti', 'Ancient Temples', 'Yoga & Meditation', 'Holy Ghats'],
      price: '₹22,999'
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 sm:pb-16">
      {/* Hero Section */}
      <div className="relative h-72 sm:h-96 md:h-[450px] lg:h-[500px] mb-8 sm:mb-12 md:mb-16 overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl">
        <ImageWithFallback
          src="/images/luxury-travel-hero.jpg"
          alt="Destinations"
          className="w-full h-full object-cover object-center scale-110 hover:scale-100 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-3xl px-4 sm:px-6">
            <h1 className="text-white mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Explore Amazing Destinations
            </h1>
            <p className="text-white/90 text-base sm:text-lg md:text-xl">
              Discover handpicked destinations from around the world, each offering unique experiences
            </p>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 h-full">
          {destinations.map((destination, index) => (
            <Card key={index} className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
              <div className="md:flex h-full">
                <div className="md:w-2/5 relative h-full">
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
                      <h3 className="mb-1">{destination.name}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MapPin size={14} />
                        <span>{destination.country}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {destination.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-blue-600" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users size={16} className="text-blue-600" />
                      <span>{destination.groupSize}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm mb-2">Highlights:</p>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.slice(0, 3).map((highlight, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-xs text-muted-foreground block">Starting from</span>
                      <span className="text-xl text-blue-600">{destination.price}</span>
                    </div>
                    <Button 
                      onClick={() => openDialog({
                        name: destination.name,
                        image: destination.image,
                        duration: destination.duration,
                        rating: destination.rating,
                        price: destination.price,
                        highlights: destination.highlights?.join(', '),
                        includes: destination.highlights
                      })}
                      className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
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
    </div>
  );
}
