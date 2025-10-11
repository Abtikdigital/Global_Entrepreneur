import { ArKaTechLogo } from './ArKaTechLogo';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="mb-6" style={{ filter: 'brightness(0) invert(1)' }}>
              <ArKaTechLogo variant="green" withIcon={true} size="md" />
            </div>
            <p className="text-white/70 mb-4 italic" style={{ fontFamily: 'Georgia, serif' }}>
              Precision in Every Innovation
            </p>
            <p className="text-white/70 mb-6">
              ArKaTech Globe Exim Pvt Ltd. - Engineering excellence across industrial automation, 
              smart energy, trading, and comprehensive engineering solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00A86B] flex items-center justify-center transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00A86B] flex items-center justify-center transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00A86B] flex items-center justify-center transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('about')} className="text-white/70 hover:text-[#00C97F] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('sectors')} className="text-white/70 hover:text-[#00C97F] transition-colors">
                  Business Sectors
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('why-us')} className="text-white/70 hover:text-[#00C97F] transition-colors">
                  Why Choose Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-white/70 hover:text-[#00C97F] transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-white">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-1 flex-shrink-0" style={{ color: '#00C97F' }} />
                <a href="mailto:info@arkatech.com" className="text-white/70 hover:text-[#00C97F] transition-colors">
                  info@arkatech.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-1 flex-shrink-0" style={{ color: '#00C97F' }} />
                <a href="tel:+91XXXXXXXXXX" className="text-white/70 hover:text-[#00C97F] transition-colors">
                  +91 XXX XXX XXXX
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" style={{ color: '#00C97F' }} />
                <span className="text-white/70">
                  India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} ArKaTech Globe Exim Pvt Ltd. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-[#00C97F] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-[#00C97F] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
