import { Button } from '../ui/button';
import { ArrowRight, Search, MapPin, Calendar, Plane } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Input } from '../ui/input';

export function TravelHero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758739824218-049eeab22d11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjBkZXN0aW5hdGlvbnxlbnwxfHx8fDE3NjAwMjQ0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Luxury Travel Destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-40 text-center">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white/10 backdrop-blur-sm border border-white/20">
            <Plane size={18} className="text-white" />
            <span className="text-white">Your Journey Begins Here</span>
          </div>
          
          <h1 className="text-white mb-6" style={{ fontSize: '3.5rem', lineHeight: '1.1' }}>
            Explore the World with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Global Pioneers
            </span>
          </h1>
          
          <p className="text-white/90 text-xl mb-8">
            Customized luxury travel, adventure tours, corporate trips, religious pilgrimages, 
            student travel, cruise vacations, and destination weddings
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-input-background">
                <MapPin size={20} className="text-muted-foreground" />
                <Input
                  placeholder="Where to?"
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-input-background">
                <Calendar size={20} className="text-muted-foreground" />
                <Input
                  type="date"
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                />
              </div>
              <Button 
                onClick={() => scrollToSection('packages-section')}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 h-full"
              >
                <Search size={20} className="mr-2" />
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
            onClick={() => scrollToSection('contact-section')}
            className="border-2 border-white text-white hover:bg-white/10"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
