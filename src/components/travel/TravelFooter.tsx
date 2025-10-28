import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Plane } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function TravelFooter() {
  const currentYear = new Date().getFullYear();

  const handleNavigate = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @media (min-width: 1024px) {
          .footer-link {
            position: relative;
            transition: color 0.3s ease;
          }
          
          .footer-link::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(to right, #385678, #17947F);
            color: rgba(255, 255, 255, 0.9);
            transition: width 0.3s ease;
          }
          
          .footer-link:hover::after {
            width: 100%;
          }
        }
        
        .section-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <footer className="bg-slate-900 px-2 md:px-6 text-white py-16 section-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
           <ImageWithFallback src="/images/Logo.png" alt="Logo" className="!w-44 !h-18" />
            </div>
            <p className="text-white/70 mb-6">
              We are a full-service travel agency specializing in customized luxury travel, adventure, 
              corporate, religious, student, and cruise travel experiences, including both domestic 
              and international tours.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:opacity-90 flex items-center justify-center transition-all" style={{backgroundImage: 'linear-gradient(to right, #385678, #17947F)'}}>
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:opacity-90 flex items-center justify-center transition-all" style={{backgroundImage: 'linear-gradient(to right, #385678, #17947F)'}}>
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:opacity-90 flex items-center justify-center transition-all" style={{backgroundImage: 'linear-gradient(to right, #385678, #17947F)'}}>
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:opacity-90 flex items-center justify-center transition-all" style={{backgroundImage: 'linear-gradient(to right, #385678, #17947F)'}}>
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-white" style={{fontSize: '1.25rem', fontWeight: 600, lineHeight: '1.4', background: 'linear-gradient(to right, #385678, #17947F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent'}}>Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" onClick={handleNavigate} className="footer-link text-white/70 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/destinations" onClick={handleNavigate} className="footer-link text-white/70 transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/packages" onClick={handleNavigate} className="footer-link text-white/70 transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={handleNavigate} className="footer-link text-white/70 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-white" style={{fontSize: '1.25rem', fontWeight: 600, lineHeight: '1.4', background: 'linear-gradient(to right, #385678, #17947F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent'}}>Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                  <Phone size={18} className="mt-1 shrink-0" style={{color: '#385678'}} />
                <div>
                  <a href="tel:+919328100195" className="text-white/70 hover:opacity-80 transition-colors block">
                    +91 93281 00195
                  </a>
                  <a href="tel:+918160150178" className="text-white/70 hover:opacity-80 transition-colors block">
                    +91 81601 50178
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-1 shrink-0" style={{color: '#385678'}} />
                <a href="mailto:sales@globalpioneertravels.in" className="text-white/70 hover:opacity-80 transition-colors">
                  sales@globalpioneertravels.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0" style={{color: '#385678'}} />
                <span className="text-white/70">
                  India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} Global Pioneers Tours & Travels Private Limited. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="footer-link text-white/60 hover:opacity-80 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="footer-link text-white/60 hover:opacity-80 transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
