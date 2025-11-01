import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Check, Star, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useDialog } from '../../contexts/DialogContext';

interface Package {
  name: string;
  image: string;
  duration: string;
  rating: number;
  price: string;
  includes: string[];
  highlights: string;
}

export function PackagesPage() {
  const { openDialog } = useDialog();

  const handleViewDetails = (pkg: Package) => {
    openDialog(pkg);
  };
  const packages = {
    luxury: [
      {
        name: 'Maldives Luxury Escape',
        image: '/images/MaldivsImage.jpg',
        duration: '6 Days / 5 Nights',
        rating: 4.9,
        price: '₹89,999',
        includes: ['5-Star Resort', 'All Meals', 'Water Sports', 'Spa Treatment', 'Airport Transfer'],
        highlights: 'Overwater villa, Private beach, Candlelight dinner'
      },
      {
        name: 'Dubai Premium Package',
        image: '/images/DubaiImage.jpg',
        duration: '5 Days / 4 Nights',
        rating: 4.8,
        price: '₹64,999',
        includes: ['Luxury Hotel', 'Desert Safari', 'Burj Khalifa', 'Dubai Mall', 'City Tour'],
        highlights: 'Premium accommodation, VIP access, Private guide'
      },
    ],
    adventure: [
      {
        name: 'Manali Adventure Tour',
        image: '/images/ManaliImage.jpg',
        duration: '3 Days / 2 Nights',
        rating: 4.7,
        price: '₹28,999',
        includes: ['Hotel Stay', 'Adventure Sports', 'Hot Springs', 'Temples & Monasteries', 'Transport'],
        highlights: 'Snowy Peaks, Adventure Sports, Hot Springs, Temples & Monasteries'
      },
      {
        name: 'Thailand Adventure Tour',
        image: '/images/ThailandImage.jpg',
        duration: '6 Days / 5 Nights',
        rating: 4.6,
        price: '₹42,999',
        includes: ['Island Hopping', 'Snorkeling', 'Beach Activities', 'Hotel Stay', 'Transfers'],
        highlights: 'Water sports, Island exploration, Beach parties'
      },
    ],
    corporate: [
      {
        name: 'Corporate Retreat - Goa',
        image: '/images/GoaImage.jpg',
        duration: '3 Days / 2 Nights',
        rating: 4.8,
        price: '₹15,999',
        includes: ['Hotel Stay', 'Beach Activities', 'Water Sports', 'Spa Treatment', 'Airport Transfer'],
        highlights: 'Beautiful Beaches, Water Sports, Spa Treatment, Airport Transfer'
      },
    
    ],
    religious: [
      {
        name: 'Char Dham Yatra',
        image: '/images/Chardhaam.jpg',
        duration: '7 Days / 6 Nights',
        rating: 5.0,
        price: '₹32,999',
        includes: ['Hotel Stay', 'Temple Visits', 'Experienced Guide', 'Transport'],
        highlights: 'Four sacred shrines, Spiritual journey, Mountain scenery, Holy Ghats'
      },
      {
        name: 'Varanasi & Prayagraj Tour',
        image: '/images/Varanashi.jpg',
        duration: '3 Days / 2 Nights',
        rating: 4.9,
        price: '₹16,999',
        includes: ['Hotel Stay', 'Temple Visits', 'Experienced Guide', 'Transport'],
        highlights: 'Varanasi Ghats, Prayagraj Ghats, Spiritual journey, Mountain scenery, Holy Ghats'
      },
    ],
  };

  const PackageCard = ({ pkg }: { pkg: Package }) => (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{pkg.rating}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-2" style={{fontSize: '1.5rem', fontWeight: 600, lineHeight: '1.4', background: 'linear-gradient(to right, #385678, #17947F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>{pkg.name}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{pkg.duration}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 italic">{pkg.highlights}</p>

        <div className="mb-4">
          <p className="text-sm mb-2">Package Includes:</p>
          <div className="space-y-1">
            {pkg.includes.slice(0, 4).map((item: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <Check size={14} className="text-green-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          {/* <div>
            <span className="text-xs text-muted-foreground block">Starting from</span>
            <span className="text-2xl" style={{background: 'linear-gradient(to right, #385678, #17947F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{pkg.price}</span>
            <span className="text-xs text-muted-foreground">/person</span>
          </div> */}
          <Button 
            onClick={() => handleViewDetails(pkg)}
            className="text-white hover:opacity-90"
            style={{background: 'linear-gradient(to right, #385678, #17947F)'}}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen pt-18 pb-12 sm:pb-16">
      {/* Hero Section */}
      <section className="">
        <div className="relative h-72 sm:h-96 md:h-[450px] lg:h-[500px] mb-8 sm:mb-12 md:mb-16 overflow-hidden rounded-b-lg sm:rounded-b-xl md:rounded-b-2xl">
          <ImageWithFallback
            src="/images/HeroImage1.jpg"
            alt="Packages"
            className="w-full h-full object-cover object-center scale-110 hover:scale-100 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <h1 className="text-white mb-3 sm:mb-4" style={{fontSize: '2.5rem', fontWeight: 700, lineHeight: '1.2'}}>
                Our Travel Packages
              </h1>
              <p className="text-white/90 text-base sm:text-lg md:text-xl">
                Carefully curated packages for every type of traveler and budget
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Content */}
      <section className="px-2 md:px-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <Tabs defaultValue="luxury" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8 sm:mb-12">
              <TabsTrigger value="luxury">Luxury Travel</TabsTrigger>
              <TabsTrigger value="adventure">Adventure</TabsTrigger>
              <TabsTrigger value="corporate">Corporate</TabsTrigger>
              <TabsTrigger value="religious">Religious</TabsTrigger>
            </TabsList>

            <TabsContent value="luxury">
              <div className="grid md:grid-cols-2 gap-8">
                {packages.luxury.map((pkg, index) => (
                  <PackageCard key={index} pkg={pkg} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="adventure">
              <div className="grid md:grid-cols-2 gap-8">
                {packages.adventure.map((pkg, index) => (
                  <PackageCard key={index} pkg={pkg} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="corporate">
              <div className="grid md:grid-cols-2 gap-8">
                {packages.corporate.map((pkg, index) => (
                  <PackageCard key={index} pkg={pkg} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="religious">
              <div className="grid md:grid-cols-2 gap-8">
                {packages.religious.map((pkg, index) => (
                  <PackageCard key={index} pkg={pkg} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Custom Package CTA */}
          <Card className="mt-16 p-12 text-center bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100">
            <h2 className="mb-4" style={{fontSize: '2rem', fontWeight: 700, lineHeight: '1.3', background: 'linear-gradient(to right, #385678, #17947F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Can't Find What You're Looking For?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let us create a custom package tailored to your preferences, budget, and travel dates. 
              Our expert team will design the perfect itinerary just for you.
            </p>
            <Button 
              size="lg"
              className="text-white hover:opacity-90"
              style={{background: 'linear-gradient(to right, #385678, #17947F)'}}
              onClick={() => {
                const element = document.getElementById('contact-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Request Custom Package
            </Button>
          </Card>
        </div>
      </section>

    </div>
  );
}
