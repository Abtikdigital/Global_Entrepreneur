import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FeaturedDestinationsProps {
  onNavigate?: (page: string) => void;
}

export function FeaturedDestinations({ onNavigate }: FeaturedDestinationsProps) {
  const destinations = [
    {
      name: 'Maldives',
      location: 'Indian Ocean',
      image: '/images/MaldivsImage.jpg',
      rating: 4.9,
      description: 'Paradise beaches and luxury resorts',
      price: '₹89,999'
    },
    {
      name: 'Dubai',
      location: 'United Arab Emirates',
      image: '/images/DubaiImage.jpg',
      rating: 4.8,
      description: 'Modern marvels and desert adventures',
      price: '₹54,999'
    },
    {
      name: 'Goa',
      location: 'India - West Coast',
      image: '/images/GoaImage.jpg',
      rating: 5.0,
      description: "Beautiful beaches, vibrant nightlife",
      price: '₹12,999'
    },
    {
      name: 'Europe',
      location: 'Multi-Country',
      image: '/images/EuropeImage.jpg',
      rating: 4.9,
      description: 'Rich history and culture',
      price: '₹1,49,999'
    },
  ];

  return (
    <section id="destinations-section" className="py-24 bg-muted/30 px-2 md:px-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 rounded-full mb-4 text-white" style={{background: 'linear-gradient(to right, #385678, #17947F)'}}>
            Popular Destinations
          </div>
          <h2 className="mb-4" style={{fontSize: '2rem', fontWeight: 700, lineHeight: '1.3', background: 'linear-gradient(to right, #385678, #17947F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Discover Amazing Places</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Explore our handpicked destinations from around the world, each offering unique experiences 
            and unforgettable memories.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {destinations.map((destination, index) => (
            <Card 
              key={index} 
              className="overflow-hidden group hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => onNavigate?.('destinations')}
            >
              <div className="relative h-64">
                <ImageWithFallback
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{destination.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white mb-1" style={{fontSize: '1.5rem', fontWeight: 600, lineHeight: '1.4'}}>{destination.name}</h3>
                  <div className="flex items-center gap-1 text-white/90 text-sm">
                    <MapPin size={14} />
                    <span>{destination.location}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-3">{destination.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">Starting from</span>
                    {/* <div style={{background: 'linear-gradient(to right, #385678, #17947F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{destination.price}</div> */}
                  </div>
                  <div style={{background: 'linear-gradient(to right, #385678, #17947F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}} className="group-hover:opacity-80 transition-all font-medium">
                    Details <ArrowRight size={14} className="inline ml-1" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => onNavigate?.('destinations')}
            className="text-white hover:opacity-90"
            style={{background: 'linear-gradient(to right, #385678, #17947F)'}}
          >
            View All Destinations
            <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
