import React from 'react';
import { Card } from '../ui/card';
import { Target, Eye, Award, Users, Globe, Heart, Shield, Clock } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Your safety and security are our top priorities in every journey we plan.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We go above and beyond to ensure your travel experience exceeds expectations.'
    },
    {
      icon: Award,
      title: 'Quality Service',
      description: 'Premium service delivery with attention to every detail of your trip.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance to address any concerns during your travel.'
    },
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Travelers' },
    { icon: Globe, value: '50+', label: 'Destinations' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Heart, value: '98%', label: 'Satisfaction Rate' },
  ];

  const team = [
    {
      name: 'Mann R. Umraniya',
      role: 'Co-Founder & Director',
      phone: '+91 93281 00195',
      email: 'sales@globalpioneertravels.in'
    },
    {
      name: 'Pushprajsinh D. Gohil',
      role: 'Co-Founder & Director',
      phone: '+91 81601 50178',
      email: 'sales@globalpioneertravels.in'
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 sm:pb-16">
      {/* Hero Section */}
      <div className="relative h-72 sm:h-96 md:h-[450px] lg:h-[500px] mb-8 sm:mb-12 md:mb-16 overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl">
        <ImageWithFallback
          src="/images/student-group-travel.jpg"
          alt="About Us"
          className="w-full h-full object-cover object-center scale-110 hover:scale-100 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-3xl px-4 sm:px-6">
            <h1 className="text-white mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              About Global Pioneers
            </h1>
            <p className="text-white/90 text-base sm:text-lg md:text-xl">
              Creating unforgettable travel experiences since years
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Who We Are */}
        <div className="mb-12 sm:mb-16">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 rounded-full mb-4 bg-blue-50 text-blue-600">
                Who We Are
              </div>
              <h2 className="mb-4">Your Trusted Travel Partner</h2>
              <p className="text-muted-foreground mb-4">
                <strong>GLOBAL PIONEERS TOURS & TRAVELS PRIVATE LIMITED</strong> is a full-service 
                travel agency dedicated to creating exceptional travel experiences. We specialize in 
                customized luxury travel, adventure tours, corporate trips, religious pilgrimages, 
                student travel, cruise vacations, and destination weddings.
              </p>
              <p className="text-muted-foreground mb-4">
                Our commitment to excellence, attention to detail, and passion for travel ensure that 
                every journey we plan becomes a cherished memory. Whether you're seeking a peaceful 
                retreat, an adventurous expedition, or a spiritual journey, we have the expertise to 
                make it happen.
              </p>
              <p className="text-muted-foreground">
                With years of experience in the travel industry and a team of dedicated professionals, 
                we handle everything from planning to execution, allowing you to simply enjoy your trip.
              </p>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="/images/wedding-beach.jpg"
                alt="Travel Experience"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100">
            <Target size={40} className="text-blue-600 mb-4" />
            <h3 className="mb-3">Our Mission</h3>
            <p className="text-muted-foreground">
              To provide exceptional, personalized travel experiences that inspire, delight, and 
              create lasting memories. We strive to make travel accessible, enjoyable, and 
              hassle-free for all our clients.
            </p>
          </Card>
          <Card className="p-8 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-100">
            <Eye size={40} className="text-cyan-600 mb-4" />
            <h3 className="mb-3">Our Vision</h3>
            <p className="text-muted-foreground">
              To become India's most trusted and preferred travel partner, known for excellence 
              in service, innovation in travel solutions, and commitment to customer satisfaction 
              across all segments.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full mb-4 bg-blue-50 text-blue-600">
              Our Values
            </div>
            <h2 className="mb-4">What Drives Us</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                  <value.icon size={28} className="text-white" />
                </div>
                <h4 className="mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-12 mb-16 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <stat.icon size={40} className="mx-auto mb-4 opacity-80" />
                <div className="text-4xl mb-2">{stat.value}</div>
                <p className="text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full mb-4 bg-blue-50 text-blue-600">
              Our Leadership
            </div>
            <h2 className="mb-4">Meet the Founders</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Driven by passion for travel and commitment to excellence
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                  <Users size={40} className="text-white" />
                </div>
                <h3 className="mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-4">{member.role}</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>{member.phone}</p>
                  <p>{member.email}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <Card className="p-12 text-center bg-muted/30">
          <h2 className="mb-6">Why Choose Global Pioneers?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="mb-3 text-blue-600">Expertise & Experience</h4>
              <p className="text-sm text-muted-foreground">
                Years of industry experience and deep knowledge of destinations worldwide.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-blue-600">Personalized Service</h4>
              <p className="text-sm text-muted-foreground">
                Every package is customized to match your preferences, budget, and travel style.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-blue-600">Best Value</h4>
              <p className="text-sm text-muted-foreground">
                Competitive pricing without compromising on quality or service standards.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-blue-600">Hassle-Free Planning</h4>
              <p className="text-sm text-muted-foreground">
                We handle all details from booking to execution, ensuring a smooth experience.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-blue-600">24/7 Support</h4>
              <p className="text-sm text-muted-foreground">
                Round-the-clock assistance before, during, and after your trip.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-blue-600">Trusted Partners</h4>
              <p className="text-sm text-muted-foreground">
                Partnerships with top hotels, airlines, and local operators worldwide.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
