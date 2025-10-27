import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';
import { useDialog } from '../../contexts/DialogContext';

export function ContactSection() {
  const { openDialog } = useDialog();

  const handleInquiry = () => {
    openDialog({});
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      value: '+91 93281 00195',
      value2: '+91 81601 50178',
      link: 'tel:+919328100195'
    },
    {
      icon: Mail,
      title: 'Email Us',
      value: 'sales@globalpioneertravels.in',
      link: 'mailto:sales@globalpioneertravels.in'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '+91 93281 00195',
      link: 'https://wa.me/919328100195'
    },
  ];

  return (
    <section id="contact-section" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full mb-4 bg-blue-50 text-blue-600">
            Get In Touch
          </div>
          <h2 className="mb-4">Plan Your Dream Journey</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Ready to embark on your next adventure? Contact us today and let our travel experts 
            create a personalized itinerary just for you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow bg-white">
              <div 
                className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-4"
              >
                <info.icon size={24} className="text-white" />
              </div>
              <h4 className="mb-2">{info.title}</h4>
              <a 
                href={info.link} 
                className="text-muted-foreground hover:text-blue-600 transition-colors text-sm block"
              >
                {info.value}
              </a>
              {info.value2 && (
                <a 
                  href={`tel:${info.value2.replace(/\s/g, '')}`}
                  className="text-muted-foreground hover:text-blue-600 transition-colors text-sm block"
                >
                  {info.value2}
                </a>
              )}
            </Card>
          ))}
        </div>

        <Card className="p-8 max-w-4xl mx-auto bg-white">
          <h3 className="mb-6 text-center">Send Us Your Travel Requirements</h3>
          <div className="text-center">
            <Button 
              onClick={handleInquiry}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
            >
              Submit Inquiry
              <Send className="ml-2" size={18} />
            </Button>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Contact Person: <span className="text-foreground">Global Pioneers Tours & Travels</span>
          </p>
        </div>
      </div>
    </section>
  );
}
