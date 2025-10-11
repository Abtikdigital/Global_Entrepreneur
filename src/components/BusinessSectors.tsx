import { Card } from './ui/card';
import { Factory, Zap, ShoppingCart, Wrench, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BusinessSectors() {
  const sectors = [
    {
      icon: Factory,
      title: 'Industrial Automation',
      description: 'Advanced automation solutions for manufacturing and industrial processes, incorporating AI, IoT, and robotics for enhanced productivity.',
      image: 'https://images.unsplash.com/photo-1738918897772-0ba101be25c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwYXV0b21hdGlvbiUyMGZhY3Rvcnl8ZW58MXx8fHwxNzU5OTc0NDc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: ['PLC & SCADA Systems', 'Robotics Integration', 'Process Optimization', 'Predictive Maintenance']
    },
    {
      icon: Zap,
      title: 'Smart Energy Solutions',
      description: 'Innovative energy management systems, renewable energy integration, and smart grid technologies for sustainable power solutions.',
      image: 'https://images.unsplash.com/photo-1655958370938-a960fe73abb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGVuZXJneSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYwMDgwNzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: ['Energy Management', 'Renewable Integration', 'Smart Grid Technology', 'Energy Efficiency']
    },
    {
      icon: ShoppingCart,
      title: 'Global Trading',
      description: 'International trade and export-import services, connecting global markets with quality products and reliable logistics.',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjB0cmFkaW5nJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzYwMDgwNzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: ['Import-Export Services', 'Supply Chain Management', 'Quality Assurance', 'Global Partnerships']
    },
    {
      icon: Wrench,
      title: 'Engineering Solutions',
      description: 'Comprehensive engineering services including design, consulting, project management, and technical support across industries.',
      image: 'https://images.unsplash.com/photo-1758387933125-5ac945b4e2cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHNvbHV0aW9ucyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYwMDgwODAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: ['Design & Engineering', 'Project Management', 'Technical Consulting', 'Installation & Support']
    },
  ];

  return (
    <section id="sectors" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#00A86B20', color: '#00A86B' }}>
            Our Business Sectors
          </div>
          <h2 className="mb-4">Diversified Excellence</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            ArKaTech operates across multiple high-growth sectors, delivering precision-engineered solutions 
            that drive innovation and efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {sectors.map((sector, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={sector.image}
                  alt={sector.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#00A86B' }}>
                    <sector.icon size={24} color="white" />
                  </div>
                  <h3 className="text-white">{sector.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-muted-foreground mb-6">
                  {sector.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {sector.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <ArrowRight size={16} style={{ color: '#00A86B' }} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
