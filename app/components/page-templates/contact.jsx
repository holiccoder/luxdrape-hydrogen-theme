import {Link} from 'react-router';
import {
  MailIcon,
  PhoneIcon,
  MessageCircleIcon,
  ClockIcon,
  MapPinIcon,
  ExternalLinkIcon,
} from 'lucide-react';
import {Card, CardContent} from '~/components/ui/card';
import {Button} from '~/components/ui/button';
import contactData from '~/data/contact.json';

const iconMap = {
  Mail: MailIcon,
  Phone: PhoneIcon,
  MessageCircle: MessageCircleIcon,
};

function HeroSection() {
  return (
    <section className="w-full bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
            {contactData.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {contactData.hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactCardsSection() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {contactData.contactCards.map((card) => {
            const Icon = iconMap[card.icon] || MailIcon;

            return (
              <Card key={card.title} className="border border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
                    {card.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {card.description}
                  </p>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
                    >
                      {card.value}
                      <ExternalLinkIcon className="h-4 w-4" />
                    </a>
                  ) : (
                    <p className="font-medium text-foreground">{card.value}</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SupportInfoSection() {
  return (
    <section className="w-full bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="border border-border shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-primary" />
                <h2 className="font-serif text-2xl font-semibold">
                  {contactData.supportHoursSection.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {contactData.supportHours.map((item) => (
                  <li
                    key={item.day}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="text-muted-foreground">{item.day}</span>
                    <span className="font-medium text-foreground">
                      {item.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-primary" />
                <h2 className="font-serif text-2xl font-semibold">
                  {contactData.officeAddressSection.title}
                </h2>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                  {contactData.officeAddress.company}
                </p>
                <p>{contactData.officeAddress.street}</p>
                <p>{contactData.officeAddress.suite}</p>
                <p>{contactData.officeAddress.city}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm">
            <CardContent className="p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">
                {contactData.quickLinksSection.title}
              </h2>
              <ul className="space-y-3">
                {contactData.quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function SubjectsSection() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
            {contactData.subjectsSection.title}
          </h2>
          <p className="text-muted-foreground mb-8">
            {contactData.subjectsSection.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            {contactData.formSubjects.map((subject) => (
              <span
                key={subject.value}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
              >
                {subject.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ContactTemplate() {
  return (
    <div className="contact-page w-full space-y-0">
      <HeroSection />
      <ContactCardsSection />
      <SupportInfoSection />
      <SubjectsSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <a href={contactData.primaryCta.href}>{contactData.primaryCta.label}</a>
        </Button>
      </div>
    </div>
  );
}
