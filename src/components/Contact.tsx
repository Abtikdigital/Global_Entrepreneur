import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    sector: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will contact you soon.');
    setFormData({ name: '', email: '', company: '', sector: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@arkatech.com',
      link: 'mailto:info@arkatech.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 XXX XXX XXXX',
      link: 'tel:+91XXXXXXXXXX'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'India',
      link: null
    },
  ];

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#00A86B20', color: '#00A86B' }}>
            Get In Touch
          </div>
          <h2 className="mb-4">Let's Build Something Together</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your business with precision-engineered solutions? Contact us today to discuss your requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#00A86B20' }}
              >
                <info.icon size={24} style={{ color: '#00A86B' }} />
              </div>
              <h4 className="mb-2">{info.title}</h4>
              {info.link ? (
                <a 
                  href={info.link} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {info.value}
                </a>
              ) : (
                <p className="text-muted-foreground">{info.value}</p>
              )}
            </Card>
          ))}
        </div>

        <Card className="p-8 max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">Full Name *</label>
                <Input
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-2">Email Address *</label>
                <Input
                  required
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">Company Name</label>
                <Input
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-2">Interested Sector</label>
                <Input
                  placeholder="e.g., Industrial Automation"
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2">Message *</label>
              <Textarea
                required
                placeholder="Tell us about your project or requirements..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <Button 
              type="submit"
              size="lg"
              style={{ backgroundColor: '#00A86B', color: 'white', width: '100%' }}
            >
              Send Message
              <Send className="ml-2" size={18} />
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
