import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRightIcon,
  StarIcon,
  TruckIcon,
  RulerIcon,
  ShieldCheckIcon,
  AwardIcon,
  PlayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  PaletteIcon,
  ClipboardListIcon,
  PackageCheckIcon,
  SwatchBookIcon,
  UsersIcon,
  BadgePercentIcon,
  ShoppingBagIcon,
  QuoteIcon,
  ArrowUpRightIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// ============================================
// Data - 优化后的数据
// ============================================

const heroSlides = [
  {
    id: 1,
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d6e513cd18d543ba880d3432113b8457_ve_miaoda',
    title: 'The Perfect Fit, Guaranteed',
    subtitle: 'Free alterations if your curtains don\'t fit. Plus free shipping over $200.',
    cta: 'Start Customizing',
    link: '/shop',
  },
  {
    id: 2,
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/7b849f6ee3bf42e885b324dd0907336b_ve_miaoda',
    title: 'Custom Made for Your Home',
    subtitle: 'Premium fabrics, precise measurements, and expert craftsmanship.',
    cta: 'Shop Now',
    link: '/shop',
  },
];

const trustFactors = [
  { icon: AwardIcon, title: 'Expert Service', desc: 'Design consultants since 2005' },
  { icon: TruckIcon, title: 'Quick Delivery', desc: '14-day turnaround guaranteed' },
  { icon: ShieldCheckIcon, title: 'Lifetime Support', desc: 'We stand behind every product' },
  { icon: RulerIcon, title: 'Perfect Fit Promise', desc: 'Free remake if size is wrong' },
];

// V2 优化：只保留3个核心品类，大图展示
const popularStyles = [
  { 
    id: 'pleated', 
    name: 'Pleated Drapes', 
    subtitle: 'Classic Elegance',
    description: 'Timeless pinch pleat design that adds sophistication to any room. Available in various fabrics from light-filtering to blackout.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda', 
    href: '/shop?category=pleated-drapes', 
    price: 'From $249',
    feature: 'Custom pleat spacing'
  },
  { 
    id: 'roman', 
    name: 'Roman Shades', 
    subtitle: 'Timeless Style',
    description: 'Soft fabric folds create an elegant look. Choose from flat, hobbled, or relaxed styles in premium fabrics.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda', 
    href: '/products/prod-2/shades', 
    price: 'From $199',
    feature: 'Cordless option available'
  },
  { 
    id: 'bamboo', 
    name: 'Bamboo Woven Shades', 
    subtitle: 'Natural Beauty',
    description: 'Handcrafted from sustainable materials, bringing organic warmth and texture to your windows.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda', 
    href: '/shop?category=bamboo', 
    price: 'From $179',
    feature: 'Eco-friendly materials'
  },
];

// V2 优化：更多房间，支持滑动
const roomCategories = [
  { id: 'living', name: 'Living Room', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d6e513cd18d543ba880d3432113b8457_ve_miaoda', href: '/rooms/living-room', count: '42 Styles' },
  { id: 'bedroom', name: 'Bedroom', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/7b849f6ee3bf42e885b324dd0907336b_ve_miaoda', href: '/rooms/bedroom', count: '38 Styles' },
  { id: 'kitchen', name: 'Kitchen', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/ef5c765748204a14b6ad03baebd04785_ve_miaoda', href: '/rooms/kitchen', count: '24 Styles' },
  { id: 'dining', name: 'Dining Room', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda', href: '/rooms/dining', count: '31 Styles' },
  { id: 'office', name: 'Home Office', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda', href: '/rooms/office', count: '28 Styles' },
  { id: 'nursery', name: 'Nursery', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda', href: '/rooms/nursery', count: '19 Styles' },
  { id: 'bathroom', name: 'Bathroom', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/6310ecde128b4463aff2428e6a1327a2_ve_miaoda', href: '/rooms/bathroom', count: '16 Styles' },
  { id: 'media', name: 'Media Room', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/190087f6844e4a6d9e9eecd6e38fdad3_ve_miaoda', href: '/rooms/media', count: '22 Styles' },
];

// For Every Need 特色展示
const needCategories = [
  { 
    id: 'motorized', 
    name: 'Motorized', 
    subtitle: 'Smart Control',
    desc: 'Control your shades with a remote, app, or voice commands. Compatible with Alexa, Google Home, and Apple HomeKit.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda', 
    href: '/shop?feature=motorized',
    feature: 'Smart Home Ready'
  },
  { 
    id: 'blackout', 
    name: 'Blackout Lining', 
    subtitle: 'Total Darkness',
    desc: 'Block 99% of light for complete darkness. Perfect for bedrooms, nurseries, and media rooms.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/7b849f6ee3bf42e885b324dd0907336b_ve_miaoda', 
    href: '/shop?feature=blackout',
    feature: 'Sleep Better'
  },
  { 
    id: 'no-drill', 
    name: 'No-Drill Install', 
    subtitle: 'Renter Friendly',
    desc: 'Transform your windows without damaging walls. Tension-mounted options install in minutes, no tools needed.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda', 
    href: '/shop?feature=no-drill',
    feature: 'Tool-Free Setup'
  },
  { 
    id: 'cordless', 
    name: 'Cordless Safety', 
    subtitle: 'Child & Pet Safe',
    desc: 'No exposed cords means no strangulation hazards. WCSC certified design keeps your little ones safe.',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/ef5c765748204a14b6ad03baebd04785_ve_miaoda', 
    href: '/shop?feature=cordless',
    feature: 'Certified Safe'
  },
];

// 定制流程
const customizationSteps = [
  { 
    step: 1, 
    icon: PaletteIcon, 
    title: 'Choose Your Style', 
    desc: 'Browse our collection and select the perfect fabric and design for your space.' 
  },
  { 
    step: 2, 
    icon: ClipboardListIcon, 
    title: 'Enter Dimensions', 
    desc: 'Provide your window measurements using our simple guide. We\'ll handle the rest.' 
  },
  { 
    step: 3, 
    icon: PackageCheckIcon, 
    title: 'Receive & Install', 
    desc: 'Your custom curtains arrive in 14 days with easy DIY installation instructions.' 
  },
];

// 评论数据
const reviews = [
  { id: 1, name: 'Jennifer M.', location: 'Portland, OR', rating: 5, text: 'The in-store consultation made all the difference. Expert guidance and perfect results.', product: 'Pleated Drapes' },
  { id: 2, name: 'Michael T.', location: 'Austin, TX', rating: 5, text: 'Free in-home measurement was professional and quick. Curtains fit perfectly.', product: 'Roman Shades' },
  { id: 3, name: 'Sarah L.', location: 'Denver, CO', rating: 5, text: 'The bamboo shades add such warmth to our living room. Beautiful craftsmanship.', product: 'Bamboo Woven' },
  { id: 4, name: 'David K.', location: 'Seattle, WA', rating: 5, text: 'Quality exceeded expectations. The blackout feature works perfectly for our nursery.', product: 'Blackout Shades' },
  { id: 5, name: 'Emily R.', location: 'Chicago, IL', rating: 5, text: 'Easy to measure, easy to install. Looks like we paid a fortune for custom work.', product: 'Pleated Drapes' },
  { id: 6, name: 'James W.', location: 'Boston, MA', rating: 5, text: 'Customer service was outstanding. They helped me choose the perfect color.', product: 'Roman Shades' },
];

// Samples 数据
const sampleFabrics = [
  { id: 1, name: 'Linen Collection', colors: 12, image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda', href: '/samples/linen' },
  { id: 2, name: 'Velvet Series', colors: 8, image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/4404b45f35da473c8fc6f026d2c13f56_ve_miaoda', href: '/samples/velvet' },
  { id: 3, name: 'Cotton Essentials', colors: 15, image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/6310ecde128b4463aff2428e6a1327a2_ve_miaoda', href: '/samples/cotton' },
  { id: 4, name: 'Sheer Elegance', colors: 10, image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/6d9f0df723de4f648a28c44f08db77d1_ve_miaoda', href: '/samples/sheer' },
];

// 短视频数据
const videoList = [
  { id: 1, title: 'Living Room Makeover', author: '@homeinspo', views: '12.5K', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d6e513cd18d543ba880d3432113b8457_ve_miaoda', product: 'Pleated Drapes' },
  { id: 2, title: 'Bedroom Roman Shades', author: '@sleepwell', views: '8.2K', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/7b849f6ee3bf42e885b324dd0907336b_ve_miaoda', product: 'Roman Shades' },
  { id: 3, title: 'Natural Bamboo Look', author: '@brightspaces', views: '15.1K', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda', product: 'Bamboo Woven' },
  { id: 4, title: 'Office Productivity', author: '@workfromhome', views: '6.8K', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda', product: 'Roller Shades' },
  { id: 5, title: 'Dining Room Elegance', author: '@elegantliving', views: '9.7K', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda', product: 'Pleated Drapes' },
  { id: 6, title: 'Nursery Safety First', author: '@newmomlife', views: '22.3K', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda', product: 'Cordless Shades' },
];

// ============================================
// Components
// ============================================

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const slide = heroSlides[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[78vh] min-h-[600px] max-h-[900px] overflow-hidden">
      <div className="absolute inset-0">
        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
      </div>

      <div className="relative h-full w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] mb-6">
            {slide.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-lg">
            {slide.subtitle}
          </p>
          <Button 
            className="bg-white text-foreground hover:bg-white/90 px-10 h-14 text-base font-medium tracking-wide"
            onClick={() => navigate(slide.link)}
          >
            {slide.cta}
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-[2px] transition-all duration-500 ${i === current ? 'w-8 bg-white' : 'w-4 bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
};

const TrustSection = () => (
  <section className="py-12 md:py-16 bg-white border-b border-border">
    <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {trustFactors.map((factor) => (
          <div key={factor.title} className="text-center">
            <factor.icon className="h-7 w-7 mx-auto mb-3 text-[hsl(220_15%_35%)]" strokeWidth={1.5} />
            <h3 className="font-medium text-base mb-1">{factor.title}</h3>
            <p className="text-sm text-muted-foreground">{factor.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// V2 优化：3个大卡片展示
const PopularStylesSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-4">Our Signature Collection</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Three timeless styles, crafted to perfection for your home.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {popularStyles.map((style, index) => (
            <div
              key={style.id}
              className="group cursor-pointer"
              onClick={() => navigate(style.href)}
            >
              {/* 大图区域 - 3:4 比例 */}
              <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-6">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* 左上角标签 */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-foreground backdrop-blur-sm text-xs">
                    {style.feature}
                  </Badge>
                </div>
                
                {/* 底部价格 */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white text-lg font-medium">{style.price}</span>
                </div>

                {/* Hover 购物按钮 */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button className="bg-white text-foreground hover:bg-white/90">
                    Shop {style.name}
                    <ArrowUpRightIcon className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
              
              {/* 文字区域 */}
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{style.subtitle}</p>
                <h3 className="font-serif text-2xl md:text-3xl font-medium mb-3">{style.name}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{style.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// For Every Need 特色展示组件
const ForEveryNeedSection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-3">Features You\'ll Love</h2>
            <p className="text-muted-foreground text-lg">Smart solutions for modern living.</p>
          </div>
          <div className="hidden md:flex gap-3">
            <button onClick={() => scroll('left')} className="w-12 h-12 border border-border flex items-center justify-center hover:bg-[hsl(220_10%_97%)] transition-colors shadow-sm">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button onClick={() => scroll('right')} className="w-12 h-12 border border-border flex items-center justify-center hover:bg-[hsl(220_10%_97%)] transition-colors shadow-sm">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* 移动端：横向滑动 / 桌面端：4列均匀分布 */}
        <div 
          ref={scrollRef}
          className="flex md:grid md:grid-cols-4 gap-5 md:gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none' }}
        >
          {needCategories.map((need) => (
            <div
              key={need.id}
              className="group cursor-pointer flex-shrink-0 w-[260px] md:w-auto"
              onClick={() => navigate(need.href)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
                <img
                  src={need.image}
                  alt={need.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
                {/* 特色标签 */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-foreground backdrop-blur-sm text-xs">
                    {need.feature}
                  </Badge>
                </div>

                {/* Hover 按钮 */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button className="bg-white text-foreground hover:bg-white/90">
                    Learn More
                    <ArrowUpRightIcon className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
              
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{need.subtitle}</p>
                <h3 className="font-serif text-xl md:text-2xl font-medium mb-2">{need.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{need.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3步定制流程 - 移动端滑动优化
const CustomizationStepsSection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 md:py-18 bg-[hsl(220_15%_18%)] text-white">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-16">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-3">Customize in 3 Easy Steps</h2>
            <p className="text-white/70 text-base md:text-lg max-w-xl">We\'ve simplified the process so you can focus on creating your perfect space.</p>
          </div>
          
          {/* 桌面端箭头 / 移动端指示器 */}
          <div className="hidden md:flex gap-3 mt-6 md:mt-0">
            <button onClick={() => scroll('left')} className="w-11 h-11 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button onClick={() => scroll('right')} className="w-11 h-11 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 移动端：横向滑动卡片 / 桌面端：3列布局 */}
        <div 
          ref={scrollRef}
          className="flex md:grid md:grid-cols-3 gap-5 md:gap-10 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0"
          style={{ scrollbarWidth: 'none' }}
        >
          {customizationSteps.map((step) => (
            <div 
              key={step.step} 
              className="flex-shrink-0 w-[280px] md:w-auto bg-white/5 md:bg-transparent p-6 md:p-0 text-left md:text-center"
            >
              {/* 移动端：水平布局 / 桌面端：垂直布局 */}
              <div className="flex md:block items-start gap-4">
                {/* 图标和步骤号 */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-24 md:h-16 rounded-full md:rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <step.icon className="h-7 w-7 md:h-10 md:w-10 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 mt-3 md:mt-4 rounded-full bg-white text-[hsl(220_15%_18%)] font-semibold flex items-center justify-center text-sm md:text-base">
                    {step.step}
                  </div>
                </div>
                
                {/* 文字内容 */}
                <div className="flex-1 md:mt-6">
                  <h3 className="font-medium text-lg md:text-xl mb-2">{step.title}</h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 移动端滑动指示器 */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {customizationSteps.map((step) => (
            <div key={step.step} className="w-2 h-2 rounded-full bg-white/30" />
          ))}
        </div>

        {/* CTA 按钮 */}
        <div className="text-center mt-10 md:mt-14">
          <Button 
            className="bg-white text-[hsl(220_15%_18%)] hover:bg-white/90 px-8 md:px-10 h-12 md:h-14 text-base font-medium w-full md:w-auto"
            onClick={() => navigate('/customize')}
          >
            Start Customizing
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

// V2 优化：更多房间，滑动浏览，大图
const ShopByRoomSection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -380 : 380, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-[hsl(220_10%_97%)]">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-3">Shop By Room</h2>
            <p className="text-muted-foreground text-lg">Find the perfect window treatment for every space in your home.</p>
          </div>
          <div className="hidden md:flex gap-3">
            <button onClick={() => scroll('left')} className="w-12 h-12 bg-white border border-border flex items-center justify-center hover:bg-[hsl(220_10%_95%)] transition-colors shadow-sm">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button onClick={() => scroll('right')} className="w-12 h-12 bg-white border border-border flex items-center justify-center hover:bg-[hsl(220_10%_95%)] transition-colors shadow-sm">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none' }}
        >
          {roomCategories.map((room) => (
            <div
              key={room.id}
              className="group cursor-pointer flex-shrink-0 w-[300px] md:w-[340px]"
              onClick={() => navigate(room.href)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* 底部信息 */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-medium text-xl mb-1">{room.name}</h3>
                  <p className="text-white/70 text-sm">{room.count}</p>
                </div>

                {/* Hover 箭头 */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRightIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Free Samples 板块
const SamplesSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <Badge className="mb-4 bg-[hsl(220_15%_25%)] text-white hover:bg-[hsl(220_15%_25%)] text-xs">Free Shipping on Samples</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-3">Order Free Samples</h2>
            <p className="text-muted-foreground text-lg">See and feel the fabric before you buy. Up to 10 samples free.</p>
          </div>
          <Button variant="outline" className="hidden md:flex h-12 px-6" onClick={() => navigate('/samples')}>
            Browse All Samples
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {sampleFabrics.map((fabric) => (
            <div
              key={fabric.id}
              className="group cursor-pointer"
              onClick={() => navigate(fabric.href)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
                <img
                  src={fabric.image}
                  alt={fabric.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-foreground px-5 py-2.5 text-sm font-medium">
                    Order Sample
                  </span>
                </div>
              </div>
              <h3 className="font-medium text-base mb-1">{fabric.name}</h3>
              <p className="text-sm text-muted-foreground">{fabric.colors} Colors</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Video Shoppable 板块
const VideoShoppableSection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -310 : 310, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-[hsl(220_10%_97%)]">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-3">Shop the Look</h2>
            <p className="text-muted-foreground text-lg">Real homes, real inspiration. Tap to shop products from our community.</p>
          </div>
          <div className="hidden md:flex gap-3">
            <button onClick={() => scroll('left')} className="w-12 h-12 bg-white border border-border flex items-center justify-center hover:bg-white/80 transition-colors shadow-sm">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button onClick={() => scroll('right')} className="w-12 h-12 bg-white border border-border flex items-center justify-center hover:bg-white/80 transition-colors shadow-sm">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        {/* 桌面端：4个视频占满 + 第5个露边 / 移动端：滑动 */}
        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none' }}
        >
          {videoList.map((video) => (
            <div
              key={video.id}
              className="group cursor-pointer flex-shrink-0 w-[200px] md:flex-1 md:flex-shrink-0 md:min-w-0 md:w-auto md:max-w-[calc(25%-15px)]"
              onClick={() => navigate(`/products/${video.product.toLowerCase().replace(/\s+/g, '-')}`)}
            >
              <div className="relative aspect-[9/16] overflow-hidden bg-muted mb-3 md:mb-4">
                <img src={video.image} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PlayIcon className="h-6 w-6 md:h-7 md:w-7 text-foreground ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                  <p className="text-white text-sm md:text-base font-medium truncate">{video.title}</p>
                  <p className="text-white/70 text-xs md:text-sm">{video.views} views</p>
                </div>
                <div className="absolute top-3 md:top-4 right-3 md:right-4">
                  <ShoppingBagIcon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
              </div>
              <div className="px-1">
                <p className="text-sm md:text-base font-medium truncate">{video.author}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{video.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 横向滚动的评论
const ReviewsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -400 : 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <QuoteIcon className="h-10 w-10 mb-4 text-[hsl(220_15%_35%)]" strokeWidth={1} />
            <h2 className="font-serif text-4xl md:text-5xl font-medium">What Our Customers Say</h2>
          </div>
          <div className="hidden md:flex gap-3">
            <button onClick={() => scroll('left')} className="w-12 h-12 border border-border flex items-center justify-center hover:bg-[hsl(220_10%_97%)] transition-colors">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button onClick={() => scroll('right')} className="w-12 h-12 border border-border flex items-center justify-center hover:bg-[hsl(220_10%_97%)] transition-colors">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none' }}
        >
          {reviews.map((review) => (
            <div key={review.id} className="flex-shrink-0 w-[360px] bg-[hsl(220_10%_97%)] p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-base leading-relaxed mb-6 text-foreground/90">"{review.text}"</p>
              <div className="pt-4 border-t border-border">
                <p className="font-medium text-base">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.location} • {review.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Trade Program 板块
const TradeProgramSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 md:py-20 bg-[hsl(220_10%_97%)]">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative aspect-[3/4] md:aspect-[4/3] overflow-hidden bg-muted">
            <img
              src="https://miaoda.feishu.cn/aily/api/v1/files/static/190087f6844e4a6d9e9eecd6e38fdad3_ve_miaoda"
              alt="Trade Program"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <Badge className="mb-4 bg-[hsl(220_15%_25%)] text-white hover:bg-[hsl(220_15%_25%)] text-xs">For Professionals</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-4">Trade Program</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Exclusive benefits for interior designers, architects, and hospitality professionals. Enjoy up to 25% off, dedicated support, and early access to new collections.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-base">
                <BadgePercentIcon className="h-5 w-5 text-[hsl(220_15%_35%)]" strokeWidth={1.5} />
                <span>Up to 25% off every order</span>
              </li>
              <li className="flex items-center gap-3 text-base">
                <UsersIcon className="h-5 w-5 text-[hsl(220_15%_35%)]" strokeWidth={1.5} />
                <span>Dedicated trade specialist</span>
              </li>
              <li className="flex items-center gap-3 text-base">
                <SwatchBookIcon className="h-5 w-5 text-[hsl(220_15%_35%)]" strokeWidth={1.5} />
                <span>Complimentary sample library</span>
              </li>
            </ul>
            <div className="flex gap-4">
              <Button 
                className="bg-[hsl(220_15%_25%)] hover:bg-[hsl(220_15%_20%)] h-12 px-8"
                onClick={() => navigate('/trade-program')}
              >
                Apply Now
              </Button>
              <Button 
                variant="outline"
                className="h-12 px-8"
                onClick={() => navigate('/trade-program')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CraftedSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-20 md:py-28 bg-[hsl(220_15%_18%)] text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://miaoda.feishu.cn/aily/api/v1/files/static/190087f6844e4a6d9e9eecd6e38fdad3_ve_miaoda"
          alt="Craftsmanship"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-5">Proudly Crafted In Our Factories</h2>
        <p className="text-white/70 mb-10 text-lg md:text-xl leading-relaxed">
          Every shade is custom-made to your specifications. We control quality at every step to ensure lasting beauty.
        </p>
        <Button 
          variant="outline" 
          className="border-white/40 text-white hover:bg-white/10 h-12 px-8"
          onClick={() => navigate('/about')}
        >
          Our Story
        </Button>
      </div>
    </section>
  );
};

// ============================================
// Main Page - 优化后的板块顺序
// ============================================

const HomePageV2: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. 首屏吸引 */}
      <HeroSection />
      
      {/* 2. 建立信任 */}
      <TrustSection />
      
      {/* 3. 核心产品 - 只展示3个主打品类 */}
      <PopularStylesSection />
      
      {/* 4. 降低定制门槛 */}
      <CustomizationStepsSection />
      
      {/* 5. 特色功能展示 */}
      <ForEveryNeedSection />
      
      {/* 6. 按房间浏览 - 支持滑动 */}
      <ShopByRoomSection />
      
      {/* 6. 快速分流 - 样品 */}
      <SamplesSection />
      
      {/* 7. 真实场景种草 */}
      <VideoShoppableSection />
      
      {/* 8. 社会证明 */}
      <ReviewsSection />
      
      {/* 9. 专业用户入口 */}
      <TradeProgramSection />
      
      {/* 10. 品牌故事收尾 */}
      <CraftedSection />
    </div>
  );
};

export default HomePageV2;
