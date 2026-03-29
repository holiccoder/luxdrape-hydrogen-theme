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
  Share2Icon,
  TruckIcon,
  ShieldCheckIcon,
  Star,
  UserIcon,
  ClockIcon,
  PackageIcon,
  WrenchIcon,
  ShieldIcon,
  BabyIcon,
  LeafIcon,
  HandHelpingIcon,
  PlayIcon,
  ZapIcon,
  AwardIcon,
  SparklesIcon,
  CalculatorIcon,
  InfoIcon,
  MinusIcon,
  PlusIcon,
  DownloadIcon,
  FileTextIcon,
  ThermometerIcon,
  DropletsIcon,
  RotateCcwIcon,
  ThumbsUpIcon,
  SmartphoneIcon,
  WifiIcon,
  BatteryIcon,
  VolumeXIcon,
  CogIcon,
  RefreshCwIcon,
  ImageIcon,
  Settings2Icon,
  ListIcon
} from 'lucide-react';

// ============================================
// Product Data
// ============================================
const productData = {
  id: 'lux-drapery-1',
  name: 'Custom Pinch Pleat Drapery',
  description: 'Elevate your space with our premium custom drapery. Handcrafted from luxurious fabrics with precision pleating for a tailored look.',
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
    { id: 'ivory', name: 'Ivory Linen', hex: '#F5F3EF', image: 'https://luxdrape.com/cdn/shop/files/florence_pleated_ivory_white.jpg?v=1771059728&width=768' },
    { id: 'oatmeal', name: 'Oatmeal', hex: '#E8E2D9', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/4404b45f35da473c8fc6f026d2c13f56_ve_miaoda' },
    { id: 'charcoal', name: 'Charcoal Gray', hex: '#4A4A4A', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/34013fff634f414ea6ff57ba2c97cf2b_ve_miaoda' },
    { id: 'navy', name: 'Navy Blue', hex: '#2C3E50', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/71c5a08726ba4857a88b02903542fc08_ve_miaoda' },
    { id: 'sage', name: 'Sage Green', hex: '#B8C4B8', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda' },
    { id: 'blush', name: 'Blush Pink', hex: '#E8D5D0', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/e91d92a772ee4f6bb46cd960193349f7_ve_miaoda' },
  ],
  images: [
    { id: '1', url: 'https://luxdrape.com/cdn/shop/files/florence_pleated_ivory_white.jpg?v=1771059728&width=768', alt: 'Elegant drapery in living room' },
    { id: '2', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda', alt: 'Pleat header styles' },
    { id: '3', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/374fd1c04ee445b2a6f8e62b5b3933ea_ve_miaoda', alt: 'Fabric detail' },
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
  { id: 'swatch-1', name: 'Ivory Linen', color: '#F5F3EF', material: 'Linen Blend' },
  { id: 'swatch-2', name: 'Oatmeal', color: '#E8E2D9', material: 'Linen/Cotton' },
  { id: 'swatch-3', name: 'Charcoal', color: '#4A4A4A', material: 'Cotton Sateen' },
  { id: 'swatch-4', name: 'Navy', color: '#2C3E50', material: 'Velvet' },
  { id: 'swatch-5', name: 'Sage', color: '#B8C4B8', material: 'Linen Blend' },
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
// Step Indicator Component - Simplified
// ============================================
const StepIndicator: React.FC<{ steps: string[]; currentStep: number; onStepClick?: (step: number) => void }> = ({ steps, currentStep, onStepClick }) => (
  <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-2 scrollbar-hide">
    {steps.map((step, idx) => (
      <React.Fragment key={idx}>
        <button
          onClick={() => onStepClick?.(idx)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            idx === currentStep 
              ? 'bg-stone-800 text-white' 
              : idx < currentStep
                ? 'bg-stone-200 text-stone-700'
                : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
          }`}
        >
          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
            idx === currentStep 
              ? 'bg-white text-stone-800' 
              : idx < currentStep
                ? 'bg-stone-700 text-white'
                : 'bg-stone-300 text-stone-500'
          }`}>
            {idx < currentStep ? <CheckIcon className="w-2.5 h-2.5" /> : idx + 1}
          </span>
          <span className="hidden sm:inline">{step}</span>
        </button>
        {idx < steps.length - 1 && <ChevronRightIcon className="w-3 h-3 text-stone-400 shrink-0" />}
      </React.Fragment>
    ))}
  </div>
);

// ============================================
// Measurement Calculator - Neutral Style
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
    <div className="bg-stone-50 rounded-xl p-4 space-y-4 border border-stone-200">
      <div className="flex items-center gap-2">
        <CalculatorIcon className="w-4 h-4 text-stone-600" />
        <span className="font-medium text-sm text-stone-800">Panel Size Calculator</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs text-stone-500">Window Width (in)</Label>
          <Input type="number" value={windowWidth} onChange={(e) => { setWindowWidth(e.target.value); setShowResult(false); }} placeholder="72" className="h-9 bg-white border-stone-200" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-stone-500">Window Height (in)</Label>
          <Input type="number" value={windowHeight} onChange={(e) => { setWindowHeight(e.target.value); setShowResult(false); }} placeholder="84" className="h-9 bg-white border-stone-200" />
        </div>
      </div>
      <Button onClick={calculateDimensions} size="sm" className="w-full rounded-lg bg-stone-800 hover:bg-stone-700 text-white" disabled={!windowWidth || !windowHeight}>
        Calculate Panel Size
      </Button>
      {showResult && (
        <div className="bg-stone-100 rounded-lg p-3 space-y-2 text-sm border border-stone-200">
          <div className="flex justify-between">
            <span className="text-stone-600">Per Panel:</span>
            <span className="font-semibold text-stone-800">{width}&quot; W × {height}&quot; H</span>
          </div>
          <p className="text-xs text-stone-500">We added 8&quot; per side for coverage and 4&quot; to height for header/hem.</p>
        </div>
      )}
    </div>
  );
};

// ============================================
// Difficulty Meter - Neutral Style
// ============================================
const DifficultyMeter: React.FC = () => (
  <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
    <div className="flex items-start gap-4">
      <div className="relative w-14 h-14 shrink-0">
        <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="text-stone-200" />
          <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="33 100" strokeLinecap="round" className="text-stone-700" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-stone-800">1</span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-stone-800 text-base">Level 1: Easy</span>
          <span className="text-stone-500 text-sm">• 15-20 min</span>
        </div>
        <p className="text-base text-stone-700 mb-3">You got this!</p>
        <div className="flex flex-wrap gap-1.5">
          {['Screwdriver', 'Drill', 'Level'].map((tool, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-white rounded-full text-xs text-stone-600 border border-stone-200">{tool}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ============================================
// Tutorial Hub - Neutral Style
// ============================================
const TutorialHub: React.FC = () => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <WrenchIcon className="w-4 h-4 text-stone-600" />
      <span className="font-medium text-sm text-stone-800">Installation Resources</span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Card className="rounded-xl border-stone-200 hover:border-stone-300 transition-colors cursor-pointer bg-white">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center">
            <PlayIcon className="w-4 h-4 text-stone-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm text-stone-800">Installation Video</p>
            <p className="text-xs text-stone-500">2 min guide</p>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-xl border-stone-200 hover:border-stone-300 transition-colors cursor-pointer bg-white">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center">
            <FileTextIcon className="w-4 h-4 text-stone-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm text-stone-800">Measuring Guide</p>
            <p className="text-xs text-stone-500">PDF Download</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// ============================================
// Real Life Gallery - Neutral Style
// ============================================
const RealLifeGallery: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-stone-600" />
        <h3 className="font-serif text-xl font-medium text-stone-800">Real-Life Gallery</h3>
      </div>
      <Badge variant="secondary" className="rounded-full bg-stone-100 text-stone-700 border-stone-200">Customer Photos</Badge>
    </div>
    <p className="text-stone-600 text-base">See how LuxDrape transforms real homes. All photos submitted by our amazing customers.</p>
    
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {galleryImages.map((img, idx) => (
        <div key={img.id} className="break-inside-avoid">
          <div className={`relative rounded-2xl overflow-hidden group cursor-pointer ${idx === 0 || idx === 3 ? 'aspect-[3/4]' : idx === 1 || idx === 4 ? 'aspect-[4/3]' : 'aspect-square'}`}>
            <Image src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{img.customer}</p>
                    <p className="text-xs opacity-80">{img.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    <div className="text-center pt-4">
      <Button variant="outline" className="rounded-full border-stone-300 text-stone-700 hover:bg-stone-100">
        <ThumbsUpIcon className="w-4 h-4 mr-2" />
        Share Your Photos
      </Button>
      <p className="text-xs text-stone-500 mt-2">Tag @LuxDrape and get 10% off your next order</p>
    </div>
  </div>
);

// ============================================
// Main Product Page Component - V3
// ============================================
const ProductDetailLuxV3Page: React.FC = () => {
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
  const [isWishlisted, setIsWishlisted] = useState(false);
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
    toast.success('Added to cart!', { description: `${quantity} × ${productData.name} - ${selectedColor.name}` });
  };

  return (
    <div className="w-full space-y-0 pb-16 bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-stone-500">
          <button onClick={() => navigate('/')} className="hover:text-stone-800 transition-colors">Home</button>
          <ChevronRightIcon className="w-4 h-4" />
          <button onClick={() => navigate('/shop')} className="hover:text-stone-800 transition-colors">Drapery</button>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-stone-800">Custom Pinch Pleat</span>
        </nav>
      </div>

      {/* Product Main Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Image Gallery - Mobile Optimized */}
          <div className="space-y-3">
            <div className="relative aspect-[4/5] bg-stone-100 rounded-2xl overflow-hidden">
              <Image src={productData.images[currentImageIndex].url} alt={productData.images[currentImageIndex].alt} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <Badge className="rounded-full text-xs font-medium bg-stone-800 text-white border-0">
                  <AwardIcon className="w-3 h-3 mr-1" />
                  Custom Made
                </Badge>
              </div>
              <button onClick={() => setCurrentImageIndex(prev => prev === 0 ? productData.images.length - 1 : prev - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                <ChevronLeftIcon className="w-5 h-5 text-stone-800" />
              </button>
              <button onClick={() => setCurrentImageIndex(prev => (prev + 1) % productData.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                <ChevronRightIcon className="w-5 h-5 text-stone-800" />
              </button>
              <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-stone-800">
                {currentImageIndex + 1} / {productData.images.length}
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {productData.images.map((img, idx) => (
                <button key={img.id} onClick={() => setCurrentImageIndex(idx)} className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden transition-all ${currentImageIndex === idx ? 'ring-2 ring-stone-800 ring-offset-2' : 'opacity-60 hover:opacity-100'}`}>
                  <Image src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info & Customization */}
          <div className="space-y-5">
            {/* Header */}
            <div className="space-y-2">
              <Badge variant="outline" className="rounded-full text-xs font-medium text-stone-600 border-stone-300 bg-stone-50">
                <SparklesIcon className="w-3 h-3 mr-1" />
                Made to Order
              </Badge>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-stone-900 tracking-tight">{productData.name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(productData.rating) ? 'fill-stone-700 text-stone-700' : 'text-stone-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-stone-700">{productData.rating}</span>
                <span className="text-sm text-stone-500">({productData.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-semibold text-stone-900">${totalPrice}</span>
                <span className="text-base text-stone-500">for {quantity} panels</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <TruckIcon className="w-4 h-4" />
                <span>FREE Shipping on orders over $200</span>
              </div>
            </div>

            <Separator className="bg-stone-200" />

            {/* Step Indicator */}
            <StepIndicator steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />

            {/* Step Content */}
            {currentStep === 0 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium text-stone-900">Select Fabric Color</Label>
                    <p className="text-sm text-stone-500">Current: {selectedColor.name}</p>
                  </div>
                  <button onClick={() => setIsSwatchDialogOpen(true)} className="text-xs text-stone-600 hover:text-stone-900 hover:underline flex items-center gap-1">
                    <PackageIcon className="w-3 h-3" />
                    Free Swatches
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {productData.colors.map((color) => (
                    <button key={color.id} onClick={() => setSelectedColor(color)} className={`relative aspect-square rounded-xl border-2 transition-all ${selectedColor.id === color.id ? 'border-stone-800 ring-2 ring-stone-800 ring-offset-2' : 'border-stone-200 hover:border-stone-400'}`} style={{ backgroundColor: color.hex }} title={color.name}>
                      {selectedColor.id === color.id && (
                        <CheckIcon className={`absolute inset-0 m-auto w-5 h-5 ${['#F5F3EF', '#E8E2D9', '#E8D5D0'].includes(color.hex) ? 'text-stone-800' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <Label className="text-base font-medium text-stone-900">Select Header Style</Label>
                  <p className="text-sm text-stone-500">Determines how drapes attach to rod & overall fullness</p>
                </div>
                <RadioGroup value={selectedHeaderStyle.id} onValueChange={(val) => { const style = headerStyles.find(s => s.id === val); if (style) setSelectedHeaderStyle(style); }}>
                  <div className="grid gap-3">
                    {headerStyles.map((style) => (
                      <div key={style.id}>
                        <RadioGroupItem value={style.id} id={style.id} className="peer sr-only" />
                        <Label htmlFor={style.id} className="flex items-start gap-3 p-3 sm:p-4 rounded-xl border-2 border-stone-200 cursor-pointer transition-all peer-data-[state=checked]:border-stone-800 peer-data-[state=checked]:bg-stone-50 hover:border-stone-300">
                          <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                            <Image src={style.preview} alt={style.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-stone-900">{style.name}</span>
                              <span className="text-sm text-stone-600">{style.price > 0 ? `+$${style.price}` : 'Included'}</span>
                            </div>
                            <p className="text-xs text-stone-500 mb-2">{style.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              <Badge variant="secondary" className="rounded-full text-[10px] py-0 bg-stone-100 text-stone-700">Fullness: {style.fullness}</Badge>
                            </div>
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
                  <Label className="text-base font-medium text-stone-900">Enter Dimensions</Label>
                  <p className="text-sm text-stone-500">Enter dimensions for a <strong>single panel</strong> (not pair)</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-stone-500">Width (per panel)</Label>
                    <div className="relative">
                      <Input type="number" step="0.5" value={width} onChange={(e) => setWidth(e.target.value)} className="h-11 pr-10 bg-white border-stone-200" placeholder="50" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">in</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-stone-500">Height</Label>
                    <div className="relative">
                      <Input type="number" step="0.5" value={height} onChange={(e) => setHeight(e.target.value)} className="h-11 pr-10 bg-white border-stone-200" placeholder="84" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">in</span>
                    </div>
                  </div>
                </div>
                <MeasurementCalculator width={width} height={height} onWidthChange={setWidth} onHeightChange={setHeight} />
                <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-lg text-sm text-stone-600 border border-stone-200">
                  <InfoIcon className="w-4 h-4 text-stone-500 shrink-0" />
                  <span>For a pair of panels, order 2 panels. Each panel will be made to the dimensions above.</span>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <Label className="text-base font-medium text-stone-900">Select Lining</Label>
                  <p className="text-sm text-stone-500">Affects light control, privacy, and draping quality</p>
                </div>
                <RadioGroup value={selectedLining.id} onValueChange={(val) => { const lining = liningOptions.find(l => l.id === val); if (lining) setSelectedLining(lining); }}>
                  <div className="grid gap-3">
                    {liningOptions.map((lining) => (
                      <div key={lining.id}>
                        <RadioGroupItem value={lining.id} id={`lining-${lining.id}`} className="peer sr-only" />
                        <Label htmlFor={`lining-${lining.id}`} className="flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 border-stone-200 cursor-pointer transition-all peer-data-[state=checked]:border-stone-800 peer-data-[state=checked]:bg-stone-50 hover:border-stone-300">
                          <div>
                            <span className="font-medium text-stone-900">{lining.name}</span>
                            <p className="text-xs text-stone-500 mt-0.5">{lining.description}</p>
                          </div>
                          <span className="text-sm font-medium text-stone-700">{lining.price > 0 ? `+$${lining.price}` : 'Included'}</span>
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
                  <Label className="text-base font-medium text-stone-900">Add Tie Backs</Label>
                  <p className="text-sm text-stone-500">Optional decorative holdbacks for your drapery</p>
                </div>
                <RadioGroup value={selectedTieBack.id} onValueChange={(val) => { const tieBack = tieBackOptions.find(t => t.id === val); if (tieBack) setSelectedTieBack(tieBack); }}>
                  <div className="grid gap-3">
                    {tieBackOptions.map((tieBack) => (
                      <div key={tieBack.id}>
                        <RadioGroupItem value={tieBack.id} id={`tieback-${tieBack.id}`} className="peer sr-only" />
                        <Label htmlFor={`tieback-${tieBack.id}`} className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border-2 border-stone-200 cursor-pointer transition-all peer-data-[state=checked]:border-stone-800 peer-data-[state=checked]:bg-stone-50 hover:border-stone-300">
                          {tieBack.preview && (
                            <div className="w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                              <Image src={tieBack.preview} alt={tieBack.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-stone-900">{tieBack.name}</span>
                              <span className="text-sm text-stone-600">{tieBack.price > 0 ? `+$${tieBack.price}/set` : 'No extra'}</span>
                            </div>
                            <p className="text-xs text-stone-500 mt-0.5">{tieBack.description}</p>
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
                  <Label className="text-base font-medium text-stone-900">Finishing Options</Label>
                  <p className="text-sm text-stone-500">Professional finishing touches for your drapery</p>
                </div>
                <RadioGroup value={selectedSteaming.id} onValueChange={(val) => { const steaming = steamingOptions.find(s => s.id === val); if (steaming) setSelectedSteaming(steaming); }}>
                  <div className="grid gap-3">
                    {steamingOptions.map((steaming) => {
                      const isDisabled = steaming.id === 'premium' && !isSteamingAvailable;
                      return (
                        <div key={steaming.id}>
                          <RadioGroupItem value={steaming.id} id={`steaming-${steaming.id}`} className="peer sr-only" disabled={isDisabled} />
                          <Label htmlFor={`steaming-${steaming.id}`} className={`flex items-start gap-3 p-3 sm:p-4 rounded-xl border-2 border-stone-200 transition-all ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer peer-data-[state=checked]:border-stone-800 peer-data-[state=checked]:bg-stone-50 hover:border-stone-300'}`}>
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${steaming.id === 'premium' ? 'bg-stone-100' : 'bg-stone-50'}`}>
                              {steaming.id === 'premium' ? <ThermometerIcon className="w-5 h-5 text-stone-700" /> : <CheckIcon className="w-5 h-5 text-stone-500" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-stone-900">{steaming.name}</span>
                                <span className="text-sm text-stone-600">{steaming.price > 0 ? `+$${steaming.price}` : 'Included'}</span>
                              </div>
                              <p className="text-xs text-stone-500">{steaming.description}</p>
                              {steaming.note && (
                                <div className={`mt-2 flex items-center gap-1.5 text-xs ${isDisabled ? 'text-red-500' : 'text-stone-600'}`}>
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
                {!isSteamingAvailable && (
                  <div className="p-3 bg-stone-50 rounded-lg text-sm text-stone-600 border border-stone-200">
                    <strong>Note:</strong> Premium steaming is not available for panels over 120&quot; wide or 108&quot; high. Your current dimensions: {width}&quot; × {height}&quot;
                  </div>
                )}
              </div>
            )}

            <Separator className="bg-stone-200" />

            {/* Quantity & Navigation */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium text-stone-900">Number of Panels</Label>
                  <p className="text-xs text-stone-500">Order 2 for a standard pair</p>
                </div>
                <div className="flex items-center border border-stone-200 rounded-lg bg-white">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-11 h-11 flex items-center justify-center text-stone-500 hover:text-stone-800 active:bg-stone-100 transition-colors">
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-stone-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-11 h-11 flex items-center justify-center text-stone-500 hover:text-stone-800 active:bg-stone-100 transition-colors">
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Step Navigation */}
              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button variant="outline" className="flex-1 rounded-full border-stone-300 text-stone-700 hover:bg-stone-100 h-12" onClick={() => setCurrentStep(currentStep - 1)}>
                    <ChevronLeftIcon className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button className="flex-1 rounded-full bg-stone-800 text-white hover:bg-stone-700 h-12" onClick={() => setCurrentStep(currentStep + 1)}>
                    Next Step
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button size="lg" className="flex-1 h-12 rounded-full bg-stone-800 text-white hover:bg-stone-700 text-base font-medium" onClick={handleAddToCart}>
                    Add to Cart - ${totalPrice}
                  </Button>
                )}
              </div>

              {currentStep < steps.length - 1 && (
                <button onClick={handleAddToCart} className="w-full text-center text-sm text-stone-600 hover:text-stone-900 hover:underline py-2">
                  Skip to Add to Cart - ${totalPrice}
                </button>
              )}
            </div>

            {/* Trust Badges - Neutral */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="flex flex-col items-center text-center gap-1.5 p-2 sm:p-3 rounded-xl bg-stone-50 border border-stone-100">
                <LeafIcon className="w-5 h-5 text-stone-600" />
                <span className="text-xs text-stone-600">Premium<br/>Fabrics</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-2 sm:p-3 rounded-xl bg-stone-50 border border-stone-100">
                <ShieldCheckIcon className="w-5 h-5 text-stone-600" />
                <span className="text-xs text-stone-600">Quality<br/>Guaranteed</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-2 sm:p-3 rounded-xl bg-stone-50 border border-stone-100">
                <TruckIcon className="w-5 h-5 text-stone-600" />
                <span className="text-xs text-stone-600">Free<br/>Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* Product Information - All in Accordion */}
      {/* ============================================ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="space-y-6">
          
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-2">Product Information</h2>
            <p className="text-stone-500">Everything you need to know about your custom drapery</p>
          </div>

          {/* Unified Accordion */}
          <Accordion type="multiple" defaultValue={['measurement', 'specs', 'care']} className="w-full space-y-3">
            
            {/* Measurement & Installation */}
            <AccordionItem value="measurement" className="border border-stone-200 rounded-2xl px-4 sm:px-6 data-[state=open]:bg-stone-50/50 bg-white">
              <AccordionTrigger className="hover:no-underline py-5 [&[data-state=open]>div>svg]:rotate-180">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                    <RulerIcon className="w-6 h-6 text-stone-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-lg text-stone-900">Measurement & Installation</span>
                    <p className="text-sm text-stone-500 font-normal">Difficulty level, resources & guides</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="pl-0 sm:pl-16 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DifficultyMeter />
                    <TutorialHub />
                  </div>
                  
                  {/* Quick Tips */}
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <h4 className="font-medium text-stone-900 mb-3 flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-stone-600" />
                      Quick Measuring Tips
                    </h4>
                    <ul className="space-y-2 text-base text-stone-600">
                      <li className="flex items-start gap-2">
                        <span className="text-stone-400 mt-1">•</span>
                        <span>Measure width at top, middle, and bottom — use the narrowest measurement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-stone-400 mt-1">•</span>
                        <span>Measure height at left, center, and right — use the longest measurement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-stone-400 mt-1">•</span>
                        <span>Round to nearest 1/8 inch for best fit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-stone-400 mt-1">•</span>
                        <span>Use a steel measuring tape for accuracy</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Specifications */}
            <AccordionItem value="specs" className="border border-stone-200 rounded-2xl px-4 sm:px-6 data-[state=open]:bg-stone-50/50 bg-white">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                    <ListIcon className="w-6 h-6 text-stone-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-lg text-stone-900">Specifications</span>
                    <p className="text-sm text-stone-500 font-normal">Technical details & dimensions</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="pl-0 sm:pl-16">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
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
                      <div key={idx} className="flex justify-between py-3 border-b border-stone-200">
                        <span className="text-stone-500 text-base">{item.label}</span>
                        <span className="font-medium text-stone-900 text-base">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Care Instructions */}
            <AccordionItem value="care" className="border border-stone-200 rounded-2xl px-4 sm:px-6 data-[state=open]:bg-stone-50/50 bg-white">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                    <DropletsIcon className="w-6 h-6 text-stone-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-lg text-stone-900">Care Instructions</span>
                    <p className="text-sm text-stone-500 font-normal">How to maintain your custom drapery</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="pl-0 sm:pl-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <h4 className="font-medium text-base text-stone-900 flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-stone-600" />
                        Regular Maintenance
                      </h4>
                      <ul className="space-y-2 text-base text-stone-600">
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Vacuum gently using brush attachment monthly</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Dust with feather duster or microfiber cloth</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Shake panels gently to remove dust particles</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Rotate panels periodically for even sun exposure</span></li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-base text-stone-900 flex items-center gap-2">
                        <DropletsIcon className="w-4 h-4 text-stone-600" />
                        Spot Cleaning
                      </h4>
                      <ul className="space-y-2 text-base text-stone-600">
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Blot spills immediately with clean white cloth</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Use mild soap and lukewarm water for stains</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Test cleaning solution on hidden area first</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Air dry completely before closing</span></li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <h4 className="font-medium text-base text-stone-900 flex items-center gap-2">
                        <ThermometerIcon className="w-4 h-4 text-stone-600" />
                        Professional Cleaning
                      </h4>
                      <ul className="space-y-2 text-base text-stone-600">
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Dry clean recommended for best results</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Frequency: Every 2-3 years or as needed</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Use reputable cleaner experienced with drapes</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Re-hang immediately after cleaning</span></li>
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <p className="font-medium text-amber-900 text-base mb-1">Important Note</p>
                      <p className="text-base text-amber-800">Do not machine wash or tumble dry. High heat can damage fabric and lining. Blackout lining requires special care.</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Returns & Policy */}
            <AccordionItem value="returns" className="border border-stone-200 rounded-2xl px-4 sm:px-6 data-[state=open]:bg-stone-50/50 bg-white">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                    <RotateCcwIcon className="w-6 h-6 text-stone-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-lg text-stone-900">Returns & Warranty Policy</span>
                    <p className="text-sm text-stone-500 font-normal">Custom product protection & shipping coverage</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="pl-0 sm:pl-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <h4 className="font-medium text-base text-stone-900 flex items-center gap-2">
                        <ShieldCheckIcon className="w-4 h-4 text-stone-600" />
                        3-Year Limited Warranty
                      </h4>
                      <ul className="space-y-2 text-base text-stone-600">
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Covers manufacturing defects in materials and workmanship</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Includes header construction, stitching, and lining attachment</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Hardware components covered for 1 year</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Normal wear and tear not covered</span></li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-base text-stone-900 flex items-center gap-2">
                        <TruckIcon className="w-4 h-4 text-stone-600" />
                        Shipping Damage Protection
                      </h4>
                      <ul className="space-y-2 text-base text-stone-600">
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Inspect package immediately upon receipt</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Report damage within 48 hours with photos</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>We will expedite replacement at no cost</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Keep original packaging for inspection</span></li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <h4 className="font-medium text-base text-stone-900 flex items-center gap-2">
                        <InfoIcon className="w-4 h-4 text-stone-600" />
                        Custom Product Policy
                      </h4>
                      <ul className="space-y-2 text-base text-stone-600">
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Custom orders cannot be returned for size/color preferences</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Measurement errors by customer not covered</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Fabric swatches recommended before ordering</span></li>
                        <li className="flex items-start gap-2"><span className="text-stone-400">•</span><span>Production begins within 24 hours of order</span></li>
                      </ul>
                    </div>
                    <div className="p-4 bg-stone-100 rounded-xl border border-stone-200">
                      <p className="font-medium text-stone-900 text-base mb-1">Quality Guarantee</p>
                      <p className="text-base text-stone-600">If your drapes arrive with defects or incorrect specifications based on your order, we will remake them free of charge. Contact our customer care team within 14 days.</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Cordless Safety */}
            <AccordionItem value="safety" className="border border-stone-200 rounded-2xl px-4 sm:px-6 data-[state=open]:bg-stone-50/50 bg-white">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                    <BabyIcon className="w-6 h-6 text-stone-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-lg text-stone-900">Cordless Safety Features</span>
                    <p className="text-sm text-stone-500 font-normal">Child-safe design certification & features</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="pl-0 sm:pl-16 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="rounded-xl bg-stone-50 border-stone-200 border">
                      <CardContent className="p-5 text-center">
                        <div className="w-14 h-14 rounded-full bg-stone-200 flex items-center justify-center mx-auto mb-3">
                          <ShieldIcon className="w-7 h-7 text-stone-700" />
                        </div>
                        <h4 className="font-medium text-base text-stone-900 mb-1">WCSC Certified</h4>
                        <p className="text-sm text-stone-600">Meets all Window Covering Safety Council standards for child safety</p>
                      </CardContent>
                    </Card>
                    <Card className="rounded-xl bg-stone-50 border-stone-200 border">
                      <CardContent className="p-5 text-center">
                        <div className="w-14 h-14 rounded-full bg-stone-200 flex items-center justify-center mx-auto mb-3">
                          <VolumeXIcon className="w-7 h-7 text-stone-700" />
                        </div>
                        <h4 className="font-medium text-base text-stone-900 mb-1">Zero Exposed Cords</h4>
                        <p className="text-sm text-stone-600">Completely cordless design eliminates strangulation hazard</p>
                      </CardContent>
                    </Card>
                    <Card className="rounded-xl bg-stone-50 border-stone-200 border">
                      <CardContent className="p-5 text-center">
                        <div className="w-14 h-14 rounded-full bg-stone-200 flex items-center justify-center mx-auto mb-3">
                          <HandHelpingIcon className="w-7 h-7 text-stone-700" />
                        </div>
                        <h4 className="font-medium text-base text-stone-900 mb-1">Smooth Operation</h4>
                        <p className="text-sm text-stone-600">Effortless wand or push-pull operation safe for little hands</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="p-5 bg-stone-100 rounded-xl border border-stone-200">
                    <div className="flex items-start gap-3">
                      <AwardIcon className="w-6 h-6 text-stone-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-base text-stone-900">Best for Kids Certified</p>
                        <p className="text-base text-stone-600 mt-1">Our cordless drapery systems have been independently tested and certified by the Window Covering Safety Council as safe for use in homes with children and pets. The cordless design completely eliminates the risk of cord strangulation.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Motorized Options */}
            <AccordionItem value="motorized" className="border border-stone-200 rounded-2xl px-4 sm:px-6 data-[state=open]:bg-stone-50/50 bg-white">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                    <ZapIcon className="w-6 h-6 text-stone-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-lg text-stone-900">Motorized Upgrade Options</span>
                    <p className="text-sm text-stone-500 font-normal">Smart home integration & automation</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="pl-0 sm:pl-16 space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-stone-50 rounded-xl border border-stone-200">
                      <VolumeXIcon className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                      <p className="font-medium text-stone-900">Whisper Quiet</p>
                      <p className="text-sm text-stone-500">&lt;35dB operation</p>
                    </div>
                    <div className="text-center p-4 bg-stone-50 rounded-xl border border-stone-200">
                      <BatteryIcon className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                      <p className="font-medium text-stone-900">Long Battery</p>
                      <p className="text-sm text-stone-500">Up to 6 months</p>
                    </div>
                    <div className="text-center p-4 bg-stone-50 rounded-xl border border-stone-200">
                      <WifiIcon className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                      <p className="font-medium text-stone-900">Smart Home</p>
                      <p className="text-sm text-stone-500">Alexa/Google ready</p>
                    </div>
                    <div className="text-center p-4 bg-stone-50 rounded-xl border border-stone-200">
                      <SmartphoneIcon className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                      <p className="font-medium text-stone-900">App Control</p>
                      <p className="text-sm text-stone-500">iOS & Android</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-stone-900 text-base">Available Motor Systems</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Card className="rounded-xl border-stone-200 hover:border-stone-400 transition-colors cursor-pointer bg-white">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center shrink-0">
                              <BatteryIcon className="w-5 h-5 text-stone-700" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-stone-900">Rechargeable Motor</span>
                                <span className="text-sm text-stone-700">+$149/panel</span>
                              </div>
                              <p className="text-sm text-stone-600">Built-in lithium battery, USB-C charging, 6-month battery life. No electrician needed.</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="rounded-xl border-stone-200 hover:border-stone-400 transition-colors cursor-pointer bg-white">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center shrink-0">
                              <ZapIcon className="w-5 h-5 text-stone-700" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-stone-900">Wired Motor</span>
                                <span className="text-sm text-stone-700">+$199/panel</span>
                              </div>
                              <p className="text-sm text-stone-600">Hardwired power connection, continuous operation, professional installation recommended.</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <CogIcon className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-stone-900 text-sm">Schedule & Automation</p>
                        <p className="text-sm text-stone-600">Set daily schedules, sunrise/sunset automation, and vacation mode</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <RefreshCwIcon className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-stone-900 text-sm">Scene Integration</p>
                        <p className="text-sm text-stone-600">Works with Apple HomeKit, Google Home, Amazon Alexa, and SmartThings</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheckIcon className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-stone-900 text-sm">Child Safety Lock</p>
                        <p className="text-sm text-stone-600">App-controlled lock prevents accidental operation by children</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="font-medium text-stone-900 text-base mb-1">Remote & Wall Switch Included</p>
                    <p className="text-base text-stone-600">Every motorized system includes a handheld remote (controls up to 5 channels) and a wireless wall switch that can be mounted anywhere. Additional remotes and switches available.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>

          {/* Real-Life Gallery */}
          <div className="pt-8 border-t border-stone-200">
            <RealLifeGallery />
          </div>

          {/* Reviews */}
          <div className="pt-8 border-t border-stone-200">
            <div className="flex items-center gap-2 mb-6">
              <StarIcon className="w-5 h-5 text-stone-600" />
              <h3 className="font-serif text-2xl font-medium text-stone-900">Customer Reviews ({productData.reviewCount})</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-stone-50 rounded-2xl p-6 text-center border border-stone-200">
                <div className="text-5xl font-semibold text-stone-900">{productData.rating}</div>
                <div className="flex justify-center gap-1 my-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(productData.rating) ? 'fill-stone-700 text-stone-700' : 'text-stone-300'}`} />
                  ))}
                </div>
                <div className="text-sm text-stone-500">Based on {productData.reviewCount} reviews</div>
              </div>
              <div className="md:col-span-2 space-y-4">
                {reviewsData.map((review) => (
                  <Card key={review.id} className="rounded-xl border-stone-200 bg-white">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                          <UserIcon className="w-5 h-5 text-stone-500" />
                        </div>
                        <div>
                          <div className="font-medium text-stone-900">{review.author}</div>
                          <div className="flex items-center gap-2 text-sm text-stone-500">
                            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-stone-700 text-stone-700' : 'text-stone-300'}`} />)}</div>
                            <span>{review.date}</span>
                          </div>
                        </div>
                        {review.verified && <Badge variant="secondary" className="rounded-full text-xs ml-auto bg-stone-100 text-stone-700 border-stone-200"><CheckIcon className="w-3 h-3 mr-1" />Verified</Badge>}
                      </div>
                      <h4 className="font-medium text-stone-900 mb-1">{review.title}</h4>
                      <p className="text-stone-600 text-base">{review.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Swatch Dialog - Neutral */}
      <Dialog open={isSwatchDialogOpen} onOpenChange={setIsSwatchDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-stone-900">Order Free Fabric Samples</DialogTitle>
            <DialogDescription className="text-stone-600">See and feel our fabrics in your home. Up to 10 free samples.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-3 gap-2">
              {fabricSwatches.map((swatch) => (
                <div key={swatch.id} className="p-2 rounded-lg border border-stone-200 text-center hover:border-stone-400 transition-colors cursor-pointer">
                  <div className="w-full h-12 rounded mb-1" style={{ backgroundColor: swatch.color }} />
                  <p className="text-xs font-medium text-stone-900 truncate">{swatch.name}</p>
                </div>
              ))}
            </div>
            <div className="bg-stone-50 rounded-lg p-3 flex items-center gap-3 border border-stone-200">
              <TruckIcon className="w-4 h-4 text-stone-600" />
              <div className="text-sm text-stone-600"><span className="font-medium text-stone-900">FREE Shipping</span> • Arrives in 3-5 days</div>
            </div>
            <Button className="w-full rounded-full bg-stone-800 hover:bg-stone-700 text-white" onClick={() => { toast.success('Samples added to cart!'); setIsSwatchDialogOpen(false); }}>Add 6 Samples to Cart</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailLuxV3Page;
