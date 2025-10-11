import { Card } from './ui/card';
import { Building2, Globe2, Target, TrendingUp } from 'lucide-react';

export function About() {
  const stats = [
    { icon: Building2, label: 'Business Verticals', value: '4+' },
    { icon: Globe2, label: 'Global Reach', value: 'Expanding' },
    { icon: Target, label: 'Precision Focus', value: '100%' },
    { icon: TrendingUp, label: 'Innovation', value: 'Continuous' },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#00A86B20', color: '#00A86B' }}>
            About ArKaTech
          </div>
          <h2 className="mb-4">A Multi-Sector Engineering Powerhouse</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            ArKaTech Globe Exim Pvt Ltd. is a forward-thinking organization committed to precision, 
            innovation, and engineering excellence across diverse business sectors. Our brand represents 
            reliability, cutting-edge technology, and sustainable solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="mb-4">Our Vision</h3>
            <p className="text-muted-foreground mb-6">
              To establish ArKaTech as a globally recognized brand synonymous with engineering excellence, 
              precision, and digital transformation across multiple industries. We aim to lead the way in 
              industrial automation, smart energy solutions, international trading, and comprehensive 
              engineering services.
            </p>
            
            <h3 className="mb-4">Our Mission</h3>
            <p className="text-muted-foreground">
              To deliver innovative, sustainable, and precision-engineered solutions that drive efficiency, 
              growth, and technological advancement for our clients. We are committed to building a diverse 
              portfolio of businesses under the ArKaTech umbrella, each upholding our core values of quality, 
              reliability, and innovation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <stat.icon 
                  className="mx-auto mb-4" 
                  size={40} 
                  style={{ color: '#00A86B' }}
                />
                <div className="mb-2" style={{ fontSize: '2rem', fontWeight: 700, color: '#00A86B' }}>
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
