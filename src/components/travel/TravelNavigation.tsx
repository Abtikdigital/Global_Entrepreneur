import { Button } from '../ui/button';
import { Menu, X, Plane, Phone } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function TravelNavigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'packages', label: 'Packages' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <Plane size={20} className="text-white" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg leading-tight" style={{ fontWeight: 700, color: '#1e40af' }}>
                GLOBAL PIONEERS
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                Tours & Travels
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`transition-colors ${
                  currentPage === item.id
                    ? 'text-blue-600'
                    : 'text-foreground hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:+919328100195"
              className="flex items-center gap-2 text-foreground hover:text-blue-600 transition-colors"
            >
              <Phone size={18} />
              <span>+91 93281 00195</span>
            </a>
            <Button 
              onClick={() => {
                const element = document.getElementById('contact-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
            >
              Book Now
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
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`text-left ${
                    currentPage === item.id
                      ? 'text-blue-600'
                      : 'text-foreground hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="tel:+919328100195"
                className="flex items-center gap-2 text-foreground hover:text-blue-600 transition-colors"
              >
                <Phone size={18} />
                <span>+91 93281 00195</span>
              </a>
              <Button 
                onClick={() => {
                  setIsMenuOpen(false);
                  const element = document.getElementById('contact-section');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
              >
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
