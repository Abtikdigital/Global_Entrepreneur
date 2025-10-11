import { Card } from '../ui/card';
import { Palmtree, Mountain, Briefcase, Church, GraduationCap, Ship, Heart } from 'lucide-react';

export function TravelServices() {
  const services = [
    {
      icon: Palmtree,
      title: 'Luxury Travel',
      description: 'Experience world-class comfort with our premium travel packages and exclusive accommodations.',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Mountain,
      title: 'Adventure Tours',
      description: 'Thrilling experiences for adventure seekers, from trekking to extreme sports.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Briefcase,
      title: 'Corporate Travel',
      description: 'Professional travel solutions for business trips, conferences, and corporate events.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Church,
      title: 'Religious Tours',
      description: 'Sacred journeys to holy destinations with respect for traditions and spirituality.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: GraduationCap,
      title: 'Student Travel',
      description: 'Educational and fun group tours designed specifically for students and young travelers.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Ship,
      title: 'Cruise Vacations',
      description: 'Luxurious ocean voyages with world-class amenities and stunning destinations.',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Destination Weddings',
      description: 'Create unforgettable memories with beautifully planned weddings in exotic locations.',
      color: 'from-rose-500 to-pink-500'
    },
  ];

  return (
    <section id="services-section" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full mb-4 bg-blue-50 text-blue-600">
            Our Services
          </div>
          <h2 className="mb-4">Tailored Travel Experiences</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            From luxury getaways to adventure expeditions, we specialize in creating personalized 
            travel experiences that exceed your expectations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-blue-100"
            >
              <div 
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}
              >
                <service.icon size={28} className="text-white" />
              </div>
              <h3 className="mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
