import {useNavigate} from 'react-router-dom';
import {Button} from '~/components/ui/button';
import {Input} from '~/components/ui/input';
import {Textarea} from '~/components/ui/textarea';
import {Label} from '~/components/ui/label';
import {Badge} from '~/components/ui/badge';
import {
  CameraIcon,
  VideoIcon,
  StarIcon,
  GiftIcon,
  DollarSignIcon,
  UsersIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  MailIcon,
} from 'lucide-react';
import {Image} from '~/components/ui/image';
import {toast} from 'sonner';

export function meta() {
  return [{title: 'Influencer Program | LuxDrape'}];
}

const benefits = [
  {
    icon: GiftIcon,
    title: 'Free Products',
    description:
      'Receive complimentary custom curtains for your home or projects valued up to $1,000',
  },
  {
    icon: DollarSignIcon,
    title: 'Commission',
    description:
      'Earn 15% commission on every sale made through your unique referral link',
  },
  {
    icon: UsersIcon,
    title: 'Exclusive Access',
    description:
      'Early access to new collections and limited edition fabrics before public launch',
  },
  {
    icon: StarIcon,
    title: 'Featured Content',
    description:
      'Get featured on our official Instagram and website reaching 500K+ followers',
  },
];

const requirements = [
  'Minimum 10,000 followers on Instagram, TikTok, or YouTube',
  'Active posting schedule with consistent engagement',
  'Content focused on home decor, interior design, or lifestyle',
  'High-quality photography or videography skills',
  'Authentic voice that resonates with your audience',
  'Willingness to create at least 2 pieces of content per quarter',
];

const processSteps = [
  {
    step: '01',
    title: 'Apply',
    description:
      'Fill out our simple application form with your social media handles and content samples',
  },
  {
    step: '02',
    title: 'Review',
    description:
      'Our team reviews your application and audience alignment within 5-7 business days',
  },
  {
    step: '03',
    title: 'Welcome',
    description:
      'Receive your welcome package with product selection guide and brand guidelines',
  },
  {
    step: '04',
    title: 'Create',
    description:
      'Receive your custom curtains and start creating beautiful content for your audience',
  },
];

const featuredCreators = [
  {
    name: 'Sarah Mitchell',
    handle: '@sarahshome',
    followers: '125K',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda',
    quote: 'LuxDrape transformed my living room. The quality is unmatched!',
  },
  {
    name: 'James Chen',
    handle: '@modernminimal',
    followers: '89K',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/190087f6844e4a6d9e9eecd6e38fdad3_ve_miaoda',
    quote: 'My followers love seeing these custom curtains in my designs',
  },
  {
    name: 'Emma Wilson',
    handle: '@cozyabode',
    followers: '210K',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/6d9f0df723de4f648a28c44f08db77d1_ve_miaoda',
    quote: 'The commission program has been a great addition to my income',
  },
];

export function InfluencerPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(
      "Application submitted! We'll review and get back to you within 5-7 days.",
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-[hsl(220_25%_15%)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-white/20 text-white border-0 hover:bg-white/30">
                Influencer Program
              </Badge>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
                Create With Us
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Join our community of home decor creators and share the beauty
                of custom window treatments with your audience. Get free
                products, earn commissions, and inspire others.
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
                  Apply Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate('/shop')}
                >
                  Explore Products
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda"
                alt="Creator with custom curtains"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Partnership Benefits
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We value our creators and offer competitive benefits to help you
              grow while sharing beautiful products with your audience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="border border-border p-6 bg-card"
              >
                <div className="w-12 h-12 bg-[hsl(220_25%_25%)] flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
                Who We're Looking For
              </h2>
              <p className="text-muted-foreground mb-8">
                We partner with authentic creators who share our passion for
                quality home decor and exceptional design.
              </p>
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-[hsl(220_25%_35%)] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="border border-border bg-card p-6 text-center">
                  <CameraIcon className="h-8 w-8 mx-auto mb-3 text-[hsl(220_25%_35%)]" />
                  <p className="font-semibold">Instagram</p>
                  <p className="text-sm text-muted-foreground">Creators</p>
                </div>
                <div className="border border-border bg-card p-6 text-center">
                  <VideoIcon className="h-8 w-8 mx-auto mb-3 text-[hsl(220_25%_35%)]" />
                  <p className="font-semibold">TikTok</p>
                  <p className="text-sm text-muted-foreground">Creators</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="border border-border bg-card p-6 text-center">
                  <VideoIcon className="h-8 w-8 mx-auto mb-3 text-[hsl(220_25%_35%)]" />
                  <p className="font-semibold">YouTube</p>
                  <p className="text-sm text-muted-foreground">Creators</p>
                </div>
                <div className="border border-border bg-card p-6 text-center">
                  <CameraIcon className="h-8 w-8 mx-auto mb-3 text-[hsl(220_25%_35%)]" />
                  <p className="font-semibold">Bloggers</p>
                  <p className="text-sm text-muted-foreground">& Writers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Getting started is simple. Follow these steps to become a LuxDrape
              partner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="border border-border bg-card p-6 h-full">
                  <div className="text-4xl font-serif font-bold text-[hsl(220_25%_25%)]/20 mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRightIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Meet Our Creators
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what our community members are saying about their partnership
              with LuxDrape.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredCreators.map((creator) => (
              <div
                key={creator.handle}
                className="border border-border bg-card"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={creator.image}
                    alt={creator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground italic mb-4">
                    "{creator.quote}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{creator.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {creator.handle}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {creator.followers} followers
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="w-full py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Apply to Join
            </h2>
            <p className="text-muted-foreground">
              Fill out the form below and we'll get back to you within 5-7
              business days.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="border border-border bg-card p-8"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="mt-2"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="instagram">Instagram Handle</Label>
                <Input
                  id="instagram"
                  placeholder="@yourhandle"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="followers">Follower Count</Label>
                <Input
                  id="followers"
                  placeholder="e.g. 50,000"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="otherSocial">
                Other Social Platforms (Optional)
              </Label>
              <Input
                id="otherSocial"
                placeholder="TikTok, YouTube, Blog URL"
                className="mt-2"
              />
            </div>

            <div className="mb-6">
              <Label htmlFor="message">Tell Us About Yourself</Label>
              <Textarea
                id="message"
                placeholder="Share your content style, audience demographics, and why you'd like to partner with us"
                className="mt-2 min-h-[120px]"
              />
            </div>

            <div className="mb-6">
              <Label htmlFor="website">Portfolio/Website (Optional)</Label>
              <Input
                id="website"
                placeholder="https://yourwebsite.com"
                className="mt-2"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[hsl(220_25%_25%)] hover:bg-[hsl(220_25%_20%)]"
            >
              <MailIcon className="h-4 w-4 mr-2" />
              Submit Application
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              By submitting, you agree to our terms and privacy policy
            </p>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Common Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Is there a minimum contract period?',
                a: 'No, our partnership is flexible. However, we do ask that you complete at least one collaboration within 3 months of acceptance to remain active.',
              },
              {
                q: 'How and when do I get paid commissions?',
                a: 'Commissions are paid monthly via PayPal or direct deposit once you reach a $50 minimum threshold.',
              },
              {
                q: 'Can I choose which products to feature?',
                a: 'Yes! Once approved, you will have access to our product catalog and can select items that best fit your aesthetic and audience.',
              },
              {
                q: 'Do I need to make a certain number of posts?',
                a: 'We ask for at least 2 posts per quarter, but many of our partners choose to post more frequently because they genuinely love the products.',
              },
            ].map((faq, index) => (
              <div key={index} className="border border-border bg-card">
                <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent transition-colors">
                  <span className="font-medium">{faq.q}</span>
                </button>
                <div className="px-6 pb-4 text-muted-foreground text-sm">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default InfluencerPage;
