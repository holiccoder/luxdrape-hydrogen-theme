import React, { useState, useMemo } from 'react';
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
  RefreshCwIcon
} from 'lucide-react';

// ============================================
// Product Data
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
    { id: '1', url: 'https://luxdrape.com/cdn/shop/files/florence_pleated_ivory_white.jpg?v=1771059728&width=768', alt: 'Elegant drapery in living room' },
    { id: '2', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda', alt: 'Pleat header styles comparison' },
    { id: '3', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/374fd1c04ee445b2a6f8e62b5b3933ea_ve_miaoda', alt: 'Fabric detail close-up' },
    { id: '4', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/e91d92a772ee4f6bb46cd960193349f7_ve_miaoda', alt: 'Tie back styles' },
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
// Step Indicator - Clean, minimal
// ============================================
const StepIndicator: React.FC<{ steps: string[]; currentStep: number; onStepClick?: (step: number) => void }> = ({ steps, currentStep, onStepClick }) => (
  <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
    {steps.map((step, idx) => (
      <React.Fragment key={idx}>
        <button 
          onClick={() => onStepClick?.(idx)} 
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm whitespace-nowrap transition-all border-b-2 ${
            idx === currentStep 
              ? 'border-[#1B365D] text-[#1B365D] font-medium' 
              : idx < currentStep
                ? 'border-[#7A8B6E] text-[#7A8B6E]'
                : 'border-transparent text-gray-400'
          }`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
            idx === currentStep 
              ? 'bg-[#1B365D] text-white' 
              : idx < currentStep
                ? 'bg-[#7A8B6E] text-white'
                : 'bg-gray-200 text-gray-500'
          }`}>
            {idx < currentStep ? <CheckIcon className="w-3 h-3" /> : idx + 1}
          </span>
          <span className="hidden sm:inline">{step}</span>
        </button>
        {idx < steps.length - 1 && <div className="w-4 h-px bg-gray-300" />}
      </React.Fragment>
    ))}
  </div>
);

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
    <div className="bg-[#F8F6F1] p-4 space-y-4 border border-[#E8E4DC]">
      <div className="flex items-center gap-2">
        <CalculatorIcon className="w-4 h-4 text-[#1B365D]" />
        <span className="font-medium text-sm text-[#1B365D]">Panel Size Calculator</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs text-gray-500">Window Width (in)</Label>
          <Input type="number" value={windowWidth} onChange={(e) => { setWindowWidth(e.target.value); setShowResult(false); }} placeholder="72" className="h-10 bg-white border-[#E8E4DC] rounded-sm" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-gray-500">Window Height (in)</Label>
          <Input type="number" value={windowHeight} onChange={(e) => { setWindowHeight(e.target.value); setShowResult(false); }} placeholder="84" className="h-10 bg-white border-[#E8E4DC] rounded-sm" />
        </div>
      </div>
      <Button onClick={calculateDimensions} size="sm" className="w-full bg-[#1B365D] hover:bg-[#152a4a] text-white rounded-sm h-10" disabled={!windowWidth || !windowHeight}>
        Calculate Panel Size
      </Button>
      {showResult && (
        <div className="bg-white p-3 space-y-2 text-sm border border-[#E8E4DC]">
          <div className="flex justify-between">
            <span className="text-gray-600">Per Panel:</span>
            <span className="font-medium text-[#1B365D]">{width}&quot; W × {height}&quot; H</span>
          </div>
          <p className="text-xs text-gray-500">We added 8&quot; per side for coverage and 4&quot; to height for header/hem.</p>
        </div>
      )}
    </div>
  );
};

// ============================================
// Difficulty Meter
// ============================================
const DifficultyMeter: React.FC = () => (
  <div className="bg-[#F8F6F1] p-5 border border-[#E8E4DC]">
    <div className="flex items-start gap-4">
      <div className="relative w-14 h-14 shrink-0">
        <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="#E8E4DC" strokeWidth="3" />
          <circle cx="18" cy="18" r="15" fill="none" stroke="#7A8B6E" strokeWidth="3" strokeDasharray="33 100" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-[#1B365D]">1</span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-[#1B365D]">Level 1: Easy</span>
          <span className="text-gray-500 text-sm">• 15-20 min</span>
        </div>
        <p className="text-gray-700 mb-3">You got this!</p>
        <div className="flex flex-wrap gap-2">
          {['Screwdriver', 'Drill', 'Level'].map((tool, idx) => (
            <span key={idx} className="px-2 py-1 bg-white text-xs text-gray-600 border border-[#E8E4DC]">{tool}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ============================================
// Tutorial Hub
// ============================================
const TutorialHub: React.FC = () => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <WrenchIcon className="w-4 h-4 text-[#1B365D]" />
      <span className="font-medium text-sm text-[#1B365D]">Installation Resources</span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex items-center gap-3 p-3 bg-white border border-[#E8E4DC] hover:border-[#1B365D] transition-colors cursor-pointer">
        <div className="w-10 h-10 bg-[#F8F6F1] flex items-center justify-center">
          <PlayIcon className="w-4 h-4 text-[#1B365D]" />
        </div>
        <div>
          <p className="font-medium text-sm text-[#1B365D]">Installation Video</p>
          <p className="text-xs text-gray-500">2 min guide</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 bg-white border border-[#E8E4DC] hover:border-[#1B365D] transition-colors cursor-pointer">
        <div className="w-10 h-10 bg-[#F8F6F1] flex items-center justify-center">
          <FileTextIcon className="w-4 h-4 text-[#1B365D]" />
        </div>
        <div>
          <p className="font-medium text-sm text-[#1B365D]">Measuring Guide</p>
          <p className="text-xs text-gray-500">PDF Download</p>
        </div>
      </div>
    </div>
  </div>
);

// ============================================
// Real Life Gallery
// ============================================
const RealLifeGallery: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h3 className="font-serif text-2xl text-[#1B365D]">Real-Life Gallery</h3>
      <span className="text-sm text-gray-500">Customer Photos</span>
    </div>
    <p className="text-gray-600">See how LuxDrape transforms real homes. All photos submitted by our amazing customers.</p>
    
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {galleryImages.map((img, idx) => (
        <div key={img.id} className="break-inside-avoid">
          <div className={`relative overflow-hidden group cursor-pointer ${idx === 0 || idx === 3 ? 'aspect-[3/4]' : idx === 1 || idx === 4 ? 'aspect-[4/3]' : 'aspect-square'}`}>
            <Image src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      <Button variant="outline" className="rounded-sm border-[#1B365D] text-[#1B365D] hover:bg-[#1B365D] hover:text-white">
        Share Your Photos
      </Button>
      <p className="text-sm text-gray-500 mt-2">Tag @LuxDrape and get 10% off your next order</p>
    </div>
  </div>
);

// ============================================
// Main Product Page Component - V4
// American Brand Style (Serena & Lily inspired)
// ============================================
const ProductDetailLuxV4Page: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedHeaderStyle, setSelectedHeaderStyle] = useState(headerStyles[0]);
  const [selectedLining, setSelectedLining] = useState(liningOptions[1]);
  const [selectedTieBack, setSelectedTieBack] = useState(tieBackOptions[0]);
  const [selectedSteaming, setSelectedSteaming] = useState(steamingOptions[0]);
  const [width, setWidth] = useState('50');
  const [height, setHeight] = useState('84');
  const [quantity, setQuantity] = useState(2);
  const [isSwatchDialogOpen, setIsSwatchDialogOpen] = useState(false);

  const steps = ['Color', 'Header Style', 'Dimensions', 'Lining', 'Tie Backs', 'Finishing'];

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

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-[#1B365D] transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/shop')} className="hover:text-[#1B365D] transition-colors">Drapery</button>
          <span>/</span>
          <span className="text-[#1B365D]">Custom Pinch Pleat</span>
        </nav>
      </div>

      {/* Product Main Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] bg-[#F8F6F1] overflow-hidden">
              <Image src={productData.images[currentImageIndex].url} alt={productData.images[currentImageIndex].alt} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 text-xs font-medium bg-[#1B365D] text-white">Custom Made</span>
              </div>
              <button onClick={() => setCurrentImageIndex(prev => prev === 0 ? productData.images.length - 1 : prev - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                <ChevronLeftIcon className="w-5 h-5 text-[#1B365D]" />
              </button>
              <button onClick={() => setCurrentImageIndex(prev => (prev + 1) % productData.images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                <ChevronRightIcon className="w-5 h-5 text-[#1B365D]" />
              </button>
            </div>
            <div className="flex gap-2">
              {productData.images.map((img, idx) => (
                <button key={img.id} onClick={() => setCurrentImageIndex(idx)} className={`relative w-20 h-20 overflow-hidden transition-all border-2 ${currentImageIndex === idx ? 'border-[#1B365D]' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                  <Image src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info & Customization */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <span className="text-xs font-medium text-[#7A8B6E] tracking-wide uppercase">Made to Order</span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1B365D] leading-tight">{productData.name}</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(productData.rating) ? 'fill-[#C9A961] text-[#C9A961]' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-[#1B365D]">{productData.rating}</span>
                <span className="text-sm text-gray-500">({productData.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-1 pb-4 border-b border-[#E8E4DC]">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif text-[#1B365D]">${totalPrice}</span>
                <span className="text-gray-500">for {quantity} panels</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#7A8B6E]">
                <TruckIcon className="w-4 h-4" />
                <span>FREE Shipping on orders over $200</span>
              </div>
            </div>

            {/* Step Indicator */}
            <StepIndicator steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />

            {/* Step Content */}
            {currentStep === 0 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium text-[#1B365D]">Select Fabric Color</Label>
                    <p className="text-sm text-gray-500">Current: {selectedColor.name}</p>
                  </div>
                  <button onClick={() => setIsSwatchDialogOpen(true)} className="text-sm text-[#1B365D] underline">
                    Free Swatches
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {productData.colors.map((color) => (
                    <button key={color.id} onClick={() => setSelectedColor(color)} className={`relative aspect-square border-2 transition-all ${selectedColor.id === color.id ? 'border-[#1B365D]' : 'border-gray-200 hover:border-gray-400'}`} style={{ backgroundColor: color.hex }} title={color.name}>
                      {selectedColor.id === color.id && (
                        <CheckIcon className={`absolute inset-0 m-auto w-5 h-5 ${['#F8F6F1', '#E8E4DC', '#E8D5D0'].includes(color.hex) ? 'text-[#1B365D]' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <Label className="text-base font-medium text-[#1B365D]">Select Header Style</Label>
                  <p className="text-sm text-gray-500">Determines how drapes attach to rod & overall fullness</p>
                </div>
                <RadioGroup value={selectedHeaderStyle.id} onValueChange={(val) => { const style = headerStyles.find(s => s.id === val); if (style) setSelectedHeaderStyle(style); }}>
                  <div className="space-y-3">
                    {headerStyles.map((style) => (
                      <div key={style.id}>
                        <RadioGroupItem value={style.id} id={style.id} className="peer sr-only" />
                        <Label htmlFor={style.id} className="flex items-start gap-4 p-4 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-[#1B365D] peer-data-[state=checked]:bg-[#F8F6F1] hover:border-gray-300">
                          <div className="w-20 h-14 overflow-hidden bg-gray-100 shrink-0">
                            <Image src={style.preview} alt={style.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-[#1B365D]">{style.name}</span>
                              <span className="text-sm text-gray-600">{style.price > 0 ? `+$${style.price}` : 'Included'}</span>
                            </div>
                            <p className="text-sm text-gray-500">{style.description}</p>
                            <span className="inline-block mt-2 text-xs text-[#7A8B6E]">Fullness: {style.fullness}</span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <Label className="text-base font-medium text-[#1B365D]">Enter Dimensions</Label>
                  <p className="text-sm text-gray-500">Enter dimensions for a <strong>single panel</strong> (not pair)</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-500">Width (per panel)</Label>
                    <div className="relative">
                      <Input type="number" step="0.5" value={width} onChange={(e) => setWidth(e.target.value)} className="h-11 pr-10 bg-white border-gray-300 rounded-sm" placeholder="50" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">in</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-500">Height</Label>
                    <div className="relative">
                      <Input type="number" step="0.5" value={height} onChange={(e) => setHeight(e.target.value)} className="h-11 pr-10 bg-white border-gray-300 rounded-sm" placeholder="84" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">in</span>
                    </div>
                  </div>
                </div>
                <MeasurementCalculator width={width} height={height} onWidthChange={setWidth} onHeightChange={setHeight} />
                <div className="flex items-start gap-2 p-3 bg-[#F8F6F1] text-sm text-gray-600">
                  <InfoIcon className="w-4 h-4 text-[#1B365D] shrink-0 mt-0.5" />
                  <span>For a pair of panels, order 2 panels. Each panel will be made to the dimensions above.</span>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <Label className="text-base font-medium text-[#1B365D]">Select Lining</Label>
                  <p className="text-sm text-gray-500">Affects light control, privacy, and draping quality</p>
                </div>
                <RadioGroup value={selectedLining.id} onValueChange={(val) => { const lining = liningOptions.find(l => l.id === val); if (lining) setSelectedLining(lining); }}>
                  <div className="space-y-3">
                    {liningOptions.map((lining) => (
                      <div key={lining.id}>
                        <RadioGroupItem value={lining.id} id={`lining-${lining.id}`} className="peer sr-only" />
                        <Label htmlFor={`lining-${lining.id}`} className="flex items-center justify-between p-4 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-[#1B365D] peer-data-[state=checked]:bg-[#F8F6F1] hover:border-gray-300">
                          <div>
                            <span className="font-medium text-[#1B365D]">{lining.name}</span>
                            <p className="text-sm text-gray-500">{lining.description}</p>
                          </div>
                          <span className="text-sm font-medium text-[#1B365D]">{lining.price > 0 ? `+$${lining.price}` : 'Included'}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <Label className="text-base font-medium text-[#1B365D]">Add Tie Backs</Label>
                  <p className="text-sm text-gray-500">Optional decorative holdbacks for your drapery</p>
                </div>
                <RadioGroup value={selectedTieBack.id} onValueChange={(val) => { const tieBack = tieBackOptions.find(t => t.id === val); if (tieBack) setSelectedTieBack(tieBack); }}>
                  <div className="space-y-3">
                    {tieBackOptions.map((tieBack) => (
                      <div key={tieBack.id}>
                        <RadioGroupItem value={tieBack.id} id={`tieback-${tieBack.id}`} className="peer sr-only" />
                        <Label htmlFor={`tieback-${tieBack.id}`} className="flex items-center gap-4 p-4 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-[#1B365D] peer-data-[state=checked]:bg-[#F8F6F1] hover:border-gray-300">
                          {tieBack.preview && (
                            <div className="w-16 h-12 overflow-hidden bg-gray-100 shrink-0">
                              <Image src={tieBack.preview} alt={tieBack.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-[#1B365D]">{tieBack.name}</span>
                              <span className="text-sm text-gray-600">{tieBack.price > 0 ? `+$${tieBack.price}/set` : 'No extra'}</span>
                            </div>
                            <p className="text-sm text-gray-500">{tieBack.description}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <Label className="text-base font-medium text-[#1B365D]">Finishing Options</Label>
                  <p className="text-sm text-gray-500">Professional finishing touches for your drapery</p>
                </div>
                <RadioGroup value={selectedSteaming.id} onValueChange={(val) => { const steaming = steamingOptions.find(s => s.id === val); if (steaming) setSelectedSteaming(steaming); }}>
                  <div className="space-y-3">
                    {steamingOptions.map((steaming) => {
                      const isDisabled = steaming.id === 'premium' && !isSteamingAvailable;
                      return (
                        <div key={steaming.id}>
                          <RadioGroupItem value={steaming.id} id={`steaming-${steaming.id}`} className="peer sr-only" disabled={isDisabled} />
                          <Label htmlFor={`steaming-${steaming.id}`} className={`flex items-start gap-4 p-4 border transition-all ${isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200' : 'cursor-pointer border-gray-200 peer-data-[state=checked]:border-[#1B365D] peer-data-[state=checked]:bg-[#F8F6F1] hover:border-gray-300'}`}>
                            <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-[#F8F6F1]">
                              {steaming.id === 'premium' ? <ThermometerIcon className="w-5 h-5 text-[#1B365D]" /> : <CheckIcon className="w-5 h-5 text-gray-400" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-[#1B365D]">{steaming.name}</span>
                                <span className="text-sm text-gray-600">{steaming.price > 0 ? `+$${steaming.price}` : 'Included'}</span>
                              </div>
                              <p className="text-sm text-gray-500">{steaming.description}</p>
                              {steaming.note && (
                                <div className={`mt-2 flex items-center gap-1.5 text-xs ${isDisabled ? 'text-red-600' : 'text-gray-600'}`}>
                                  <InfoIcon className="w-3 h-3" />
                                  <span>{steaming.note}</span>
                                </div>
                              )}
                            </div>
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </div>
            )}

            <div className="pt-4 border-t border-[#E8E4DC] space-y-4">
              {/* Quantity */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-[#1B365D]">Number of Panels</Label>
                  <p className="text-xs text-gray-500">Order 2 for a standard pair</p>
                </div>
                <div className="flex items-center border border-gray-300">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-[#1B365D]">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Step Navigation */}
              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button variant="outline" className="flex-1 rounded-sm border-[#1B365D] text-[#1B365D] hover:bg-[#1B365D] hover:text-white h-12" onClick={() => setCurrentStep(currentStep - 1)}>
                    Previous
                  </Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button className="flex-1 rounded-sm bg-[#1B365D] text-white hover:bg-[#152a4a] h-12" onClick={() => setCurrentStep(currentStep + 1)}>
                    Next Step
                  </Button>
                ) : (
                  <Button size="lg" className="flex-1 h-12 rounded-sm bg-[#1B365D] text-white hover:bg-[#152a4a] text-base" onClick={handleAddToCart}>
                    Add to Cart - ${totalPrice}
                  </Button>
                )}
              </div>

              {currentStep < steps.length - 1 && (
                <button onClick={handleAddToCart} className="w-full text-center text-sm text-[#1B365D] underline py-2">
                  Skip to Add to Cart - ${totalPrice}
                </button>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex gap-4 pt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <LeafIcon className="w-4 h-4 text-[#7A8B6E]" />
                <span>Premium Fabrics</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4 text-[#7A8B6E]" />
                <span>3-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Information Section */}
      <section className="bg-[#F8F6F1] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-[#1B365D] mb-3">Product Information</h2>
            <p className="text-gray-600">Everything you need to know about your custom drapery</p>
          </div>

          <Accordion type="multiple" defaultValue={['measurement', 'specs', 'care']} className="w-full space-y-4">
            
            {/* Measurement & Installation */}
            <AccordionItem value="measurement" className="bg-white border-0 shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline [&[data-state=open]]:bg-[#F8F6F1]">
                <div className="flex items-center gap-4">
                  <RulerIcon className="w-5 h-5 text-[#1B365D]" />
                  <div className="text-left">
                    <span className="font-medium text-lg text-[#1B365D]">Measurement & Installation</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DifficultyMeter />
                  <TutorialHub />
                </div>
                <div className="mt-6 p-4 bg-[#F8F6F1]">
                  <h4 className="font-medium text-[#1B365D] mb-3">Quick Measuring Tips</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Measure width at top, middle, and bottom — use the narrowest measurement</li>
                    <li>• Measure height at left, center, and right — use the longest measurement</li>
                    <li>• Round to nearest 1/8 inch for best fit</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Specifications */}
            <AccordionItem value="specs" className="bg-white border-0 shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline [&[data-state=open]]:bg-[#F8F6F1]">
                <div className="flex items-center gap-4">
                  <InfoIcon className="w-5 h-5 text-[#1B365D]" />
                  <div className="text-left">
                    <span className="font-medium text-lg text-[#1B365D]">Specifications</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    { label: 'Materials', value: 'Premium Linen Blend, Cotton Sateen, Velvet' },
                    { label: 'Min/Max Width', value: '24" - 144" per panel' },
                    { label: 'Min/Max Height', value: '24" - 120"' },
                    { label: 'Header Options', value: 'Pinch Pleat, Triple Pleat, Tailor Pleat' },
                    { label: 'Lining Options', value: 'Unlined, Standard, Blackout, Interlined' },
                    { label: 'Hardware Included', value: 'Rings, hooks, and installation hardware' },
                    { label: 'Warranty', value: '3 Year Limited' },
                    { label: 'Production Time', value: '10-14 business days' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-[#E8E4DC]">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="font-medium text-[#1B365D]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Care Instructions */}
            <AccordionItem value="care" className="bg-white border-0 shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline [&[data-state=open]]:bg-[#F8F6F1]">
                <div className="flex items-center gap-4">
                  <DropletsIcon className="w-5 h-5 text-[#1B365D]" />
                  <div className="text-left">
                    <span className="font-medium text-lg text-[#1B365D]">Care Instructions</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-[#1B365D] mb-2">Regular Maintenance</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Vacuum gently using brush attachment monthly</li>
                        <li>• Dust with feather duster or microfiber cloth</li>
                        <li>• Shake panels gently to remove dust particles</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#1B365D] mb-2">Spot Cleaning</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Blot spills immediately with clean white cloth</li>
                        <li>• Use mild soap and lukewarm water for stains</li>
                        <li>• Test cleaning solution on hidden area first</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-[#1B365D] mb-2">Professional Cleaning</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Dry clean recommended for best results</li>
                        <li>• Frequency: Every 2-3 years or as needed</li>
                        <li>• Use reputable cleaner experienced with drapes</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-50 border border-amber-200">
                      <p className="font-medium text-amber-900">Important Note</p>
                      <p className="text-sm text-amber-800">Do not machine wash or tumble dry. High heat can damage fabric and lining.</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Returns & Policy */}
            <AccordionItem value="returns" className="bg-white border-0 shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline [&[data-state=open]]:bg-[#F8F6F1]">
                <div className="flex items-center gap-4">
                  <RotateCcwIcon className="w-5 h-5 text-[#1B365D]" />
                  <div className="text-left">
                    <span className="font-medium text-lg text-[#1B365D]">Returns & Warranty Policy</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-[#1B365D] mb-2">3-Year Limited Warranty</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Covers manufacturing defects in materials and workmanship</li>
                        <li>• Includes header construction, stitching, and lining attachment</li>
                        <li>• Hardware components covered for 1 year</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#1B365D] mb-2">Shipping Damage Protection</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Inspect package immediately upon receipt</li>
                        <li>• Report damage within 48 hours with photos</li>
                        <li>• We will expedite replacement at no cost</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-[#1B365D] mb-2">Custom Product Policy</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Custom orders cannot be returned for size/color preferences</li>
                        <li>• Measurement errors by customer not covered</li>
                        <li>• Fabric swatches recommended before ordering</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-[#F8F6F1] border border-[#E8E4DC]">
                      <p className="font-medium text-[#1B365D]">Quality Guarantee</p>
                      <p className="text-sm text-gray-600">If your drapes arrive with defects or incorrect specifications, we will remake them free of charge. Contact us within 14 days.</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Cordless Safety */}
            <AccordionItem value="safety" className="bg-white border-0 shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline [&[data-state=open]]:bg-[#F8F6F1]">
                <div className="flex items-center gap-4">
                  <BabyIcon className="w-5 h-5 text-[#1B365D]" />
                  <div className="text-left">
                    <span className="font-medium text-lg text-[#1B365D]">Cordless Safety Features</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-5 bg-[#F8F6F1]">
                    <ShieldIcon className="w-8 h-8 text-[#1B365D] mx-auto mb-3" />
                    <h4 className="font-medium text-[#1B365D] mb-1">WCSC Certified</h4>
                    <p className="text-sm text-gray-600">Meets all Window Covering Safety Council standards</p>
                  </div>
                  <div className="text-center p-5 bg-[#F8F6F1]">
                    <VolumeXIcon className="w-8 h-8 text-[#1B365D] mx-auto mb-3" />
                    <h4 className="font-medium text-[#1B365D] mb-1">Zero Exposed Cords</h4>
                    <p className="text-sm text-gray-600">Completely cordless design eliminates hazard</p>
                  </div>
                  <div className="text-center p-5 bg-[#F8F6F1]">
                    <AwardIcon className="w-8 h-8 text-[#1B365D] mx-auto mb-3" />
                    <h4 className="font-medium text-[#1B365D] mb-1">Best for Kids</h4>
                    <p className="text-sm text-gray-600">Independently tested and certified safe</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Motorized Options */}
            <AccordionItem value="motorized" className="bg-white border-0 shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline [&[data-state=open]]:bg-[#F8F6F1]">
                <div className="flex items-center gap-4">
                  <ZapIcon className="w-5 h-5 text-[#1B365D]" />
                  <div className="text-left">
                    <span className="font-medium text-lg text-[#1B365D]">Motorized Upgrade Options</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-[#F8F6F1]">
                    <VolumeXIcon className="w-6 h-6 text-[#1B365D] mx-auto mb-2" />
                    <p className="font-medium text-sm text-[#1B365D]">Whisper Quiet</p>
                    <p className="text-xs text-gray-500">&lt;35dB</p>
                  </div>
                  <div className="text-center p-4 bg-[#F8F6F1]">
                    <BatteryIcon className="w-6 h-6 text-[#1B365D] mx-auto mb-2" />
                    <p className="font-medium text-sm text-[#1B365D]">Long Battery</p>
                    <p className="text-xs text-gray-500">6 months</p>
                  </div>
                  <div className="text-center p-4 bg-[#F8F6F1]">
                    <WifiIcon className="w-6 h-6 text-[#1B365D] mx-auto mb-2" />
                    <p className="font-medium text-sm text-[#1B365D]">Smart Home</p>
                    <p className="text-xs text-gray-500">Alexa/Google</p>
                  </div>
                  <div className="text-center p-4 bg-[#F8F6F1]">
                    <SmartphoneIcon className="w-6 h-6 text-[#1B365D] mx-auto mb-2" />
                    <p className="font-medium text-sm text-[#1B365D]">App Control</p>
                    <p className="text-xs text-gray-500">iOS & Android</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 hover:border-[#1B365D] transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[#1B365D]">Rechargeable Motor</span>
                      <span className="text-[#1B365D]">+$149/panel</span>
                    </div>
                    <p className="text-sm text-gray-600">Built-in lithium battery, USB-C charging, 6-month battery life. No electrician needed.</p>
                  </div>
                  <div className="p-4 border border-gray-200 hover:border-[#1B365D] transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[#1B365D]">Wired Motor</span>
                      <span className="text-[#1B365D]">+$199/panel</span>
                    </div>
                    <p className="text-sm text-gray-600">Hardwired power connection, continuous operation, professional installation recommended.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>

          {/* Gallery */}
          <div className="mt-12 pt-12 border-t border-[#E8E4DC]">
            <RealLifeGallery />
          </div>

          {/* Reviews */}
          <div className="mt-12 pt-12 border-t border-[#E8E4DC]">
            <div className="flex items-center gap-2 mb-8">
              <h3 className="font-serif text-2xl text-[#1B365D]">Customer Reviews</h3>
              <span className="text-gray-500">({productData.reviewCount})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 text-center shadow-sm">
                <div className="text-5xl font-serif text-[#1B365D]">{productData.rating}</div>
                <div className="flex justify-center gap-1 my-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(productData.rating) ? 'fill-[#C9A961] text-[#C9A961]' : 'text-gray-300'}`} />
                  ))}
                </div>
                <div className="text-sm text-gray-500">Based on {productData.reviewCount} reviews</div>
              </div>
              <div className="md:col-span-2 space-y-4">
                {reviewsData.map((review) => (
                  <div key={review.id} className="bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#F8F6F1] flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-[#1B365D]">{review.author}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-[#C9A961] text-[#C9A961]' : 'text-gray-300'}`} />)}</div>
                          <span>{review.date}</span>
                        </div>
                      </div>
                      {review.verified && <span className="ml-auto text-xs text-[#7A8B6E]">Verified Purchase</span>}
                    </div>
                    <h4 className="font-medium text-[#1B365D] mb-1">{review.title}</h4>
                    <p className="text-gray-600">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Swatch Dialog */}
      <Dialog open={isSwatchDialogOpen} onOpenChange={setIsSwatchDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white rounded-sm">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-[#1B365D]">Order Free Fabric Samples</DialogTitle>
            <DialogDescription className="text-gray-600">See and feel our fabrics in your home. Up to 10 free samples.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-3 gap-3">
              {fabricSwatches.map((swatch) => (
                <div key={swatch.id} className="p-3 bg-[#F8F6F1] text-center cursor-pointer hover:ring-1 hover:ring-[#1B365D] transition-all">
                  <div className="w-full h-12 mb-2" style={{ backgroundColor: swatch.color }} />
                  <p className="text-xs font-medium text-[#1B365D]">{swatch.name}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#F8F6F1] p-3 flex items-center gap-3">
              <TruckIcon className="w-4 h-4 text-[#7A8B6E]" />
              <span className="text-sm text-gray-600"><strong className="text-[#1B365D]">FREE Shipping</strong> • Arrives in 3-5 days</span>
            </div>
            <Button className="w-full rounded-sm bg-[#1B365D] hover:bg-[#152a4a] text-white" onClick={() => { toast.success('Samples added to cart!'); setIsSwatchDialogOpen(false); }}>
              Add 6 Samples to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailLuxV4Page;
