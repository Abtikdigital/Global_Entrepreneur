import { Card } from '../ui/card';
import { Palmtree, Mountain, Briefcase, Church, GraduationCap, Ship, DollarSign, FileCheck, Globe2 } from 'lucide-react';

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
      icon: DollarSign,
      title: 'Foreign Exchange Assistance',
      description: 'Get the best currency exchange rates and hassle-free forex services for your international travel.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: FileCheck,
      title: 'Passport Assistance',
      description: 'Complete guidance and support for passport application, renewal, and verification services.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Globe2,
      title: 'Visa Assistance',
      description: 'Expert visa consultation and application support for hassle-free international travel.',
      color: 'from-purple-500 to-pink-500'
    },
  ];

  return (
    <section id="services-section" className="py-24 px-2 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 rounded-full mb-4 text-white" style={{background: 'linear-gradient(to right, #385678, #17947F)'}}>
            Our Services
          </div>
          <h2 className="mb-4" style={{fontSize: '2rem', fontWeight: 700, lineHeight: '1.3', background: 'linear-gradient(to right, #385678, #17947F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Tailored Travel Experiences</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            From luxury getaways to adventure expeditions, we specialize in creating personalized 
            travel experiences that exceed your expectations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-blue-100"
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                style={{background: 'linear-gradient(135deg, #385678, #17947F)'}}
              >
                <service.icon size={28} className="text-white" />
              </div>
              <h3 className="mb-3" style={{fontSize: '1.5rem', fontWeight: 600, lineHeight: '1.4', background: 'linear-gradient(to right, #385678, #17947F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>{service.title}</h3>
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
