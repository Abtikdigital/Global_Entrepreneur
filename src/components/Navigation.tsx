import { ArKaTechLogo } from './ArKaTechLogo';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => scrollToSection('hero')}>
            <ArKaTechLogo variant="green" withIcon={true} size="sm" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('sectors')} className="text-foreground hover:text-primary transition-colors">
              Business Sectors
            </button>
            <button onClick={() => scrollToSection('why-us')} className="text-foreground hover:text-primary transition-colors">
              Why Choose Us
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors">
              Contact
            </button>
            <Button onClick={() => scrollToSection('contact')} className="text-white hover:opacity-90" style={{background: 'linear-gradient(to right, #385678, #17947F)'}}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors text-left">
                About
              </button>
              <button onClick={() => scrollToSection('sectors')} className="text-foreground hover:text-primary transition-colors text-left">
                Business Sectors
              </button>
              <button onClick={() => scrollToSection('why-us')} className="text-foreground hover:text-primary transition-colors text-left">
                Why Choose Us
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors text-left">
                Contact
              </button>
              <Button onClick={() => scrollToSection('contact')} className="text-white hover:opacity-90" style={{background: 'linear-gradient(to right, #385678, #17947F)'}}>
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
