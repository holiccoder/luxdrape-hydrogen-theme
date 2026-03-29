import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  CheckIcon,
  PercentIcon,
  TruckIcon,
  ClockIcon,
  UsersIcon,
  BuildingIcon,
  StarIcon,
  ArrowRightIcon,
} from 'lucide-react';
import { toast } from 'sonner';

const benefits = [
  {
    icon: PercentIcon,
    title: 'Exclusive Trade Discount',
    description: 'Save up to 25% on all custom curtains and shades with your trade account.',
  },
  {
    icon: TruckIcon,
    title: 'Free Shipping',
    description: 'Complimentary shipping on all orders, no minimum required.',
  },
  {
    icon: ClockIcon,
    title: 'Priority Production',
    description: 'Skip the queue with expedited 7-day production for trade members.',
  },
  {
    icon: UsersIcon,
    title: 'Dedicated Support',
    description: 'Access to our trade specialists for measurements and consultations.',
  },
];

const testimonials = [
  {
    quote: "LuxDrape has transformed how I source window treatments for my clients. The quality is exceptional and the trade pricing makes it profitable for my business.",
    author: "Sarah Mitchell",
    role: "Principal Designer, Mitchell Interiors",
    location: "New York, NY",
  },
  {
    quote: "The dedicated support team helped me with complex measurements for a high-rise project. Their expertise saved me time and ensured perfect fit.",
    author: "Michael Chen",
    role: "Founder, Chen Design Studio",
    location: "San Francisco, CA",
  },
  {
    quote: "My clients love the custom options and quick turnaround. I've used LuxDrape for over 50 projects and have never been disappointed.",
    author: "Jennifer Walsh",
    role: "Interior Designer",
    location: "Austin, TX",
  },
];

const TradeProgramPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    website: '',
    businessType: '',
    yearsInBusiness: '',
    projectVolume: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Application submitted! We\'ll review and respond within 2 business days.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      website: '',
      businessType: '',
      yearsInBusiness: '',
      projectVolume: '',
    });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-[hsl(220_25%_15%)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-white/10 text-white border-0 hover:bg-white/20">
              For Design Professionals
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
              LuxDrape Trade Program
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              Join thousands of interior designers, decorators, and contractors who trust 
              LuxDrape for premium custom window treatments. Exclusive pricing, dedicated 
              support, and priority service.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-white text-[hsl(220_25%_15%)] hover:bg-white/90 border-0"
                onClick={() => {
                  const el = document.getElementById('apply');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Apply Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Trade Member Benefits
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to deliver exceptional results for your clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-6 border border-border bg-card hover:border-[hsl(220_25%_35%)] transition-colors"
              >
                <div className="w-12 h-12 bg-[hsl(220_25%_25%)] flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Qualifies */}
      <section className="w-full bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
                Who Can Join?
              </h2>
              <p className="text-muted-foreground mb-8">
                Our trade program is designed for professionals in the design and 
                construction industry. If you purchase window treatments for clients 
                or projects, you qualify.
              </p>

              <div className="space-y-4">
                {[
                  'Interior Designers & Decorators',
                  'Architects & Builders',
                  'Contractors & Renovators',
                  'Property Developers',
                  'Hospitality Professionals',
                  'Home Stagers',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[hsl(220_25%_25%)] flex items-center justify-center">
                      <CheckIcon className="h-3 w-3 text-white" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-card border border-border text-center">
                <div className="text-4xl font-serif font-semibold text-[hsl(220_25%_35%)] mb-2">
                  25%
                </div>
                <p className="text-sm text-muted-foreground">Trade Discount</p>
              </div>
              <div className="p-6 bg-card border border-border text-center">
                <div className="text-4xl font-serif font-semibold text-[hsl(220_25%_35%)] mb-2">
                  7
                </div>
                <p className="text-sm text-muted-foreground">Day Production</p>
              </div>
              <div className="p-6 bg-card border border-border text-center">
                <div className="text-4xl font-serif font-semibold text-[hsl(220_25%_35%)] mb-2">
                  5K+
                </div>
                <p className="text-sm text-muted-foreground">Trade Members</p>
              </div>
              <div className="p-6 bg-card border border-border text-center">
                <div className="text-4xl font-serif font-semibold text-[hsl(220_25%_35%)] mb-2">
                  24/7
                </div>
                <p className="text-sm text-muted-foreground">Support Access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              What Trade Members Say
            </h2>
            <p className="text-muted-foreground">
              Trusted by professionals across the country
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="p-6 border border-border bg-card"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-4 w-4 fill-[hsl(220_25%_35%)] text-[hsl(220_25%_35%)]"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="w-full bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                Apply for Trade Access
              </h2>
              <p className="text-muted-foreground">
                Complete the form below. We'll review your application and respond 
                within 2 business days.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Company Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Business Type *</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, businessType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interior-designer">Interior Designer</SelectItem>
                    <SelectItem value="architect">Architect</SelectItem>
                    <SelectItem value="contractor">Contractor/Builder</SelectItem>
                    <SelectItem value="decorator">Decorator</SelectItem>
                    <SelectItem value="developer">Property Developer</SelectItem>
                    <SelectItem value="stager">Home Stager</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Years in Business</Label>
                  <Select
                    value={formData.yearsInBusiness}
                    onValueChange={(value) =>
                      setFormData({ ...formData, yearsInBusiness: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">Less than 2 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Annual Project Volume</Label>
                  <Select
                    value={formData.projectVolume}
                    onValueChange={(value) =>
                      setFormData({ ...formData, projectVolume: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select volume" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 projects</SelectItem>
                      <SelectItem value="11-25">11-25 projects</SelectItem>
                      <SelectItem value="26-50">26-50 projects</SelectItem>
                      <SelectItem value="50+">50+ projects</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[hsl(220_25%_25%)] text-white hover:bg-[hsl(220_25%_20%)]"
              >
                Submit Application
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By submitting, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="w-full bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-[hsl(220_25%_15%)] text-white p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-serif text-3xl font-semibold mb-4">
                  Questions?
                </h2>
                <p className="text-white/80 mb-6">
                  Our trade team is here to help. Reach out for personalized assistance 
                  with your application or any questions about the program.
                </p>
                <div className="space-y-2 text-sm">
                  <p>trade@luxdrape.com</p>
                  <p>1-800-LUX-DRAPE ext. 2</p>
                  <p>Mon-Fri: 9AM - 6PM EST</p>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <BuildingIcon className="h-32 w-32 text-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TradeProgramPage;
