import {useState} from 'react';
import {Button} from '~/components/ui/button';
import {Input} from '~/components/ui/input';
import {Label} from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {Badge} from '~/components/ui/badge';
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
import tradeProgramData from '~/data/trade-program.json';
import {toast} from 'sonner';

const iconMap = {
  Percent: PercentIcon,
  Truck: TruckIcon,
  Clock: ClockIcon,
  Users: UsersIcon,
};

export default function TradeProgramTemplate() {
  const fieldBorderClassName = 'border-gray-200';
  const hero = tradeProgramData.hero ?? {};
  const benefitsSection = tradeProgramData.benefitsSection ?? {};
  const benefits = tradeProgramData.benefits ?? [];
  const qualificationsSection = tradeProgramData.qualificationsSection ?? {};
  const stats = tradeProgramData.stats ?? [];
  const testimonialsSection = tradeProgramData.testimonialsSection ?? {};
  const testimonials = tradeProgramData.testimonials ?? [];
  const applicationSection = tradeProgramData.applicationSection ?? {};
  const fields = applicationSection.fields ?? {};
  const businessTypes = tradeProgramData.businessTypes ?? [];
  const yearsOptions = tradeProgramData.yearsOptions ?? [];
  const volumeOptions = tradeProgramData.volumeOptions ?? [];
  const faqTeaser = tradeProgramData.faqTeaser ?? {};

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

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(applicationSection.successMessage);
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
      <section className="w-full bg-[hsl(220_25%_15%)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-white/10 text-white border-0 hover:bg-white/20">
              {hero.badge}
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
              {hero.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              {hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-white text-[hsl(220_25%_15%)] hover:bg-white/90 border-0"
                onClick={() => {
                  const el = document.getElementById('apply');
                  el?.scrollIntoView({behavior: 'smooth'});
                }}
              >
                {hero.primaryButton}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                {hero.secondaryButton}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              {benefitsSection.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {benefitsSection.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              (() => {
                const Icon = iconMap[benefit.icon] || UsersIcon;

                return (
                  <div
                    key={benefit.title}
                    className="p-6 border border-gray-200 bg-card hover:border-[hsl(220_25%_35%)] transition-colors"
                  >
                    <div className="w-12 h-12 bg-[hsl(220_25%_25%)] flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </div>
                );
              })()
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
                {qualificationsSection.title}
              </h2>
              <p className="text-muted-foreground mb-8">
                {qualificationsSection.subtitle}
              </p>

              <div className="space-y-4">
                {qualificationsSection.items?.map((item) => (
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
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 bg-card border border-gray-200 text-center"
                >
                  <div className="text-4xl font-serif font-semibold text-[hsl(220_25%_35%)] mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              {testimonialsSection.title}
            </h2>
            <p className="text-muted-foreground">{testimonialsSection.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="p-6 border border-gray-200 bg-card"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className="h-4 w-4 fill-[hsl(220_25%_35%)] text-[hsl(220_25%_35%)]"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="w-full bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                {applicationSection.title}
              </h2>
              <p className="text-muted-foreground">{applicationSection.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{fields.firstName}</Label>
                  <Input
                    id="firstName"
                    className={fieldBorderClassName}
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({...formData, firstName: e.target.value})
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{fields.lastName}</Label>
                  <Input
                    id="lastName"
                    className={fieldBorderClassName}
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({...formData, lastName: e.target.value})
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{fields.email}</Label>
                <Input
                  id="email"
                  type="email"
                  className={fieldBorderClassName}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({...formData, email: e.target.value})
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">{fields.company}</Label>
                <Input
                  id="company"
                  className={fieldBorderClassName}
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({...formData, company: e.target.value})
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">{fields.website}</Label>
                <Input
                  id="website"
                  type="url"
                  className={fieldBorderClassName}
                  placeholder={fields.websitePlaceholder}
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({...formData, website: e.target.value})
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>{fields.businessType}</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) =>
                    setFormData({...formData, businessType: value})
                  }
                >
                  <SelectTrigger className={fieldBorderClassName}>
                    <SelectValue placeholder={fields.businessTypePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{fields.yearsInBusiness}</Label>
                  <Select
                    value={formData.yearsInBusiness}
                    onValueChange={(value) =>
                      setFormData({...formData, yearsInBusiness: value})
                    }
                  >
                    <SelectTrigger className={fieldBorderClassName}>
                      <SelectValue placeholder={fields.yearsInBusinessPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {yearsOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{fields.projectVolume}</Label>
                  <Select
                    value={formData.projectVolume}
                    onValueChange={(value) =>
                      setFormData({...formData, projectVolume: value})
                    }
                  >
                    <SelectTrigger className={fieldBorderClassName}>
                      <SelectValue placeholder={fields.projectVolumePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {volumeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[hsl(220_25%_25%)] text-white hover:bg-[hsl(220_25%_20%)]"
              >
                {applicationSection.submitButton}
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                {applicationSection.legal}
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="w-full bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-[hsl(220_25%_15%)] text-white p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-serif text-3xl font-semibold mb-4">
                  {faqTeaser.title}
                </h2>
                <p className="text-white/80 mb-6">
                  {faqTeaser.subtitle}
                </p>
                <div className="space-y-2 text-sm">
                  <p>{faqTeaser.email}</p>
                  <p>{faqTeaser.phone}</p>
                  <p>{faqTeaser.hours}</p>
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
}
