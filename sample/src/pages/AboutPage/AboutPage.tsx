import React from 'react';
import { AwardIcon, ClockIcon, ShieldCheckIcon, RefreshCwIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface IAboutPageProps {}

// 品牌故事数据
const brandStory = {
  title: 'Crafted with Passion, Designed for You',
  subtitle: 'Since 2015, we\'ve been transforming windows into works of art',
  description: 'DrapeStyle began with a simple belief: every window deserves curtains as unique as the home it adorns. Founded in Los Angeles by a team of interior designers and master craftsmen, we set out to revolutionize the custom curtain industry by combining traditional tailoring techniques with modern design sensibilities.',
  secondParagraph: 'What started as a small workshop has grown into a trusted name in American homes, serving thousands of families who share our passion for quality and personalized style. Every curtain we create is a testament to our commitment to excellence and our love for beautiful living spaces.',
  image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/374fd1c04ee445b2a6f8e62b5b3933ea_ve_miaoda'
};

// 工艺步骤数据
const craftsmanshipSteps = [
  {
    number: '01',
    title: 'Premium Selection',
    description: 'We source only the finest fabrics from certified mills around the world, ensuring every material meets our rigorous quality standards.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/4404b45f35da473c8fc6f026d2c13f56_ve_miaoda'
  },
  {
    number: '02',
    title: 'Precision Cutting',
    description: 'Each panel is measured and cut with computer-guided precision to ensure perfect dimensions for your custom order.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/18c82e1fd4c74d7a9a8b1f676ef57916_ve_miaoda'
  },
  {
    number: '03',
    title: 'Expert Sewing',
    description: 'Our master seamstresses bring decades of experience, crafting each curtain with meticulous attention to detail and finishing.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5f909e47df72474caafcd3b191e077fd_ve_miaoda'
  },
  {
    number: '04',
    title: 'Quality Inspection',
    description: 'Every piece undergoes rigorous quality control checks before carefully packaging for safe delivery to your home.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/71c5a08726ba4857a88b02903542fc08_ve_miaoda'
  }
];

// 品质承诺数据
const qualityPromises = [
  {
    icon: AwardIcon,
    title: 'Lifetime Quality Guarantee',
    description: 'We stand behind every curtain with our comprehensive quality guarantee. If you\'re not completely satisfied, we\'ll make it right.',
    highlight: '100% Satisfaction'
  },
  {
    icon: ClockIcon,
    title: 'On-Time Delivery Promise',
    description: 'We understand the excitement of home transformation. Your custom curtains will arrive within the promised timeframe, guaranteed.',
    highlight: 'Fast Turnaround'
  },
  {
    icon: ShieldCheckIcon,
    title: '5-Year Warranty',
    description: 'Every curtain comes with our exclusive 5-year warranty covering craftsmanship and hardware, giving you peace of mind.',
    highlight: '5 Year Coverage'
  },
  {
    icon: RefreshCwIcon,
    title: '30-Day Free Returns',
    description: 'Changed your mind? No problem. We offer hassle-free returns within 30 days of delivery, no questions asked.',
    highlight: 'Easy Returns'
  }
];

// 客户评价数据
const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    location: 'New York, NY',
    rating: 5,
    text: 'The quality exceeded my expectations. These curtains transformed my living room completely. The custom fit is perfect!',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/58c5b1e0bea9442eb4d1ea59746e3978_ve_miaoda'
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'San Francisco, CA',
    rating: 5,
    text: 'From fabric selection to installation, the entire process was seamless. The blackout curtains are exactly what we needed.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/7b849f6ee3bf42e885b324dd0907336b_ve_miaoda'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    location: 'Austin, TX',
    rating: 5,
    text: 'I\'ve ordered from DrapeStyle three times now. Each experience has been wonderful. The customer service is outstanding!',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/45a1634fb4224db88c7dd3607cc2bbeb_ve_miaoda'
  }
];

// 联系信息数据
const contactInfo = [
  {
    icon: MailIcon,
    label: 'Email Us',
    value: 'hello@drapestyle.com',
    description: 'We\'ll respond within 24 hours'
  },
  {
    icon: PhoneIcon,
    label: 'Call Us',
    value: '1-800-DRAPE-STYLE',
    description: 'Mon-Fri, 9am-6pm PST'
  },
  {
    icon: MapPinIcon,
    label: 'Visit Us',
    value: 'Los Angeles, CA',
    description: 'By appointment only'
  }
];

const AboutPage: React.FC<IAboutPageProps> = () => {
  return (
    <>
      <style jsx>{`
        .about-page {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .craft-card:hover .craft-number {
          color: hsl(25 35% 40%);
        }
      `}</style>

      <div className="about-page w-full space-y-0">
        {/* Hero Section */}
        <section className="w-full bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-primary font-medium text-sm tracking-wide uppercase mb-4">Our Story</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-tight mb-6">
                Creating Beautiful Spaces,
                <br />
                <span className="text-primary">One Window at a Time</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                We believe that custom curtains are more than just window coverings—they are the finishing touch that transforms a house into a home.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Text Content */}
              <div className="order-2 lg:order-1">
                <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Our Heritage</p>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-6">
                  {brandStory.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {brandStory.description}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {brandStory.secondParagraph}
                </p>
                <div className="flex items-center gap-8">
                  <div>
                    <p className="font-serif text-3xl font-semibold text-primary">9+</p>
                    <p className="text-sm text-muted-foreground">Years of Excellence</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div>
                    <p className="font-serif text-3xl font-semibold text-primary">50K+</p>
                    <p className="text-sm text-muted-foreground">Happy Customers</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div>
                    <p className="font-serif text-3xl font-semibold text-primary">100%</p>
                    <p className="text-sm text-muted-foreground">Made in USA</p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={brandStory.image}
                    alt="Craftsmanship at DrapeStyle"
                    className="w-full aspect-[16/10] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Craftsmanship Section */}
        <section className="w-full bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Our Process</p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
                The Art of Custom Curtains
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every curtain we create goes through a meticulous four-step process, ensuring the highest quality and perfect fit for your windows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {craftsmanshipSteps.map((step, index) => (
                <Card key={index} className="craft-card bg-card border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <span className="craft-number text-4xl font-serif font-bold text-muted-foreground/30 transition-colors duration-300">
                      {step.number}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-foreground mt-2 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Promises Section */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Our Promise</p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
                Quality You Can Trust
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We stand behind every curtain we create with comprehensive guarantees designed to give you complete peace of mind.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {qualityPromises.map((promise, index) => {
                const Icon = promise.icon;
                return (
                  <Card key={index} className="bg-card border border-border hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <CardContent className="p-6 md:p-8 flex gap-6">
                      <div className="shrink-0">
                        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                          <Icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-serif text-xl font-semibold text-foreground">
                            {promise.title}
                          </h3>
                          <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {promise.highlight}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {promise.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Customer Love</p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
                What Our Customers Say
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Don\'t just take our word for it—hear from the thousands of happy homeowners who\'ve transformed their spaces with DrapeStyle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-card border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name}'s home`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-primary fill-primary' : 'text-muted'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-foreground leading-relaxed mb-6 text-sm">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium text-sm">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                        <p className="text-muted-foreground text-xs">{testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12">
              <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Get in Touch</p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
                We\'d Love to Hear From You
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have questions about our products or services? Our friendly team is here to help you find the perfect curtains for your home.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <Card key={index} className="bg-card border border-border text-center p-6 hover:border-primary/20 transition-colors duration-300">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{contact.label}</p>
                    <p className="font-medium text-foreground mb-1">{contact.value}</p>
                    <p className="text-xs text-muted-foreground">{contact.description}</p>
                  </Card>
                );
              })}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                Start Your Custom Order
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
