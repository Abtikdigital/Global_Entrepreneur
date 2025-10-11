import { Card } from './ui/card';
import { Award, Users, Lightbulb, Shield, Cog, Globe } from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: 'Engineering Excellence',
      description: 'Decades of combined expertise in precision engineering and technical innovation across multiple sectors.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Driven',
      description: 'Continuous investment in R&D and adoption of cutting-edge technologies to stay ahead of industry trends.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Rigorous quality control processes and international standards compliance in all our operations.'
    },
    {
      icon: Users,
      title: 'Client-Centric Approach',
      description: 'Tailored solutions designed to meet specific client needs with dedicated support throughout the journey.'
    },
    {
      icon: Cog,
      title: 'End-to-End Solutions',
      description: 'Comprehensive services from consultation and design to implementation and ongoing maintenance.'
    },
    {
      icon: Globe,
      title: 'Global Presence',
      description: 'Expanding international network enabling us to serve clients across multiple regions effectively.'
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#00A86B20', color: '#00A86B' }}>
            Why Choose ArKaTech
          </div>
          <h2 className="mb-4">Precision in Every Innovation</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Our commitment to excellence, innovation, and customer satisfaction sets us apart in the industry.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#00A86B20' }}
              >
                <feature.icon size={24} style={{ color: '#00A86B' }} />
              </div>
              <h3 className="mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-xl border border-border bg-gradient-to-br from-muted/50 to-muted/20">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="mb-2" style={{ fontSize: '2.5rem', fontWeight: 700, color: '#00A86B' }}>
                100%
              </div>
              <p className="text-muted-foreground">Customer Satisfaction Focus</p>
            </div>
            <div>
              <div className="mb-2" style={{ fontSize: '2.5rem', fontWeight: 700, color: '#00A86B' }}>
                24/7
              </div>
              <p className="text-muted-foreground">Technical Support Available</p>
            </div>
            <div>
              <div className="mb-2" style={{ fontSize: '2.5rem', fontWeight: 700, color: '#00A86B' }}>
                ISO
              </div>
              <p className="text-muted-foreground">Certified Quality Standards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
