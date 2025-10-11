import { ArKaTechLogo } from './ArKaTechLogo';
import { Button } from './ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1661669999755-1e5b36d9e9ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NjAwMTQwMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Technology Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
        <div className="absolute inset-0 bg-[#00A86B]/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-40 text-center">
        <div className="mb-8">
          <ArKaTechLogo variant="green" withIcon={true} withTagline={false} size="lg" />
        </div>
        
        <div className="max-w-3xl mx-auto mb-8">
          <h1 className="text-white mb-6" style={{ fontSize: '3rem', lineHeight: '1.2' }}>
            Engineering Excellence Across <span style={{ color: '#00C97F' }}>Multiple Sectors</span>
          </h1>
          <p className="text-white/90 mb-2" style={{ fontSize: '1.25rem' }}>
            Precision in Every Innovation
          </p>
          <p className="text-white/80">
            Leading the way in industrial automation, smart energy, trading, and engineering solutions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg"
            onClick={() => scrollToSection('sectors')}
            style={{ backgroundColor: '#00A86B', color: 'white', padding: '1.25rem 2rem' }}
          >
            Explore Our Sectors
            <ArrowRight className="ml-2" size={20} />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('contact')}
            style={{ borderColor: 'white', color: 'white', padding: '1.25rem 2rem' }}
          >
            Contact Us
          </Button>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          aria-label="Scroll to content"
        >
          <ChevronDown size={32} color="white" />
        </button>
      </div>
    </section>
  );
}
