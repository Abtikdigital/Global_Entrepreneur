import { Card } from '../ui/card';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Rajesh Sharma',
      location: 'Mumbai, India',
      rating: 5,
      comment: 'Excellent service! Global Pioneers made our Europe tour absolutely unforgettable. Every detail was perfectly planned.',
      trip: 'Europe Tour Package'
    },
    {
      name: 'Priya Patel',
      location: 'Ahmedabad, India',
      rating: 5,
      comment: 'Our Maldives honeymoon was a dream come true. The team was professional and attentive to all our needs.',
      trip: 'Maldives Honeymoon'
    },
    {
      name: 'Vikram Singh',
      location: 'Delhi, India',
      rating: 5,
      comment: 'Best corporate travel partner! They handled our team retreat to Dubai flawlessly. Highly recommended!',
      trip: 'Corporate Dubai Trip'
    },
    {
      name: 'Anjali Desai',
      location: 'Surat, India',
      rating: 5,
      comment: 'The religious tour to Varanasi and Haridwar was spiritually enriching. Thank you for the wonderful experience!',
      trip: 'Religious Pilgrimage'
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full mb-4 bg-blue-50 text-blue-600">
            Testimonials
          </div>
          <h2 className="mb-4">What Our Travelers Say</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Read authentic reviews from our satisfied customers who have experienced the joy of traveling with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow relative">
              <Quote size={40} className="absolute top-4 right-4 text-blue-100" />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 italic">
                "{testimonial.comment}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="mb-1">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{testimonial.location}</p>
                <div className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 inline-block">
                  {testimonial.trip}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
