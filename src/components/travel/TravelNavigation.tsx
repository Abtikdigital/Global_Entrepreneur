import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Menu, X, Plane, Phone } from 'lucide-react';
import { useDialog } from '../../contexts/DialogContext';

export function TravelNavigation() {
  const location = useLocation();
  const { openDialog } = useDialog();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/packages', label: 'Packages' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .nav-link {
          position: relative;
          padding: 8px 16px;
          transition: all 0.3s ease;
        }
        
        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background: linear-gradient(to right, #2563eb, #06b6d4);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        @media (min-width: 768px) {
          .nav-link:hover::before,
          .nav-link.active::before {
            width: 80%;
          }
          
          .nav-link.active {
            color: #2563eb;
          }
        }
        
        .mobile-menu-enter {
          animation: slideDown 0.3s ease-out;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <nav className="fixed top-0  left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm animate-[fadeInDown_0.3s_ease-out]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/"
              onClick={handleNavigate}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plane size={20} className="text-white" />
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-base md:text-lg leading-tight" style={{ fontWeight: 700, color: '#1e40af' }}>
                  GLOBAL PIONEERS
                </span>
                <span className="text-xs text-muted-foreground leading-tight">
                  Tours & Travels
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavigate}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="tel:+919328100195"
                className="hidden xl:flex items-center gap-2 text-foreground hover:text-blue-600 transition-colors px-4"
              >
                <Phone size={18} />
                <span>+91 93281 00195</span>
              </a>
              <Button 
                onClick={() => openDialog({})}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 hover:scale-105 transition-transform"
              >
                Book Now
              </Button>
            </div>

            {/* Mobile/Tablet Menu Button */}
            <button
              className="lg:hidden p-2 transition-transform hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile/Tablet Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-border mobile-menu-enter">
              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleNavigate}
                    className={`text-left py-2 px-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-foreground hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href="tel:+919328100195"
                  className="flex items-center gap-2 text-foreground hover:text-blue-600 transition-colors py-2 px-3"
                >
                  <Phone size={18} />
                  <span>+91 93281 00195</span>
                </a>
                <Button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    openDialog({});
                  }}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:scale-105 transition-transform"
                >
                  Book Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
