import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  MailIcon,
  PhoneIcon,
  ClockIcon,
  MapPinIcon,
  MessageCircleIcon,
  ChevronRightIcon,
  SendIcon,
} from 'lucide-react';
import { UniversalLink } from '@lark-apaas/client-toolkit/components/UniversalLink';

// FAQ Quick Links
const quickLinks = [
  { label: 'How to Measure', href: '/guides/measure-curtains' },
  { label: 'Installation Guide', href: '/guides/installation' },
  { label: 'Shipping & Delivery', href: '/faqs/shipping' },
  { label: 'Returns & Exchanges', href: '/faqs/returns' },
  { label: 'Fabric Care', href: '/guides/care' },
];

// Support Hours
const supportHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EST' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM EST' },
  { day: 'Sunday', hours: 'Closed' },
];

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    orderNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      orderNumber: '',
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-[hsl(220_25%_25%)] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-white/80 text-lg">
              We're here to help. Reach out and we'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="w-full py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email */}
            <div className="bg-card p-6 border border-border">
              <div className="w-12 h-12 bg-[hsl(220_25%_25%)]/10 flex items-center justify-center mb-4">
                <MailIcon className="h-6 w-6 text-[hsl(220_25%_35%)]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <p className="text-muted-foreground text-sm mb-3">
                For general inquiries and support
              </p>
              <UniversalLink
                to="mailto:support@luxdrape.com"
                className="text-[hsl(220_25%_35%)] font-medium hover:underline"
              >
                support@luxdrape.com
              </UniversalLink>
            </div>

            {/* Phone */}
            <div className="bg-card p-6 border border-border">
              <div className="w-12 h-12 bg-[hsl(220_25%_25%)]/10 flex items-center justify-center mb-4">
                <PhoneIcon className="h-6 w-6 text-[hsl(220_25%_35%)]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Mon-Fri, 9AM-6PM EST
              </p>
              <UniversalLink
                to="tel:1-800-LUX-DRAPE"
                className="text-[hsl(220_25%_35%)] font-medium hover:underline"
              >
                1-800-LUX-DRAPE
              </UniversalLink>
            </div>

            {/* Live Chat */}
            <div className="bg-card p-6 border border-border">
              <div className="w-12 h-12 bg-[hsl(220_25%_25%)]/10 flex items-center justify-center mb-4">
                <MessageCircleIcon className="h-6 w-6 text-[hsl(220_25%_35%)]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Get instant help from our team
              </p>
              <button
                onClick={() => toast.info('Live chat coming soon!')}
                className="text-[hsl(220_25%_35%)] font-medium hover:underline"
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card p-6 md:p-8 border border-border">
                <h2 className="font-serif text-2xl font-semibold mb-6">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Smith"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="order">Order Inquiry</SelectItem>
                          <SelectItem value="product">Product Question</SelectItem>
                          <SelectItem value="measurement">Measurement Help</SelectItem>
                          <SelectItem value="installation">Installation Support</SelectItem>
                          <SelectItem value="returns">Returns & Exchanges</SelectItem>
                          <SelectItem value="business">Business Inquiry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orderNumber">Order Number (if applicable)</Label>
                    <Input
                      id="orderNumber"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      placeholder="ORD-123456"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full md:w-auto bg-[hsl(220_25%_25%)] hover:bg-[hsl(220_25%_20%)] text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <SendIcon className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Support Hours */}
              <div className="bg-card p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <ClockIcon className="h-5 w-5 text-[hsl(220_25%_35%)]" />
                  <h3 className="font-semibold">Support Hours</h3>
                </div>
                <div className="space-y-3">
                  {supportHours.map((item) => (
                    <div key={item.day} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.day}</span>
                      <span className="font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Address */}
              <div className="bg-card p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <MapPinIcon className="h-5 w-5 text-[hsl(220_25%_35%)]" />
                  <h3 className="font-semibold">Office Address</h3>
                </div>
                <address className="not-italic text-sm text-muted-foreground leading-relaxed">
                  LuxDrape Inc.<br />
                  123 Design District<br />
                  Suite 400<br />
                  New York, NY 10001
                </address>
              </div>

              {/* Quick Links */}
              <div className="bg-card p-6 border border-border">
                <h3 className="font-semibold mb-4">Quick Help</h3>
                <div className="space-y-2">
                  {quickLinks.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => navigate(link.href)}
                      className="w-full flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-[hsl(220_25%_35%)] transition-colors group"
                    >
                      {link.label}
                      <ChevronRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="w-full bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border h-[400px] flex items-center justify-center">
            <div className="text-center">
              <MapPinIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Map Integration Placeholder</p>
              <p className="text-sm text-muted-foreground mt-1">
                Google Maps or similar service would be integrated here
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
