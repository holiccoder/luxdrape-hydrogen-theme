import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Image } from '@/components/ui/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import { useCart } from '@/contexts/cart-context';
import {
  StarIcon,
  CheckIcon,
  RulerIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  HeartIcon,
  TruckIcon,
  InfoIcon,
  MinusIcon,
  PlusIcon,
  PlayIcon,
  FileTextIcon,
  ThermometerIcon,
  DropletsIcon,
  RotateCcwIcon,
  ThumbsUpIcon,
  ShieldCheckIcon,
  AwardIcon,
  LeafIcon,
  Star,
  UserIcon,
  ZapIcon,
  BatteryIcon,
  WifiIcon,
  SmartphoneIcon,
  VolumeXIcon,
  BabyIcon,
  ShieldIcon,
  CalculatorIcon,
  WrenchIcon,
  CogIcon,
  RefreshCwIcon,
  ArrowDownIcon,
  SparklesIcon
} from 'lucide-react';

// ============================================
// Product Data with SEO Keywords
// ============================================
const productData = {
  id: 'lux-drapery-1',
  name: 'Custom Pinch Pleat Drapery',
  description: 'Elevate your space with our premium custom drapery. Handcrafted from luxurious fabrics with precision pleating for a tailored look. Each panel is made to your exact specifications, featuring professional-quality construction and finish.',
  basePrice: 199.99,
  category: 'Drapery',
  style: ['Classic', 'Elegant', 'Custom'],
  materials: ['Premium Linen Blend', 'Cotton Sateen', 'Velvet'],
  rating: 4.9,
  reviewCount: 428,
  features: [
    'Custom-made to your specifications',
    'Professional pleating options',
    'Multiple fabric choices',
    'Free fabric swatches',
    'High-temperature steaming available',
    'Easy installation hardware included'
  ],
  colors: [
    { id: 'ivory', name: 'Ivory Linen', hex: '#F8F6F1', image: 'https://luxdrape.com/cdn/shop/files/florence_pleated_ivory_white.jpg?v=1771059728&width=768' },
    { id: 'oatmeal', name: 'Oatmeal', hex: '#E8E4DC', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/4404b45f35da473c8fc6f026d2c13f56_ve_miaoda' },
    { id: 'charcoal', name: 'Charcoal Gray', hex: '#4A4A4A', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/34013fff634f414ea6ff57ba2c97cf2b_ve_miaoda' },
    { id: 'navy', name: 'Navy Blue', hex: '#2C3E50', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/71c5a08726ba4857a88b02903542fc08_ve_miaoda' },
    { id: 'sage', name: 'Sage Green', hex: '#9CAF88', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda' },
    { id: 'blush', name: 'Blush Pink', hex: '#E8D5D0', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/e91d92a772ee4f6bb46cd960193349f7_ve_miaoda' },
  ],
  images: [
    { id: '1', url: 'https://luxdrape.com/cdn/shop/files/florence_pleated_ivory_white.jpg?v=1771059728&width=768', alt: 'Custom pinch pleat drapes in living room - luxury window treatments' },
    { id: '2', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda', alt: 'Pleat header styles comparison - custom curtain headings' },
    { id: '3', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/374fd1c04ee445b2a6f8e62b5b3933ea_ve_miaoda', alt: 'Premium fabric detail - luxury drapery materials' },
    { id: '4', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/e91d92a772ee4f6bb46cd960193349f7_ve_miaoda', alt: 'Tie back styles - decorative curtain holdbacks' },
  ],
};

const headerStyles = [
  { id: 'pinch-pleat', name: 'Pinch Pleat', fullness: '200%', price: 0, description: 'Classic single-pinch design, elegant and timeless', preview: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda', features: ['Single fold pinch', '200% fabric fullness', 'Works with traverse rod or rings'] },
  { id: 'triple-pleat', name: 'Triple Pleat', fullness: '250%', price: 35, description: 'Three-finger pinch for maximum fullness and luxury', preview: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda', features: ['Three-finger pleats', '250% fabric fullness', 'Most luxurious appearance'] },
  { id: 'tailor-pleat', name: 'Tailor Pleat', fullness: '180%', price: 25, description: 'Modern streamlined look with tailored precision', preview: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda', features: ['Flat tailored top', '180% fabric fullness', 'Contemporary clean aesthetic'] },
];

const liningOptions = [
  { id: 'unlined', name: 'Unlined', price: 0, description: 'Light and airy, shows fabric texture' },
  { id: 'standard', name: 'Standard Lining', price: 45, description: 'Medium weight, provides privacy and light filtering' },
  { id: 'blackout', name: 'Blackout Lining', price: 75, description: 'Blocks 99% of light, thermal insulation' },
  { id: 'interlined', name: 'Interlined', price: 95, description: 'Adds body and luxury, superior insulation' },
];

const tieBackOptions = [
  { id: 'none', name: 'No Tie Backs', price: 0, description: 'Clean, straight hanging panels' },
  { id: 'matching', name: 'Matching Fabric Tie Backs', price: 29, description: 'Made from the same fabric as your drapery', preview: 'https://miaoda.feishu.cn/aily/api/v1/files/static/e91d92a772ee4f6bb46cd960193349f7_ve_miaoda' },
  { id: 'rope', name: 'Decorative Rope Tie Backs', price: 39, description: 'Elegant braided rope with tassels' },
];

const steamingOptions = [
  { id: 'none', name: 'Standard Finish', price: 0, description: 'Professional pressing only', note: 'Recommended for most fabrics' },
  { id: 'premium', name: 'Premium Steaming', price: 49, description: 'High-temperature steam treatment for crisp, wrinkle-free finish', note: 'Maximum size: 120" width × 108" height', sizeLimit: { maxWidth: 120, maxHeight: 108 } },
];

const fabricSwatches = [
  { id: 'swatch-1', name: 'Ivory Linen', color: '#F8F6F1', material: 'Linen Blend' },
  { id: 'swatch-2', name: 'Oatmeal', color: '#E8E4DC', material: 'Linen/Cotton' },
  { id: 'swatch-3', name: 'Charcoal', color: '#4A4A4A', material: 'Cotton Sateen' },
  { id: 'swatch-4', name: 'Navy', color: '#2C3E50', material: 'Velvet' },
  { id: 'swatch-5', name: 'Sage', color: '#9CAF88', material: 'Linen Blend' },
  { id: 'swatch-6', name: 'Blush', color: '#E8D5D0', material: 'Cotton Sateen' },
];

const reviewsData = [
  { id: '1', author: 'Sarah M.', rating: 5, date: '2024-02-20', title: 'Absolutely stunning!', content: 'The triple pleat drapes transformed my living room. The quality is exceptional and the steaming service made them hang perfectly.', verified: true, helpful: 32 },
  { id: '2', author: 'Michael R.', rating: 5, date: '2024-02-15', title: 'Worth every penny', content: 'Custom drapes that look like they came from a high-end design showroom. The ordering process was easy and the tie backs are a perfect addition.', verified: true, helpful: 28 },
  { id: '3', author: 'Jennifer L.', rating: 5, date: '2024-02-10', title: 'Perfect fit', content: 'Ordered swatches first which helped me choose the right color. The pinch pleat style is classic and elegant.', verified: true, helpful: 24 },
];

const galleryImages = [
  { id: '1', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda', alt: 'Customer living room with cream drapery', customer: 'Emma T.', location: 'Los Angeles, CA' },
  { id: '2', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda', alt: 'Customer bedroom with charcoal drapes', customer: 'David K.', location: 'New York, NY' },
  { id: '3', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda', alt: 'Customer dining room with sage curtains', customer: 'Michelle L.', location: 'Chicago, IL' },
  { id: '4', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda', alt: 'Customer nursery with blush drapery', customer: 'Rachel M.', location: 'Seattle, WA' },
  { id: '5', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/175e3a9252f44ba7890cc2631f892e5d_ve_miaoda', alt: 'Customer home office with navy velvet', customer: 'James P.', location: 'Austin, TX' },
  { id: '6', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/be670cd2b29a4879b9cdd5817a0a2448_ve_miaoda', alt: 'Customer minimalist living room', customer: 'Lisa W.', location: 'Denver, CO' },
];

// ============================================
// Customization Step Component - Vertical Scroll Style
// ============================================
interface CustomizationStepProps {
  stepNumber: number;
  title: string;
  description: string;
  children: React.ReactNode;
  supplementContent?: React.ReactNode;
  isActive?: boolean;
}

const CustomizationStep: React.FC<CustomizationStepProps> = ({ stepNumber, title, description, children, supplementContent, isActive }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`py-12 border-b border-gray-200 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Step Number & Title */}
        <div className="lg:col-span-3">
          <div className="sticky top-24">
            <div className="flex items-center gap-4 mb-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-colors ${isActive ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {stepNumber}
              </div>
              <div className="h-px flex-1 bg-gray-200 lg:hidden" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            
            {/* Supplement Content Area */}
            {supplementContent && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                {supplementContent}
              </div>
            )}
          </div>
        </div>
        
        {/* Right: Main Content */}
        <div className="lg:col-span-9">
          <div className="bg-white p-6 lg:p-8 rounded-xl border border-gray-200 shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Measurement Calculator
// ============================================
const MeasurementCalculator: React.FC<{ width: string; height: string; onWidthChange: (value: string) => void; onHeightChange: (value: string) => void }> = ({ width, height, onWidthChange, onHeightChange }) => {
  const [windowWidth, setWindowWidth] = useState('');
  const [windowHeight, setWindowHeight] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculateDimensions = () => {
    const w = parseFloat(windowWidth);
    const h = parseFloat(windowHeight);
    if (!w || !h) return;
    const totalWidth = w + 16;
    const panelWidth = totalWidth / 2;
    onWidthChange(panelWidth.toFixed(1));
    onHeightChange((h + 4).toFixed(1));
    setShowResult(true);
  };

  return (
    <div className="bg-gray-50 p-5 space-y-4 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-2">
        <CalculatorIcon className="w-5 h-5 text-slate-700" />
        <span className="font-medium text-slate-900">Panel Size Calculator</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="text-xs text-gray-500">Window Width (inches)</Label>
          <Input type="number" value={windowWidth} onChange={(e) => { setWindowWidth(e.target.value); setShowResult(false); }} placeholder="72" className="h-11 bg-white border-gray-300 rounded-lg" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-gray-500">Window Height (inches)</Label>
          <Input type="number" value={windowHeight} onChange={(e) => { setWindowHeight(e.target.value); setShowResult(false); }} placeholder="84" className="h-11 bg-white border-gray-300 rounded-lg" />
        </div>
      </div>
      <Button onClick={calculateDimensions} className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-lg h-11" disabled={!windowWidth || !windowHeight}>
        Calculate Panel Size
      </Button>
      {showResult && (
        <div className="bg-white p-4 space-y-2 text-sm border border-gray-200 rounded-lg">
          <div className="flex justify-between">
            <span className="text-gray-600">Per Panel:</span>
            <span className="font-semibold text-slate-900">{width}&quot; W × {height}&quot; H</span>
          </div>
          <p className="text-xs text-gray-500">We added 8&quot; per side for coverage and 4&quot; to height for header/hem.</p>
        </div>
      )}
    </div>
  );
};

// ============================================
// Real Life Gallery
// ============================================
const RealLifeGallery: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-2xl font-semibold text-slate-900">Real-Life Gallery</h3>
        <p className="text-gray-500 mt-1">See how LuxDrape transforms real homes</p>
      </div>
      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Customer Photos</span>
    </div>
    
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {galleryImages.map((img, idx) => (
        <div key={img.id} className="break-inside-avoid">
          <div className={`relative overflow-hidden group cursor-pointer rounded-xl ${idx === 0 || idx === 3 ? 'aspect-[3/4]' : idx === 1 || idx === 4 ? 'aspect-[4/3]' : 'aspect-square'}`}>
            <Image src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-medium">{img.customer}</p>
                <p className="text-sm opacity-80">{img.location}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    <div className="text-center pt-4">
      <Button variant="outline" className="rounded-lg border-slate-300 text-slate-700 hover:bg-slate-50">
        <ThumbsUpIcon className="w-4 h-4 mr-2" />
        Share Your Photos
      </Button>
      <p className="text-sm text-gray-500 mt-2">Tag @LuxDrape and get 10% off your next order</p>
    </div>
  </div>
);

// ============================================
// Main Product Page Component - V5
// ============================================
const ProductDetailLuxV5Page: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedHeaderStyle, setSelectedHeaderStyle] = useState(headerStyles[0]);
  const [selectedLining, setSelectedLining] = useState(liningOptions[1]);
  const [selectedTieBack, setSelectedTieBack] = useState(tieBackOptions[0]);
  const [selectedSteaming, setSelectedSteaming] = useState(steamingOptions[0]);
  const [width, setWidth] = useState('50');
  const [height, setHeight] = useState('84');
  const [quantity, setQuantity] = useState(2);
  const [isSwatchDialogOpen, setIsSwatchDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const customizationRef = useRef<HTMLDivElement>(null);

  const isSteamingAvailable = useMemo(() => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    return w <= 120 && h <= 108;
  }, [width, height]);

  const totalPrice = useMemo(() => {
    const basePrice = productData.basePrice;
    const headerPrice = selectedHeaderStyle.price;
    const liningPrice = selectedLining.price;
    const tieBackPrice = selectedTieBack.price * quantity;
    const steamingPrice = selectedSteaming.id === 'premium' && isSteamingAvailable ? selectedSteaming.price : 0;
    
    const widthValue = parseFloat(width) || 50;
    const heightValue = parseFloat(height) || 84;
    const sizeMultiplier = (widthValue * heightValue) / (50 * 84);
    
    const unitPrice = (basePrice + headerPrice + liningPrice) * Math.max(sizeMultiplier, 0.7);
    return Math.round((unitPrice * quantity) + tieBackPrice + steamingPrice);
  }, [selectedHeaderStyle, selectedLining, selectedTieBack, selectedSteaming, width, height, quantity, isSteamingAvailable]);

  const handleAddToCart = () => {
    const cartItem = {
      id: `${productData.id}-${Date.now()}`,
      productId: productData.id,
      productName: productData.name,
      fabric: selectedColor.name,
      dimensions: { width: parseFloat(width) || 50, height: parseFloat(height) || 84, unit: 'inches' as const },
      lining: selectedLining.id as 'standard' | 'blackout' | 'thermal',
      mounting: 'cordless' as const,
      quantity,
      unitPrice: totalPrice / quantity,
      image: selectedColor.image,
    };
    addToCart(cartItem);
    toast.success('Added to cart!');
  };

  // Track active step on scroll
  useEffect(() => {
    const handleScroll = () => {
      const steps = document.querySelectorAll('.customization-step');
      steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveStep(index + 1);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-slate-800 transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/shop')} className="hover:text-slate-800 transition-colors">Shop</button>
          <span>/</span>
          <button onClick={() => navigate('/shop')} className="hover:text-slate-800 transition-colors">Custom Drapery</button>
          <span>/</span>
          <span className="text-slate-800">Pinch Pleat Curtains</span>
        </nav>
      </div>

      {/* Product Main Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden">
              <Image 
                src={productData.images[currentImageIndex].url} 
                alt={productData.images[currentImageIndex].alt} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-white rounded-full">
                  Custom Made
                </span>
              </div>
              <button onClick={() => setCurrentImageIndex(prev => prev === 0 ? productData.images.length - 1 : prev - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                <ChevronLeftIcon className="w-5 h-5 text-slate-800" />
              </button>
              <button onClick={() => setCurrentImageIndex(prev => (prev + 1) % productData.images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                <ChevronRightIcon className="w-5 h-5 text-slate-800" />
              </button>
            </div>
            <div className="flex gap-3">
              {productData.images.map((img, idx) => (
                <button 
                  key={img.id} 
                  onClick={() => setCurrentImageIndex(idx)} 
                  className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all border-2 ${currentImageIndex === idx ? 'border-slate-800' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <Image src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-medium text-emerald-700 tracking-wide uppercase bg-emerald-50 px-2 py-1 rounded">Made to Order</span>
              <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">Custom Pinch Pleat Drapery</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(productData.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-700">{productData.rating}</span>
                <span className="text-sm text-gray-500">({productData.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="space-y-1 pb-6 border-b border-gray-200">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold text-slate-900">${totalPrice}</span>
                <span className="text-gray-500">for {quantity} panels</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-700">
                <TruckIcon className="w-4 h-4" />
                <span>FREE Shipping on orders over $200</span>
              </div>
            </div>

            {/* Quick Add Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-slate-900">Selected: </span>
                  <span className="text-sm text-gray-600">{selectedColor.name}, {selectedHeaderStyle.name}</span>
                </div>
                <button 
                  onClick={() => customizationRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-slate-700 underline hover:text-slate-900"
                >
                  Customize Options
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg">
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-slate-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg">
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
                <Button size="lg" className="flex-1 ml-4 h-11 rounded-lg bg-slate-800 text-white hover:bg-slate-700" onClick={handleAddToCart}>
                  Add to Cart - ${totalPrice}
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex gap-4 pt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <LeafIcon className="w-4 h-4 text-emerald-600" />
                <span>Premium Fabrics</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                <span>3-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* Customization Steps - Vertical Scroll Style */}
      {/* ============================================ */}
      <section ref={customizationRef} className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">Design Your Custom Drapes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Create the perfect custom window treatments for your home. Scroll down to explore each customization option and build your dream curtains step by step.</p>
            
            {/* Step Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    activeStep === step ? 'bg-slate-800 text-white' : activeStep > step ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {activeStep > step ? <CheckIcon className="w-4 h-4" /> : step}
                  </div>
                  {step < 6 && <div className={`w-8 h-0.5 ${activeStep > step ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Color Selection */}
          <div className="customization-step" id="step-1">
            <CustomizationStep
              stepNumber={1}
              title="Choose Your Fabric Color"
              description="Select from our curated collection of premium fabrics. Each color is carefully chosen to complement modern and traditional interiors alike."
              isActive={activeStep === 1}
              supplementContent={
                <div className="text-sm">
                  <p className="font-medium text-slate-900 mb-2">Not sure which color?</p>
                  <p className="text-gray-600 mb-3">Order up to 10 free fabric swatches to see and feel the materials in your home before committing.</p>
                  <button onClick={() => setIsSwatchDialogOpen(true)} className="text-emerald-700 font-medium hover:underline flex items-center gap-1">
                    <SparklesIcon className="w-4 h-4" />
                    Order Free Swatches
                  </button>
                </div>
              }
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-slate-900 mb-2">Select Fabric Color</h4>
                  <p className="text-gray-600">Current selection: <span className="font-medium text-slate-900">{selectedColor.name}</span></p>
                </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {productData.colors.map((color) => (
                    <button 
                      key={color.id} 
                      onClick={() => setSelectedColor(color)} 
                      className={`relative aspect-square rounded-xl border-2 transition-all ${selectedColor.id === color.id ? 'border-slate-800 ring-2 ring-slate-800 ring-offset-2' : 'border-gray-200 hover:border-gray-400'}`} 
                      style={{ backgroundColor: color.hex }} 
                      title={color.name}
                    >
                      {selectedColor.id === color.id && (
                        <CheckIcon className={`absolute inset-0 m-auto w-5 h-5 ${['#F8F6F1', '#E8E4DC', '#E8D5D0'].includes(color.hex) ? 'text-slate-800' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>

                {/* Color Descriptions with Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                  {[
                    { name: 'Ivory & Neutrals', desc: 'Timeless elegance for any room', img: productData.colors[0].image },
                    { name: 'Sage & Greens', desc: 'Bring nature indoors', img: productData.colors[4].image },
                    { name: 'Navy & Blues', desc: 'Classic sophistication', img: productData.colors[3].image },
                  ].map((item, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden aspect-[4/3] group cursor-pointer">
                      <Image src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                        <span className="text-white font-medium">{item.name}</span>
                        <span className="text-white/80 text-sm">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CustomizationStep>
          </div>

          {/* Step 2: Header Style */}
          <div className="customization-step" id="step-2">
            <CustomizationStep
              stepNumber={2}
              title="Select Header Style"
              description="The header style determines how your drapes attach to the rod and affects the overall fullness and appearance of your window treatments."
              isActive={activeStep === 2}
              supplementContent={
                <div className="text-sm">
                  <p className="font-medium text-slate-900 mb-2">Popular Choice</p>
                  <p className="text-gray-600">Pinch pleat is our most popular header style, offering a classic look that works with any decor style from traditional to contemporary.</p>
                </div>
              }
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-slate-900 mb-2">Header Style Options</h4>
                  <p className="text-gray-600">Choose the perfect pleating style for your custom curtains</p>
                </div>
                
                <RadioGroup value={selectedHeaderStyle.id} onValueChange={(val) => { const style = headerStyles.find(s => s.id === val); if (style) setSelectedHeaderStyle(style); }}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {headerStyles.map((style) => (
                      <div key={style.id}>
                        <RadioGroupItem value={style.id} id={style.id} className="peer sr-only" />
                        <Label htmlFor={style.id} className="block h-full p-5 rounded-xl border-2 border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-slate-50 hover:border-gray-300">
                          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 mb-4">
                            <Image src={style.preview} alt={style.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-slate-900">{style.name}</span>
                            <span className="text-sm text-slate-700">{style.price > 0 ? `+$${style.price}` : 'Included'}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{style.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {style.features.map((feature, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{feature}</span>
                            ))}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </CustomizationStep>
          </div>

          {/* Step 3: Dimensions */}
          <div className="customization-step" id="step-3">
            <CustomizationStep
              stepNumber={3}
              title="Enter Your Dimensions"
              description="Accurate measurements ensure a perfect fit. Enter dimensions for a single panel - order 2 panels for a standard pair of curtains."
              isActive={activeStep === 3}
              supplementContent={
                <div className="text-sm">
                  <p className="font-medium text-slate-900 mb-2">Measuring Tip</p>
                  <p className="text-gray-600 mb-3">Always measure at multiple points and use the largest measurement for height, smallest for width.</p>
                  <button className="text-emerald-700 font-medium hover:underline flex items-center gap-1">
                    <FileTextIcon className="w-4 h-4" />
                    Download Measuring Guide
                  </button>
                </div>
              }
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-slate-900 mb-2">Panel Dimensions</h4>
                  <p className="text-gray-600">Enter exact measurements for custom-made curtains that fit your windows perfectly</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-600">Width (per panel)</Label>
                        <div className="relative">
                          <Input type="number" step="0.5" value={width} onChange={(e) => setWidth(e.target.value)} className="h-12 pr-12 bg-white border-gray-300 rounded-lg text-lg" placeholder="50" />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">in</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-600">Height</Label>
                        <div className="relative">
                          <Input type="number" step="0.5" value={height} onChange={(e) => setHeight(e.target.value)} className="h-12 pr-12 bg-white border-gray-300 rounded-lg text-lg" placeholder="84" />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">in</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <InfoIcon className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-800">For a pair of panels, order 2 panels. Each panel will be made to the dimensions above. Standard pair coverage: 72-96 inches window width.</p>
                    </div>
                  </div>
                  
                  <MeasurementCalculator width={width} height={height} onWidthChange={setWidth} onHeightChange={setHeight} />
                </div>

                {/* Visual Guide Image Placeholder */}
                <div className="mt-6 p-6 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 text-center">
                  <RulerIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Visual Measuring Guide</p>
                  <p className="text-sm text-gray-500">Image showing how to measure different window types</p>
                </div>
              </div>
            </CustomizationStep>
          </div>

          {/* Step 4: Lining */}
          <div className="customization-step" id="step-4">
            <CustomizationStep
              stepNumber={4}
              title="Choose Lining Option"
              description="Lining affects light control, privacy, insulation, and how your drapes hang. Select the option that best fits your needs and room requirements."
              isActive={activeStep === 4}
              supplementContent={
                <div className="text-sm">
                  <p className="font-medium text-slate-900 mb-2">Bedroom Tip</p>
                  <p className="text-gray-600">For bedrooms, we recommend blackout lining to block morning light and provide maximum privacy.</p>
                </div>
              }
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-slate-900 mb-2">Lining Options</h4>
                  <p className="text-gray-600">Enhance your custom drapery with the perfect lining for your space</p>
                </div>
                
                <RadioGroup value={selectedLining.id} onValueChange={(val) => { const lining = liningOptions.find(l => l.id === val); if (lining) setSelectedLining(lining); }}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {liningOptions.map((lining) => (
                      <div key={lining.id}>
                        <RadioGroupItem value={lining.id} id={`lining-${lining.id}`} className="peer sr-only" />
                        <Label htmlFor={`lining-${lining.id}`} className="flex items-center justify-between p-5 rounded-xl border-2 border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-slate-50 hover:border-gray-300">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-slate-900">{lining.name}</span>
                              {lining.id === 'blackout' && <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Best Seller</span>}
                            </div>
                            <p className="text-sm text-gray-600">{lining.description}</p>
                          </div>
                          <span className="text-lg font-semibold text-slate-900 ml-4">{lining.price > 0 ? `+$${lining.price}` : 'Free'}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                {/* Lining Comparison Image */}
                <div className="mt-6 p-6 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 text-center">
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-lg border-2 border-gray-300 mb-2 flex items-center justify-center">
                        <SunIcon className="w-8 h-8 text-amber-400" />
                      </div>
                      <span className="text-sm text-gray-600">Unlined</span>
                    </div>
                    <ArrowRightIcon className="w-6 h-6 text-gray-400" />
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg border-2 border-gray-300 mb-2 flex items-center justify-center">
                        <CloudIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <span className="text-sm text-gray-600">Standard</span>
                    </div>
                    <ArrowRightIcon className="w-6 h-6 text-gray-400" />
                    <div className="text-center">
                      <div className="w-20 h-20 bg-slate-800 rounded-lg border-2 border-gray-300 mb-2 flex items-center justify-center">
                        <MoonIcon className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-sm text-gray-600">Blackout</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">Light filtering comparison visualization</p>
                </div>
              </div>
            </CustomizationStep>
          </div>

          {/* Step 5: Tie Backs */}
          <div className="customization-step" id="step-5">
            <CustomizationStep
              stepNumber={5}
              title="Add Tie Backs (Optional)"
              description="Tie backs allow you to hold your drapes open during the day, creating an elegant draped look while letting in natural light."
              isActive={activeStep === 5}
              supplementContent={
                <div className="text-sm">
                  <p className="font-medium text-slate-900 mb-2">Styling Tip</p>
                  <p className="text-gray-600">Tie backs are typically placed 1/3 of the way up from the floor for the most flattering drape.</p>
                </div>
              }
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-slate-900 mb-2">Tie Back Options</h4>
                  <p className="text-gray-600">Optional decorative holdbacks to complement your custom window treatments</p>
                </div>
                
                <RadioGroup value={selectedTieBack.id} onValueChange={(val) => { const tieBack = tieBackOptions.find(t => t.id === val); if (tieBack) setSelectedTieBack(tieBack); }}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {tieBackOptions.map((tieBack) => (
                      <div key={tieBack.id}>
                        <RadioGroupItem value={tieBack.id} id={`tieback-${tieBack.id}`} className="peer sr-only" />
                        <Label htmlFor={`tieback-${tieBack.id}`} className="block h-full p-5 rounded-xl border-2 border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-slate-50 hover:border-gray-300">
                          {tieBack.preview && (
                            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-4">
                              <Image src={tieBack.preview} alt={tieBack.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-slate-900">{tieBack.name}</span>
                            <span className="text-slate-700">{tieBack.price > 0 ? `+$${tieBack.price}` : 'Free'}</span>
                          </div>
                          <p className="text-sm text-gray-600">{tieBack.description}</p>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </CustomizationStep>
          </div>

          {/* Step 6: Finishing */}
          <div className="customization-step" id="step-6">
            <CustomizationStep
              stepNumber={6}
              title="Finishing Touches"
              description="Professional finishing options to ensure your custom drapes arrive ready to hang and look their best from day one."
              isActive={activeStep === 6}
              supplementContent={
                <div className="text-sm">
                  <p className="font-medium text-slate-900 mb-2">Recommended</p>
                  <p className="text-gray-600">Premium steaming is highly recommended for linen and cotton fabrics to achieve that crisp, store-bought look.</p>
                </div>
              }
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-slate-900 mb-2">Finishing Options</h4>
                  <p className="text-gray-600">Professional treatments for your made-to-order curtains</p>
                </div>
                
                <RadioGroup value={selectedSteaming.id} onValueChange={(val) => { const steaming = steamingOptions.find(s => s.id === val); if (steaming) setSelectedSteaming(steaming); }}>
                  <div className="space-y-4">
                    {steamingOptions.map((steaming) => {
                      const isDisabled = steaming.id === 'premium' && !isSteamingAvailable;
                      return (
                        <div key={steaming.id}>
                          <RadioGroupItem value={steaming.id} id={`steaming-${steaming.id}`} className="peer sr-only" disabled={isDisabled} />
                          <Label htmlFor={`steaming-${steaming.id}`} className={`flex items-start gap-4 p-5 rounded-xl border-2 transition-all ${isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200' : 'cursor-pointer border-gray-200 peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-slate-50 hover:border-gray-300'}`}>
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${steaming.id === 'premium' ? 'bg-slate-100' : 'bg-gray-100'}`}>
                              {steaming.id === 'premium' ? <ThermometerIcon className="w-6 h-6 text-slate-700" /> : <CheckIcon className="w-6 h-6 text-gray-400" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-slate-900">{steaming.name}</span>
                                <span className="text-lg font-semibold text-slate-900">{steaming.price > 0 ? `+$${steaming.price}` : 'Free'}</span>
                              </div>
                              <p className="text-gray-600">{steaming.description}</p>
                              {steaming.note && (
                                <p className={`mt-2 text-sm ${isDisabled ? 'text-red-600' : 'text-gray-500'}`}>
                                  {steaming.note}
                                </p>
                              )}
                            </div>
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>

                {!isSteamingAvailable && (
                  <div className="p-4 bg-red-50 rounded-lg border border-red-100 text-sm text-red-800">
                    <strong>Note:</strong> Premium steaming is not available for panels over 120&quot; wide or 108&quot; high. Your current dimensions: {width}&quot; × {height}&quot;
                  </div>
                )}
              </div>
            </CustomizationStep>
          </div>

          {/* Final Add to Cart */}
          <div className="mt-12 p-8 bg-white rounded-2xl border-2 border-slate-800 text-center">
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">Ready to Order?</h3>
            <p className="text-gray-600 mb-6">Your custom {selectedColor.name} {selectedHeaderStyle.name} drapes are ready to be crafted just for you.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-gray-600">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-slate-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-300 hidden sm:block" />
              <div className="text-3xl font-semibold text-slate-900">${totalPrice}</div>
              <Button size="lg" className="h-12 px-8 rounded-lg bg-slate-800 text-white hover:bg-slate-700 text-lg" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================ */}
      {/* Product Information - Wide Layout */}
      {/* ============================================ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">Product Information</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to know about our premium custom drapery, from materials and care to installation and warranty coverage.</p>
          </div>

          <Accordion type="multiple" defaultValue={['measurement', 'specs']} className="w-full space-y-4">
            
            {/* Measurement & Installation */}
            <AccordionItem value="measurement" className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <RulerIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">Measurement & Installation Guide</span>
                    <p className="text-sm text-gray-500 font-normal">Learn how to measure your windows and install your custom curtains</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <span className="text-xl font-bold text-emerald-600">1</span>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">Easy Level</p>
                            <p className="text-sm text-gray-500">15-20 minutes</p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">Installation difficulty rated as beginner-friendly. Basic tools required.</p>
                      </div>
                      <div className="p-5 bg-gray-50 rounded-xl">
                        <p className="font-semibold text-slate-900 mb-3">Tools Needed</p>
                        <div className="flex flex-wrap gap-2">
                          {['Screwdriver', 'Drill', 'Level', 'Measuring Tape'].map((tool) => (
                            <span key={tool} className="px-3 py-1 bg-white text-sm text-gray-600 rounded-full border border-gray-200">{tool}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <InfoIcon className="w-4 h-4 text-blue-600" />
                        Quick Measuring Tips for Custom Curtains
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>Measure width at top, middle, and bottom — use the narrowest measurement for inside mount</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>Measure height at left, center, and right — use the longest measurement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>Round to nearest 1/8 inch for best fit on custom window treatments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>Use a steel measuring tape for accuracy on large window drapery</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Right: Image & Resources */}
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                      <PlayIcon className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-gray-600 font-medium">Installation Video</p>
                      <p className="text-sm text-gray-500">2-minute guide</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-slate-400 transition-colors text-center">
                        <FileTextIcon className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-slate-900">PDF Guide</p>
                        <p className="text-xs text-gray-500">Download</p>
                      </button>
                      <button className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-slate-400 transition-colors text-center">
                        <RulerIcon className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-slate-900">Measuring</p>
                        <p className="text-xs text-gray-500">Tutorial</p>
                      </button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Specifications */}
            <AccordionItem value="specs" className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <InfoIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">Technical Specifications</span>
                    <p className="text-sm text-gray-500 font-normal">Detailed specs for our custom-made window treatments</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      {[
                        { label: 'Materials Available', value: 'Premium Linen Blend, Cotton Sateen, Velvet' },
                        { label: 'Width Range', value: '24" - 144" per panel' },
                        { label: 'Height Range', value: '24" - 120"' },
                        { label: 'Header Styles', value: 'Pinch Pleat, Triple Pleat, Tailor Pleat' },
                        { label: 'Lining Options', value: 'Unlined, Standard, Blackout, Interlined' },
                        { label: 'Hardware Included', value: 'Rings, hooks, and installation hardware' },
                        { label: 'Warranty', value: '3 Year Limited' },
                        { label: 'Production Time', value: '10-14 business days' },
                        { label: 'Shipping', value: 'Free on orders over $200' },
                        { label: 'Returns', value: 'Custom orders - see policy' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-500">{item.label}</span>
                          <span className="font-medium text-slate-900 text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="aspect-square bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                      <InfoIcon className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-gray-600 font-medium">Technical Diagram</p>
                      <p className="text-sm text-gray-500">Panel construction details</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Care Instructions */}
            <AccordionItem value="care" className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <DropletsIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">Care & Maintenance</span>
                    <p className="text-sm text-gray-500 font-normal">Keep your luxury drapes looking beautiful for years</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Regular Maintenance</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Vacuum gently using brush attachment monthly</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Dust with feather duster or microfiber cloth</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Shake panels gently to remove dust</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Professional Cleaning</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Dry clean recommended for best results</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Frequency: Every 2-3 years</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Use reputable cleaner experienced with drapes</span>
                        </li>
                      </ul>
                    </div>
                    <div className="sm:col-span-2 p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <p className="font-semibold text-amber-900 mb-1">Important Care Note</p>
                      <p className="text-sm text-amber-800">Do not machine wash or tumble dry your custom curtains. High heat can damage fabric and lining. Blackout lining requires special care.</p>
                    </div>
                  </div>
                  <div className="aspect-[4/5] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                    <DropletsIcon className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">Care Instructions</p>
                    <p className="text-sm text-gray-500">Visual care guide</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Returns & Warranty */}
            <AccordionItem value="returns" className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <RotateCcwIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">Returns & Warranty Policy</span>
                    <p className="text-sm text-gray-500 font-normal">Custom product protection & shipping coverage</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-5 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                        3-Year Limited Warranty
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Covers manufacturing defects in materials and workmanship</li>
                        <li>• Includes header construction, stitching, and lining</li>
                        <li>• Hardware components covered for 1 year</li>
                      </ul>
                    </div>
                    <div className="p-5 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <TruckIcon className="w-4 h-4 text-emerald-600" />
                        Shipping Protection
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Inspect package immediately upon receipt</li>
                        <li>• Report damage within 48 hours with photos</li>
                        <li>• We expedite replacement at no cost</li>
                      </ul>
                    </div>
                  </div>
                  <div className="aspect-video bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                    <ShieldCheckIcon className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">Warranty Badge</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Safety */}
            <AccordionItem value="safety" className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <BabyIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">Child Safety Features</span>
                    <p className="text-sm text-gray-500 font-normal">WCSC certified cordless design for peace of mind</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <ShieldIcon className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-900 mb-1">WCSC Certified</h4>
                    <p className="text-sm text-gray-600">Meets all Window Covering Safety Council standards</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <VolumeXIcon className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-900 mb-1">Zero Exposed Cords</h4>
                    <p className="text-sm text-gray-600">Completely cordless design eliminates hazard</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <AwardIcon className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-900 mb-1">Best for Kids</h4>
                    <p className="text-sm text-gray-600">Independently tested and certified safe</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Motorized */}
            <AccordionItem value="motorized" className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <ZapIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">Motorized Upgrade Options</span>
                    <p className="text-sm text-gray-500 font-normal">Smart home integration & automation features</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      {[
                        { icon: VolumeXIcon, title: 'Whisper Quiet', desc: '<35dB operation' },
                        { icon: BatteryIcon, title: 'Long Battery', desc: 'Up to 6 months' },
                        { icon: WifiIcon, title: 'Smart Home', desc: 'Alexa/Google ready' },
                        { icon: SmartphoneIcon, title: 'App Control', desc: 'iOS & Android' },
                      ].map((item, idx) => (
                        <div key={idx} className="text-center p-4 bg-gray-50 rounded-xl">
                          <item.icon className="w-6 h-6 text-slate-700 mx-auto mb-2" />
                          <p className="font-medium text-sm text-slate-900">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 border border-gray-200 rounded-xl hover:border-slate-400 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-slate-900">Rechargeable Motor</span>
                          <span className="text-slate-700">+$149/panel</span>
                        </div>
                        <p className="text-sm text-gray-600">Built-in lithium battery, USB-C charging. No electrician needed for your automated window treatments.</p>
                      </div>
                      <div className="p-5 border border-gray-200 rounded-xl hover:border-slate-400 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-slate-900">Wired Motor</span>
                          <span className="text-slate-700">+$199/panel</span>
                        </div>
                        <p className="text-sm text-gray-600">Hardwired power connection for continuous operation. Professional installation recommended.</p>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-[3/4] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                    <ZapIcon className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">Motor System</p>
                    <p className="text-sm text-gray-500">Product demonstration</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>

          {/* Gallery Section */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <RealLifeGallery />
          </div>

          {/* Reviews Section */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-2xl font-semibold text-slate-900">Customer Reviews</h3>
              <span className="text-gray-500">({productData.reviewCount})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-6 text-center rounded-xl">
                <div className="text-5xl font-semibold text-slate-900">{productData.rating}</div>
                <div className="flex justify-center gap-1 my-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(productData.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <div className="text-sm text-gray-500">Based on {productData.reviewCount} verified reviews</div>
              </div>
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviewsData.map((review) => (
                  <div key={review.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{review.author}</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />)}
                        </div>
                      </div>
                      {review.verified && <span className="ml-auto text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Verified</span>}
                    </div>
                    <h4 className="font-medium text-slate-900 mb-1">{review.title}</h4>
                    <p className="text-gray-600 text-sm line-clamp-3">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Swatch Dialog */}
      <Dialog open={isSwatchDialogOpen} onOpenChange={setIsSwatchDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-slate-900">Order Free Fabric Samples</DialogTitle>
            <DialogDescription className="text-gray-600">See and feel our fabrics in your home before ordering. Up to 10 free samples.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-3 gap-3">
              {fabricSwatches.map((swatch) => (
                <div key={swatch.id} className="p-3 bg-gray-50 rounded-lg text-center cursor-pointer hover:ring-2 hover:ring-slate-800 transition-all">
                  <div className="w-full h-12 rounded mb-2" style={{ backgroundColor: swatch.color }} />
                  <p className="text-xs font-medium text-slate-900">{swatch.name}</p>
                </div>
              ))}
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg flex items-center gap-3">
              <TruckIcon className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-emerald-800"><strong>FREE Shipping</strong> • Arrives in 3-5 business days</span>
            </div>
            <Button className="w-full rounded-lg bg-slate-800 hover:bg-slate-700 text-white h-11" onClick={() => { toast.success('Samples added to cart!'); setIsSwatchDialogOpen(false); }}>
              Add 6 Samples to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Additional icons needed
const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="5" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const CloudIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default ProductDetailLuxV5Page;
