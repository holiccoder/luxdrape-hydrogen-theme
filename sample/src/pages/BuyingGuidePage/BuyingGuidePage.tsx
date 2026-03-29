import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  PhoneIcon,
  MailIcon,
  GiftIcon,
  TruckIcon,
  ShieldCheckIcon,
  ClockIcon,
  ChevronDownIcon,
  PlayIcon,
  SparklesIcon,
  ZapIcon,
  AwardIcon,
  UsersIcon,
  FlameIcon,
  PercentIcon,
  TagIcon,
  TimerIcon,
  XIcon,
  LayersIcon,
  SunIcon,
  MoonIcon,
  EyeIcon,
  MenuIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { toast } from 'sonner';

// ============================================
// Data
// ============================================

const steps = [
  {
    number: '01',
    title: 'Choose Your Fabric',
    description: 'Browse our collection of premium fabrics. Order free swatches to see colors and textures in your home.',
    icon: SwatchBookIcon,
    action: 'Order Free Swatches',
    link: '/products/prod-2/swatches',
  },
  {
    number: '02',
    title: 'Measure Your Windows',
    description: 'Follow our simple measuring guides for perfect-fitting curtains every time. Takes just 10 minutes.',
    icon: RulerIcon,
    action: 'View Measuring Guide',
    link: '/guides/measure',
  },
  {
    number: '03',
    title: 'Customize & Order',
    description: 'Select your style, enter dimensions, and choose your perfect options. We handle the rest.',
    icon: SparklesIcon,
    action: 'Start Customizing',
    link: '/shop',
  },
  {
    number: '04',
    title: 'We Craft & Deliver',
    description: 'Your custom curtains are handcrafted and delivered to your door in 14 days. Free shipping over $200.',
    icon: TruckIcon,
    action: 'View Delivery Info',
    link: '/policies',
  },
];

const roomGuides = [
  {
    id: 'living-room',
    title: 'Living Room',
    description: 'Create a welcoming space with light-filtering fabrics that offer privacy while letting natural light in.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda',
    recommendations: ['Linen curtains for softness', 'Sheer layers for flexibility', 'Neutral tones for versatility'],
    productLink: '/shop?category=curtains&room=living',
    icon: HomeIcon,
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    description: 'Ensure restful sleep with blackout curtains that block 99% of light and reduce outside noise.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
    recommendations: ['Blackout lining essential', 'Velvet for luxury feel', 'Floor-length for elegance'],
    productLink: '/shop?category=curtains&room=bedroom',
    icon: BedDoubleIcon,
  },
  {
    id: 'dining-room',
    title: 'Dining Room',
    description: 'Elevate your dining experience with elegant drapery that complements your decor style.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
    recommendations: ['Silk for formal dining', 'Rich colors for warmth', 'Pinch pleat for classic look'],
    productLink: '/shop?category=curtains&room=dining',
    icon: UtensilsIcon,
  },
  {
    id: 'home-office',
    title: 'Home Office',
    description: 'Reduce glare on screens while maintaining a professional, polished appearance.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda',
    recommendations: ['Light filtering for screen work', 'Roller shades for minimal look', 'Motorized for convenience'],
    productLink: '/shop?category=shades&room=office',
    icon: BookOpenIcon,
  },
];

const fabricGuide = [
  {
    name: 'Linen',
    description: 'Natural, breathable, and timeless. Perfect for casual elegance.',
    bestFor: ['Living rooms', 'Sunrooms', 'Coastal homes'],
    care: 'Dry clean recommended',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda',
    priceRange: '$$',
  },
  {
    name: 'Cotton',
    description: 'Soft, versatile, and easy to care for. A practical choice for busy homes.',
    bestFor: ['Family rooms', 'Kids rooms', 'Kitchens'],
    care: 'Machine washable',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
    priceRange: '$',
  },
  {
    name: 'Velvet',
    description: 'Luxurious, rich, and insulating. Adds drama and sophistication.',
    bestFor: ['Master bedrooms', 'Formal dining', 'Theaters'],
    care: 'Professional cleaning',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
    priceRange: '$$$',
  },
  {
    name: 'Silk',
    description: 'Elegant sheen and beautiful drape. The ultimate luxury choice.',
    bestFor: ['Formal living', 'Special occasions', 'Luxury homes'],
    care: 'Dry clean only',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda',
    priceRange: '$$$$',
  },
];

// Layering combinations data
const layeringCombinations = [
  {
    id: 'day-night',
    title: 'Day & Night Combo',
    subtitle: 'Sheer + Blackout',
    description: 'Perfect for bedrooms - sheer curtains for daytime privacy with natural light, blackout shades for complete darkness at night.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda',
    curtainType: 'Sheer Linen Curtains',
    shadeType: 'Blackout Roller Shades',
    savings: 'Save 15%',
    price: 'From $298',
    features: ['Maximum light control', 'Daytime privacy', 'Sleep quality improvement'],
    link: '/shop?combo=day-night',
  },
  {
    id: 'elegant-layer',
    title: 'Elegant Layering',
    subtitle: 'Drapes + Roman Shades',
    description: 'Sophisticated combination for formal spaces. Roman shades provide clean lines while drapes add softness and luxury.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
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
    description: 'Clean, contemporary look with solar shades to block UV rays and reduce heat while maintaining your view.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
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
    content: 'I was nervous about ordering custom curtains online, but the buying guide made it so easy. The swatches helped me pick the perfect color, and the measuring guide was spot on!',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda',
  },
  {
    id: 2,
    name: 'James K.',
    location: 'Austin, TX',
    rating: 5,
    title: 'Exceeded expectations',
    content: 'The room-specific recommendations were incredibly helpful. I used the bedroom guide and my blackout curtains are perfect. Sleep has never been better!',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
  },
  {
    id: 3,
    name: 'Emily R.',
    location: 'Seattle, WA',
    rating: 5,
    title: 'Great value for custom',
    content: 'The step-by-step process made ordering custom curtains less intimidating. The quality is amazing and the price is better than local options. Highly recommend!',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
  },
];

const faqs = [
  {
    question: 'How do I know which fabric to choose?',
    answer: 'Order our free fabric swatches! You can select up to 10 samples to see colors and textures in your actual lighting. Each fabric page also shows care instructions and best-use recommendations.',
  },
  {
    question: 'What if I measure wrong?',
    answer: 'Don\'t worry! Our measuring guides include detailed instructions and common mistakes to avoid. If you\'re unsure, our customer service team can review your measurements before production.',
  },
  {
    question: 'How long does it take to receive my order?',
    answer: 'Each order is custom-made and typically ships within 7-10 business days. Delivery takes an additional 3-5 business days. You\'ll receive tracking information as soon as your order ships.',
  },
  {
    question: 'Can I return my custom curtains?',
    answer: 'Since each piece is custom-made to your specifications, we cannot accept returns. However, we offer free fabric swatches so you can be confident in your choice before ordering.',
  },
  {
    question: 'Do you offer installation services?',
    answer: 'We provide detailed DIY installation guides with every order. Installation is straightforward with basic tools. For complex projects, we can recommend local installers in select areas.',
  },
];

// Active promotions
const activePromotions = [
  {
    id: 1,
    badge: 'FLASH SALE',
    title: '20% Off All Velvet Curtains',
    description: 'Limited time offer on our premium velvet collection',
    code: 'VELVET20',
    expires: '2 days',
    color: 'bg-red-600',
    icon: FlameIcon,
  },
  {
    id: 2,
    badge: 'BUNDLE DEAL',
    title: 'Buy Curtains + Shades, Save 15%',
    description: 'Complete your window with our layering combinations',
    code: 'LAYER15',
    expires: 'Ends Sunday',
    color: 'bg-[hsl(220_25%_35%)]',
    icon: LayersIcon,
  },
  {
    id: 3,
    badge: 'FREE GIFT',
    title: 'Free Upgrade to Blackout Lining',
    description: 'On all orders over $500',
    code: 'No code needed',
    expires: 'This month',
    color: 'bg-amber-500',
    icon: GiftIcon,
  },
];

// ============================================
// Components
// ============================================

const PromoBanner = () => (
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
);

const FlashSaleBanner = ({ onDismiss }: { onDismiss: () => void }) => (
  <div className="bg-gradient-to-r from-red-600 to-red-500 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:20px_20px]" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 flex-1">
          <FlameIcon className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 flex-1">
            <span className="font-bold text-sm sm:text-base">Flash Sale: 20% Off Velvet Collection</span>
            <span className="text-xs sm:text-sm text-white/80 hidden sm:inline">|</span>
            <span className="text-xs sm:text-sm text-white/90 flex items-center gap-1">
              <TimerIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              Ends in 2 days
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button 
            size="sm" 
            className="bg-white text-red-600 hover:bg-white/90 text-xs sm:text-sm px-2 sm:px-4"
            onClick={() => toast.success('Code VELVET20 copied!')}
          >
            <TagIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Code: VELVET20</span>
            <span className="sm:hidden">VELVET20</span>
          </Button>
          <button onClick={onDismiss} className="p-1 hover:bg-white/20">
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ActivePromotions = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-amber-50 border-y border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <PercentIcon className="h-5 w-5 text-amber-600" />
          <h2 className="font-semibold text-amber-900 text-lg sm:text-xl">Active Promotions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {activePromotions.map((promo) => (
            <div 
              key={promo.id} 
              className="bg-white border border-amber-200 p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/shop')}
            >
              <div className="flex items-start gap-3">
                <div className={`${promo.color} text-white p-2 shrink-0`}>
                  <promo.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <Badge className={`${promo.color} text-white text-[10px] sm:text-xs mb-1`}>
                    {promo.badge}
                  </Badge>
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 leading-tight">{promo.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 hidden sm:block">{promo.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-amber-600 font-medium">{promo.code}</span>
                    <span className="text-xs text-gray-500">{promo.expires}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SwatchCTA = ({ variant = 'default' }: { variant?: 'default' | 'compact' }) => {
  const navigate = useNavigate();
  
  if (variant === 'compact') {
    return (
      <div className="bg-accent border border-border p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[hsl(220_25%_25%)] flex items-center justify-center shrink-0">
            <SwatchBookIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-sm">Not sure which fabric?</p>
            <p className="text-xs text-muted-foreground">Order free swatches first</p>
          </div>
        </div>
        <Button 
          size="sm" 
          className="bg-[hsl(220_25%_25%)] hover:bg-[hsl(220_25%_20%)] w-full sm:w-auto"
          onClick={() => navigate('/products/prod-2/swatches')}
        >
          Order Free
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[hsl(220_25%_25%)] text-white p-4 sm:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 flex items-center justify-center shrink-0">
            <SwatchBookIcon className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-semibold">See Colors in Your Home</h3>
            <p className="text-white/70 text-sm">Order up to 10 free fabric swatches before you buy</p>
          </div>
        </div>
        <Button 
          size="lg"
          className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90 shrink-0 w-full md:w-auto"
          onClick={() => navigate('/products/prod-2/swatches')}
        >
          Order Free Swatches
          <ArrowRightIcon className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

// Mobile-optimized step cards
const MobileStepCard = ({ step, isLast }: { step: typeof steps[0]; isLast: boolean }) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[hsl(220_25%_25%)] text-white flex items-center justify-center font-bold text-sm sm:text-base shrink-0">
          {step.number}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-border my-2" />}
      </div>
      <div className="flex-1 pb-6 sm:pb-8">
        <div className="bg-card border border-border p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <step.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(220_25%_35%)]" />
            <h3 className="font-semibold text-sm sm:text-base">{step.title}</h3>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm mb-3">{step.description}</p>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto text-[hsl(220_25%_35%)] hover:text-[hsl(220_25%_25%)] font-medium text-xs sm:text-sm"
            onClick={() => navigate(step.link)}
          >
            {step.action}
            <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Main Page
// ============================================

const BuyingGuidePage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
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
      <PromoBanner />
      
      {/* Flash Sale Banner */}
      {showFlashSale && <FlashSaleBanner onDismiss={() => setShowFlashSale(false)} />}

      {/* Active Promotions Section */}
      <ActivePromotions />

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
              Everything you need to know to order perfectly fitted, beautifully crafted 
              curtains for your home. From fabric selection to installation — we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size={isMobile ? "default" : "lg"}
                className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90 w-full sm:w-auto"
                onClick={() => {
                  const el = document.getElementById('steps');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start Your Journey
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
              <Button
                size={isMobile ? "default" : "lg"}
                variant="outline"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                onClick={() => navigate('/products/prod-2/swatches')}
              >
                <SwatchBookIcon className="h-4 w-4 mr-2" />
                Order Free Swatches First
              </Button>
            </div>
            
            {/* Trust Badges - Mobile optimized */}
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

      {/* 4-Step Process - Mobile Optimized */}
      <section id="steps" className="py-12 sm:py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-4">
              Getting custom curtains is easier than you think. Follow these four simple steps.
            </p>
          </div>

          {/* Desktop Grid */}
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
                  <p className="text-muted-foreground text-sm mb-6">{step.description}</p>
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

          {/* Mobile Timeline */}
          <div className="md:hidden">
            {steps.map((step, index) => (
              <MobileStepCard 
                key={step.number} 
                step={step} 
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Swatch CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <SwatchCTA />
      </section>

      {/* Layering Combinations - NEW SECTION */}
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
              Layer curtains over shades for ultimate light control, insulation, and style. 
              Save up to 20% when you buy them together.
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
                  <p className="text-xs text-[hsl(220_25%_35%)] font-medium mb-1">{combo.subtitle}</p>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2">{combo.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">{combo.description}</p>
                  
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
                      <span key={feature} className="text-[10px] sm:text-xs bg-gray-100 px-2 py-0.5 sm:py-1">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="font-semibold text-sm sm:text-base">{combo.price}</span>
                    <Button size="sm" className="bg-[hsl(220_25%_25%)] hover:bg-[hsl(220_25%_20%)] text-xs sm:text-sm">
                      View Combo
                      <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/shop?combo=all')}
            >
              View All Combinations
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Fabric Guide */}
      <section className="py-12 sm:py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="mb-3 sm:mb-4" variant="secondary">Step 1</Badge>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
              Choose Your Perfect Fabric
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-4">
              Not sure which material is right for you? Here's a quick guide to our most popular fabrics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {fabricGuide.map((fabric) => (
              <div key={fabric.name} className="bg-card border border-border overflow-hidden group hover:border-[hsl(220_25%_35%)] transition-colors">
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={fabric.image}
                    alt={fabric.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-base sm:text-lg">{fabric.name}</h3>
                    <span className="text-xs text-muted-foreground">{fabric.priceRange}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{fabric.description}</p>
                  <div className="mb-3">
                    <p className="text-xs font-medium mb-1">Best for:</p>
                    <div className="flex flex-wrap gap-1">
                      {fabric.bestFor.map((item) => (
                        <span key={item} className="text-[10px] sm:text-xs bg-accent px-2 py-0.5">
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

          <div className="mt-8 sm:mt-10 text-center">
            <Button
              size="lg"
              className="bg-[hsl(220_25%_25%)] hover:bg-[hsl(220_25%_20%)]"
              onClick={() => navigate('/products/prod-2/swatches')}
            >
              <SwatchBookIcon className="h-4 w-4 mr-2" />
              Order Free Fabric Swatches
            </Button>
          </div>
        </div>
      </section>

      {/* Room-by-Room Guide */}
      <section className="py-12 sm:py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="mb-3 sm:mb-4" variant="secondary">Room Guide</Badge>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
              Find the Perfect Curtains for Every Room
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-4">
              Different spaces have different needs. Get tailored recommendations for each room.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {roomGuides.map((room) => (
              <div key={room.id} className="border border-border bg-card overflow-hidden group hover:border-[hsl(220_25%_35%)] transition-colors">
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
                      <h3 className="font-serif text-lg sm:text-xl font-semibold">{room.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">{room.description}</p>
                    <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                      {room.recommendations.map((rec) => (
                        <li key={rec} className="flex items-center gap-2 text-xs sm:text-sm">
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

      {/* Measurement Guide Teaser */}
      <section className="py-12 sm:py-20 md:py-28 bg-[hsl(220_25%_25%)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <Badge className="mb-3 sm:mb-4 bg-white/20 text-white border-0">Step 2</Badge>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
                Measuring Made Simple
              </h2>
              <p className="text-white/80 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
                Accurate measurements are the key to perfectly fitted curtains. 
                Our detailed guides walk you through the process step by step.
              </p>
              <ul className="space-y-2 sm:space-y-4 mb-6 sm:mb-8">
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <span className="text-white/90 text-sm sm:text-base">Easy-to-follow video tutorials</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <span className="text-white/90 text-sm sm:text-base">Printable measuring worksheets</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <span className="text-white/90 text-sm sm:text-base">Common mistakes to avoid</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <span className="text-white/90 text-sm sm:text-base">Expert support if you need help</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  size={isMobile ? "default" : "lg"}
                  className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90 w-full sm:w-auto"
                  onClick={() => navigate('/guides/measure')}
                >
                  View Measuring Guide
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </Button>
                <Button
                  size={isMobile ? "default" : "lg"}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                  onClick={() => toast.success('PDF guide download started')}
                >
                  Download PDF
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-white/10 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda"
                  alt="Measuring guide"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                    <PlayIcon className="h-6 w-6 sm:h-8 sm:w-8 text-[hsl(220_25%_25%)] ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Swatch CTA - Compact */}
      <section className="py-8 sm:py-12 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SwatchCTA variant="compact" />
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-12 sm:py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-sm sm:text-base">4.9/5</span>
              <span className="text-muted-foreground text-sm sm:text-base">from 2,000+ reviews</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
              What First-Time Customers Say
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-4">
              Join thousands of happy customers who transformed their homes with custom curtains.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-card border border-border p-4 sm:p-6">
                <div className="flex items-center gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <h4 className="font-semibold text-sm sm:text-base mb-2">{review.title}</h4>
                <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">{review.content}</p>
                <div className="flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-border">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent flex items-center justify-center">
                    <span className="font-semibold text-xs sm:text-sm">{review.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-xs sm:text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
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
            <p className="text-muted-foreground text-sm sm:text-base">
              Got questions? We've got answers.
            </p>
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
                  <span className="font-medium text-sm sm:text-base pr-2">{faq.question}</span>
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
            <p className="text-muted-foreground text-sm mb-3 sm:mb-4">Still have questions?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => navigate('/contact')}>
                <MessageCircleIcon className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
              <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => navigate('/guides')}>
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
          <p className="text-white/80 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            Start with free fabric swatches, or dive right in and customize your perfect curtains. 
            Our team is here to help every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              size={isMobile ? "default" : "lg"}
              className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90 w-full sm:w-auto"
              onClick={() => navigate('/products/prod-2/swatches')}
            >
              <SwatchBookIcon className="h-4 w-4 mr-2" />
              Order Free Swatches
            </Button>
            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
              onClick={() => navigate('/shop')}
            >
              Start Shopping
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          {/* Final Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <TruckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(220_40%_60%)]" />
              <span className="text-xs sm:text-sm">Free Shipping $200+</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ShieldCheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(220_40%_60%)]" />
              <span className="text-xs sm:text-sm">Perfect Fit Guarantee</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(220_40%_60%)]" />
              <span className="text-xs sm:text-sm">14-Day Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <AwardIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(220_40%_60%)]" />
              <span className="text-xs sm:text-sm">3-Year Warranty</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyingGuidePage;
