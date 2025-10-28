import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Menu, X, Plane, Phone } from 'lucide-react';
import { useDialog } from '../../contexts/DialogContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

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
          height: 2px;
          background: linear-gradient(to right, #385678, #17947F);
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
      <nav className="fixed top-0 left-0 px-2 md:px-4 right-0 z-50 shadow-sm animate-[fadeInDown_0.3s_ease-out] bg-white ">
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link 
              to="/"
              onClick={handleNavigate}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity group flex-shrink-0"
            >
              <ImageWithFallback src="/images/Logo.jpg" alt="Logo" className="!w-44 !h-16" />
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8 flex-1 justify-center">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavigate}
                  className="nav-link whitespace-nowrap"
                  style={isActive(item.path) ? {color: '#385678'} : {}}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <a
                href="tel:+919328100195"
                className="hidden lg:flex items-center gap-2 text-foreground hover:opacity-80 transition-colors px-3 whitespace-nowrap"
              >
                <Phone size={18} />
                <span>+91 93281 00195</span>
              </a>
              <Button 
                onClick={() => openDialog({})}
                className="text-white hover:opacity-90 hover:scale-105 transition-transform whitespace-nowrap px-3 py-2 text-sm"
                style={{background: 'linear-gradient(to right, #385678, #17947F)'}}
              >
                Book Now
              </Button>
            </div>

            {/* Mobile/Tablet Menu Button */}
            <button
              className="md:hidden p-2 transition-transform hover:scale-110 flex-shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile/Tablet Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-border mobile-menu-enter">
              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleNavigate}
                    className="text-left py-2 px-3 rounded-lg transition-colors text-foreground hover:bg-gray-50"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href="tel:+919328100195"
                  className="flex items-center gap-2 text-foreground hover:opacity-80 transition-colors py-2 px-3"
                >
                  <Phone size={18} />
                  <span>+91 93281 00195</span>
                </a>
                <Button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    openDialog({});
                  }}
                  className="text-white hover:opacity-90 hover:scale-105 transition-transform"
                  style={{background: 'linear-gradient(to right, #385678, #17947F)'}}
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
