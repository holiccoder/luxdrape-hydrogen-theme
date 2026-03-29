import {
  AwardIcon,
  ClockIcon,
  ShieldCheckIcon,
  RefreshCwIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
} from 'lucide-react';
import {Card, CardContent} from '~/components/ui/card';
import {Button} from '~/components/ui/button';
import aboutData from '~/data/about.json';

const iconMap = {
  Award: AwardIcon,
  Clock: ClockIcon,
  ShieldCheck: ShieldCheckIcon,
  RefreshCw: RefreshCwIcon,
  Mail: MailIcon,
  Phone: PhoneIcon,
  MapPin: MapPinIcon,
};

function HeroSection() {
  return (
    <section className="w-full bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-4">
            {aboutData.hero.label}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-tight mb-6">
            {aboutData.hero.title}
            <br />
            <span className="text-primary">
              {aboutData.hero.titleHighlight}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {aboutData.hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

function BrandStorySection() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">
              {aboutData.brandStory.label}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-6">
              {aboutData.brandStory.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {aboutData.brandStory.description}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {aboutData.brandStory.secondParagraph}
            </p>
            <div className="flex items-center gap-8">
              {aboutData.brandStory.stats.map((stat, index) => (
                <div key={index}>
                  <p className="font-serif text-3xl font-semibold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={aboutData.brandStory.image}
                alt="Craftsmanship at DrapeStyle"
                className="w-full aspect-[16/10] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CraftsmanshipSection() {
  return (
    <section className="w-full bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">
            {aboutData.craftsmanship.label}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            {aboutData.craftsmanship.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {aboutData.craftsmanship.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutData.craftsmanship.steps.map((step, index) => (
            <Card
              key={index}
              className="craft-card bg-card border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
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
  );
}

function QualityPromisesSection() {
  const IconComponent = (iconName) => iconMap[iconName] || AwardIcon;

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">
            {aboutData.qualityPromises.label}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            {aboutData.qualityPromises.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {aboutData.qualityPromises.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aboutData.qualityPromises.promises.map((promise, index) => {
            const Icon = IconComponent(promise.icon);
            return (
              <Card
                key={index}
                className="bg-card border border-border hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
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
  );
}

function TestimonialsSection() {
  return (
    <section className="w-full bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">
            {aboutData.testimonials.label}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            {aboutData.testimonials.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {aboutData.testimonials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutData.testimonials.items.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-card border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}'s home`}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({length: 5}).map((_, i) => (
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
                    <p className="font-medium text-foreground text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const IconComponent = (iconName) => iconMap[iconName] || MailIcon;

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">
            {aboutData.contact.label}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            {aboutData.contact.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {aboutData.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {aboutData.contact.items.map((contact, index) => {
            const Icon = IconComponent(contact.icon);
            return (
              <Card
                key={index}
                className="bg-card border border-border text-center p-6 hover:border-primary/20 transition-colors duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {contact.label}
                </p>
                <p className="font-medium text-foreground mb-1">
                  {contact.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {contact.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {aboutData.contact.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function AboutTemplate() {
  return (
    <div className="about-page w-full space-y-0">
      <HeroSection />
      <BrandStorySection />
      <CraftsmanshipSection />
      <QualityPromisesSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
