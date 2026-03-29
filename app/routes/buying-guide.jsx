import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  ChevronRightIcon,
  SwatchBookIcon,
  RulerIcon,
  HomeIcon,
  BedDoubleIcon,
  UtensilsIcon,
  BookOpenIcon,
  ArrowRightIcon,
  CheckIcon,
  StarIcon,
  MessageCircleIcon,
  GiftIcon,
  TruckIcon,
  ShieldCheckIcon,
  ClockIcon,
  ChevronDownIcon,
  PlayIcon,
  SparklesIcon,
  LayersIcon,
  SunIcon,
  MoonIcon,
} from 'lucide-react';
import {Button} from '~/components/ui/button';
import {Badge} from '~/components/ui/badge';
import {Image} from '~/components/ui/image';
import {toast} from 'sonner';

export function meta() {
  return [{title: 'Buying Guide | LuxDrape'}];
}

const steps = [
  {
    number: '01',
    title: 'Choose Your Fabric',
    description:
      'Browse our collection of premium fabrics. Order free swatches to see colors and textures in your home.',
    icon: SwatchBookIcon,
    action: 'Order Free Swatches',
    link: '/products/prod-2/swatches',
  },
  {
    number: '02',
    title: 'Measure Your Windows',
    description:
      'Follow our simple measuring guides for perfect-fitting curtains every time. Takes just 10 minutes.',
    icon: RulerIcon,
    action: 'View Measuring Guide',
    link: '/guides/measure',
  },
  {
    number: '03',
    title: 'Customize & Order',
    description:
      'Select your style, enter dimensions, and choose your perfect options. We handle the rest.',
    icon: SparklesIcon,
    action: 'Start Customizing',
    link: '/shop',
  },
  {
    number: '04',
    title: 'We Craft & Deliver',
    description:
      'Your custom curtains are handcrafted and delivered to your door in 14 days. Free shipping over $200.',
    icon: TruckIcon,
    action: 'View Delivery Info',
    link: '/policies',
  },
];

const roomGuides = [
  {
    id: 'living-room',
    title: 'Living Room',
    description:
      'Create a welcoming space with light-filtering fabrics that offer privacy while letting natural light in.',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda',
    recommendations: [
      'Linen curtains for softness',
      'Sheer layers for flexibility',
      'Neutral tones for versatility',
    ],
    productLink: '/shop?category=curtains&room=living',
    icon: HomeIcon,
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    description:
      'Ensure restful sleep with blackout curtains that block 99% of light and reduce outside noise.',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
    recommendations: [
      'Blackout lining essential',
      'Velvet for luxury feel',
      'Floor-length for elegance',
    ],
    productLink: '/shop?category=curtains&room=bedroom',
    icon: BedDoubleIcon,
  },
  {
    id: 'dining-room',
    title: 'Dining Room',
    description:
      'Elevate your dining experience with elegant drapery that complements your decor style.',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
    recommendations: [
      'Silk for formal dining',
      'Rich colors for warmth',
      'Pinch pleat for classic look',
    ],
    productLink: '/shop?category=curtains&room=dining',
    icon: UtensilsIcon,
  },
  {
    id: 'home-office',
    title: 'Home Office',
    description:
      'Reduce glare on screens while maintaining a professional, polished appearance.',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda',
    recommendations: [
      'Light filtering for screen work',
      'Roller shades for minimal look',
      'Motorized for convenience',
    ],
    productLink: '/shop?category=shades&room=office',
    icon: BookOpenIcon,
  },
];

const fabricGuide = [
  {
    name: 'Linen',
    description:
      'Natural, breathable, and timeless. Perfect for casual elegance.',
    bestFor: ['Living rooms', 'Sunrooms', 'Coastal homes'],
    care: 'Dry clean recommended',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda',
    priceRange: '$$',
  },
  {
    name: 'Cotton',
    description:
      'Soft, versatile, and easy to care for. A practical choice for busy homes.',
    bestFor: ['Family rooms', 'Kids rooms', 'Kitchens'],
    care: 'Machine washable',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
    priceRange: '$',
  },
  {
    name: 'Velvet',
    description:
      'Luxurious, rich, and insulating. Adds drama and sophistication.',
    bestFor: ['Master bedrooms', 'Formal dining', 'Theaters'],
    care: 'Professional cleaning',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
    priceRange: '$$$',
  },
  {
    name: 'Silk',
    description:
      'Elegant sheen and beautiful drape. The ultimate luxury choice.',
    bestFor: ['Formal living', 'Special occasions', 'Luxury homes'],
    care: 'Dry clean only',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda',
    priceRange: '$$$$',
  },
];

const layeringCombinations = [
  {
    id: 'day-night',
    title: 'Day & Night Combo',
    subtitle: 'Sheer + Blackout',
    description:
      'Perfect for bedrooms - sheer curtains for daytime privacy with natural light, blackout shades for complete darkness at night.',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda',
    curtainType: 'Sheer Linen Curtains',
    shadeType: 'Blackout Roller Shades',
    savings: 'Save 15%',
    price: 'From $298',
    features: [
      'Maximum light control',
      'Daytime privacy',
      'Sleep quality improvement',
    ],
    link: '/shop?combo=day-night',
  },
  {
    id: 'elegant-layer',
    title: 'Elegant Layering',
    subtitle: 'Drapes + Roman Shades',
    description:
      'Sophisticated combination for formal spaces. Roman shades provide clean lines while drapes add softness and luxury.',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
    curtainType: 'Velvet Drapes',
    shadeType: 'Linen Roman Shades',
    savings: 'Save 20%',
    price: 'From $458',
    features: ['Luxurious aesthetic', 'Insulation boost', 'Sound dampening'],
    link: '/shop?combo=elegant',
  },
  {
    id: 'modern-minimal',
    title: 'Modern Minimalist',
    subtitle: 'Curtains + Solar Shades',
    description:
      'Clean, contemporary look with solar shades to block UV rays and reduce heat while maintaining your view.',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
    curtainType: 'Cotton Canvas Curtains',
    shadeType: 'Solar Roller Shades',
    savings: 'Save 15%',
    price: 'From $328',
    features: ['UV protection', 'Energy efficiency', 'Unobstructed views'],
    link: '/shop?combo=modern',
  },
];

const reviews = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'New York, NY',
    rating: 5,
    title: 'Perfect first-time experience',
    content:
      'I was nervous about ordering custom curtains online, but the buying guide made it so easy. The swatches helped me pick the perfect color, and the measuring guide was spot on!',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda',
  },
  {
    id: 2,
    name: 'James K.',
    location: 'Austin, TX',
    rating: 5,
    title: 'Exceeded expectations',
    content:
      'The room-specific recommendations were incredibly helpful. I used the bedroom guide and my blackout curtains are perfect. Sleep has never been better!',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
  },
  {
    id: 3,
    name: 'Emily R.',
    location: 'Seattle, WA',
    rating: 5,
    title: 'Great value for custom',
    content:
      'The step-by-step process made ordering custom curtains less intimidating. The quality is amazing and the price is better than local options. Highly recommend!',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
  },
];

const faqs = [
  {
    question: 'How do I know which fabric to choose?',
    answer:
      'Order our free fabric swatches! You can select up to 10 samples to see colors and textures in your actual lighting. Each fabric page also shows care instructions and best-use recommendations.',
  },
  {
    question: 'What if I measure wrong?',
    answer:
      "Don't worry! Our measuring guides include detailed instructions and common mistakes to avoid. If you're unsure, our customer service team can review your measurements before production.",
  },
  {
    question: 'How long does it take to receive my order?',
    answer:
      "Each order is custom-made and typically ships within 7-10 business days. Delivery takes an additional 3-5 business days. You'll receive tracking information as soon as your order ships.",
  },
  {
    question: 'Can I return my custom curtains?',
    answer:
      'Since each piece is custom-made to your specifications, we cannot accept returns. However, we offer free fabric swatches so you can be confident in your choice before ordering.',
  },
  {
    question: 'Do you offer installation services?',
    answer:
      'We provide detailed DIY installation guides with every order. Installation is straightforward with basic tools. For complex projects, we can recommend local installers in select areas.',
  },
];

export function BuyingGuidePage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [showFlashSale, setShowFlashSale] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Promo Banner */}
      <div className="bg-[hsl(220_25%_25%)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm flex-wrap">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <GiftIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Free Shipping $200+</span>
            </div>
            <span className="hidden sm:inline text-white/50">|</span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <SwatchBookIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Free Swatches</span>
            </div>
            <span className="hidden sm:inline text-white/50">|</span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ClockIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>14-Day Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[hsl(220_25%_25%)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
          <div className="max-w-3xl">
            <Badge className="mb-4 sm:mb-6 bg-white/20 text-white border-0 hover:bg-white/30 text-xs sm:text-sm">
              New to Custom Curtains?
            </Badge>
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-6 leading-tight">
              Your Complete Guide to Buying Custom Curtains
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl">
              Everything you need to know to order perfectly fitted, beautifully
              crafted curtains for your home. From fabric selection to
              installation — we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size={isMobile ? 'default' : 'lg'}
                className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90 w-full sm:w-auto"
                onClick={() => {
                  const el = document.getElementById('steps');
                  el?.scrollIntoView({behavior: 'smooth'});
                }}
              >
                Start Your Journey
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
              <Button
                size={isMobile ? 'default' : 'lg'}
                variant="outline"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                onClick={() => navigate('/products/prod-2/swatches')}
              >
                <SwatchBookIcon className="h-4 w-4 mr-2" />
                Order Free Swatches First
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ShieldCheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(220_40%_60%)]" />
                <span className="text-xs sm:text-sm">Perfect Fit</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <TruckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(220_40%_60%)]" />
                <span className="text-xs sm:text-sm">Free Shipping $200+</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(220_40%_60%)]" />
                <span className="text-xs sm:text-sm">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section id="steps" className="py-12 sm:py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-4">
              Getting custom curtains is easier than you think. Follow these
              four simple steps.
            </p>
          </div>

          <div className="hidden md:grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.number} className="group relative">
                <div className="border border-border bg-card p-6 h-full hover:border-[hsl(220_25%_35%)] transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl font-serif font-bold text-[hsl(220_25%_35%)]/20">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 bg-accent flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-[hsl(220_25%_35%)]" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {step.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-[hsl(220_25%_35%)] hover:text-[hsl(220_25%_25%)] font-medium"
                    onClick={() => navigate(step.link)}
                  >
                    {step.action}
                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ChevronRightIcon className="h-6 w-6 text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layering Combinations */}
      <section className="py-12 sm:py-20 md:py-28 bg-gradient-to-b from-[hsl(220_25%_25%)] to-[hsl(220_25%_20%)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-3 sm:mb-4 bg-white/20 text-white border-0">
              <LayersIcon className="h-3 w-3 mr-1" />
              Perfect Pairings
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
              Curtains + Shades Combinations
            </h2>
            <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto">
              Layer curtains over shades for ultimate light control, insulation,
              and style. Save up to 20% when you buy them together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {layeringCombinations.map((combo) => (
              <div
                key={combo.id}
                className="bg-white text-gray-900 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => navigate(combo.link)}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={combo.image}
                    alt={combo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1">
                    {combo.savings}
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-xs text-[hsl(220_25%_35%)] font-medium mb-1">
                    {combo.subtitle}
                  </p>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2">
                    {combo.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">
                    {combo.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <SunIcon className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      <span className="text-gray-700">{combo.curtainType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <MoonIcon className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                      <span className="text-gray-700">{combo.shadeType}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {combo.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-[10px] sm:text-xs bg-gray-100 px-2 py-0.5 sm:py-1"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="font-semibold text-sm sm:text-base">
                      {combo.price}
                    </span>
                    <Button
                      size="sm"
                      className="bg-[hsl(220_25%_25%)] hover:bg-[hsl(220_25%_20%)] text-xs sm:text-sm"
                    >
                      View Combo
                      <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fabric Guide */}
      <section className="py-12 sm:py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="mb-3 sm:mb-4" variant="secondary">
              Step 1
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
              Choose Your Perfect Fabric
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {fabricGuide.map((fabric) => (
              <div
                key={fabric.name}
                className="bg-card border border-border overflow-hidden group hover:border-[hsl(220_25%_35%)] transition-colors"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={fabric.image}
                    alt={fabric.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-base sm:text-lg">
                      {fabric.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {fabric.priceRange}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {fabric.description}
                  </p>
                  <div className="mb-3">
                    <p className="text-xs font-medium mb-1">Best for:</p>
                    <div className="flex flex-wrap gap-1">
                      {fabric.bestFor.map((item) => (
                        <span
                          key={item}
                          className="text-[10px] sm:text-xs bg-accent px-2 py-0.5"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{fabric.care}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room-by-Room Guide */}
      <section className="py-12 sm:py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="mb-3 sm:mb-4" variant="secondary">
              Room Guide
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
              Find the Perfect Curtains for Every Room
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {roomGuides.map((room) => (
              <div
                key={room.id}
                className="border border-border bg-card overflow-hidden group hover:border-[hsl(220_25%_35%)] transition-colors"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="aspect-[4/3] sm:aspect-auto overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 sm:p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <room.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(220_25%_35%)]" />
                      <h3 className="font-serif text-lg sm:text-xl font-semibold">
                        {room.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
                      {room.description}
                    </p>
                    <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                      {room.recommendations.map((rec) => (
                        <li
                          key={rec}
                          className="flex items-center gap-2 text-xs sm:text-sm"
                        >
                          <CheckIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[hsl(220_25%_35%)] shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-auto"
                      onClick={() => navigate(room.productLink)}
                    >
                      Shop {room.title}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-20 md:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border border-border bg-card overflow-hidden ${
                  openFaq === index ? 'border-[hsl(220_25%_35%)]' : ''
                }`}
              >
                <button
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-accent/50 transition-colors gap-3"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-sm sm:text-base pr-2">
                    {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-muted-foreground text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <p className="text-muted-foreground text-sm mb-3 sm:mb-4">
              Still have questions?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => navigate('/pages/contact')}
              >
                <MessageCircleIcon className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => navigate('/guides')}
              >
                <BookOpenIcon className="h-4 w-4 mr-2" />
                View All Guides
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-20 md:py-28 bg-[hsl(220_25%_25%)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-semibold mb-4 sm:mb-6">
            Ready to Transform Your Windows?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              size={isMobile ? 'default' : 'lg'}
              className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90 w-full sm:w-auto"
              onClick={() => navigate('/products/prod-2/swatches')}
            >
              <SwatchBookIcon className="h-4 w-4 mr-2" />
              Order Free Swatches
            </Button>
            <Button
              size={isMobile ? 'default' : 'lg'}
              variant="outline"
              className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
              onClick={() => navigate('/shop')}
            >
              Start Shopping
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BuyingGuidePage;
